type Variant = 'full' | 'mark';

type Props = {
  /** `full` = glyph + wordmark, `mark` = glyph only. */
  variant?: Variant;
  className?: string;
  /** Accessible label for the mark. */
  title?: string;
};

/**
 * PC Pro Inspections brand identity.
 *
 * The glyph is a heritage seal: a brass-rimmed shield whose interior reads two
 * ways at once — a "PC" monogram and a house. The vertical stem + bowl of the
 * "P" doubles as the gable wall and roofline; the "C" sweeps around it as a
 * protective arc (the inspector's eye / a magnifier ring). A crowning star and
 * a crimson door anchor it in the site's heritage palette.
 *
 * `LogoMark` is exported separately so the favicon / OG card and any standalone
 * placement can reuse the exact same geometry.
 *
 * Sizing: set height via className on the wrapper (the SVG scales). The
 * wordmark uses the display font and currentColor, so it adapts to context.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title ?? 'PC Pro Inspections'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e3a73" />
          <stop offset="100%" stopColor="#061a33" />
        </linearGradient>
      </defs>

      {/* Shield / house body */}
      <path
        d="M24 2.5 L42 8 V24 C42 35 33.5 42.5 24 45.5 C14.5 42.5 6 35 6 24 V8 Z"
        fill="url(#logo-shield)"
        stroke="#c9a227"
        strokeWidth="1.4"
      />
      {/* Inner brass hairline — the engraved seal edge */}
      <path
        d="M24 6 L38.5 10.4 V24 C38.5 33 31.6 39.4 24 42.1 C16.4 39.4 9.5 33 9.5 24 V10.4 Z"
        fill="none"
        stroke="rgba(201,162,39,0.38)"
        strokeWidth="0.8"
      />

      {/* "C" arc — the protective sweep / inspector's lens, open toward the door */}
      <path
        d="M31.5 16.8 A9.4 9.4 0 1 0 31.5 33.2"
        fill="none"
        stroke="#c9a227"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* "P" monogram = gable wall + roofline + bowl */}
      {/* Stem (gable wall) */}
      <path d="M21 16.5 V34" fill="none" stroke="#f5f3ee" strokeWidth="2.6" strokeLinecap="round" />
      {/* Bowl of the P (also reads as the roof eave returning) */}
      <path
        d="M21 16.5 H26.4 A4.3 4.3 0 0 1 26.4 25.1 H21"
        fill="none"
        stroke="#f5f3ee"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Roof ridge cresting over the monogram */}
      <path
        d="M16.5 16.5 L24 10.5 L31.5 16.5"
        fill="none"
        stroke="#e0c469"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Crimson door at the threshold */}
      <path d="M19.6 34 V30.4 H22.4 V34" fill="none" stroke="#c8102e" strokeWidth="1.8" strokeLinecap="round" />

      {/* Crowning star */}
      <path
        d="M24 4.6 L24.85 6.9 L27.3 6.9 L25.3 8.4 L26.05 10.7 L24 9.3 L21.95 10.7 L22.7 8.4 L20.7 6.9 L23.15 6.9 Z"
        fill="#e0c469"
      />
    </svg>
  );
}

export default function Logo({ variant = 'full', className, title }: Props) {
  if (variant === 'mark') {
    return <LogoMark className={className} title={title} />;
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark className="h-full w-auto shrink-0" title={title} />
      <span className="font-display font-semibold leading-none tracking-tight">
        <span className="text-current">PC Pro</span>{' '}
        <span className="text-brass-soft">Inspections</span>
      </span>
    </span>
  );
}
