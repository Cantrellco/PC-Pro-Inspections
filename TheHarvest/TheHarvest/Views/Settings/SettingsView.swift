import SwiftUI

struct SettingsView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(AppSettings.self) private var settings
    @Environment(BibleStore.self) private var bible

    @State private var backendTestResult: String?
    @State private var testingBackend = false

    var body: some View {
        @Bindable var settings = settings

        NavigationStack {
            ZStack {
                HeavenlyBackground(glow: 0.3)
                ScrollView {
                    VStack(alignment: .leading, spacing: 24) {
                        profileSection(settings: settings)
                        readingSection(settings: settings)
                        backendSection(settings: settings)
                        aboutSection
                    }
                    .padding(20)
                    .padding(.bottom, 60)
                }
            }
            .navigationTitle("Profile")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .foregroundStyle(HarvestPalette.gold)
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
    }

    private func profileSection(settings: AppSettings) -> some View {
        @Bindable var settings = settings
        return section("You") {
            VStack(alignment: .leading, spacing: 8) {
                Text("Name").eyebrow(color: HarvestPalette.linenFaint)
                TextField("Beloved", text: $settings.displayName)
                    .font(.system(size: 15))
                    .foregroundStyle(HarvestPalette.linen)
                    .textInputAutocapitalization(.words)
                    .padding(13)
                    .background(RoundedRectangle(cornerRadius: 12).fill(HarvestPalette.ink.opacity(0.6)))
                Text("Used in your greeting — “Good Morning, \(settings.displayName.isEmpty ? "Beloved" : settings.displayName)”.")
                    .font(.system(size: 11))
                    .foregroundStyle(HarvestPalette.linenFaint)
            }
        }
    }

    private func readingSection(settings: AppSettings) -> some View {
        @Bindable var settings = settings
        return section("Reading") {
            VStack(alignment: .leading, spacing: 16) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Translation").eyebrow(color: HarvestPalette.linenFaint)
                    ForEach(BibleStore.availableTranslations, id: \.id) { option in
                        Button {
                            settings.translationID = option.id
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(option.name)
                                        .font(HarvestType.display(15, weight: .medium))
                                        .foregroundStyle(HarvestPalette.linen)
                                    Text(option.abbreviation)
                                        .font(.system(size: 11))
                                        .foregroundStyle(HarvestPalette.linenFaint)
                                }
                                Spacer()
                                if settings.translationID == option.id {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundStyle(HarvestPalette.gold)
                                }
                            }
                            .padding(12)
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(settings.translationID == option.id ? HarvestPalette.gold.opacity(0.10) : .clear)
                            )
                            .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                    }
                }

                VStack(alignment: .leading, spacing: 8) {
                    Text("Scripture size").eyebrow(color: HarvestPalette.linenFaint)
                    HStack(spacing: 12) {
                        Text("A").font(HarvestType.scripture(13)).foregroundStyle(HarvestPalette.linenDim)
                        Slider(value: $settings.readerFontScale, in: 0.85...1.4, step: 0.05)
                            .tint(HarvestPalette.gold)
                        Text("A").font(HarvestType.scripture(22)).foregroundStyle(HarvestPalette.linen)
                    }
                }
            }
        }
    }

    private func backendSection(settings: AppSettings) -> some View {
        @Bindable var settings = settings
        return section("AI Backend") {
            VStack(alignment: .leading, spacing: 10) {
                Text("Your server").eyebrow(color: HarvestPalette.linenFaint)
                TextField("https://api.yourserver.com", text: $settings.backendURLString)
                    .font(.system(size: 14, design: .monospaced))
                    .foregroundStyle(HarvestPalette.linen)
                    .keyboardType(.URL)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .padding(13)
                    .background(RoundedRectangle(cornerRadius: 12).fill(HarvestPalette.ink.opacity(0.6)))

                Text("The assistant and sermon notes call your own backend (which talks to Claude Sonnet). Until it's connected, sermon notes still work fully on-device.")
                    .font(.system(size: 11))
                    .foregroundStyle(HarvestPalette.linenFaint)
                    .lineSpacing(2)

                Button {
                    testBackend(settings: settings)
                } label: {
                    HStack {
                        if testingBackend {
                            ProgressView().tint(HarvestPalette.ink).scaleEffect(0.8)
                        }
                        Text(testingBackend ? "Testing…" : "Test Connection")
                            .font(.system(size: 13, weight: .semibold))
                    }
                    .foregroundStyle(HarvestPalette.ink)
                    .padding(.horizontal, 18)
                    .padding(.vertical, 10)
                    .background(Capsule().fill(HarvestPalette.goldGradient))
                }
                .buttonStyle(.plain)
                .disabled(testingBackend || settings.backendURL == nil)
                .opacity(settings.backendURL == nil ? 0.5 : 1)

                if let backendTestResult {
                    Text(backendTestResult)
                        .font(.system(size: 12, weight: .medium))
                        .foregroundStyle(
                            backendTestResult.hasPrefix("Connected")
                                ? HarvestPalette.goldBright
                                : HarvestPalette.terracotta
                        )
                }
            }
        }
    }

    private var aboutSection: some View {
        section("The Harvest") {
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 10) {
                    WheatMark(size: 22)
                    VStack(alignment: .leading, spacing: 2) {
                        Text("The Harvest")
                            .font(HarvestType.display(17, weight: .semibold))
                            .foregroundStyle(HarvestPalette.linen)
                        Text("A Bible app centered on Jesus.")
                            .font(.system(size: 12))
                            .foregroundStyle(HarvestPalette.linenDim)
                    }
                }
                GoldDivider()
                Text("Jesus. The Word. The Spirit. The Way. The Life.")
                    .font(HarvestType.quote(13))
                    .foregroundStyle(HarvestPalette.linenDim)
                Text("Grow closer. Walk in love. Live His plan.")
                    .font(HarvestType.script(20))
                    .foregroundStyle(HarvestPalette.goldBright)
                Text("Scripture: King James Version & World English Bible — public domain, bundled offline.")
                    .font(.system(size: 11))
                    .foregroundStyle(HarvestPalette.linenFaint)
                    .lineSpacing(2)
            }
        }
    }

    private func section(_ title: String, @ViewBuilder content: () -> some View) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title).eyebrow()
            HarvestCard(cornerRadius: 18) {
                content()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(16)
            }
        }
    }

    private func testBackend(settings: AppSettings) {
        guard settings.backendURL != nil else { return }
        testingBackend = true
        backendTestResult = nil
        let service = AIService(baseURL: settings.backendURL)
        Task {
            do {
                _ = try await service.chat(
                    messages: [.init(role: "user", content: "Reply with the single word: connected")],
                    context: "Connection test from The Harvest iOS app."
                )
                await MainActor.run {
                    backendTestResult = "Connected — your backend is answering."
                    testingBackend = false
                }
            } catch {
                await MainActor.run {
                    backendTestResult = "Couldn't reach it: \(error.localizedDescription)"
                    testingBackend = false
                }
            }
        }
    }
}
