import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Section background variant. */
  tone?: 'default' | 'elevated' | 'dark' | 'americana';
  className?: string;
  id?: string;
  ariaLabel?: string;
};

export default function Section({
  children,
  tone = 'default',
  className = '',
  id,
  ariaLabel,
}: Props) {
  const toneClass =
    tone === 'elevated'
      ? 'bg-ink-100/60'
      : tone === 'dark'
        ? 'bg-ink-200'
        : tone === 'americana'
          ? 'bg-flag-navyDeep/25 relative overflow-hidden'
          : '';
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-14 sm:py-20 ${toneClass} ${className}`.trim()}
    >
      {tone === 'americana' && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 pointer-events-none star-field"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] stripe opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] stripe opacity-80"
          />
        </>
      )}
      <div className="container-narrow relative">{children}</div>
    </section>
  );
}
