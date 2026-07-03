import SwiftUI
import SwiftData

/// Ask. Seek. Knock. — the assistant sees the whole app (current passage,
/// notes, plans) and answers through the owner's Sonnet backend.
struct AssistantView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    @Environment(AppRouter.self) private var router
    @Environment(AppSettings.self) private var settings
    @Environment(BibleStore.self) private var bible

    @Query(sort: \ChatMessageRecord.createdAt) private var messages: [ChatMessageRecord]
    @Query(sort: \Note.updatedAt, order: .reverse) private var notes: [Note]
    @Query(sort: \HarvestPlan.order) private var plans: [HarvestPlan]

    @State private var draft = ""
    @State private var isThinking = false
    @State private var errorText: String?
    @FocusState private var inputFocused: Bool

    private let suggestions = [
        "What does it mean to abide in Jesus?",
        "Where does Jesus talk about the harvest?",
        "Help me pray about my day",
        "Show me verses on walking in love"
    ]

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.55)
                VStack(spacing: 0) {
                    conversation
                    inputBar
                }
            }
            .navigationTitle("")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    VStack(spacing: 0) {
                        Text("Ask. Seek. Knock.")
                            .font(HarvestType.display(17, weight: .semibold))
                            .foregroundStyle(HarvestPalette.linen)
                        Text("Matthew 7:7")
                            .font(.system(size: 10))
                            .foregroundStyle(HarvestPalette.linenFaint)
                    }
                }
                ToolbarItem(placement: .topBarLeading) {
                    if !messages.isEmpty {
                        Button {
                            for m in messages { modelContext.delete(m) }
                        } label: {
                            Image(systemName: "square.and.pencil")
                                .foregroundStyle(HarvestPalette.linenDim)
                        }
                        .accessibilityLabel("New conversation")
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .foregroundStyle(HarvestPalette.gold)
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
        .onAppear(perform: consumeSeed)
    }

    // MARK: Conversation

    private var conversation: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(spacing: 16) {
                    if messages.isEmpty {
                        welcome
                    }
                    ForEach(messages) { message in
                        MessageBubble(message: message)
                            .id(message.persistentModelID)
                    }
                    if isThinking {
                        HStack {
                            ProgressView().tint(HarvestPalette.gold)
                            Text("Seeking…")
                                .font(HarvestType.quote(13))
                                .foregroundStyle(HarvestPalette.linenDim)
                            Spacer()
                        }
                        .padding(.horizontal, 6)
                        .id("thinking")
                    }
                    if let errorText {
                        errorCard(errorText)
                    }
                }
                .padding(20)
            }
            .scrollDismissesKeyboard(.interactively)
            .onChange(of: messages.count) {
                if let last = messages.last {
                    withAnimation { proxy.scrollTo(last.persistentModelID, anchor: .bottom) }
                }
            }
            .onChange(of: isThinking) {
                if isThinking {
                    withAnimation { proxy.scrollTo("thinking", anchor: .bottom) }
                }
            }
        }
    }

    private var welcome: some View {
        VStack(spacing: 18) {
            SpiritGlyph(size: 40)
            Text("Ask anything about the Word,\nyour walk, or your notes.")
                .font(HarvestType.display(20))
                .foregroundStyle(HarvestPalette.linen)
                .multilineTextAlignment(.center)
                .lineSpacing(4)
            VStack(spacing: 8) {
                ForEach(suggestions, id: \.self) { suggestion in
                    Button {
                        draft = suggestion
                        send()
                    } label: {
                        Text(suggestion)
                            .font(HarvestType.quote(14))
                            .foregroundStyle(HarvestPalette.goldBright)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                            .padding(.horizontal, 16)
                            .background(
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .fill(HarvestPalette.gold.opacity(0.10))
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 16, style: .continuous)
                                    .strokeBorder(HarvestPalette.gold.opacity(0.28), lineWidth: 1)
                            )
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(.top, 6)
        }
        .padding(.top, 30)
    }

    private func errorCard(_ text: String) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Label("Not yet connected", systemImage: "exclamationmark.triangle")
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(HarvestPalette.terracotta)
            Text(text)
                .font(.system(size: 13))
                .foregroundStyle(HarvestPalette.linenDim)
                .lineSpacing(3)
            Button("Open Settings") {
                dismiss()
                router.showSettings = true
            }
            .font(.system(size: 13, weight: .semibold))
            .foregroundStyle(HarvestPalette.gold)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(HarvestPalette.terracotta.opacity(0.08))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .strokeBorder(HarvestPalette.terracotta.opacity(0.3), lineWidth: 1)
        )
    }

    // MARK: Input

    private var inputBar: some View {
        HStack(spacing: 10) {
            TextField("Ask anything…", text: $draft, axis: .vertical)
                .font(.system(size: 15))
                .foregroundStyle(HarvestPalette.linen)
                .lineLimit(1...4)
                .focused($inputFocused)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .glassCapsule()

            Button(action: send) {
                Image(systemName: "arrow.up")
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(HarvestPalette.ink)
                    .frame(width: 42, height: 42)
                    .background(Circle().fill(HarvestPalette.goldGradient))
            }
            .disabled(draft.trimmingCharacters(in: .whitespaces).isEmpty || isThinking)
            .opacity(draft.trimmingCharacters(in: .whitespaces).isEmpty || isThinking ? 0.5 : 1)
            .accessibilityLabel("Send")
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }

    // MARK: Logic

    private func consumeSeed() {
        if let seed = router.assistantSeed {
            router.assistantSeed = nil
            draft = "About \(seed)\n\n"
            inputFocused = true
        }
    }

    /// The assistant's window into the whole app.
    private func buildContext() -> String {
        var lines: [String] = []
        lines.append("App: The Harvest — a Bible app centered on Jesus. Speak with warmth, point to Jesus, quote scripture accurately.")

        let ref = VerseRef(bookIndex: settings.lastBookIndex, chapter: settings.lastChapter, verse: nil)
        lines.append("Currently reading: \(ref.display(in: bible.translation(settings.translationID))) (\(settings.translationID.uppercased())).")

        if !settings.displayName.isEmpty {
            lines.append("The reader's name: \(settings.displayName).")
        }
        let recentNotes = notes.prefix(3).map { "“\($0.title.isEmpty ? "Untitled" : $0.title)”" }
        if !recentNotes.isEmpty {
            lines.append("Recent notes: \(recentNotes.joined(separator: ", ")).")
        }
        if let plan = plans.first {
            lines.append("Active plan: “\(plan.title)” — \(plan.completedCount)/\(plan.items.count) done.")
        }
        return lines.joined(separator: "\n")
    }

    private func send() {
        let text = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty, !isThinking else { return }
        draft = ""
        errorText = nil

        let userMessage = ChatMessageRecord(role: "user", content: text)
        modelContext.insert(userMessage)

        let history = messages.suffix(20).map {
            AIService.AIMessage(role: $0.role, content: $0.content)
        } + [AIService.AIMessage(role: "user", content: text)]
        let context = buildContext()
        let service = AIService(baseURL: settings.backendURL)

        isThinking = true
        Task {
            do {
                let reply = try await service.chat(messages: Array(history), context: context)
                await MainActor.run {
                    modelContext.insert(ChatMessageRecord(role: "assistant", content: reply))
                    isThinking = false
                }
            } catch {
                await MainActor.run {
                    errorText = error.localizedDescription
                    isThinking = false
                }
            }
        }
    }
}

// MARK: - Bubble

private struct MessageBubble: View {
    let message: ChatMessageRecord

    private var verseRefs: [VerseRef] {
        message.isUser ? [] : Array(BibleStore.findReferences(in: message.content).prefix(6))
    }

    var body: some View {
        VStack(alignment: message.isUser ? .trailing : .leading, spacing: 8) {
            Text(message.content)
                .font(message.isUser ? .system(size: 15) : HarvestType.scripture(16))
                .foregroundStyle(HarvestPalette.linen)
                .lineSpacing(5)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(
                    UnevenRoundedRectangle(
                        topLeadingRadius: 18,
                        bottomLeadingRadius: message.isUser ? 18 : 6,
                        bottomTrailingRadius: message.isUser ? 6 : 18,
                        topTrailingRadius: 18,
                        style: .continuous
                    )
                    .fill(message.isUser ? HarvestPalette.night.opacity(0.9) : HarvestPalette.inkRaised.opacity(0.95))
                )
                .overlay(
                    UnevenRoundedRectangle(
                        topLeadingRadius: 18,
                        bottomLeadingRadius: message.isUser ? 18 : 6,
                        bottomTrailingRadius: message.isUser ? 6 : 18,
                        topTrailingRadius: 18,
                        style: .continuous
                    )
                    .strokeBorder(
                        message.isUser ? HarvestPalette.night : HarvestPalette.gold.opacity(0.25),
                        lineWidth: 1
                    )
                )

            if !verseRefs.isEmpty {
                WrapLayout(spacing: 6) {
                    ForEach(verseRefs, id: \.self) { ref in
                        VerseChip(ref: ref)
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: message.isUser ? .trailing : .leading)
        .padding(message.isUser ? .leading : .trailing, 40)
    }
}
