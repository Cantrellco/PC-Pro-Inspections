type Variant = 'full' | 'mark' | 'plaque';

type Props = {
  /**
   * `full`   = seal + wordmark (default; nav & footer)
   * `plaque` = seal only, on its light medallion (favicons, tight spaces)
   * `mark`   = raw transparent emblem (for light backgrounds only)
   */
  variant?: Variant;
  className?: string;
  /** Accessible label for the mark. */
  title?: string;
};

/**
 * PC Pro Inspections brand identity.
 *
 * The emblem is the real brand crest — a brass-rimmed house/shield over a bald
 * eagle with the "PC PRO" monogram. It was drawn on white and is ~70% dark
 * navy, so placed bare on the near-black bar most of it dissolves (verified by
 * decoding the alpha + luminance of the PNG). It needs a light backing to read.
 *
 * The crest is portrait (aspect ≈ 0.82), so a *square* chip leaves fat side
 * margins and looks like a sticker. The fix is a portrait medallion that hugs
 * the emblem: a warm bone plaque with a brass hairline and a soft drop shadow,
 * so it reads as an intentional enamel seal on the dark canvas.
 *
 * Sizing: set height + font-size via className on the root (`h-10 text-lg`).
 * The plaque tracks the height; the wordmark tracks the font-size.
 *
 * Source art: `src/assets/PC Pro Logo.png`. Web asset (transparent, tight-
 * cropped): `public/brand/logo-mark.png`.
 */
const MARK_SRC = '/brand/logo-mark.png';
const MARK_W = 419;
const MARK_H = 512;

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <img
      src={MARK_SRC}
      width={MARK_W}
      height={MARK_H}
      alt={title ?? 'PC Pro Inspections'}
      className={className}
      decoding="async"
    />
  );
}

/**
 * The crest on its warm bone medallion — hugs the portrait emblem so there are
 * no dead margins. Brass hairline + soft lift make it read as a seal, not a box.
 */
export function LogoSeal({ className, title }: { className?: string; title?: string }) {
  return (
    <span
      className={`inline-flex h-full items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#f3f0e8] p-1 shadow-[0_1px_2px_rgba(0,0,0,0.5),0_10px_24px_-10px_rgba(0,0,0,0.8),0_0_24px_-6px_rgba(201,162,39,0.45)] ring-1 ring-brass/60 ${className ?? ''}`}
    >
      <LogoMark className="h-full w-auto" title={title} />
    </span>
  );
}

export default function Logo({ variant = 'full', className, title }: Props) {
  if (variant === 'mark') {
    return <LogoMark className={className} title={title} />;
  }

  if (variant === 'plaque') {
    return <LogoSeal className={className} title={title} />;
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <LogoSeal title={title} />
      <span className="font-display font-semibold leading-[1.05] tracking-[-0.015em] whitespace-nowrap">
        <span className="text-current">PC Pro</span>{' '}
        <span className="text-brass-soft">Inspections</span>
      </span>
    </span>
  );
}
