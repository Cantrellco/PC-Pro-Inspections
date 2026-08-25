import type { FaqItem } from '@/types';

type Props = {
  items: FaqItem[];
};

/**
 * Questions set as a ruled list; each opens like a folded sheet. Native
 * <details> so it works with no script and reads to assistive tech as-is.
 */
export default function FaqAccordion({ items }: Props) {
  return (
    <div className="border-t-3 border-ink">
      {items.map((f, i) => (
        <details key={f.question} className="group border-b-3 border-ink" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-xl uppercase leading-tight text-ink group-open:text-red sm:text-2xl">
              {f.question}
            </span>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-paper-white font-display text-xl text-ink transition-transform duration-300 ease-register group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[1.05rem] leading-relaxed text-ink-soft">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
