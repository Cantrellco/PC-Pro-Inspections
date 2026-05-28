import { siteConfig } from '@/config/siteConfig';

/**
 * Stylized, on-brand locator panel for the service region. Not a live map —
 * an illustrated composition with the hub marked and nearby towns as nodes,
 * connected by dashed "routes." The authoritative town list is rendered as
 * crawlable text elsewhere on the Service Areas page.
 */

// Hand-placed nodes (decorative, not geographic). Hub first.
const NODES: { x: number; y: number; label: string; hub?: boolean }[] = [
  { x: 50, y: 50, label: 'Marion', hub: true },
  { x: 33, y: 44, label: 'Carbondale' },
  { x: 42, y: 62, label: 'Herrin' },
  { x: 60, y: 40, label: 'Mount Vernon' },
  { x: 70, y: 60, label: 'Harrisburg' },
  { x: 28, y: 66, label: 'Murphysboro' },
  { x: 64, y: 72, label: 'Vienna' },
  { x: 40, y: 30, label: 'Du Quoin' },
];

export default function ServiceAreaMap() {
  const hub = NODES[0];
  return (
    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-flag-navyDeep/40">
      <div aria-hidden="true" className="absolute inset-0 photo-placeholder opacity-70" />
      <svg
        viewBox="0 0 100 100"
        className="relative w-full h-full"
        role="img"
        aria-label={`Service-area locator for ${siteConfig.serviceAreaSummary}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Region blob */}
        <path
          d="M18 40 Q22 24 42 22 Q66 18 78 30 Q90 42 82 60 Q76 78 56 82 Q32 88 22 70 Q12 56 18 40 Z"
          fill="rgba(10,49,97,0.35)"
          stroke="rgba(201,162,39,0.35)"
          strokeWidth="0.6"
        />
        {/* Routes from hub */}
        {NODES.slice(1).map((n) => (
          <line
            key={`r-${n.label}`}
            x1={hub.x}
            y1={hub.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(201,162,39,0.4)"
            strokeWidth="0.4"
            strokeDasharray="1.4 1.4"
          />
        ))}
        {/* Town nodes */}
        {NODES.map((n) => (
          <g key={n.label}>
            {n.hub ? (
              <>
                <circle cx={n.x} cy={n.y} r="3.4" fill="#c8102e" />
                <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="#ef4a63" strokeWidth="0.5" opacity="0.6" />
              </>
            ) : (
              <circle cx={n.x} cy={n.y} r="1.7" fill="#f5f3ee" />
            )}
            <text
              x={n.x}
              y={n.y - (n.hub ? 5 : 3)}
              textAnchor="middle"
              fontSize={n.hub ? 3.6 : 2.8}
              fontWeight={n.hub ? 600 : 400}
              fill={n.hub ? '#ffffff' : '#c7c4bd'}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
