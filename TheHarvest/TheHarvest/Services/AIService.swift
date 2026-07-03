import Foundation

/// Client for the owner-built backend that proxies Claude Sonnet.
/// The app never talks to third parties — only to your server.
///
/// Expected endpoints (see TheHarvest/README.md for the full contract):
///
///   POST {base}/chat
///     -> { "messages": [{"role": "user"|"assistant", "content": "…"}],
///          "context": "…app context…" }
///     <- { "reply": "…" }
///
///   POST {base}/sermon-notes
///     -> { "title": "…", "transcript": "…" }
///     <- { "summary": "…", "keyPoints": ["…"], "scriptures": ["John 3:16"] }
struct AIService {
    let baseURL: URL?

    enum AIError: LocalizedError {
        case notConfigured
        case badResponse(Int)
        case emptyReply

        var errorDescription: String? {
            switch self {
            case .notConfigured:
                "No backend is connected yet. Add your server address in Settings → AI Backend."
            case .badResponse(let code):
                "The backend answered with status \(code)."
            case .emptyReply:
                "The backend sent an empty reply."
            }
        }
    }

    struct AIMessage: Codable {
        let role: String
        let content: String
    }

    struct SermonNotes: Codable {
        var summary: String
        var keyPoints: [String]
        var scriptures: [String]
    }

    private struct ChatRequest: Codable {
        let messages: [AIMessage]
        let context: String?
    }

    private struct ChatResponse: Codable {
        let reply: String
    }

    private struct SermonRequest: Codable {
        let title: String
        let transcript: String
    }

    var isConfigured: Bool { baseURL != nil }

    func chat(messages: [AIMessage], context: String?) async throws -> String {
        guard let baseURL else { throw AIError.notConfigured }
        let url = baseURL.appendingPathComponent("chat")
        let body = try JSONEncoder().encode(ChatRequest(messages: messages, context: context))
        let data = try await post(url: url, body: body)
        let decoded = try JSONDecoder().decode(ChatResponse.self, from: data)
        let reply = decoded.reply.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !reply.isEmpty else { throw AIError.emptyReply }
        return reply
    }

    func sermonNotes(title: String, transcript: String) async throws -> SermonNotes {
        guard let baseURL else { throw AIError.notConfigured }
        let url = baseURL.appendingPathComponent("sermon-notes")
        let body = try JSONEncoder().encode(SermonRequest(title: title, transcript: transcript))
        let data = try await post(url: url, body: body)
        return try JSONDecoder().decode(SermonNotes.self, from: data)
    }

    private func post(url: URL, body: Data) async throws -> Data {
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = body
        request.timeoutInterval = 120
        let (data, response) = try await URLSession.shared.data(for: request)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            throw AIError.badResponse(http.statusCode)
        }
        return data
    }
}

// MARK: - Local fallback sermon analysis

/// When no backend is connected, The Harvest still pulls notes out of a sermon
/// entirely on-device: scripture references by pattern, key points by
/// classic extractive summarization. Sonnet makes it richer; this keeps it working.
enum LocalSermonAnalyzer {
    static func analyze(transcript: String) -> AIService.SermonNotes {
        let scriptures = BibleStore.findReferences(in: transcript)
            .prefix(12)
            .map { $0.display(in: nil) }

        let sentences = splitSentences(transcript)
        let keyPoints = topSentences(sentences, count: 5)
        let summary = topSentences(sentences, count: 2).joined(separator: " ")

        return AIService.SermonNotes(
            summary: summary.isEmpty ? "Transcript captured — connect your backend for a Sonnet-written summary." : summary,
            keyPoints: keyPoints,
            scriptures: Array(scriptures)
        )
    }

    private static func splitSentences(_ text: String) -> [String] {
        var sentences: [String] = []
        text.enumerateSubstrings(in: text.startIndex..., options: [.bySentences, .localized]) { sub, _, _, _ in
            if let sub {
                let trimmed = sub.trimmingCharacters(in: .whitespacesAndNewlines)
                if trimmed.count > 25 { sentences.append(trimmed) }
            }
        }
        return sentences
    }

    private static let stopWords: Set<String> = [
        "the", "and", "that", "have", "for", "not", "with", "you", "this", "but", "his", "from",
        "they", "say", "her", "she", "will", "one", "all", "would", "there", "their", "what",
        "out", "about", "who", "get", "which", "when", "make", "can", "like", "just", "him",
        "know", "take", "into", "your", "some", "them", "than", "then", "now", "only", "its",
        "over", "also", "back", "after", "use", "two", "how", "our", "was", "are", "has", "had",
        "were", "been", "being", "because", "very", "here", "things", "going", "want", "said"
    ]

    private static func topSentences(_ sentences: [String], count: Int) -> [String] {
        guard !sentences.isEmpty else { return [] }

        var frequency: [String: Int] = [:]
        for sentence in sentences {
            for word in words(sentence) where !stopWords.contains(word) && word.count > 3 {
                frequency[word, default: 0] += 1
            }
        }

        let scored = sentences.enumerated().map { index, sentence -> (Int, Double) in
            let ws = words(sentence).filter { !stopWords.contains($0) && $0.count > 3 }
            guard !ws.isEmpty else { return (index, 0) }
            let score = ws.reduce(0.0) { $0 + Double(frequency[$1] ?? 0) } / Double(ws.count)
            return (index, score)
        }

        let picked = scored
            .sorted { $0.1 > $1.1 }
            .prefix(count)
            .map(\.0)
            .sorted()

        return picked.map { sentences[$0] }
    }

    private static func words(_ sentence: String) -> [String] {
        sentence.lowercased()
            .components(separatedBy: CharacterSet.alphanumerics.inverted)
            .filter { !$0.isEmpty }
    }
}
