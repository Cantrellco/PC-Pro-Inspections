import SwiftUI
import SwiftData

struct NotesListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Note.updatedAt, order: .reverse) private var notes: [Note]

    @State private var newNote: Note?
    @State private var filter: NoteKind?

    private var filtered: [Note] {
        let base = filter.map { kind in notes.filter { $0.kind == kind } } ?? notes
        return base.sorted { ($0.pinned ? 1 : 0, $0.updatedAt) > ($1.pinned ? 1 : 0, $1.updatedAt) }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.35)
                ScrollView {
                    VStack(spacing: 14) {
                        filterRow
                        if filtered.isEmpty {
                            EmptyStateView(
                                icon: "square.and.pencil",
                                title: "A quiet page awaits",
                                message: "Write what stood out, how Jesus is speaking, and how you will respond."
                            )
                        }
                        ForEach(filtered) { note in
                            NavigationLink(value: note) {
                                noteCard(note)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(20)
                    .padding(.bottom, 40)
                }
            }
            .navigationTitle("Notes")
            .navigationBarTitleDisplayMode(.large)
            .navigationDestination(for: Note.self) { note in
                NoteEditorView(note: note)
            }
            .navigationDestination(item: $newNote) { note in
                NoteEditorView(note: note, focusOnAppear: true)
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantToolbarButton()
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        let note = Note()
                        modelContext.insert(note)
                        newNote = note
                    } label: {
                        Image(systemName: "plus")
                            .foregroundStyle(HarvestPalette.gold)
                    }
                    .accessibilityLabel("New note")
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
    }

    private var filterRow: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                filterChip(nil, label: "All", icon: "line.3.horizontal.decrease")
                ForEach(NoteKind.allCases) { kind in
                    filterChip(kind, label: kind.rawValue, icon: kind.icon)
                }
            }
        }
    }

    private func filterChip(_ kind: NoteKind?, label: String, icon: String) -> some View {
        let isOn = filter == kind
        return Button {
            withAnimation(.spring(duration: 0.3)) { filter = kind }
        } label: {
            HStack(spacing: 5) {
                Image(systemName: icon).font(.system(size: 11, weight: .semibold))
                Text(label).font(.system(size: 13, weight: .semibold))
            }
            .foregroundStyle(isOn ? HarvestPalette.ink : HarvestPalette.linenDim)
            .padding(.horizontal, 14)
            .padding(.vertical, 8)
            .background(Capsule().fill(isOn ? HarvestPalette.gold : HarvestPalette.inkRaised))
            .overlay(Capsule().strokeBorder(HarvestPalette.gold.opacity(isOn ? 0 : 0.25), lineWidth: 1))
        }
        .buttonStyle(.plain)
    }

    private func noteCard(_ note: Note) -> some View {
        HarvestCard(cornerRadius: 18) {
            VStack(alignment: .leading, spacing: 8) {
                HStack(spacing: 8) {
                    Image(systemName: note.kind.icon)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundStyle(HarvestPalette.gold)
                    Text(note.kind.rawValue).eyebrow(color: HarvestPalette.linenFaint)
                    Spacer()
                    if note.pinned {
                        Image(systemName: "pin.fill")
                            .font(.system(size: 10))
                            .foregroundStyle(HarvestPalette.gold.opacity(0.8))
                    }
                    Text(note.updatedAt, style: .date)
                        .font(.system(size: 11))
                        .foregroundStyle(HarvestPalette.linenFaint)
                }
                Text(note.title.isEmpty ? "Untitled" : note.title)
                    .font(HarvestType.display(19, weight: .medium))
                    .foregroundStyle(HarvestPalette.linen)
                    .lineLimit(1)
                if !note.body.isEmpty {
                    Text(note.body)
                        .font(.system(size: 13))
                        .foregroundStyle(HarvestPalette.linenDim)
                        .lineLimit(2)
                        .lineSpacing(3)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
        }
        .contextMenu {
            Button {
                note.pinned.toggle()
            } label: {
                Label(note.pinned ? "Unpin" : "Pin", systemImage: "pin")
            }
            Button(role: .destructive) {
                modelContext.delete(note)
            } label: {
                Label("Delete", systemImage: "trash")
            }
        }
    }
}
