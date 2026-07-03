import SwiftUI
import SwiftData

struct SermonDetailView: View {
    @Bindable var sermon: Sermon

    @Environment(\.modelContext) private var modelContext
    @Environment(AppSettings.self) private var settings
    @Environment(AppRouter.self) private var router
    @Environment(BibleStore.self) private var bible
    @Environment(AudioPlayerService.self) private var player

    enum Stage: Equatable {
        case idle
        case downloading
        case transcribing
        case writingNotes
        case failed(String)
    }

    @State private var stage: Stage = .idle
    @State private var showFullTranscript = false
    @State private var savedToNotes = false

    var body: some View {
        ZStack {
            HeavenlyBackground(glow: 0.5)
            ScrollView {
                VStack(spacing: 22) {
                    header
                    playerCard
                    notesSection
                    transcriptSection
                }
                .padding(20)
                .padding(.bottom, 50)
            }
        }
        .navigationTitle("")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                AssistantToolbarButton()
            }
        }
        .toolbarBackground(.hidden, for: .navigationBar)
    }

    // MARK: Header

    private var header: some View {
        VStack(spacing: 8) {
            Text("Sunday Word").eyebrow()
            Text(sermon.title)
                .font(HarvestType.display(28))
                .foregroundStyle(HarvestPalette.linen)
                .multilineTextAlignment(.center)
            if !sermon.speaker.isEmpty {
                Text(sermon.speaker.uppercased())
                    .font(HarvestType.label(11))
                    .tracking(2)
                    .foregroundStyle(HarvestPalette.linenDim)
            }
            GoldDivider().frame(maxWidth: 150).padding(.top, 4)
        }
    }

    // MARK: Player

    private var isCurrent: Bool {
        player.currentURL != nil && player.currentURL == sermon.audioURL
    }

    private var playerCard: some View {
        HarvestCard {
            VStack(spacing: 14) {
                HStack(spacing: 18) {
                    Button {
                        player.skip(-15)
                    } label: {
                        Image(systemName: "gobackward.15")
                            .font(.system(size: 20, weight: .light))
                            .foregroundStyle(isCurrent ? HarvestPalette.linen : HarvestPalette.linenFaint)
                    }
                    .disabled(!isCurrent)

                    Button(action: togglePlay) {
                        ZStack {
                            Circle()
                                .fill(HarvestPalette.goldGradient)
                                .frame(width: 62, height: 62)
                            Image(systemName: isCurrent && player.isPlaying ? "pause.fill" : "play.fill")
                                .font(.system(size: 22, weight: .bold))
                                .foregroundStyle(HarvestPalette.ink)
                                .offset(x: isCurrent && player.isPlaying ? 0 : 2)
                        }
                    }
                    .accessibilityLabel(isCurrent && player.isPlaying ? "Pause" : "Play")

                    Button {
                        player.skip(30)
                    } label: {
                        Image(systemName: "goforward.30")
                            .font(.system(size: 20, weight: .light))
                            .foregroundStyle(isCurrent ? HarvestPalette.linen : HarvestPalette.linenFaint)
                    }
                    .disabled(!isCurrent)
                }

                if isCurrent {
                    VStack(spacing: 4) {
                        WaveformProgress(progress: player.duration > 0 ? player.currentTime / player.duration : 0) { fraction in
                            guard player.duration > 0 else { return }
                            player.seek(to: fraction * player.duration)
                        }
                        .frame(height: 30)
                        HStack {
                            Text(AudioPlayerService.format(player.currentTime))
                            Spacer()
                            Text(AudioPlayerService.format(player.duration))
                        }
                        .font(.system(size: 11, weight: .medium).monospacedDigit())
                        .foregroundStyle(HarvestPalette.linenDim)
                    }
                }
            }
            .padding(20)
        }
    }

    private func togglePlay() {
        guard let url = sermon.audioURL else { return }
        if isCurrent {
            player.toggle()
        } else {
            player.load(url: url)
        }
    }

    // MARK: AI notes

    @ViewBuilder
    private var notesSection: some View {
        if sermon.hasNotes {
            HarvestCard {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Label("AI Notes", systemImage: "sparkles")
                            .font(HarvestType.display(19, weight: .semibold))
                            .foregroundStyle(HarvestPalette.goldGradient)
                        Spacer()
                    }

                    if let summary = sermon.aiSummary, !summary.isEmpty {
                        Text(summary)
                            .font(HarvestType.quote(15))
                            .foregroundStyle(HarvestPalette.linen)
                            .lineSpacing(4)
                    }

                    if !sermon.aiKeyPoints.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Key Points").eyebrow(color: HarvestPalette.linenFaint)
                            ForEach(Array(sermon.aiKeyPoints.enumerated()), id: \.offset) { _, point in
                                HStack(alignment: .top, spacing: 10) {
                                    Diamond()
                                        .fill(HarvestPalette.gold)
                                        .frame(width: 6, height: 6)
                                        .padding(.top, 6)
                                    Text(point)
                                        .font(.system(size: 14))
                                        .foregroundStyle(HarvestPalette.linen)
                                        .lineSpacing(3)
                                }
                            }
                        }
                    }

                    if !sermon.aiScriptures.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Scriptures").eyebrow(color: HarvestPalette.linenFaint)
                            WrapLayout(spacing: 8) {
                                ForEach(sermon.aiScriptures, id: \.self) { raw in
                                    if let ref = BibleStore.parseReference(raw) {
                                        VerseChip(ref: ref)
                                    } else {
                                        Text(raw)
                                            .font(.system(size: 13, design: .serif))
                                            .foregroundStyle(HarvestPalette.linenDim)
                                    }
                                }
                            }
                        }
                    }

                    Button(action: saveToNotes) {
                        HStack {
                            Image(systemName: savedToNotes ? "checkmark" : "square.and.pencil")
                            Text(savedToNotes ? "Saved to Notes" : "Save to Notes")
                                .font(.system(size: 14, weight: .semibold))
                        }
                        .foregroundStyle(HarvestPalette.ink)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 13)
                        .background(Capsule().fill(HarvestPalette.goldGradient))
                    }
                    .buttonStyle(.plain)
                    .disabled(savedToNotes)
                }
                .padding(20)
            }
        } else {
            generateCard
        }
    }

    private var generateCard: some View {
        HarvestCard {
            VStack(spacing: 14) {
                SpiritGlyph(size: 30)
                Text("Let the app take notes")
                    .font(HarvestType.display(20))
                    .foregroundStyle(HarvestPalette.linen)
                Text("The Harvest listens to the whole sermon, transcribes it on your device, then writes out the key points and every scripture mentioned.")
                    .font(.system(size: 13))
                    .foregroundStyle(HarvestPalette.linenDim)
                    .multilineTextAlignment(.center)
                    .lineSpacing(3)

                switch stage {
                case .idle, .failed:
                    Button(action: generate) {
                        HStack {
                            Image(systemName: "sparkles")
                            Text("Transcribe & Take Notes")
                                .font(.system(size: 14, weight: .semibold))
                        }
                        .foregroundStyle(HarvestPalette.ink)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 13)
                        .background(Capsule().fill(HarvestPalette.goldGradient))
                    }
                    .buttonStyle(.plain)
                case .downloading:
                    progressLabel("Fetching the audio…")
                case .transcribing:
                    progressLabel("Listening to the sermon… this can take a while for a full message.")
                case .writingNotes:
                    progressLabel("Writing your notes…")
                }

                if case .failed(let message) = stage {
                    Text(message)
                        .font(.system(size: 12))
                        .foregroundStyle(HarvestPalette.terracotta)
                        .multilineTextAlignment(.center)
                }
            }
            .padding(22)
        }
    }

    private func progressLabel(_ text: String) -> some View {
        HStack(spacing: 10) {
            ProgressView().tint(HarvestPalette.gold)
            Text(text)
                .font(.system(size: 13))
                .foregroundStyle(HarvestPalette.linenDim)
        }
        .padding(.top, 4)
    }

    private func generate() {
        stage = .downloading
        let backendURL = settings.backendURL
        Task {
            do {
                let localURL = try await SermonTranscriber.localAudioURL(for: sermon)

                await MainActor.run { stage = .transcribing }
                let transcript: String
                if let existing = sermon.transcript, !existing.isEmpty {
                    transcript = existing
                } else {
                    transcript = try await SermonTranscriber.transcribe(fileAt: localURL)
                }

                await MainActor.run {
                    sermon.transcript = transcript
                    stage = .writingNotes
                }

                let service = AIService(baseURL: backendURL)
                let notes: AIService.SermonNotes
                if service.isConfigured {
                    do {
                        notes = try await service.sermonNotes(title: sermon.title, transcript: transcript)
                    } catch {
                        notes = LocalSermonAnalyzer.analyze(transcript: transcript)
                    }
                } else {
                    notes = LocalSermonAnalyzer.analyze(transcript: transcript)
                }

                await MainActor.run {
                    sermon.aiSummary = notes.summary
                    sermon.aiKeyPoints = notes.keyPoints
                    sermon.aiScriptures = notes.scriptures
                    stage = .idle
                }
            } catch {
                await MainActor.run {
                    stage = .failed(error.localizedDescription)
                }
            }
        }
    }

    private func saveToNotes() {
        var body = ""
        if let summary = sermon.aiSummary, !summary.isEmpty {
            body += "\(summary)\n\n"
        }
        if !sermon.aiKeyPoints.isEmpty {
            body += "Key Points\n"
            for point in sermon.aiKeyPoints { body += "• \(point)\n" }
            body += "\n"
        }
        if !sermon.aiScriptures.isEmpty {
            body += "Scriptures\n"
            body += sermon.aiScriptures.joined(separator: ", ")
            body += "\n"
        }
        let note = Note(
            title: sermon.title,
            body: body,
            kind: .sermon
        )
        modelContext.insert(note)
        withAnimation { savedToNotes = true }
    }

    // MARK: Transcript

    @ViewBuilder
    private var transcriptSection: some View {
        if let transcript = sermon.transcript, !transcript.isEmpty {
            HarvestCard {
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("Transcript").eyebrow()
                        Spacer()
                        Button(showFullTranscript ? "Less" : "More") {
                            withAnimation { showFullTranscript.toggle() }
                        }
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(HarvestPalette.gold)
                    }
                    Text(transcript)
                        .font(.system(size: 13))
                        .foregroundStyle(HarvestPalette.linenDim)
                        .lineSpacing(4)
                        .lineLimit(showFullTranscript ? nil : 6)
                }
                .padding(18)
            }
        }
    }
}

/// A decorative waveform whose fill reflects playback progress. Drag to scrub.
struct WaveformProgress: View {
    let progress: Double
    var onScrub: ((Double) -> Void)?

    var body: some View {
        GeometryReader { geo in
            let barCount = 42
            let filled = Int(progress * Double(barCount))
            HStack(alignment: .center, spacing: 2) {
                ForEach(0..<barCount, id: \.self) { i in
                    Capsule()
                        .fill(i <= filled ? AnyShapeStyle(HarvestPalette.goldGradient) : AnyShapeStyle(HarvestPalette.olive.opacity(0.6)))
                        .frame(width: max(1, (geo.size.width - CGFloat(barCount - 1) * 2) / CGFloat(barCount)),
                               height: geo.size.height * heightFactor(i, of: barCount))
                }
            }
            .frame(width: geo.size.width, height: geo.size.height, alignment: .center)
            .contentShape(Rectangle())
            .gesture(
                DragGesture(minimumDistance: 0).onEnded { value in
                    let fraction = max(0, min(1, value.location.x / max(1, geo.size.width)))
                    onScrub?(Double(fraction))
                }
            )
        }
    }

    private func heightFactor(_ index: Int, of count: Int) -> CGFloat {
        // Deterministic pseudo-random pattern that looks like speech.
        let x = Double(index) * 12.9898
        let noise = abs(sin(x) * 43758.5453).truncatingRemainder(dividingBy: 1)
        return CGFloat(0.25 + noise * 0.75)
    }
}
