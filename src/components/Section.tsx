import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Section background variant. */
  tone?: 'default' | 'elevated' | 'dark';
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
        : '';
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-14 sm:py-20 ${toneClass} ${className}`.trim()}
    >
      <div className="container-narrow">{children}</div>
    </section>
  );
}
