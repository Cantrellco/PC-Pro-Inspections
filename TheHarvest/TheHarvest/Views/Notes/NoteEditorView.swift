import SwiftUI
import SwiftData

/// The immersive writing room — aged paper, serif ink, gentle prompts.
struct NoteEditorView: View {
    @Bindable var note: Note
    var focusOnAppear: Bool = false

    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    @Environment(AppRouter.self) private var router

    @FocusState private var bodyFocused: Bool

    private let prompts = [
        "What stood out to me?",
        "How is Jesus speaking?",
        "How will I respond?",
        "Prayer"
    ]

    var body: some View {
        ZStack {
            ParchmentBackground()
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    kindPicker

                    TextField("Title", text: $note.title, axis: .vertical)
                        .font(HarvestType.display(28))
                        .foregroundStyle(HarvestPalette.inkOnParchment)
                        .submitLabel(.next)
                        .onChange(of: note.title) { note.updatedAt = Date() }

                    if let ref = note.verseRef {
                        VerseChip(ref: ref)
                    }

                    Rectangle()
                        .fill(HarvestPalette.bronze.opacity(0.35))
                        .frame(height: 1)

                    TextEditor(text: $note.body)
                        .font(HarvestType.scripture(17))
                        .foregroundStyle(HarvestPalette.inkOnParchment)
                        .lineSpacing(6)
                        .scrollContentBackground(.hidden)
                        .focused($bodyFocused)
                        .frame(minHeight: 320)
                        .onChange(of: note.body) { note.updatedAt = Date() }

                    promptRow
                }
                .padding(24)
                .padding(.bottom, 60)
            }
            .scrollDismissesKeyboard(.interactively)
        }
        .navigationTitle("")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Menu {
                    Button {
                        note.pinned.toggle()
                    } label: {
                        Label(note.pinned ? "Unpin" : "Pin", systemImage: "pin")
                    }
                    ShareLink(item: shareText) {
                        Label("Share", systemImage: "square.and.arrow.up")
                    }
                    Button {
                        router.askAssistant(about: "Here is a note of mine titled “\(note.title)”:\n\(note.body)")
                    } label: {
                        Label("Ask about this note", systemImage: "sparkles")
                    }
                    Button(role: .destructive) {
                        modelContext.delete(note)
                        dismiss()
                    } label: {
                        Label("Delete", systemImage: "trash")
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                        .foregroundStyle(HarvestPalette.bronze)
                }
            }
        }
        .toolbarBackground(.hidden, for: .navigationBar)
        .onAppear {
            if focusOnAppear {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    bodyFocused = true
                }
            }
        }
        .onDisappear {
            // Never keep a completely blank page around.
            if note.title.isEmpty && note.body.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
                modelContext.delete(note)
            }
        }
    }

    private var shareText: String {
        "\(note.title)\n\n\(note.body)\n\n— written in The Harvest"
    }

    private var kindPicker: some View {
        HStack(spacing: 8) {
            ForEach(NoteKind.allCases) { kind in
                let isOn = note.kind == kind
                Button {
                    note.kind = kind
                } label: {
                    HStack(spacing: 5) {
                        Image(systemName: kind.icon).font(.system(size: 11, weight: .semibold))
                        Text(kind.rawValue).font(.system(size: 12, weight: .semibold))
                    }
                    .foregroundStyle(isOn ? HarvestPalette.parchment : HarvestPalette.quillOnParchment)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 7)
                    .background(Capsule().fill(isOn ? HarvestPalette.bronze : HarvestPalette.bronze.opacity(0.12)))
                }
                .buttonStyle(.plain)
            }
            Spacer()
        }
    }

    private var promptRow: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Gentle prompts").eyebrow(color: HarvestPalette.bronze)
            WrapLayout(spacing: 8) {
                ForEach(prompts, id: \.self) { prompt in
                    Button {
                        appendPrompt(prompt)
                    } label: {
                        Text(prompt)
                            .font(HarvestType.quote(14))
                            .foregroundStyle(HarvestPalette.quillOnParchment)
                            .padding(.horizontal, 13)
                            .padding(.vertical, 8)
                            .background(
                                Capsule().fill(Color.white.opacity(0.5))
                            )
                            .overlay(
                                Capsule().strokeBorder(HarvestPalette.bronze.opacity(0.3), lineWidth: 1)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    private func appendPrompt(_ prompt: String) {
        var text = note.body
        if !text.isEmpty && !text.hasSuffix("\n\n") {
            text += text.hasSuffix("\n") ? "\n" : "\n\n"
        }
        text += "\(prompt)\n"
        note.body = text
        bodyFocused = true
    }
}
