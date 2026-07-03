import SwiftUI
import SwiftData

/// Simple, deeply customizable checklists — walked out on parchment.
struct PlansView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \HarvestPlan.order) private var plans: [HarvestPlan]

    @State private var showNewPlan = false
    @State private var newPlanTitle = ""

    var body: some View {
        NavigationStack {
            ZStack {
                ParchmentBackground()
                ScrollView {
                    VStack(spacing: 16) {
                        if plans.isEmpty {
                            EmptyStateView(
                                icon: "checklist",
                                title: "Walk it out",
                                message: "Create a simple plan — daily rhythms, a fast, a study — and check it off as you go."
                            )
                            .foregroundStyle(HarvestPalette.inkOnParchment)
                        }
                        ForEach(plans) { plan in
                            NavigationLink(value: plan) {
                                planCard(plan)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(20)
                    .padding(.bottom, 40)
                }
            }
            .navigationTitle("Plans")
            .navigationBarTitleDisplayMode(.large)
            .navigationDestination(for: HarvestPlan.self) { plan in
                PlanDetailView(plan: plan)
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantToolbarButton()
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showNewPlan = true } label: {
                        Image(systemName: "plus")
                            .foregroundStyle(HarvestPalette.bronze)
                    }
                    .accessibilityLabel("New plan")
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
            .alert("New Plan", isPresented: $showNewPlan) {
                TextField("Name your walk…", text: $newPlanTitle)
                Button("Create") {
                    let title = newPlanTitle.trimmingCharacters(in: .whitespaces)
                    guard !title.isEmpty else { return }
                    let plan = HarvestPlan(title: title, order: (plans.last?.order ?? 0) + 1)
                    modelContext.insert(plan)
                    newPlanTitle = ""
                }
                Button("Cancel", role: .cancel) { newPlanTitle = "" }
            } message: {
                Text("A plan is a simple checklist you can shape however you like.")
            }
        }
    }

    private func planCard(_ plan: HarvestPlan) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                Image(systemName: plan.iconName)
                    .font(.system(size: 17, weight: .medium))
                    .foregroundStyle(HarvestPalette.bronze)
                    .frame(width: 38, height: 38)
                    .background(Circle().fill(HarvestPalette.bronze.opacity(0.12)))
                VStack(alignment: .leading, spacing: 2) {
                    Text(plan.title)
                        .font(HarvestType.display(19, weight: .medium))
                        .foregroundStyle(HarvestPalette.inkOnParchment)
                    Text("\(plan.completedCount) of \(plan.items.count) completed")
                        .font(.system(size: 12))
                        .foregroundStyle(HarvestPalette.quillOnParchment)
                }
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(HarvestPalette.bronze)
            }

            // Progress bar — a golden thread
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule()
                        .fill(HarvestPalette.bronze.opacity(0.15))
                    Capsule()
                        .fill(HarvestPalette.goldGradient)
                        .frame(width: max(6, geo.size.width * plan.progress))
                }
            }
            .frame(height: 6)
            .animation(.spring(duration: 0.5), value: plan.progress)
        }
        .padding(18)
        .background(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .fill(Color.white.opacity(0.55))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .strokeBorder(HarvestPalette.bronze.opacity(0.25), lineWidth: 1)
        )
        .contextMenu {
            Button {
                for item in plan.items { item.isDone = false }
            } label: {
                Label("Reset checkmarks", systemImage: "arrow.counterclockwise")
            }
            Button(role: .destructive) {
                modelContext.delete(plan)
            } label: {
                Label("Delete plan", systemImage: "trash")
            }
        }
    }
}
