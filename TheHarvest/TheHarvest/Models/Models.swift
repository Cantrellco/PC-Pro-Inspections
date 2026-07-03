import Foundation
import SwiftData

// MARK: - Notes

enum NoteKind: String, CaseIterable, Identifiable {
    case reflection = "Reflection"
    case sermon = "Sermon"
    case prayer = "Prayer"

    var id: String { rawValue }

    var icon: String {
        switch self {
        case .reflection: "sun.max"
        case .sermon: "waveform"
        case .prayer: "hands.and.sparkles"
        }
    }
}

@Model
final class Note {
    var title: String
    var body: String
    var kindRaw: String
    var verseRefRaw: String?
    var pinned: Bool
    var createdAt: Date
    var updatedAt: Date

    init(
        title: String = "",
        body: String = "",
        kind: NoteKind = .reflection,
        verseRefRaw: String? = nil,
        pinned: Bool = false
    ) {
        self.title = title
        self.body = body
        self.kindRaw = kind.rawValue
        self.verseRefRaw = verseRefRaw
        self.pinned = pinned
        self.createdAt = Date()
        self.updatedAt = Date()
    }

    var kind: NoteKind {
        get { NoteKind(rawValue: kindRaw) ?? .reflection }
        set { kindRaw = newValue.rawValue }
    }

    var verseRef: VerseRef? {
        guard let raw = verseRefRaw else { return nil }
        return VerseRef.fromRaw(raw)
    }
}

// MARK: - Highlights

@Model
final class Highlight {
    var translationID: String
    var bookIndex: Int
    var chapter: Int
    var verse: Int
    var inkRaw: String
    var createdAt: Date

    init(translationID: String, bookIndex: Int, chapter: Int, verse: Int, ink: HighlightInk) {
        self.translationID = translationID
        self.bookIndex = bookIndex
        self.chapter = chapter
        self.verse = verse
        self.inkRaw = ink.rawValue
        self.createdAt = Date()
    }

    var ink: HighlightInk {
        get { HighlightInk(rawValue: inkRaw) ?? .gold }
        set { inkRaw = newValue.rawValue }
    }

    var ref: VerseRef { VerseRef(bookIndex: bookIndex, chapter: chapter, verse: verse) }
}

// MARK: - Plans (checklists)

@Model
final class HarvestPlan {
    var title: String
    var iconName: String
    var createdAt: Date
    var order: Int
    @Relationship(deleteRule: .cascade, inverse: \PlanItem.plan)
    var items: [PlanItem]

    init(title: String, iconName: String = "leaf", order: Int = 0) {
        self.title = title
        self.iconName = iconName
        self.createdAt = Date()
        self.order = order
        self.items = []
    }

    var sortedItems: [PlanItem] { items.sorted { $0.order < $1.order } }
    var completedCount: Int { items.filter(\.isDone).count }
    var progress: Double { items.isEmpty ? 0 : Double(completedCount) / Double(items.count) }
}

@Model
final class PlanItem {
    var title: String
    var isDone: Bool
    var order: Int
    var createdAt: Date
    var plan: HarvestPlan?

    init(title: String, order: Int, isDone: Bool = false) {
        self.title = title
        self.order = order
        self.isDone = isDone
        self.createdAt = Date()
    }
}

// MARK: - Sermons

@Model
final class Sermon {
    var title: String
    var speaker: String
    /// Remote URL string, or the file name of an imported copy in Application Support.
    var remoteURLString: String?
    var localFileName: String?
    var dateAdded: Date
    var transcript: String?
    var aiSummary: String?
    var aiKeyPoints: [String]
    var aiScriptures: [String]

    init(title: String, speaker: String = "", remoteURLString: String? = nil, localFileName: String? = nil) {
        self.title = title
        self.speaker = speaker
        self.remoteURLString = remoteURLString
        self.localFileName = localFileName
        self.dateAdded = Date()
        self.aiKeyPoints = []
        self.aiScriptures = []
    }

    var hasNotes: Bool { aiSummary != nil || !aiKeyPoints.isEmpty }

    var audioURL: URL? {
        if let localFileName {
            let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
            return dir?.appendingPathComponent("Sermons", isDirectory: true)
                .appendingPathComponent(localFileName)
        }
        if let remoteURLString { return URL(string: remoteURLString) }
        return nil
    }
}

// MARK: - Assistant conversation

@Model
final class ChatMessageRecord {
    var role: String       // "user" | "assistant"
    var content: String
    var createdAt: Date

    init(role: String, content: String) {
        self.role = role
        self.content = content
        self.createdAt = Date()
    }

    var isUser: Bool { role == "user" }
}
