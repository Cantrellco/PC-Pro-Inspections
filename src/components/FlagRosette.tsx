type Props = {
  className?: string;
};

/**
 * A patriotic rosette / cockade — concentric navy, white, and red pleated
 * rings with a star center and two ribbon tails. Used as a medallion accent
 * (e.g. overlapping the inspector portrait on About). Decorative (aria-hidden).
 */
export default function FlagRosette({ className }: Props) {
  const cx = 50;
  const cy = 46;
  const pleats = 24;

  const ring = (r: number, fill: string, rot: number) =>
    Array.from({ length: pleats }).map((_, i) => {
      const a0 = (i / pleats) * Math.PI * 2 + rot;
      const a1 = ((i + 0.5) / pleats) * Math.PI * 2 + rot;
      const a2 = ((i + 1) / pleats) * Math.PI * 2 + rot;
      const inner = r * 0.74;
      const x0 = cx + Math.cos(a0) * inner;
      const y0 = cy + Math.sin(a0) * inner;
      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * inner;
      const y2 = cy + Math.sin(a2) * inner;
      return (
        <path
          key={`${fill}-${i}`}
          d={`M ${x0} ${y0} L ${x1} ${y1} L ${x2} ${y2} Z`}
          fill={fill}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.3"
        />
      );
    });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Ribbon tails */}
      <path d="M42 60 L34 96 L48 84 L50 64 Z" fill="#a51d2d" />
      <path d="M58 60 L66 96 L52 84 L50 64 Z" fill="#0f234d" />
      {/* Pleated rings */}
      {ring(34, '#1d3a8a', 0)}
      {ring(26, '#f5f5f4', 0.13)}
      {ring(18, '#d4263a', 0.26)}
      {/* Center button with star */}
      <circle cx={cx} cy={cy} r="9" fill="#0f234d" stroke="#e9c46a" strokeWidth="1.2" />
      <path
        transform={`translate(${cx}, ${cy}) scale(0.9)`}
        d="M0 -6 L1.8 -1.9 L6.1 -1.9 L2.6 0.7 L4 4.9 L0 2.4 L-4 4.9 L-2.6 0.7 L-6.1 -1.9 L-1.8 -1.9 Z"
        fill="#e9c46a"
      />
    </svg>
  );
}
