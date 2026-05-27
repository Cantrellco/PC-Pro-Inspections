type Props = {
  className?: string;
};

/**
 * A repeating R/W/B stripe band with a centered star — used as a section
 * divider, footer cap, or under-nav band. Hides from screen readers.
 */
export default function StripeDivider({ className }: Props) {
  return (
    <div className={`relative ${className ?? ''}`.trim()} aria-hidden="true">
      <div className="stripe h-[3px] w-full opacity-90" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-flag-red"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="11" fill="#0a0a0a" />
          <path d="M12 4 L13.7 9.3 L19 9.3 L14.6 12.5 L16.4 17.8 L12 14.5 L7.6 17.8 L9.4 12.5 L5 9.3 L10.3 9.3 Z" />
        </svg>
      </div>
    </div>
  );
}
