import SwiftUI
import Observation

enum HarvestTab: Hashable {
    case home, bible, notes, sermons, plans
}

/// Central navigation state. The AI assistant and every feature can move the
/// user anywhere in the app through this single object.
@Observable
final class AppRouter {
    var selectedTab: HarvestTab = .home

    /// A reference the Bible reader should open on next appearance.
    var pendingReference: VerseRef?

    /// Presented sheets.
    var showAssistant = false
    var showSettings = false

    /// Context handed to the assistant when opened from a verse or note.
    var assistantSeed: String?

    func openBible(at ref: VerseRef) {
        pendingReference = ref
        selectedTab = .bible
        showAssistant = false
    }

    func askAssistant(about seed: String? = nil) {
        assistantSeed = seed
        showAssistant = true
    }
}
