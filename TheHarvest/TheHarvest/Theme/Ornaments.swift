import SwiftUI

/// line — ◆ — line divider, like a chapter break in an old book.
struct GoldDivider: View {
    var body: some View {
        HStack(spacing: 12) {
            rule
            Diamond()
                .fill(HarvestPalette.gold)
                .frame(width: 7, height: 7)
            rule
        }
        .frame(height: 8)
        .accessibilityHidden(true)
    }

    private var rule: some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [.clear, HarvestPalette.gold.opacity(0.55)],
                    startPoint: .leading, endPoint: .trailing
                )
            )
            .frame(height: 1)
    }
}

struct Diamond: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: rect.midX, y: rect.minY))
        p.addLine(to: CGPoint(x: rect.maxX, y: rect.midY))
        p.addLine(to: CGPoint(x: rect.midX, y: rect.maxY))
        p.addLine(to: CGPoint(x: rect.minX, y: rect.midY))
        p.closeSubpath()
        return p
    }
}

/// The wheat emblem — Jesus is the harvest; we are the laborers.
struct WheatMark: View {
    var size: CGFloat = 28
    var color: Color = HarvestPalette.gold

    var body: some View {
        Canvas { context, canvasSize in
            let w = canvasSize.width
            let h = canvasSize.height
            let cx = w / 2

            // Stem
            var stem = Path()
            stem.move(to: CGPoint(x: cx, y: h))
            stem.addQuadCurve(
                to: CGPoint(x: cx + w * 0.04, y: h * 0.16),
                control: CGPoint(x: cx - w * 0.10, y: h * 0.55)
            )
            context.stroke(stem, with: .color(color), lineWidth: max(1, size * 0.05))

            // Grains
            for i in 0..<4 {
                let t = 0.18 + Double(i) * 0.17
                let y = h * t
                let grainH = h * 0.16
                let grainW = w * 0.16
                for side: CGFloat in [-1, 1] {
                    let rect = CGRect(
                        x: cx + side * w * 0.05 - grainW / 2 + side * grainW * 0.55,
                        y: y,
                        width: grainW,
                        height: grainH
                    )
                    var grain = Path(ellipseIn: rect)
                    grain = grain.applying(
                        CGAffineTransform(translationX: -rect.midX, y: -rect.midY)
                            .concatenating(CGAffineTransform(rotationAngle: side * 0.5))
                            .concatenating(CGAffineTransform(translationX: rect.midX, y: rect.midY))
                    )
                    context.fill(grain, with: .color(color))
                }
            }
            // Crown grain
            let crown = CGRect(x: cx - w * 0.08, y: 0, width: w * 0.16, height: h * 0.17)
            context.fill(Path(ellipseIn: crown), with: .color(color))
        }
        .frame(width: size, height: size * 1.25)
        .accessibilityHidden(true)
    }
}

/// A small dove glyph rendered from SF Symbols with a halo, for the assistant.
struct SpiritGlyph: View {
    var size: CGFloat = 34

    var body: some View {
        ZStack {
            Circle()
                .fill(
                    RadialGradient(
                        colors: [HarvestPalette.goldBright.opacity(0.45), .clear],
                        center: .center, startRadius: 1, endRadius: size * 0.9
                    )
                )
                .frame(width: size * 1.8, height: size * 1.8)
            Image(systemName: "bird.fill")
                .font(.system(size: size * 0.72, weight: .light))
                .foregroundStyle(HarvestPalette.goldGradient)
        }
        .accessibilityHidden(true)
    }
}
