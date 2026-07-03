import Foundation
import Observation

// MARK: - Data model

struct BibleTranslation: Codable, Sendable {
    let id: String
    let name: String
    let abbreviation: String
    let books: [BibleBook]
}

struct BibleBook: Codable, Sendable {
    let name: String
    /// chapters[c][v] — verse text, 0-indexed.
    let chapters: [[String]]
}

/// A location in scripture. `verse == nil` means a whole chapter.
struct VerseRef: Hashable, Sendable {
    var bookIndex: Int
    var chapter: Int
    var verse: Int?

    func display(in translation: BibleTranslation?) -> String {
        let book = translation?.books.indices.contains(bookIndex) == true
            ? translation!.books[bookIndex].name
            : BibleStore.bookNames.indices.contains(bookIndex) ? BibleStore.bookNames[bookIndex] : "?"
        if let verse { return "\(book) \(chapter):\(verse)" }
        return "\(book) \(chapter)"
    }

    var raw: String { "\(bookIndex):\(chapter):\(verse ?? 0)" }

    static func fromRaw(_ raw: String) -> VerseRef? {
        let parts = raw.split(separator: ":").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        return VerseRef(bookIndex: parts[0], chapter: parts[1], verse: parts[2] == 0 ? nil : parts[2])
    }
}

struct SearchHit: Identifiable, Sendable {
    let id = UUID()
    let ref: VerseRef
    let text: String
}

// MARK: - Store

@Observable
final class BibleStore {
    static let availableTranslations: [(id: String, name: String, abbreviation: String)] = [
        ("kjv", "King James Version", "KJV"),
        ("web", "World English Bible", "WEB")
    ]

    static let bookNames: [String] = [
        "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
        "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
        "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
        "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
        "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
        "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
        "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
        "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
        "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
    ]

    /// First New Testament book index (Matthew).
    static let newTestamentStart = 39

    private var cache: [String: BibleTranslation] = [:]

    func translation(_ id: String) -> BibleTranslation? {
        if let cached = cache[id] { return cached }
        guard let loaded = Self.loadFromBundle(id: id) else { return nil }
        cache[id] = loaded
        return loaded
    }

    static func loadFromBundle(id: String) -> BibleTranslation? {
        let candidates: [URL?] = [
            Bundle.main.url(forResource: id, withExtension: "json"),
            Bundle.main.url(forResource: id, withExtension: "json", subdirectory: "Bibles"),
            Bundle.main.url(forResource: id, withExtension: "json", subdirectory: "Resources/Bibles")
        ]
        for candidate in candidates {
            guard let url = candidate, let data = try? Data(contentsOf: url) else { continue }
            if let translation = try? JSONDecoder().decode(BibleTranslation.self, from: data) {
                return translation
            }
        }
        return nil
    }

    // MARK: Verse access

    func text(for ref: VerseRef, translationID: String) -> String? {
        guard let t = translation(translationID),
              t.books.indices.contains(ref.bookIndex) else { return nil }
        let book = t.books[ref.bookIndex]
        guard book.chapters.indices.contains(ref.chapter - 1) else { return nil }
        let chapter = book.chapters[ref.chapter - 1]
        guard let verse = ref.verse else { return nil }
        guard chapter.indices.contains(verse - 1) else { return nil }
        return chapter[verse - 1]
    }

    func chapterCount(bookIndex: Int, translationID: String) -> Int {
        guard let t = translation(translationID), t.books.indices.contains(bookIndex) else { return 0 }
        return t.books[bookIndex].chapters.count
    }

    // MARK: Reference parsing

    private static let abbreviations: [String: Int] = [
        "gen": 0, "ge": 0, "gn": 0, "exo": 1, "ex": 1, "lev": 2, "lv": 2, "num": 3, "nm": 3, "nu": 3,
        "deut": 4, "deu": 4, "dt": 4, "josh": 5, "jos": 5, "judg": 6, "jdg": 6, "rut": 7, "ru": 7,
        "1sam": 8, "1sa": 8, "2sam": 9, "2sa": 9, "1kgs": 10, "1ki": 10, "2kgs": 11, "2ki": 11,
        "1chr": 12, "1ch": 12, "2chr": 13, "2ch": 13, "ezr": 14, "neh": 15, "est": 16,
        "ps": 18, "psa": 18, "psalm": 18, "prov": 19, "pro": 19, "prv": 19, "eccl": 20, "ecc": 20,
        "song": 21, "sos": 21, "isa": 22, "is": 22, "jer": 23, "lam": 24, "ezek": 25, "eze": 25,
        "dan": 26, "dn": 26, "hos": 27, "joe": 28, "jl": 28, "amo": 29, "am": 29, "oba": 30, "ob": 30,
        "jon": 31, "mic": 32, "nah": 33, "na": 33, "hab": 34, "zeph": 35, "zep": 35, "hag": 36,
        "zech": 37, "zec": 37, "mal": 38,
        "matt": 39, "mat": 39, "mt": 39, "mrk": 40, "mk": 40, "mar": 40, "luk": 41, "lk": 41,
        "john": 42, "jhn": 42, "jn": 42, "act": 43, "ac": 43, "rom": 44, "ro": 44, "rm": 44,
        "1cor": 45, "1co": 45, "2cor": 46, "2co": 46, "gal": 47, "ga": 47, "eph": 48,
        "phil": 49, "php": 49, "col": 50, "1thess": 51, "1th": 51, "2thess": 52, "2th": 52,
        "1tim": 53, "1ti": 53, "2tim": 54, "2ti": 54, "tit": 55, "phlm": 56, "phm": 56,
        "heb": 57, "jas": 58, "jam": 58, "1pet": 59, "1pe": 59, "2pet": 60, "2pe": 60,
        "1john": 61, "1jn": 61, "2john": 62, "2jn": 62, "3john": 63, "3jn": 63,
        "jude": 64, "jud": 64, "rev": 65, "re": 65
    ]

    private static func normalize(_ s: String) -> String {
        s.lowercased()
            .replacingOccurrences(of: ".", with: "")
            .replacingOccurrences(of: " ", with: "")
    }

    static func bookIndex(named raw: String) -> Int? {
        let key = normalize(raw)
        guard !key.isEmpty else { return nil }
        if let idx = abbreviations[key] { return idx }
        let names = bookNames.map { normalize($0) }
        if let exact = names.firstIndex(of: key) { return exact }
        // Unique-prefix match ("ephes" -> Ephesians)
        let matches = names.enumerated().filter { $0.element.hasPrefix(key) }
        if matches.count == 1 { return matches[0].offset }
        return nil
    }

    /// Parses "John 3:16", "1 Cor 13", "psalm 23:1-3" (start verse used).
    static func parseReference(_ input: String) -> VerseRef? {
        let pattern = #"^\s*([1-3]?\s*[A-Za-z][A-Za-z .]*?)\s*(\d{1,3})(?:\s*[:.]\s*(\d{1,3}))?(?:\s*[-–]\s*\d{1,3})?\s*$"#
        guard let regex = try? NSRegularExpression(pattern: pattern) else { return nil }
        let ns = input as NSString
        guard let m = regex.firstMatch(in: input, range: NSRange(location: 0, length: ns.length)) else { return nil }
        let bookRaw = ns.substring(with: m.range(at: 1))
        guard let bookIdx = bookIndex(named: bookRaw) else { return nil }
        guard let chapter = Int(ns.substring(with: m.range(at: 2))) else { return nil }
        var verse: Int?
        if m.range(at: 3).location != NSNotFound {
            verse = Int(ns.substring(with: m.range(at: 3)))
        }
        return VerseRef(bookIndex: bookIdx, chapter: chapter, verse: verse)
    }

    /// Finds every scripture reference inside free text (sermon transcripts, AI replies).
    static func findReferences(in text: String) -> [VerseRef] {
        let pattern = #"([1-3]?\s?[A-Za-z][A-Za-z]+\.?)\s+(\d{1,3})\s*[:.]\s*(\d{1,3})"#
        guard let regex = try? NSRegularExpression(pattern: pattern) else { return [] }
        let ns = text as NSString
        var found: [VerseRef] = []
        var seen = Set<VerseRef>()
        regex.enumerateMatches(in: text, range: NSRange(location: 0, length: ns.length)) { m, _, _ in
            guard let m else { return }
            guard let bookIdx = bookIndex(named: ns.substring(with: m.range(at: 1))),
                  let chapter = Int(ns.substring(with: m.range(at: 2))),
                  let verse = Int(ns.substring(with: m.range(at: 3))) else { return }
            let ref = VerseRef(bookIndex: bookIdx, chapter: chapter, verse: verse)
            if seen.insert(ref).inserted { found.append(ref) }
        }
        return found
    }

    // MARK: Search

    static func search(_ query: String, in translation: BibleTranslation, limit: Int = 100) -> [SearchHit] {
        let needle = query.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard needle.count >= 3 else { return [] }
        var hits: [SearchHit] = []
        outer: for (b, book) in translation.books.enumerated() {
            for (c, chapter) in book.chapters.enumerated() {
                for (v, text) in chapter.enumerated() {
                    if text.lowercased().contains(needle) {
                        hits.append(SearchHit(
                            ref: VerseRef(bookIndex: b, chapter: c + 1, verse: v + 1),
                            text: text
                        ))
                        if hits.count >= limit { break outer }
                    }
                }
            }
        }
        return hits
    }
}
