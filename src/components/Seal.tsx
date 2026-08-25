import { useId, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Ink of the stamp. */
  ink?: 'red' | 'navy' | 'brass' | 'ink';
  /** Star count printed along the top of the ring (reviews). */
  stars?: number;
  className?: string;
};

const INK = { red: '#c8102e', navy: '#0a3161', brass: '#b8952a', ink: '#111111' };

/**
 * A rubber-stamped seal: one ink, a scalloped ring with a roughened edge
 * (SVG turbulence displacement), the keyblock ring printed a hair off the
 * colour, and whatever is set in the middle. Every seal is rotated a degree
 * or two like a stamp pressed by hand.
 */
export default function Seal({ children, ink = 'red', stars, className = '' }: Props) {
  const color = INK[ink];
  const id = useId().replace(/:/g, '');
  const scallops = 28;
  const pts: string[] = [];
  for (let i = 0; i < scallops * 2; i++) {
    const a = (Math.PI * 2 * i) / (scallops * 2) - Math.PI / 2;
    const r = i % 2 === 0 ? 100 : 93;
    pts.push(`${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`);
  }
  const poly = pts.join(' ');
  // deterministic small tilt per seal so a row never lines up too neatly
  const tilt = ((id.charCodeAt(0) + id.length) % 5) - 2;

  return (
    <div className={`relative aspect-square ${className}`.trim()} style={{ transform: `rotate(${tilt}deg)` }}>
      <svg viewBox="-6 -6 212 212" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <filter id={`stamp-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={`grain-${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="9" result="g" />
            <feColorMatrix in="g" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" result="m" />
            <feComposite in="SourceGraphic" in2="m" operator="out" />
          </filter>
        </defs>
        <g filter={`url(#stamp-${id})`}>
          {/* colour ring, printed first and a hair off */}
          <g transform="translate(2.5 2.5)" opacity="0.95">
            <polygon points={poly} fill="none" stroke={color} strokeWidth="9" />
            <circle cx="100" cy="100" r="78" fill="none" stroke={color} strokeWidth="3" />
          </g>
          {/* keyblock ring */}
          <g filter={`url(#grain-${id})`}>
            <polygon points={poly} fill="none" stroke="#111111" strokeWidth="4" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="#111111" strokeWidth="3" />
          </g>
          {typeof stars === 'number' &&
            Array.from({ length: 5 }).map((_, i) => {
              const a = -Math.PI / 2 + ((i - 2) * Math.PI) / 9;
              const x = 100 + 89 * Math.cos(a);
              const y = 100 + 89 * Math.sin(a);
              return (
                <path
                  key={i}
                  d="M0,-6 L1.8,-1.8 L6,-1.8 L2.6,1 L3.8,5.4 L0,2.8 L-3.8,5.4 L-2.6,1 L-6,-1.8 L-1.8,-1.8 Z"
                  transform={`translate(${x} ${y}) scale(1.2)`}
                  fill={i < stars ? color : 'none'}
                  stroke="#111111"
                  strokeWidth="1.2"
                />
              );
            })}
        </g>
      </svg>
      <div className="absolute inset-[19%] flex items-center justify-center text-center">{children}</div>
    </div>
  );
}
