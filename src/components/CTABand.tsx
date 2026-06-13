import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Action buttons / links. */
  children: ReactNode;
};

/**
 * Signature closing call-to-action band. A dark heritage panel with drifting
 * aurora light-leaks, a tri-color top rule, and an oversized serif headline —
 * the recurring "ready to move?" moment at the foot of interior pages.
 */
export default function CTABand({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative">
      <div className="container-wide">
        <Reveal>
          <div className="aurora relative overflow-hidden rounded-3xl border border-white/10 bg-ink-300/80 px-6 py-16 text-center shadow-deep sm:px-12 sm:py-20">
            <div aria-hidden="true" className="rule-flag absolute inset-x-0 top-0 h-px opacity-80" />
            <div
              aria-hidden="true"
              className="blueprint-grid absolute inset-0 opacity-40 pointer-events-none"
            />
            <div className="relative mx-auto max-w-2xl">
              {eyebrow && <p className="eyebrow mb-4 justify-center">{eyebrow}</p>}
              <h2 className="display-2 text-white">{title}</h2>
              {description && <p className="lede mt-5">{description}</p>}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {children}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
