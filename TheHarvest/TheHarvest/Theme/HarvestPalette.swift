import SwiftUI

/// The Harvest palette — holy, timeless, warm, peaceful, divine.
/// Renaissance pigments on a candlelit near-black canvas.
enum HarvestPalette {
    // Canvas
    static let ink        = Color(hex: 0x12100F)   // warm near-black
    static let inkRaised  = Color(hex: 0x1C1917)   // elevated surfaces
    static let inkSoft    = Color(hex: 0x262019)   // cards on dark
    static let night      = Color(hex: 0x1C2230)   // deep navy accent

    // Pigments
    static let gold       = Color(hex: 0xC99943)   // antique gold
    static let goldBright = Color(hex: 0xE8C273)   // lit gold
    static let bronze     = Color(hex: 0x8A6642)
    static let olive      = Color(hex: 0x4A4A33)
    static let terracotta = Color(hex: 0xA45A3D)

    // Parchment (light surfaces for notes / checklists)
    static let parchment      = Color(hex: 0xF2EAD9)
    static let parchmentDeep  = Color(hex: 0xE7DCC4)
    static let inkOnParchment = Color(hex: 0x2B2419)
    static let quillOnParchment = Color(hex: 0x5C503B)

    // Text on dark
    static let linen     = Color(hex: 0xF0E9DC)    // primary text
    static let linenDim  = Color(hex: 0xBBB0A0)    // secondary text
    static let linenFaint = Color(hex: 0x877C6C)   // tertiary text

    static var goldGradient: LinearGradient {
        LinearGradient(
            colors: [goldBright, gold, bronze],
            startPoint: .topLeading, endPoint: .bottomTrailing
        )
    }

    static var hairline: LinearGradient {
        LinearGradient(
            colors: [gold.opacity(0.55), gold.opacity(0.12), gold.opacity(0.4)],
            startPoint: .topLeading, endPoint: .bottomTrailing
        )
    }
}

/// The verse highlighter inks — soft renaissance tones that keep text readable.
enum HighlightInk: String, CaseIterable, Identifiable {
    case sage, honey, gold, blush, rose, slate

    var id: String { rawValue }

    var color: Color {
        switch self {
        case .sage:  Color(hex: 0x8FA882)
        case .honey: Color(hex: 0xE3C36A)
        case .gold:  Color(hex: 0xC99943)
        case .blush: Color(hex: 0xD9A08F)
        case .rose:  Color(hex: 0xC4756E)
        case .slate: Color(hex: 0x7C8A9E)
        }
    }

    /// What the tone can mean — shown in the palette so highlights can carry meaning.
    var meaning: String {
        switch self {
        case .sage:  "Growth"
        case .honey: "Promise"
        case .gold:  "Jesus"
        case .blush: "Love"
        case .rose:  "Conviction"
        case .slate: "Wisdom"
        }
    }
}

extension Color {
    init(hex: UInt32) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255
        )
    }
}
