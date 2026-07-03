import SwiftUI

/// The rounded arch of a renaissance doorway / cathedral window.
struct ArchShape: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        let radius = rect.width / 2
        let topOfSides = min(rect.minY + radius, rect.maxY)
        p.move(to: CGPoint(x: rect.minX, y: rect.maxY))
        p.addLine(to: CGPoint(x: rect.minX, y: topOfSides))
        p.addArc(
            center: CGPoint(x: rect.midX, y: topOfSides),
            radius: radius,
            startAngle: .degrees(180),
            endAngle: .degrees(0),
            clockwise: false
        )
        p.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        p.closeSubpath()
        return p
    }
}

/// Candlelit heavens: warm ink gradient, a golden dawn, soft rays, faint stars.
/// Fully procedural, so it is crisp at any size and costs no assets.
struct HeavenlyBackground: View {
    /// 0...1 — how strong the golden dawn glow is.
    var glow: Double = 1.0

    var body: some View {
        ZStack {
            LinearGradient(
                stops: [
                    .init(color: Color(hex: 0x201B22), location: 0),
                    .init(color: Color(hex: 0x171310), location: 0.45),
                    .init(color: Color(hex: 0x0E0C0B), location: 1)
                ],
                startPoint: .top, endPoint: .bottom
            )

            // Dawn glow
            RadialGradient(
                colors: [
                    HarvestPalette.goldBright.opacity(0.28 * glow),
                    HarvestPalette.gold.opacity(0.10 * glow),
                    .clear
                ],
                center: UnitPoint(x: 0.5, y: 0.12),
                startRadius: 10,
                endRadius: 480
            )

            // Light rays + star specks, drawn once
            Canvas { context, size in
                let origin = CGPoint(x: size.width * 0.5, y: size.height * 0.10)

                for i in 0..<9 {
                    let angle = Angle.degrees(206 + Double(i) * 16).radians
                    let length = size.height * 0.55
                    let end = CGPoint(
                        x: origin.x + CGFloat(cos(angle)) * length,
                        y: origin.y - CGFloat(sin(angle)) * length
                    )
                    var ray = Path()
                    ray.move(to: origin)
                    ray.addLine(to: end)
                    context.stroke(
                        ray,
                        with: .linearGradient(
                            Gradient(colors: [
                                HarvestPalette.goldBright.opacity(0.10 * glow),
                                .clear
                            ]),
                            startPoint: origin,
                            endPoint: end
                        ),
                        lineWidth: 14
                    )
                }

                // Deterministic star field
                var seed: UInt64 = 0x9E3779B97F4A7C15
                func nextUnit() -> CGFloat {
                    seed = seed &* 6364136223846793005 &+ 1442695040888963407
                    return CGFloat((seed >> 33) % 10_000) / 10_000
                }
                for _ in 0..<70 {
                    let x = nextUnit() * size.width
                    let y = nextUnit() * size.height * 0.6
                    let r = 0.4 + nextUnit() * 1.1
                    let alpha = 0.05 + nextUnit() * 0.22
                    context.fill(
                        Path(ellipseIn: CGRect(x: x, y: y, width: r, height: r)),
                        with: .color(HarvestPalette.linen.opacity(alpha))
                    )
                }
            }
            .allowsHitTesting(false)
        }
        .ignoresSafeArea()
    }
}

/// Aged paper for the notes & checklist experiences — light, warm, quiet.
struct ParchmentBackground: View {
    var body: some View {
        ZStack {
            LinearGradient(
                colors: [HarvestPalette.parchment, HarvestPalette.parchmentDeep],
                startPoint: .top, endPoint: .bottom
            )
            RadialGradient(
                colors: [Color.white.opacity(0.35), .clear],
                center: UnitPoint(x: 0.5, y: 0.05),
                startRadius: 20, endRadius: 420
            )
            // Faint fibers
            Canvas { context, size in
                var seed: UInt64 = 0xDEADBEEFCAFEBABE
                func nextUnit() -> CGFloat {
                    seed = seed &* 6364136223846793005 &+ 1442695040888963407
                    return CGFloat((seed >> 33) % 10_000) / 10_000
                }
                for _ in 0..<140 {
                    let x = nextUnit() * size.width
                    let y = nextUnit() * size.height
                    let w = 6 + nextUnit() * 26
                    var line = Path()
                    line.move(to: CGPoint(x: x, y: y))
                    line.addLine(to: CGPoint(x: x + w, y: y + (nextUnit() - 0.5) * 3))
                    context.stroke(
                        line,
                        with: .color(HarvestPalette.quillOnParchment.opacity(0.04 + nextUnit() * 0.04)),
                        lineWidth: 0.7
                    )
                }
            }
            .allowsHitTesting(false)
        }
        .ignoresSafeArea()
    }
}
