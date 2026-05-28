type Props = {
  className?: string;
  /** 'meet' (whole flag visible, default) or 'cover' (fills container, cropped). */
  fit?: 'meet' | 'cover';
};

let uid = 0;

/**
 * Stylized US flag rendered as a single inline SVG — crisp rectangles + stars,
 * no filters or animation (those proved fragile/blank on mobile Safari).
 *
 * Used as a hero/CTA backdrop (fit="cover" with low opacity), as a small badge
 * on the brand mark, etc. Decorative only — consumers pass aria-hidden on the
 * wrapping element.
 */
export default function Flag({ className, fit = 'meet' }: Props) {
  // Unique gradient id so multiple flags on one page don't collide.
  const id = `flag-${(uid += 1)}`;

  const W = 190;
  const H = 100;
  const stripeH = H / 13;
  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;

  // Star scatter inside the canton — 6 rows × 5 cols reads as "many stars".
  const rows = 6;
  const cols = 5;
  const starSize = 4.2;
  const stars: { x: number; y: number }[] = [];
  const padX = cantonW / (cols + 1);
  const padY = cantonH / (rows + 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      stars.push({
        x: padX * (c + 1) + (r % 2 === 0 ? 0 : -padX / 4),
        y: padY * (r + 1),
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-canton`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3a8a" />
          <stop offset="100%" stopColor="#0f234d" />
        </linearGradient>
        <symbol id={`${id}-star`} viewBox="-10 -10 20 20">
          <path d="M0 -8.5 L2.5 -2.6 L8.6 -2.6 L3.7 1.0 L5.6 7.0 L0 3.4 L-5.6 7.0 L-3.7 1.0 L-8.6 -2.6 L-2.5 -2.6 Z" fill="#ffffff" />
        </symbol>
      </defs>

      {/* 13 alternating stripes — index 0 (top) is red */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          x="0"
          y={i * stripeH}
          width={W}
          height={stripeH + 0.5}
          fill={i % 2 === 0 ? '#d4263a' : '#f5f5f4'}
        />
      ))}

      {/* Canton over the top 7 stripes */}
      <rect x="0" y="0" width={cantonW} height={cantonH} fill={`url(#${id}-canton)`} />

      {/* Stars */}
      {stars.map((s, i) => (
        <use
          key={i}
          href={`#${id}-star`}
          x={s.x - starSize / 2}
          y={s.y - starSize / 2}
          width={starSize}
          height={starSize}
        />
      ))}
    </svg>
  );
}
