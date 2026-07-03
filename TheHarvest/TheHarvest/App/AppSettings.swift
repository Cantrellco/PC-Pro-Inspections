import Foundation
import Observation

/// User preferences, persisted in UserDefaults.
@Observable
final class AppSettings {
    var displayName: String {
        didSet { UserDefaults.standard.set(displayName, forKey: "displayName") }
    }
    var translationID: String {
        didSet { UserDefaults.standard.set(translationID, forKey: "translationID") }
    }
    /// Base URL of the owner-built backend that proxies Claude Sonnet.
    var backendURLString: String {
        didSet { UserDefaults.standard.set(backendURLString, forKey: "backendURLString") }
    }
    var readerFontScale: Double {
        didSet { UserDefaults.standard.set(readerFontScale, forKey: "readerFontScale") }
    }
    var lastBookIndex: Int {
        didSet { UserDefaults.standard.set(lastBookIndex, forKey: "lastBookIndex") }
    }
    var lastChapter: Int {
        didSet { UserDefaults.standard.set(lastChapter, forKey: "lastChapter") }
    }
    var seededDefaultPlan: Bool {
        didSet { UserDefaults.standard.set(seededDefaultPlan, forKey: "seededDefaultPlan") }
    }

    var backendURL: URL? {
        let trimmed = backendURLString.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return nil }
        return URL(string: trimmed)
    }

    init() {
        let d = UserDefaults.standard
        displayName = d.string(forKey: "displayName") ?? ""
        translationID = d.string(forKey: "translationID") ?? "kjv"
        backendURLString = d.string(forKey: "backendURLString") ?? ""
        let scale = d.double(forKey: "readerFontScale")
        readerFontScale = scale == 0 ? 1.0 : scale
        lastBookIndex = d.object(forKey: "lastBookIndex") as? Int ?? 42   // John
        lastChapter = d.object(forKey: "lastChapter") as? Int ?? 15      // John 15
        seededDefaultPlan = d.bool(forKey: "seededDefaultPlan")
    }
}
