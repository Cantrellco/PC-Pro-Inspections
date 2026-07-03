import SwiftUI

/// Typography — a serif display voice (New York) for the sacred,
/// the system grotesque for the interface, and a script accent for devotion.
enum HarvestType {
    /// Large display headings — "For the Word that gives Life."
    static func display(_ size: CGFloat, weight: Font.Weight = .semibold) -> Font {
        .system(size: size, weight: weight, design: .serif)
    }

    /// Scripture body — comfortable, book-like.
    static func scripture(_ size: CGFloat) -> Font {
        .system(size: size, weight: .regular, design: .serif)
    }

    /// Italic serif for quotes and verse attributions.
    static func quote(_ size: CGFloat) -> Font {
        .system(size: size, weight: .regular, design: .serif).italic()
    }

    /// Script accent — "Abide in me, and I in you."
    /// Snell Roundhand ships with iOS; swap for a licensed script by
    /// dropping a font in the project and changing this name.
    static func script(_ size: CGFloat) -> Font {
        .custom("Snell Roundhand", size: size)
    }

    /// Small caps-feeling label (tracking applied at the view).
    static func label(_ size: CGFloat = 12) -> Font {
        .system(size: size, weight: .semibold)
    }
}

extension View {
    /// Etched small-caps style label, e.g. section eyebrows.
    func eyebrow(color: Color = HarvestPalette.gold) -> some View {
        self
            .font(HarvestType.label(11))
            .textCase(.uppercase)
            .tracking(2.6)
            .foregroundStyle(color)
    }
}
