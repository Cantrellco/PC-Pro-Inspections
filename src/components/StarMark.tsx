type Props = {
  className?: string;
  title?: string;
};

/** Small inline star + house mark used as the brand logo. */
export default function StarMark({ className, title }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title ?? 'PC Pro Inspections star mark'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="starGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* House silhouette */}
      <path
        d="M32 6 L58 26 L52 26 L52 56 L12 56 L12 26 L6 26 Z"
        fill="#0f0f0f"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 5-point star inside */}
      <path
        d="M32 22 L34.9 30.4 L43.7 30.4 L36.5 35.7 L39.4 44.1 L32 39 L24.6 44.1 L27.5 35.7 L20.3 30.4 L29.1 30.4 Z"
        fill="url(#starGrad)"
      />
    </svg>
  );
}
