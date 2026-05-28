type Props = {
  className?: string;
  title?: string;
};

/**
 * PC Pro Inspections brand seal — a heritage shield reading as both a house
 * (roofline chevron) and a badge, in navy with a brass hairline and a crowning
 * star. Crisp at favicon size up to hero size.
 */
export default function Brandmark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title ?? 'PC Pro Inspections'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bm-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e3a73" />
          <stop offset="100%" stopColor="#061a33" />
        </linearGradient>
      </defs>
      {/* Shield / house body */}
      <path
        d="M24 2.5 L42 8 V24 C42 35 33.5 42.5 24 45.5 C14.5 42.5 6 35 6 24 V8 Z"
        fill="url(#bm-shield)"
        stroke="#c9a227"
        strokeWidth="1.4"
      />
      {/* Inner hairline */}
      <path
        d="M24 6 L38.5 10.4 V24 C38.5 33 31.6 39.4 24 42.1 C16.4 39.4 9.5 33 9.5 24 V10.4 Z"
        fill="none"
        stroke="rgba(201,162,39,0.35)"
        strokeWidth="0.8"
      />
      {/* Roof chevron (house) */}
      <path
        d="M14 27 L24 18 L34 27"
        fill="none"
        stroke="#f5f3ee"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <path d="M21.5 33 V27.5 H26.5 V33" fill="none" stroke="#ef4a63" strokeWidth="2" strokeLinecap="round" />
      {/* Crowning star */}
      <path
        d="M24 9.2 L25.1 12 L28 12 L25.7 13.8 L26.6 16.6 L24 14.9 L21.4 16.6 L22.3 13.8 L20 12 L22.9 12 Z"
        fill="#e0c469"
      />
    </svg>
  );
}
