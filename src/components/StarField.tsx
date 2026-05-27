type Props = {
  className?: string;
  /** Number of stars to scatter. */
  count?: number;
  /** 0–1 opacity for the field as a whole. */
  opacity?: number;
};

/**
 * The flag's canton — a scatter of small white stars over deep navy.
 * Used as an accent background in the hero. Deterministic layout (seeded
 * positions) so server/client render matches and the same field is reused.
 */
export default function StarField({ className, count = 36, opacity = 0.7 }: Props) {
  // Deterministic pseudo-random scatter — no Math.random() inside render.
  const stars = Array.from({ length: count }).map((_, i) => {
    const x = ((i * 73) % 97) + (i % 7);
    const y = ((i * 41) % 89) + (i % 5);
    const r = 0.55 + ((i * 13) % 4) * 0.18;
    const o = 0.55 + ((i * 23) % 5) * 0.09;
    return { x, y, r, o };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="canton-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f234d" stopOpacity="1" />
          <stop offset="100%" stopColor="#1d3a8a" stopOpacity="0.2" />
        </linearGradient>
        <symbol id="star5" viewBox="-12 -12 24 24">
          <path
            d="M0 -10 L2.9 -3.1 L10 -3.1 L4.3 1.1 L6.5 8.5 L0 4.2 L-6.5 8.5 L-4.3 1.1 L-10 -3.1 L-2.9 -3.1 Z"
            fill="#ffffff"
          />
        </symbol>
      </defs>
      <rect width="100" height="100" fill="url(#canton-grad)" />
      {stars.map((s, i) => (
        <use
          key={i}
          href="#star5"
          x={s.x}
          y={s.y}
          width={s.r}
          height={s.r}
          opacity={s.o}
        />
      ))}
    </svg>
  );
}
