type Props = {
  className?: string;
  /** Number of draped swags across the width. */
  swags?: number;
  /** Flip vertically so it drapes upward (for a bottom-of-section edge). */
  flip?: boolean;
};

/**
 * Patriotic bunting — a row of draped semicircular swags in red / white / navy
 * with a small gold star at each junction. Used as a section divider.
 * Decorative only (aria-hidden).
 */
export default function Bunting({ className, swags = 8, flip = false }: Props) {
  const W = 1200;
  const swagW = W / swags;
  const drop = swagW * 0.62; // how far each swag hangs
  const H = drop + 14;

  const colors = ['#d4263a', '#f5f5f4', '#1d3a8a'];

  const paths: { d: string; fill: string }[] = [];
  for (let i = 0; i < swags; i++) {
    const x0 = i * swagW;
    const x1 = x0 + swagW;
    const mid = x0 + swagW / 2;
    // Each swag = three nested arcs (red outer, white middle, navy inner) to
    // suggest folded fabric without heavy detail.
    colors.forEach((fill, layer) => {
      const inset = layer * (swagW * 0.16);
      const d = `M ${x0 + inset} 0
                 Q ${mid} ${drop - layer * (drop * 0.18)} ${x1 - inset} 0 Z`;
      paths.push({ d, fill });
    });
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      {/* Top rail */}
      <rect x="0" y="0" width={W} height="4" fill="#0f234d" />
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.fill} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
      ))}
      {/* Gold stars at each junction */}
      {Array.from({ length: swags + 1 }).map((_, i) => (
        <path
          key={`star-${i}`}
          transform={`translate(${i * swagW}, 6) scale(0.9)`}
          d="M0 -6 L1.8 -1.9 L6.1 -1.9 L2.6 0.7 L4 4.9 L0 2.4 L-4 4.9 L-2.6 0.7 L-6.1 -1.9 L-1.8 -1.9 Z"
          fill="#e9c46a"
        />
      ))}
    </svg>
  );
}
