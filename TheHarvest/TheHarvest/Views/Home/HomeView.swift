import SwiftUI
import SwiftData

struct HomeView: View {
    @Environment(BibleStore.self) private var bible
    @Environment(AppSettings.self) private var settings
    @Environment(AppRouter.self) private var router

    @Query(sort: \HarvestPlan.order) private var plans: [HarvestPlan]
    @Query(sort: \Note.updatedAt, order: .reverse) private var notes: [Note]

    private var votdRef: VerseRef { VerseOfTheDay.reference() }

    private var greeting: String {
        let hour = Calendar.current.component(.hour, from: Date())
        switch hour {
        case 5..<12: return "Good Morning"
        case 12..<17: return "Good Afternoon"
        case 17..<22: return "Good Evening"
        default: return "Peace Be With You"
        }
    }

    private var beloved: String {
        let name = settings.displayName.trimmingCharacters(in: .whitespaces)
        return name.isEmpty ? "Beloved" : name
    }

    var body: some View {
        NavigationStack {
            ZStack {
                HeavenlyBackground()
                ScrollView {
                    VStack(spacing: 26) {
                        header
                        verseOfTheDay
                        continueReading
                        walkToday
                        askCard
                        footerBlessing
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 8)
                    .padding(.bottom, 40)
                }
            }
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    HStack(spacing: 8) {
                        WheatMark(size: 18)
                        Text("THE HARVEST")
                            .font(HarvestType.label(12))
                            .tracking(3)
                            .foregroundStyle(HarvestPalette.gold)
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantToolbarButton()
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { router.showSettings = true } label: {
                        Image(systemName: "person.crop.circle")
                            .foregroundStyle(HarvestPalette.linenDim)
                    }
                    .accessibilityLabel("Profile and settings")
                }
            }
            .toolbarBackground(.hidden, for: .navigationBar)
        }
    }

    // MARK: Sections

    private var header: some View {
        VStack(spacing: 10) {
            Text("\(greeting), \(beloved)")
                .font(HarvestType.display(30))
                .foregroundStyle(HarvestPalette.linen)
                .multilineTextAlignment(.center)
            Text("Abide in me, and I in you.")
                .font(HarvestType.script(24))
                .foregroundStyle(HarvestPalette.goldBright.opacity(0.9))
            Text("John 15:4").eyebrow(color: HarvestPalette.linenFaint)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 12)
    }

    private var verseOfTheDay: some View {
        let translation = bible.translation(settings.translationID)
        let text = bible.text(for: votdRef, translationID: settings.translationID)
            ?? "Open the Word and let it dwell in you richly."

        return Button {
            router.openBible(at: votdRef)
        } label: {
            VStack(spacing: 16) {
                Text("Verse of the Day").eyebrow()
                GoldDivider().frame(maxWidth: 180)
                Text("“\(text)”")
                    .font(HarvestType.scripture(19))
                    .foregroundStyle(HarvestPalette.linen)
                    .multilineTextAlignment(.center)
                    .lineSpacing(6)
                Text(votdRef.display(in: translation))
                    .font(HarvestType.quote(15))
                    .foregroundStyle(HarvestPalette.gold)
            }
            .padding(28)
            .padding(.top, 22)
            .frame(maxWidth: .infinity)
            .background(
                ArchShape()
                    .fill(
                        LinearGradient(
                            colors: [HarvestPalette.night.opacity(0.85), HarvestPalette.inkRaised.opacity(0.95)],
                            startPoint: .top, endPoint: .bottom
                        )
                    )
            )
            .overlay(ArchShape().stroke(HarvestPalette.hairline, lineWidth: 1.2))
        }
        .buttonStyle(.plain)
    }

    private var continueReading: some View {
        let ref = VerseRef(bookIndex: settings.lastBookIndex, chapter: settings.lastChapter, verse: nil)
        let translation = bible.translation(settings.translationID)

        return Button {
            router.openBible(at: ref)
        } label: {
            HarvestCard {
                HStack(spacing: 16) {
                    Image(systemName: "book.pages")
                        .font(.system(size: 22, weight: .light))
                        .foregroundStyle(HarvestPalette.goldGradient)
                        .frame(width: 46, height: 46)
                        .background(Circle().fill(HarvestPalette.gold.opacity(0.12)))
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Continue Reading").eyebrow(color: HarvestPalette.linenFaint)
                        Text(ref.display(in: translation))
                            .font(HarvestType.display(19, weight: .medium))
                            .foregroundStyle(HarvestPalette.linen)
                        Text(translation?.name ?? "")
                            .font(.system(size: 12))
                            .foregroundStyle(HarvestPalette.linenDim)
                    }
                    Spacer()
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundStyle(HarvestPalette.gold)
                }
                .padding(18)
            }
        }
        .buttonStyle(.plain)
    }

    @ViewBuilder
    private var walkToday: some View {
        if let plan = plans.first {
            Button {
                router.selectedTab = .plans
            } label: {
                HarvestCard {
                    HStack(spacing: 16) {
                        ProgressRing(progress: plan.progress)
                        VStack(alignment: .leading, spacing: 3) {
                            Text("Today's Walk").eyebrow(color: HarvestPalette.linenFaint)
                            Text(plan.title)
                                .font(HarvestType.display(19, weight: .medium))
                                .foregroundStyle(HarvestPalette.linen)
                            Text("\(plan.completedCount) of \(plan.items.count) completed")
                                .font(.system(size: 12))
                                .foregroundStyle(HarvestPalette.linenDim)
                        }
                        Spacer()
                        Image(systemName: "chevron.right")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(HarvestPalette.gold)
                    }
                    .padding(18)
                }
            }
            .buttonStyle(.plain)
        }
    }

    private var askCard: some View {
        Button {
            router.askAssistant()
        } label: {
            HarvestCard {
                HStack(spacing: 16) {
                    SpiritGlyph(size: 26)
                        .frame(width: 46, height: 46)
                    VStack(alignment: .leading, spacing: 3) {
                        Text("Ask. Seek. Knock.").eyebrow(color: HarvestPalette.linenFaint)
                        Text("What does it mean to abide in Jesus?")
                            .font(HarvestType.quote(15))
                            .foregroundStyle(HarvestPalette.linen)
                    }
                    Spacer()
                    Image(systemName: "sparkles")
                        .foregroundStyle(HarvestPalette.goldGradient)
                }
                .padding(18)
            }
        }
        .buttonStyle(.plain)
    }

    private var footerBlessing: some View {
        VStack(spacing: 10) {
            GoldDivider().frame(maxWidth: 140)
            Text("Jesus is the harvest. We are the laborers.")
                .font(HarvestType.quote(13))
                .foregroundStyle(HarvestPalette.linenFaint)
        }
        .padding(.top, 8)
    }
}
