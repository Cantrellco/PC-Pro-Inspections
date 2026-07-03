import SwiftUI
import SwiftData

@main
struct TheHarvestApp: App {
    @State private var bible = BibleStore()
    @State private var router = AppRouter()
    @State private var settings = AppSettings()
    @State private var player = AudioPlayerService()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(bible)
                .environment(router)
                .environment(settings)
                .environment(player)
                .preferredColorScheme(.dark)
                .tint(HarvestPalette.gold)
        }
        .modelContainer(for: [
            Note.self,
            Highlight.self,
            HarvestPlan.self,
            PlanItem.self,
            Sermon.self,
            ChatMessageRecord.self
        ])
    }
}
