import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  title: ReactNode;
  description?: ReactNode;
  /** Action buttons / links. */
  children: ReactNode;
  /** Ink the band is printed in. */
  tone?: 'red' | 'navy';
  /** Legacy prop; ignored. */
  eyebrow?: string;
};

/**
 * The closing band: a solid colour field ruled top and bottom, cut-letter
 * headline in paper, and the actions. The recurring "call Paul" moment at
 * the foot of every page.
 */
export default function CTABand({ title, description, children, tone = 'red' }: Props) {
  return (
    <section className={`border-y-3 border-ink ${tone === 'red' ? 'bg-red' : 'bg-navy'} text-paper`}>
      <div className="container-wide py-16 sm:py-20">
        <Reveal className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display-2 text-paper" style={{ textShadow: '0.045em 0.045em 0 #111111' }}>
              {title}
            </h2>
            {description && <p className="mt-4 max-w-2xl text-lg font-medium text-paper/90">{description}</p>}
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
