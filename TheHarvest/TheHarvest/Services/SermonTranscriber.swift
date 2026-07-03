import Foundation
import Speech

/// On-device transcription of sermon audio. Prefers on-device recognition
/// (no audio leaves the phone) whenever the device supports it.
enum SermonTranscriber {
    enum TranscriberError: LocalizedError {
        case notAuthorized
        case unavailable
        case noAudio

        var errorDescription: String? {
            switch self {
            case .notAuthorized: "Speech recognition permission was declined. Enable it in iOS Settings → The Harvest."
            case .unavailable: "Speech recognition is not available on this device right now."
            case .noAudio: "This sermon has no audio source to transcribe."
            }
        }
    }

    static func requestAuthorization() async -> Bool {
        await withCheckedContinuation { continuation in
            SFSpeechRecognizer.requestAuthorization { status in
                continuation.resume(returning: status == .authorized)
            }
        }
    }

    /// Ensures a local file exists for the sermon; downloads remote audio into caches.
    static func localAudioURL(for sermon: Sermon) async throws -> URL {
        guard let source = sermon.audioURL else { throw TranscriberError.noAudio }
        if source.isFileURL { return source }

        let caches = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        let ext = source.pathExtension.isEmpty ? "mp3" : source.pathExtension
        let cached = caches.appendingPathComponent("sermon-\(abs(source.absoluteString.hashValue)).\(ext)")
        if FileManager.default.fileExists(atPath: cached.path) { return cached }

        let (temp, _) = try await URLSession.shared.download(from: source)
        try? FileManager.default.removeItem(at: cached)
        try FileManager.default.moveItem(at: temp, to: cached)
        return cached
    }

    static func transcribe(fileAt url: URL) async throws -> String {
        guard await requestAuthorization() else { throw TranscriberError.notAuthorized }
        guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US")) ?? SFSpeechRecognizer(),
              recognizer.isAvailable else {
            throw TranscriberError.unavailable
        }

        let request = SFSpeechURLRecognitionRequest(url: url)
        request.shouldReportPartialResults = true
        request.addsPunctuation = true
        if recognizer.supportsOnDeviceRecognition {
            request.requiresOnDeviceRecognition = true
        }

        final class State: @unchecked Sendable {
            let lock = NSLock()
            var latest = ""
            var finished = false
        }
        let state = State()

        return try await withCheckedThrowingContinuation { continuation in
            _ = recognizer.recognitionTask(with: request) { result, error in
                state.lock.lock()
                defer { state.lock.unlock() }
                guard !state.finished else { return }

                if let result {
                    state.latest = result.bestTranscription.formattedString
                    if result.isFinal {
                        state.finished = true
                        continuation.resume(returning: state.latest)
                        return
                    }
                }
                if let error {
                    state.finished = true
                    if state.latest.isEmpty {
                        continuation.resume(throwing: error)
                    } else {
                        // Keep whatever we heard before the stream ended.
                        continuation.resume(returning: state.latest)
                    }
                }
            }
        }
    }
}
