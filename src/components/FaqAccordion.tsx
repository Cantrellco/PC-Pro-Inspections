import { useState } from 'react';
import type { FaqItem } from '@/types';

type Props = {
  items: FaqItem[];
  /** Index open on first render (default: first item). */
  defaultOpen?: number;
};

/**
 * Accessible FAQ accordion with a smoothly animated open/close. Each panel
 * uses the grid-template-rows 0fr→1fr technique so height eases naturally
 * (native <details> can't transition height). Buttons carry aria-expanded /
 * aria-controls; panels are regions. Content stays in the DOM, so it remains
 * crawlable — the FAQPage JSON-LD is emitted separately from siteConfig.
 */
export default function FaqAccordion({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  // The ARIA APG marks the panel `region` role optional and warns against it
  // past ~6 panels (landmark-rotor flooding). Keep it only for short lists.
  const useRegion = items.length <= 6;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-button-${i}`;
        return (
          <div key={f.question}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white"
              >
                <span className="font-display text-lg font-medium text-white">
                  {f.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'border-flag-redSoft/50 bg-flag-red/15 text-flag-redSoft'
                      : 'border-white/15 text-brass-soft group-hover:border-brass/50'
                  }`}
                >
                  <span className="absolute h-[1.5px] w-3 rounded bg-current" />
                  <span
                    className={`absolute h-3 w-[1.5px] rounded bg-current transition-transform duration-300 ${
                      isOpen ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role={useRegion ? 'region' : undefined}
              aria-labelledby={useRegion ? btnId : undefined}
              aria-hidden={!isOpen}
              className={`grid transition-all duration-300 ease-smooth ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-6 -mt-1 max-w-2xl leading-relaxed text-bone-muted">
                  {f.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
