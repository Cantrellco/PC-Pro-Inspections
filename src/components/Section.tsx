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
          ? 'relative overflow-hidden'
          : '';
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-16 sm:py-24 ${toneClass} ${className}`.trim()}
    >
      {tone === 'americana' && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(160deg, rgba(15,35,77,0.55) 0%, rgba(10,10,10,0.2) 55%, rgba(165,29,45,0.18) 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flag-red/60 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-flag-navyLight/60 to-transparent"
          />
        </>
      )}
      <div className="container-narrow relative">{children}</div>
    </section>
  );
}
