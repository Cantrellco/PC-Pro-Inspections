import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Background variant. */
  tone?: 'default' | 'elevated' | 'dark' | 'americana';
  className?: string;
  id?: string;
  ariaLabel?: string;
  /** Use the wider container. */
  wide?: boolean;
};

export default function Section({
  children,
  tone = 'default',
  className = '',
  id,
  ariaLabel,
  wide = false,
}: Props) {
  const toneClass =
    tone === 'elevated'
      ? 'bg-white/[0.018]'
      : tone === 'dark'
        ? 'bg-ink-300'
        : tone === 'americana'
          ? 'relative overflow-hidden'
          : '';
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative py-20 sm:py-28 ${toneClass} ${className}`.trim()}
    >
      {tone === 'americana' && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(155deg, rgba(10,49,97,0.5) 0%, rgba(10,10,11,0.25) 52%, rgba(156,15,38,0.16) 100%)',
            }}
          />
          <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
          <div aria-hidden="true" className="hairline absolute inset-x-0 bottom-0" />
        </>
      )}
      <div className={`${wide ? 'container-wide' : 'container-narrow'} relative above-grain`}>
        {children}
      </div>
    </section>
  );
}
