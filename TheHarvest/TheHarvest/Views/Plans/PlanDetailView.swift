import SwiftUI
import SwiftData

struct PlanDetailView: View {
    @Bindable var plan: HarvestPlan

    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var newItemTitle = ""
    @FocusState private var newItemFocused: Bool

    private let icons = [
        "figure.walk", "leaf", "book.closed", "hands.and.sparkles", "sun.max",
        "flame", "heart", "cross", "drop", "moon.stars", "sunrise", "music.note"
    ]

    var body: some View {
        ZStack {
            ParchmentBackground()
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    header

                    VStack(spacing: 4) {
                        ForEach(plan.sortedItems) { item in
                            itemRow(item)
                        }
                        addRow
                    }

                    if plan.items.count > 0 && plan.completedCount == plan.items.count {
                        completedBlessing
                    }

                    iconPicker
                }
                .padding(22)
                .padding(.bottom, 60)
            }
        }
        .navigationTitle("")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Menu {
                    Button {
                        for item in plan.items { item.isDone = false }
                    } label: {
                        Label("Reset checkmarks", systemImage: "arrow.counterclockwise")
                    }
                    Button(role: .destructive) {
                        modelContext.delete(plan)
                        dismiss()
                    } label: {
                        Label("Delete plan", systemImage: "trash")
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                        .foregroundStyle(HarvestPalette.bronze)
                }
            }
        }
        .toolbarBackground(.hidden, for: .navigationBar)
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                Image(systemName: plan.iconName)
                    .font(.system(size: 20, weight: .medium))
                    .foregroundStyle(HarvestPalette.bronze)
                TextField("Plan name", text: $plan.title)
                    .font(HarvestType.display(26))
                    .foregroundStyle(HarvestPalette.inkOnParchment)
            }
            HStack(spacing: 12) {
                ProgressRing(progress: plan.progress, size: 40, lineWidth: 3.5)
                Text("\(plan.completedCount) of \(plan.items.count) completed")
                    .font(.system(size: 13))
                    .foregroundStyle(HarvestPalette.quillOnParchment)
            }
        }
    }

    private func itemRow(_ item: PlanItem) -> some View {
        HStack(spacing: 12) {
            Button {
                withAnimation(.spring(duration: 0.3)) { item.isDone.toggle() }
            } label: {
                ZStack {
                    Circle()
                        .strokeBorder(
                            item.isDone ? HarvestPalette.gold : HarvestPalette.bronze.opacity(0.5),
                            lineWidth: 1.6
                        )
                        .background(Circle().fill(item.isDone ? HarvestPalette.gold : .clear))
                        .frame(width: 26, height: 26)
                    if item.isDone {
                        Image(systemName: "checkmark")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundStyle(HarvestPalette.parchment)
                    }
                }
            }
            .buttonStyle(.plain)
            .accessibilityLabel(item.isDone ? "Mark \(item.title) not done" : "Mark \(item.title) done")

            Text(item.title)
                .font(HarvestType.scripture(17))
                .foregroundStyle(
                    item.isDone
                        ? HarvestPalette.quillOnParchment.opacity(0.55)
                        : HarvestPalette.inkOnParchment
                )
                .strikethrough(item.isDone, color: HarvestPalette.bronze.opacity(0.5))

            Spacer()
        }
        .padding(.vertical, 11)
        .padding(.horizontal, 6)
        .contentShape(Rectangle())
        .contextMenu {
            Button(role: .destructive) {
                modelContext.delete(item)
            } label: {
                Label("Remove", systemImage: "trash")
            }
        }
        .overlay(alignment: .bottom) {
            Rectangle()
                .fill(HarvestPalette.bronze.opacity(0.15))
                .frame(height: 0.7)
        }
    }

    private var addRow: some View {
        HStack(spacing: 12) {
            Image(systemName: "plus.circle")
                .font(.system(size: 22, weight: .light))
                .foregroundStyle(HarvestPalette.bronze.opacity(0.8))
            TextField("Add new item", text: $newItemTitle)
                .font(HarvestType.scripture(17))
                .foregroundStyle(HarvestPalette.inkOnParchment)
                .focused($newItemFocused)
                .submitLabel(.done)
                .onSubmit(addItem)
        }
        .padding(.vertical, 11)
        .padding(.horizontal, 6)
    }

    private func addItem() {
        let title = newItemTitle.trimmingCharacters(in: .whitespaces)
        guard !title.isEmpty else { return }
        let maxOrder = plan.items.map(\.order).max() ?? -1
        let item = PlanItem(title: title, order: maxOrder + 1)
        item.plan = plan
        modelContext.insert(item)
        newItemTitle = ""
        newItemFocused = true
    }

    private var completedBlessing: some View {
        VStack(spacing: 8) {
            GoldDivider().frame(maxWidth: 140)
            Text("Well done, good and faithful servant.")
                .font(HarvestType.script(21))
                .foregroundStyle(HarvestPalette.bronze)
            Text("Matthew 25:21")
                .font(.system(size: 11))
                .foregroundStyle(HarvestPalette.quillOnParchment)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 10)
    }

    private var iconPicker: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Emblem").eyebrow(color: HarvestPalette.bronze)
            WrapLayout(spacing: 10) {
                ForEach(icons, id: \.self) { icon in
                    Button {
                        plan.iconName = icon
                    } label: {
                        Image(systemName: icon)
                            .font(.system(size: 16, weight: .medium))
                            .foregroundStyle(
                                plan.iconName == icon ? HarvestPalette.parchment : HarvestPalette.bronze
                            )
                            .frame(width: 40, height: 40)
                            .background(
                                Circle().fill(
                                    plan.iconName == icon ? HarvestPalette.bronze : HarvestPalette.bronze.opacity(0.12)
                                )
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .padding(.top, 16)
    }
}
