type IconProps = { className?: string };

const base = (className?: string) => `pointer-events-none ${className ?? ''}`.trim();

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={base(className)}>
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={base(className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 5.5c0-.55.45-1 1-1h2.2c.46 0 .86.31.97.76l.8 3.2a1 1 0 0 1-.28.96l-1.3 1.3a13 13 0 0 0 5.34 5.34l1.3-1.3a1 1 0 0 1 .96-.28l3.2.8c.45.11.76.51.76.97V19.5c0 .55-.45 1-1 1H18C10.54 20.5 4.5 14.46 4.5 7V5.5Z"
      />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={base(className)}>
      <path strokeLinecap="round" d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={base(className)}>
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={base(className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13m-5-6 6 6-6 6" />
    </svg>
  );
}

export function CornerReturnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={base(className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10 5 14l4 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 14h9a5 5 0 0 0 5-5V6" />
    </svg>
  );
}
