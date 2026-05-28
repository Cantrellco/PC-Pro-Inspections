type Props = {
  className?: string;
  /** Render the wavy "flying" version (SVG turbulence distortion). */
  wave?: boolean;
  /** Animate the wave (slow ripple). Caller should gate this on reduced-motion. */
  animate?: boolean;
  /** 'meet' (whole flag visible, default) or 'cover' (fills container, cropped). */
  fit?: 'meet' | 'cover';
};

let uid = 0;

/**
 * Stylized US flag rendered as a single inline SVG.
 *
 * Used as a hero backdrop (fit="cover" with low opacity), as a small badge on
 * page headers, and beside the brand mark. Decorative only — consumers pass
 * aria-hidden on the wrapping element.
 */
export default function Flag({ className, wave = false, animate = false, fit = 'meet' }: Props) {
  // Unique filter/gradient ids so multiple flags on one page don't collide.
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
      className={`${animate ? 'flag-animate ' : ''}${className ?? ''}`.trim()}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-canton`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d3a8a" />
          <stop offset="100%" stopColor="#0f234d" />
        </linearGradient>
        {/* Static ripple — rasterized once. Motion comes from a composited CSS
            transform (.flag-animate), which is smooth and won't "boil". */}
        {wave && (
          <filter id={`${id}-wave`}>
            <feTurbulence baseFrequency="0.009 0.032" numOctaves="2" seed="3" result="turb" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="3.2" />
          </filter>
        )}
        <symbol id={`${id}-star`} viewBox="-10 -10 20 20">
          <path d="M0 -8.5 L2.5 -2.6 L8.6 -2.6 L3.7 1.0 L5.6 7.0 L0 3.4 L-5.6 7.0 L-3.7 1.0 L-8.6 -2.6 L-2.5 -2.6 Z" fill="#ffffff" />
        </symbol>
      </defs>

      <g filter={wave ? `url(#${id}-wave)` : undefined}>
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
      </g>
    </svg>
  );
}
