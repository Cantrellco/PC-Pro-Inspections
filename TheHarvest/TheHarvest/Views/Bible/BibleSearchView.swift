import SwiftUI

/// Search by reference ("John 3:16") or by words ("living water").
struct BibleSearchView: View {
    let onOpen: (VerseRef) -> Void

    @Environment(BibleStore.self) private var bible
    @Environment(AppSettings.self) private var settings
    @Environment(\.dismiss) private var dismiss

    @State private var query = ""
    @State private var hits: [SearchHit] = []
    @State private var isSearching = false
    @State private var searchTask: Task<Void, Never>?

    private var translation: BibleTranslation? { bible.translation(settings.translationID) }
    private var parsedRef: VerseRef? { BibleStore.parseReference(query) }

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.3)
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 10) {
                        if let ref = parsedRef {
                            referenceRow(ref)
                        }
                        if isSearching {
                            HStack {
                                Spacer()
                                ProgressView().tint(HarvestPalette.gold)
                                Spacer()
                            }
                            .padding(.top, 30)
                        }
                        ForEach(hits) { hit in
                            hitRow(hit)
                        }
                        if !isSearching && hits.isEmpty && parsedRef == nil && query.count >= 3 {
                            EmptyStateView(
                                icon: "magnifyingglass",
                                title: "Nothing found",
                                message: "Try different words, or a reference like “John 3:16”."
                            )
                        }
                        if query.isEmpty {
                            EmptyStateView(
                                icon: "text.book.closed",
                                title: "Search the Word",
                                message: "Find a verse by reference — “John 3:16” — or search every verse for a phrase like “living water”."
                            )
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Search")
            .navigationBarTitleDisplayMode(.inline)
            .searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "Reference or words…")
            .onChange(of: query) { runSearch() }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Close") { dismiss() }
                        .foregroundStyle(HarvestPalette.gold)
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
    }

    private func referenceRow(_ ref: VerseRef) -> some View {
        Button { onOpen(ref) } label: {
            HarvestCard(cornerRadius: 16) {
                HStack(spacing: 12) {
                    Image(systemName: "arrow.turn.down.right")
                        .foregroundStyle(HarvestPalette.gold)
                    Text("Go to \(ref.display(in: translation))")
                        .font(HarvestType.display(17, weight: .medium))
                        .foregroundStyle(HarvestPalette.linen)
                    Spacer()
                }
                .padding(14)
            }
        }
        .buttonStyle(.plain)
    }

    private func hitRow(_ hit: SearchHit) -> some View {
        Button { onOpen(hit.ref) } label: {
            HarvestCard(cornerRadius: 16) {
                VStack(alignment: .leading, spacing: 6) {
                    Text(hit.ref.display(in: translation))
                        .font(.system(size: 12, weight: .bold, design: .serif))
                        .foregroundStyle(HarvestPalette.gold)
                    Text(hit.text)
                        .font(HarvestType.scripture(15))
                        .foregroundStyle(HarvestPalette.linen)
                        .lineSpacing(4)
                        .lineLimit(4)
                        .multilineTextAlignment(.leading)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(14)
            }
        }
        .buttonStyle(.plain)
    }

    private func runSearch() {
        searchTask?.cancel()
        let text = query
        guard text.count >= 3, let translation else {
            hits = []
            isSearching = false
            return
        }
        isSearching = true
        searchTask = Task {
            try? await Task.sleep(nanoseconds: 350_000_000)   // debounce
            guard !Task.isCancelled else { return }
            let found = await Task.detached(priority: .userInitiated) {
                BibleStore.search(text, in: translation)
            }.value
            guard !Task.isCancelled else { return }
            await MainActor.run {
                hits = found
                isSearching = false
            }
        }
    }
}
