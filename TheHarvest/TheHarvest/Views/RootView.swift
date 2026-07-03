import SwiftUI
import SwiftData

struct RootView: View {
    @Environment(AppRouter.self) private var router
    @Environment(AppSettings.self) private var settings
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        @Bindable var router = router

        TabView(selection: $router.selectedTab) {
            Tab("Home", systemImage: "sun.horizon.fill", value: HarvestTab.home) {
                HomeView()
            }
            Tab("Bible", systemImage: "book.closed.fill", value: HarvestTab.bible) {
                BibleReaderView()
            }
            Tab("Notes", systemImage: "square.and.pencil", value: HarvestTab.notes) {
                NotesListView()
            }
            Tab("Sermons", systemImage: "waveform", value: HarvestTab.sermons) {
                SermonsView()
            }
            Tab("Plans", systemImage: "checklist", value: HarvestTab.plans) {
                PlansView()
            }
        }
        .sheet(isPresented: $router.showAssistant) {
            AssistantView()
        }
        .sheet(isPresented: $router.showSettings) {
            SettingsView()
        }
        .onAppear(perform: seedDefaultPlanIfNeeded)
    }

    /// First launch: give the user the "Walking in His Ways" walk from day one.
    private func seedDefaultPlanIfNeeded() {
        guard !settings.seededDefaultPlan else { return }
        settings.seededDefaultPlan = true

        let plan = HarvestPlan(title: "Walking in His Ways", iconName: "figure.walk")
        modelContext.insert(plan)
        let starters = ["Read the Word", "Pray Daily", "Worship", "Love Others", "Serve", "Rest in Him"]
        for (i, title) in starters.enumerated() {
            let item = PlanItem(title: title, order: i)
            item.plan = plan
            modelContext.insert(item)
        }
    }
}

/// The sparkle that opens the assistant — present on every tab's toolbar,
/// because the AI has the whole app in reach.
struct AssistantToolbarButton: View {
    @Environment(AppRouter.self) private var router

    var body: some View {
        Button {
            router.askAssistant()
        } label: {
            Image(systemName: "sparkles")
                .foregroundStyle(HarvestPalette.goldGradient)
        }
        .accessibilityLabel("Ask the assistant")
    }
}
