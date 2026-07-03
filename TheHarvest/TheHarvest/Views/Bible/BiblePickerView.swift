import SwiftUI

/// Two-step picker: choose a book, then a chapter.
struct BiblePickerView: View {
    let bookIndex: Int
    let onSelect: (Int, Int) -> Void

    @Environment(BibleStore.self) private var bible
    @Environment(AppSettings.self) private var settings
    @Environment(\.dismiss) private var dismiss

    @State private var expandedBook: Int?

    private var translation: BibleTranslation? { bible.translation(settings.translationID) }

    private let columns = [GridItem(.adaptive(minimum: 44), spacing: 8)]

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.3)
                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: 18) {
                            testament("Old Testament", range: 0..<BibleStore.newTestamentStart)
                            testament("New Testament", range: BibleStore.newTestamentStart..<66)
                        }
                        .padding(20)
                    }
                    .onAppear {
                        expandedBook = bookIndex
                        proxy.scrollTo("book-\(bookIndex)", anchor: .center)
                    }
                }
            }
            .navigationTitle("The Word")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Close") { dismiss() }
                        .foregroundStyle(HarvestPalette.gold)
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
        .presentationDetents([.large])
    }

    private func testament(_ title: String, range: Range<Int>) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title).eyebrow()
            VStack(spacing: 6) {
                ForEach(range, id: \.self) { index in
                    bookRow(index)
                }
            }
        }
    }

    @ViewBuilder
    private func bookRow(_ index: Int) -> some View {
        let name = BibleStore.bookNames[index]
        let chapterCount = bible.chapterCount(bookIndex: index, translationID: settings.translationID)
        let isExpanded = expandedBook == index

        VStack(spacing: 0) {
            Button {
                withAnimation(.spring(duration: 0.35)) {
                    expandedBook = isExpanded ? nil : index
                }
            } label: {
                HStack {
                    Text(name)
                        .font(HarvestType.display(17, weight: isExpanded ? .semibold : .regular))
                        .foregroundStyle(isExpanded ? HarvestPalette.goldBright : HarvestPalette.linen)
                    Spacer()
                    Text("\(chapterCount)")
                        .font(.system(size: 12))
                        .foregroundStyle(HarvestPalette.linenFaint)
                    Image(systemName: "chevron.down")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundStyle(HarvestPalette.gold.opacity(0.7))
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)

            if isExpanded {
                LazyVGrid(columns: columns, spacing: 8) {
                    ForEach(1...max(chapterCount, 1), id: \.self) { chapter in
                        Button {
                            onSelect(index, chapter)
                        } label: {
                            Text("\(chapter)")
                                .font(.system(size: 15, weight: .medium, design: .serif))
                                .foregroundStyle(HarvestPalette.linen)
                                .frame(width: 44, height: 44)
                                .background(
                                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                                        .fill(HarvestPalette.gold.opacity(0.10))
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                                        .strokeBorder(HarvestPalette.gold.opacity(0.25), lineWidth: 1)
                                )
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal, 14)
                .padding(.bottom, 14)
            }
        }
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(HarvestPalette.inkRaised.opacity(isExpanded ? 0.95 : 0.55))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .strokeBorder(HarvestPalette.gold.opacity(isExpanded ? 0.35 : 0.10), lineWidth: 1)
        )
        .id("book-\(index)")
    }
}
