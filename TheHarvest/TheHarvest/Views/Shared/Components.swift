import SwiftUI

/// Raised card on the dark canvas with a brass hairline.
struct HarvestCard<Content: View>: View {
    var cornerRadius: CGFloat = 24
    @ViewBuilder var content: Content

    var body: some View {
        content
            .background(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .fill(HarvestPalette.inkRaised.opacity(0.92))
            )
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .strokeBorder(HarvestPalette.hairline, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
    }
}

/// Eyebrow + serif title, used to open every section.
struct SectionHeading: View {
    let eyebrow: String
    let title: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(eyebrow).eyebrow()
            Text(title)
                .font(HarvestType.display(24))
                .foregroundStyle(HarvestPalette.linen)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

/// Tappable chip for a scripture reference — used by the assistant,
/// sermon notes, and note attachments. Always routes into the reader.
struct VerseChip: View {
    let ref: VerseRef
    @Environment(AppRouter.self) private var router
    @Environment(BibleStore.self) private var bible
    @Environment(AppSettings.self) private var settings

    var body: some View {
        Button {
            router.openBible(at: ref)
        } label: {
            HStack(spacing: 5) {
                Image(systemName: "book.closed")
                    .font(.system(size: 10, weight: .semibold))
                Text(ref.display(in: bible.translation(settings.translationID)))
                    .font(.system(size: 13, weight: .semibold, design: .serif))
            }
            .foregroundStyle(HarvestPalette.goldBright)
            .padding(.horizontal, 12)
            .padding(.vertical, 7)
            .background(Capsule().fill(HarvestPalette.gold.opacity(0.14)))
            .overlay(Capsule().strokeBorder(HarvestPalette.gold.opacity(0.35), lineWidth: 1))
        }
        .buttonStyle(.plain)
    }
}

/// Quiet, centered empty state.
struct EmptyStateView: View {
    let icon: String
    let title: String
    let message: String

    var body: some View {
        VStack(spacing: 14) {
            Image(systemName: icon)
                .font(.system(size: 40, weight: .light))
                .foregroundStyle(HarvestPalette.gold.opacity(0.7))
            Text(title)
                .font(HarvestType.display(21))
                .foregroundStyle(HarvestPalette.linen)
            Text(message)
                .font(.system(size: 14))
                .foregroundStyle(HarvestPalette.linenDim)
                .multilineTextAlignment(.center)
                .lineSpacing(3)
        }
        .padding(.horizontal, 40)
        .padding(.vertical, 48)
        .frame(maxWidth: .infinity)
    }
}

/// Ring that fills with gold as a plan is walked out.
struct ProgressRing: View {
    let progress: Double
    var size: CGFloat = 46
    var lineWidth: CGFloat = 4

    var body: some View {
        ZStack {
            Circle()
                .stroke(HarvestPalette.olive.opacity(0.5), lineWidth: lineWidth)
            Circle()
                .trim(from: 0, to: max(0.001, progress))
                .stroke(
                    HarvestPalette.goldGradient,
                    style: StrokeStyle(lineWidth: lineWidth, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
            Text("\(Int(round(progress * 100)))%")
                .font(.system(size: size * 0.26, weight: .bold, design: .rounded))
                .foregroundStyle(HarvestPalette.linen)
        }
        .frame(width: size, height: size)
        .animation(.spring(duration: 0.5), value: progress)
    }
}

/// Flowing wrap layout for chips.
struct WrapLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        arrange(proposal: proposal, subviews: subviews).size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(proposal: proposal, subviews: subviews)
        for (index, position) in result.positions.enumerated() {
            subviews[index].place(
                at: CGPoint(x: bounds.minX + position.x, y: bounds.minY + position.y),
                proposal: .unspecified
            )
        }
    }

    private func arrange(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, positions: [CGPoint]) {
        let maxWidth = proposal.width ?? .infinity
        var positions: [CGPoint] = []
        var x: CGFloat = 0, y: CGFloat = 0, rowHeight: CGFloat = 0, totalWidth: CGFloat = 0

        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x > 0, x + size.width > maxWidth {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            positions.append(CGPoint(x: x, y: y))
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
            totalWidth = max(totalWidth, x - spacing)
        }
        return (CGSize(width: totalWidth, height: y + rowHeight), positions)
    }
}
