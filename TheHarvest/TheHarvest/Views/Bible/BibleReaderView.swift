import SwiftUI
import SwiftData
import UIKit

struct BibleReaderView: View {
    @Environment(BibleStore.self) private var bible
    @Environment(AppSettings.self) private var settings
    @Environment(AppRouter.self) private var router
    @Environment(\.modelContext) private var modelContext

    @Query private var highlights: [Highlight]

    @State private var selectedVerses: Set<Int> = []
    @State private var showPicker = false
    @State private var showSearch = false
    @State private var scrollTarget: Int?
    @State private var noteBeingEdited: Note?

    private var translation: BibleTranslation? { bible.translation(settings.translationID) }

    private var book: BibleBook? {
        guard let translation, translation.books.indices.contains(settings.lastBookIndex) else { return nil }
        return translation.books[settings.lastBookIndex]
    }

    private var verses: [String] {
        guard let book, book.chapters.indices.contains(settings.lastChapter - 1) else { return [] }
        return book.chapters[settings.lastChapter - 1]
    }

    private var chapterHighlights: [Int: HighlightInk] {
        var map: [Int: HighlightInk] = [:]
        for h in highlights
        where h.translationID == settings.translationID
            && h.bookIndex == settings.lastBookIndex
            && h.chapter == settings.lastChapter {
            map[h.verse] = h.ink
        }
        return map
    }

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.45)
                readerScroll
                VStack {
                    Spacer()
                    if selectedVerses.isEmpty {
                        chapterBar
                    } else {
                        VerseActionBar(
                            selectedVerses: $selectedVerses,
                            currentInk: firstSelectedInk,
                            onInk: applyInk,
                            onClearInk: clearInk,
                            onNote: makeNote,
                            onCopy: copySelection,
                            onAsk: askAboutSelection
                        )
                    }
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 10)
            }
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Button { showPicker = true } label: {
                        HStack(spacing: 6) {
                            Text(referenceTitle)
                                .font(HarvestType.display(17, weight: .medium))
                                .foregroundStyle(HarvestPalette.linen)
                            Image(systemName: "chevron.down")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundStyle(HarvestPalette.gold)
                        }
                    }
                }
                ToolbarItem(placement: .topBarLeading) {
                    translationMenu
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showSearch = true } label: {
                        Image(systemName: "magnifyingglass")
                            .foregroundStyle(HarvestPalette.linenDim)
                    }
                    .accessibilityLabel("Search the Bible")
                }
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantToolbarButton()
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
            .sheet(isPresented: $showPicker) {
                BiblePickerView(
                    bookIndex: settings.lastBookIndex,
                    onSelect: { bookIdx, chapter in
                        goTo(bookIndex: bookIdx, chapter: chapter, verse: nil)
                        showPicker = false
                    }
                )
            }
            .sheet(isPresented: $showSearch) {
                BibleSearchView { ref in
                    showSearch = false
                    goTo(bookIndex: ref.bookIndex, chapter: ref.chapter, verse: ref.verse)
                }
            }
            .sheet(item: $noteBeingEdited) { note in
                NavigationStack {
                    NoteEditorView(note: note)
                }
            }
            .onAppear(perform: consumePendingReference)
            .onChange(of: router.pendingReference) {
                consumePendingReference()
            }
        }
    }

    private var referenceTitle: String {
        "\(book?.name ?? "") \(settings.lastChapter)"
    }

    // MARK: Reader body

    private var readerScroll: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: 0) {
                    chapterHeading
                        .padding(.bottom, 26)

                    ForEach(Array(verses.enumerated()), id: \.offset) { index, text in
                        VerseRow(
                            number: index + 1,
                            text: text,
                            ink: chapterHighlights[index + 1],
                            isSelected: selectedVerses.contains(index + 1),
                            fontScale: settings.readerFontScale
                        ) {
                            toggleSelection(index + 1)
                        }
                        .id(index + 1)
                    }

                    chapterEndOrnament
                }
                .padding(.horizontal, 24)
                .padding(.top, 12)
                .padding(.bottom, 130)
            }
            .scrollIndicators(.hidden)
            .onChange(of: scrollTarget) {
                if let target = scrollTarget {
                    withAnimation(.easeInOut(duration: 0.45)) {
                        proxy.scrollTo(target, anchor: .center)
                    }
                    scrollTarget = nil
                }
            }
        }
    }

    private var chapterHeading: some View {
        VStack(spacing: 12) {
            Text(book?.name ?? "").eyebrow()
            Text("\(settings.lastChapter)")
                .font(HarvestType.display(56, weight: .medium))
                .foregroundStyle(HarvestPalette.goldGradient)
            GoldDivider().frame(maxWidth: 160)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 18)
    }

    private var chapterEndOrnament: some View {
        VStack(spacing: 14) {
            GoldDivider().frame(maxWidth: 120)
            Text(translation?.name ?? "")
                .font(.system(size: 11))
                .foregroundStyle(HarvestPalette.linenFaint)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 34)
    }

    // MARK: Chapter bar

    private var chapterBar: some View {
        HStack(spacing: 0) {
            Button(action: previousChapter) {
                Image(systemName: "chevron.left")
                    .font(.system(size: 15, weight: .semibold))
                    .frame(width: 48, height: 44)
                    .contentShape(Rectangle())
            }
            .disabled(isFirstChapter)
            .accessibilityLabel("Previous chapter")

            Button { showPicker = true } label: {
                Text(referenceTitle)
                    .font(HarvestType.display(15, weight: .medium))
                    .frame(maxWidth: .infinity)
                    .frame(height: 44)
                    .contentShape(Rectangle())
            }

            Button(action: nextChapter) {
                Image(systemName: "chevron.right")
                    .font(.system(size: 15, weight: .semibold))
                    .frame(width: 48, height: 44)
                    .contentShape(Rectangle())
            }
            .disabled(isLastChapter)
            .accessibilityLabel("Next chapter")
        }
        .foregroundStyle(HarvestPalette.linen)
        .frame(maxWidth: 320)
        .glassCapsule()
    }

    private var translationMenu: some View {
        Menu {
            ForEach(BibleStore.availableTranslations, id: \.id) { option in
                Button {
                    settings.translationID = option.id
                } label: {
                    if option.id == settings.translationID {
                        Label(option.name, systemImage: "checkmark")
                    } else {
                        Text(option.name)
                    }
                }
            }
        } label: {
            Text(translation?.abbreviation ?? "—")
                .font(.system(size: 13, weight: .bold))
                .foregroundStyle(HarvestPalette.gold)
                .padding(.horizontal, 10)
                .padding(.vertical, 5)
                .overlay(Capsule().strokeBorder(HarvestPalette.gold.opacity(0.4), lineWidth: 1))
        }
        .accessibilityLabel("Choose translation")
    }

    // MARK: Navigation

    private var isFirstChapter: Bool {
        settings.lastBookIndex == 0 && settings.lastChapter <= 1
    }

    private var isLastChapter: Bool {
        guard let translation else { return true }
        let lastBook = translation.books.count - 1
        return settings.lastBookIndex == lastBook
            && settings.lastChapter >= translation.books[lastBook].chapters.count
    }

    private func goTo(bookIndex: Int, chapter: Int, verse: Int?) {
        selectedVerses = []
        settings.lastBookIndex = bookIndex
        settings.lastChapter = chapter
        if let verse {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                scrollTarget = verse
                selectedVerses = [verse]
            }
        }
    }

    private func previousChapter() {
        guard let translation else { return }
        if settings.lastChapter > 1 {
            goTo(bookIndex: settings.lastBookIndex, chapter: settings.lastChapter - 1, verse: nil)
        } else if settings.lastBookIndex > 0 {
            let prevBook = settings.lastBookIndex - 1
            goTo(bookIndex: prevBook, chapter: translation.books[prevBook].chapters.count, verse: nil)
        }
    }

    private func nextChapter() {
        guard let translation, let book else { return }
        if settings.lastChapter < book.chapters.count {
            goTo(bookIndex: settings.lastBookIndex, chapter: settings.lastChapter + 1, verse: nil)
        } else if settings.lastBookIndex < translation.books.count - 1 {
            goTo(bookIndex: settings.lastBookIndex + 1, chapter: 1, verse: nil)
        }
    }

    private func consumePendingReference() {
        guard let ref = router.pendingReference else { return }
        router.pendingReference = nil
        goTo(bookIndex: ref.bookIndex, chapter: ref.chapter, verse: ref.verse)
    }

    // MARK: Selection & actions

    private func toggleSelection(_ verse: Int) {
        withAnimation(.spring(duration: 0.25)) {
            if selectedVerses.contains(verse) {
                selectedVerses.remove(verse)
            } else {
                selectedVerses.insert(verse)
            }
        }
    }

    private var firstSelectedInk: HighlightInk? {
        guard let first = selectedVerses.sorted().first else { return nil }
        return chapterHighlights[first]
    }

    private func applyInk(_ ink: HighlightInk) {
        for verse in selectedVerses {
            removeHighlight(verse: verse)
            modelContext.insert(Highlight(
                translationID: settings.translationID,
                bookIndex: settings.lastBookIndex,
                chapter: settings.lastChapter,
                verse: verse,
                ink: ink
            ))
        }
        withAnimation { selectedVerses = [] }
    }

    private func clearInk() {
        for verse in selectedVerses { removeHighlight(verse: verse) }
        withAnimation { selectedVerses = [] }
    }

    private func removeHighlight(verse: Int) {
        for h in highlights
        where h.translationID == settings.translationID
            && h.bookIndex == settings.lastBookIndex
            && h.chapter == settings.lastChapter
            && h.verse == verse {
            modelContext.delete(h)
        }
    }

    private var selectionText: String {
        selectedVerses.sorted().compactMap { v -> String? in
            guard verses.indices.contains(v - 1) else { return nil }
            return "\(v) \(verses[v - 1])"
        }.joined(separator: "\n")
    }

    private var selectionReference: String {
        let sorted = selectedVerses.sorted()
        guard let first = sorted.first, let book else { return "" }
        if sorted.count == 1 {
            return "\(book.name) \(settings.lastChapter):\(first)"
        }
        return "\(book.name) \(settings.lastChapter):\(first)-\(sorted.last ?? first)"
    }

    private func copySelection() {
        UIPasteboard.general.string = "\(selectionText)\n— \(selectionReference) (\(translation?.abbreviation ?? ""))"
        withAnimation { selectedVerses = [] }
    }

    private func makeNote() {
        let sorted = selectedVerses.sorted()
        let ref = VerseRef(
            bookIndex: settings.lastBookIndex,
            chapter: settings.lastChapter,
            verse: sorted.first
        )
        let note = Note(
            title: selectionReference,
            body: "“\(selectionText)”\n— \(selectionReference)\n\n",
            kind: .reflection,
            verseRefRaw: ref.raw
        )
        modelContext.insert(note)
        selectedVerses = []
        noteBeingEdited = note
    }

    private func askAboutSelection() {
        let seed = "\(selectionReference) — “\(selectionText)”"
        selectedVerses = []
        router.askAssistant(about: seed)
    }
}

// MARK: - Verse row

private struct VerseRow: View {
    let number: Int
    let text: String
    let ink: HighlightInk?
    let isSelected: Bool
    let fontScale: Double
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(alignment: .firstTextBaseline, spacing: 10) {
                Text("\(number)")
                    .font(.system(size: 11 * fontScale, weight: .semibold, design: .serif))
                    .foregroundStyle(HarvestPalette.gold.opacity(0.85))
                    .frame(width: 22, alignment: .trailing)

                Text(text)
                    .font(HarvestType.scripture(18 * fontScale))
                    .foregroundStyle(HarvestPalette.linen)
                    .lineSpacing(7 * fontScale)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, ink != nil ? 8 : 0)
                    .padding(.vertical, ink != nil ? 4 : 0)
                    .background(
                        RoundedRectangle(cornerRadius: 8, style: .continuous)
                            .fill(ink.map { $0.color.opacity(0.26) } ?? Color.clear)
                    )
            }
            .padding(.vertical, 6)
            .padding(.horizontal, 4)
            .contentShape(Rectangle())
            .overlay(alignment: .bottom) {
                if isSelected {
                    Rectangle()
                        .fill(HarvestPalette.gold.opacity(0.8))
                        .frame(height: 1.5)
                        .padding(.leading, 32)
                }
            }
        }
        .buttonStyle(.plain)
        .accessibilityLabel("Verse \(number). \(text)")
    }
}

// MARK: - Action bar

private struct VerseActionBar: View {
    @Binding var selectedVerses: Set<Int>
    let currentInk: HighlightInk?
    let onInk: (HighlightInk) -> Void
    let onClearInk: () -> Void
    let onNote: () -> Void
    let onCopy: () -> Void
    let onAsk: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            // Highlighter inks with meanings
            HStack(spacing: 14) {
                ForEach(HighlightInk.allCases) { ink in
                    Button { onInk(ink) } label: {
                        VStack(spacing: 4) {
                            Circle()
                                .fill(ink.color)
                                .frame(width: 24, height: 24)
                                .overlay(
                                    Circle().strokeBorder(
                                        .white.opacity(currentInk == ink ? 0.9 : 0.15),
                                        lineWidth: currentInk == ink ? 2 : 1
                                    )
                                )
                            Text(ink.meaning)
                                .font(.system(size: 8.5, weight: .medium))
                                .foregroundStyle(HarvestPalette.linenDim)
                        }
                    }
                    .accessibilityLabel("Highlight \(ink.meaning)")
                }
                if currentInk != nil {
                    Button(action: onClearInk) {
                        VStack(spacing: 4) {
                            Image(systemName: "xmark.circle")
                                .font(.system(size: 22, weight: .light))
                                .foregroundStyle(HarvestPalette.linenDim)
                            Text("Clear")
                                .font(.system(size: 8.5, weight: .medium))
                                .foregroundStyle(HarvestPalette.linenDim)
                        }
                    }
                    .accessibilityLabel("Remove highlight")
                }
            }

            Rectangle()
                .fill(HarvestPalette.gold.opacity(0.2))
                .frame(height: 0.5)

            HStack(spacing: 6) {
                actionButton("square.and.pencil", "Note", action: onNote)
                actionButton("doc.on.doc", "Copy", action: onCopy)
                actionButton("sparkles", "Ask", action: onAsk)
                actionButton("xmark", "Close") {
                    withAnimation { selectedVerses = [] }
                }
            }
        }
        .padding(16)
        .glassPanel(cornerRadius: 26)
        .transition(.move(edge: .bottom).combined(with: .opacity))
    }

    private func actionButton(_ icon: String, _ title: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            VStack(spacing: 5) {
                Image(systemName: icon)
                    .font(.system(size: 16, weight: .medium))
                Text(title)
                    .font(.system(size: 10, weight: .semibold))
            }
            .foregroundStyle(HarvestPalette.linen)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 6)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
}
