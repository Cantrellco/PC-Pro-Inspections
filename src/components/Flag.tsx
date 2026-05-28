type Props = {
  className?: string;
  /** Width / height ratio is fixed (19:10) to read as a flag, regardless of size. */
  /** Render the wavy "flying" version (subtle SVG distortion). */
  wave?: boolean;
};

/**
 * Stylized US flag rendered as a single inline SVG.
 *
 * Used as a hero backdrop (with low opacity), as a small badge on page
 * headers, and beside the brand mark. Decorative only — every consumer
 * passes its own aria-hidden=true on the wrapping element.
 */
export default function Flag({ className, wave = false }: Props) {
  // Canton: 40% width × 53.85% height (7/13 stripes tall, 0.76 of canton-height
  // wide — simplified here as 40% of total flag width which is visually close).
  const W = 190;
  const H = 100;
  const stripeH = H / 13;
  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;

  // Star scatter inside the canton — 6 rows × 5 cols suggests "many stars".
  const rows = 6;
  const cols = 5;
  const starSize = 4.2;
  const stars: { x: number; y: number }[] = [];
  const padX = cantonW / (cols + 1);
  const padY = cantonH / (rows + 1);
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : padX / 2;
    for (let c = 0; c < cols; c++) {
      stars.push({
        x: padX * (c + 1) + offset - (r % 2 === 0 ? 0 : padX / 4),
        y: padY * (r + 1),
      });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canton-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3a8a" />
          <stop offset="100%" stopColor="#0f234d" />
        </linearGradient>
        {wave && (
          <filter id="flag-wave">
            <feTurbulence baseFrequency="0.012 0.04" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        )}
        <symbol id="white-star" viewBox="-10 -10 20 20">
          <path d="M0 -8.5 L2.5 -2.6 L8.6 -2.6 L3.7 1.0 L5.6 7.0 L0 3.4 L-5.6 7.0 L-3.7 1.0 L-8.6 -2.6 L-2.5 -2.6 Z" fill="#ffffff" />
        </symbol>
      </defs>

      <g filter={wave ? 'url(#flag-wave)' : undefined}>
        {/* 13 alternating stripes — index 0 (top) is red */}
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={i}
            x="0"
            y={i * stripeH}
            width={W}
            height={stripeH}
            fill={i % 2 === 0 ? '#d4263a' : '#f5f5f4'}
          />
        ))}

        {/* Canton over the top 7 stripes */}
        <rect x="0" y="0" width={cantonW} height={cantonH} fill="url(#canton-fill)" />

        {/* Stars */}
        {stars.map((s, i) => (
          <use
            key={i}
            href="#white-star"
            x={s.x - starSize / 2}
            y={s.y - starSize / 2}
            width={starSize}
            height={starSize}
          />
        ))}
      </g>
    </svg>
  );
}
