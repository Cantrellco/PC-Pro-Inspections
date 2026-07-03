import SwiftUI
import SwiftData
import UniformTypeIdentifiers

struct SermonsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Sermon.dateAdded, order: .reverse) private var sermons: [Sermon]

    @State private var showAdd = false

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.35)
                ScrollView {
                    VStack(spacing: 14) {
                        if sermons.isEmpty {
                            EmptyStateView(
                                icon: "waveform",
                                title: "Bring the sermon home",
                                message: "Add a podcast link or an audio file. The Harvest will listen, transcribe it on your device, and pull out the key points and scriptures for your notes."
                            )
                        }
                        ForEach(sermons) { sermon in
                            NavigationLink(value: sermon) {
                                sermonCard(sermon)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(20)
                    .padding(.bottom, 40)
                }
            }
            .navigationTitle("Sermons")
            .navigationBarTitleDisplayMode(.large)
            .navigationDestination(for: Sermon.self) { sermon in
                SermonDetailView(sermon: sermon)
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantToolbarButton()
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showAdd = true } label: {
                        Image(systemName: "plus")
                            .foregroundStyle(HarvestPalette.gold)
                    }
                    .accessibilityLabel("Add sermon")
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
            .sheet(isPresented: $showAdd) {
                AddSermonSheet()
            }
        }
    }

    private func sermonCard(_ sermon: Sermon) -> some View {
        HarvestCard(cornerRadius: 18) {
            HStack(spacing: 14) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(HarvestPalette.night)
                        .frame(width: 52, height: 52)
                    Image(systemName: "waveform")
                        .font(.system(size: 20, weight: .light))
                        .foregroundStyle(HarvestPalette.goldGradient)
                }
                VStack(alignment: .leading, spacing: 4) {
                    Text(sermon.title.isEmpty ? "Untitled Sermon" : sermon.title)
                        .font(HarvestType.display(17, weight: .medium))
                        .foregroundStyle(HarvestPalette.linen)
                        .lineLimit(1)
                    if !sermon.speaker.isEmpty {
                        Text(sermon.speaker)
                            .font(.system(size: 12))
                            .foregroundStyle(HarvestPalette.linenDim)
                    }
                    HStack(spacing: 8) {
                        if sermon.hasNotes {
                            badge("AI Notes", icon: "sparkles")
                        } else if sermon.transcript != nil {
                            badge("Transcribed", icon: "text.quote")
                        }
                    }
                }
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(HarvestPalette.gold)
            }
            .padding(14)
        }
        .contextMenu {
            Button(role: .destructive) {
                deleteFiles(of: sermon)
                modelContext.delete(sermon)
            } label: {
                Label("Delete", systemImage: "trash")
            }
        }
    }

    private func badge(_ text: String, icon: String) -> some View {
        HStack(spacing: 3) {
            Image(systemName: icon).font(.system(size: 8, weight: .semibold))
            Text(text).font(.system(size: 10, weight: .semibold))
        }
        .foregroundStyle(HarvestPalette.goldBright)
        .padding(.horizontal, 8)
        .padding(.vertical, 3)
        .background(Capsule().fill(HarvestPalette.gold.opacity(0.15)))
    }

    private func deleteFiles(of sermon: Sermon) {
        if let localFileName = sermon.localFileName {
            let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first
            if let url = dir?.appendingPathComponent("Sermons/\(localFileName)") {
                try? FileManager.default.removeItem(at: url)
            }
        }
    }
}

// MARK: - Add sheet

private struct AddSermonSheet: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var speaker = ""
    @State private var urlString = ""
    @State private var importedFileName: String?
    @State private var showFileImporter = false
    @State private var importError: String?

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.3)
                ScrollView {
                    VStack(alignment: .leading, spacing: 20) {
                        field("Title", text: $title, prompt: "Sunday Sermon — Faith That Moves")
                        field("Speaker", text: $speaker, prompt: "Pastor John Michael")

                        VStack(alignment: .leading, spacing: 8) {
                            Text("Audio").eyebrow()
                            field("", text: $urlString, prompt: "https://…/sermon.mp3 (podcast episode link)")

                            HStack {
                                GoldDivider()
                                Text("or")
                                    .font(.system(size: 12))
                                    .foregroundStyle(HarvestPalette.linenFaint)
                                GoldDivider()
                            }

                            Button {
                                showFileImporter = true
                            } label: {
                                HStack {
                                    Image(systemName: importedFileName == nil ? "square.and.arrow.down" : "checkmark.circle.fill")
                                    Text(importedFileName == nil ? "Import an audio file" : "Imported ✓")
                                        .font(.system(size: 14, weight: .semibold))
                                }
                                .foregroundStyle(importedFileName == nil ? HarvestPalette.linen : HarvestPalette.goldBright)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 14)
                                .background(
                                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                                        .fill(HarvestPalette.inkRaised)
                                )
                                .overlay(
                                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                                        .strokeBorder(HarvestPalette.gold.opacity(0.3), lineWidth: 1)
                                )
                            }
                            .buttonStyle(.plain)
                        }

                        if let importError {
                            Text(importError)
                                .font(.system(size: 12))
                                .foregroundStyle(HarvestPalette.terracotta)
                        }
                    }
                    .padding(24)
                }
            }
            .navigationTitle("Add Sermon")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Cancel") { dismiss() }
                        .foregroundStyle(HarvestPalette.linenDim)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Add") { save() }
                        .fontWeight(.bold)
                        .foregroundStyle(canSave ? HarvestPalette.gold : HarvestPalette.linenFaint)
                        .disabled(!canSave)
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
            .fileImporter(
                isPresented: $showFileImporter,
                allowedContentTypes: [.audio, .mpeg4Audio, .mp3],
                allowsMultipleSelection: false
            ) { result in
                handleImport(result)
            }
        }
        .presentationDetents([.large, .medium])
    }

    private var canSave: Bool {
        !title.trimmingCharacters(in: .whitespaces).isEmpty
            && (importedFileName != nil || URL(string: urlString.trimmingCharacters(in: .whitespaces)) != nil && !urlString.trimmingCharacters(in: .whitespaces).isEmpty)
    }

    private func field(_ label: String, text: Binding<String>, prompt: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            if !label.isEmpty { Text(label).eyebrow() }
            TextField(prompt, text: text)
                .font(.system(size: 15))
                .foregroundStyle(HarvestPalette.linen)
                .textInputAutocapitalization(label == "Title" || label == "Speaker" ? .words : .never)
                .autocorrectionDisabled(label.isEmpty)
                .padding(14)
                .background(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .fill(HarvestPalette.inkRaised)
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 14, style: .continuous)
                        .strokeBorder(HarvestPalette.gold.opacity(0.2), lineWidth: 1)
                )
        }
    }

    private func handleImport(_ result: Result<[URL], Error>) {
        importError = nil
        guard case .success(let urls) = result, let source = urls.first else { return }
        guard source.startAccessingSecurityScopedResource() else {
            importError = "Couldn't open that file."
            return
        }
        defer { source.stopAccessingSecurityScopedResource() }
        do {
            let support = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            let dir = support.appendingPathComponent("Sermons", isDirectory: true)
            try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
            let name = "\(UUID().uuidString).\(source.pathExtension.isEmpty ? "m4a" : source.pathExtension)"
            try FileManager.default.copyItem(at: source, to: dir.appendingPathComponent(name))
            importedFileName = name
            if title.isEmpty {
                title = source.deletingPathExtension().lastPathComponent
            }
        } catch {
            importError = "Import failed: \(error.localizedDescription)"
        }
    }

    private func save() {
        let trimmedURL = urlString.trimmingCharacters(in: .whitespaces)
        let sermon = Sermon(
            title: title.trimmingCharacters(in: .whitespaces),
            speaker: speaker.trimmingCharacters(in: .whitespaces),
            remoteURLString: importedFileName == nil && !trimmedURL.isEmpty ? trimmedURL : nil,
            localFileName: importedFileName
        )
        modelContext.insert(sermon)
        dismiss()
    }
}
