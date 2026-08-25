import { Link } from 'react-router-dom';
import { ADD_ONS, PRICING_NOTE, SQFT_TIERS } from '@/config/pricing';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Range label like "1,001 – 2,000" → "2,000" for the compact ledger. */
function topOf(label: string) {
  const parts = label.replace(/sqft/i, '').split('–');
  return (parts[1] ?? parts[0]).trim();
}

type Props = {
  /** Show the full band labels ("1,001 – 2,000 sqft") instead of the compact top figure. */
  full?: boolean;
  className?: string;
};

/**
 * The prices, posted. A brass band ruled top and bottom, one column per
 * square-footage band, straight from the price sheet in config/pricing.ts.
 */
export default function PriceLedger({ full = false, className = '' }: Props) {
  return (
    <div className={`block-brass border-y-3 border-ink ${className}`.trim()}>
      <div className="container-wide">
        <div className="flex flex-col gap-x-6 py-4 lg:flex-row lg:items-stretch">
          <h2 className="display-3 shrink-0 self-center whitespace-nowrap py-2 lg:pr-6 lg:border-r-3 lg:border-ink">
            Prices posted
          </h2>
          <ul className="grid flex-1 grid-cols-3 gap-y-3 sm:grid-cols-4 md:grid-cols-7">
            {SQFT_TIERS.map((t, i) => (
              <li
                key={t.label}
                className={`flex flex-col items-center justify-center px-2 py-2 text-center ${
                  i > 0 ? 'md:border-l-2 md:border-ink/40' : ''
                }`}
              >
                <span className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink">
                  {full ? t.label.replace('sqft', 'sq ft') : `${i === 0 ? 'to ' : ''}${topOf(t.label)} sq ft`}
                </span>
                <span className="num font-display text-2xl leading-none text-ink sm:text-3xl">{money(t.price)}</span>
              </li>
            ))}
            {ADD_ONS.map((a) => (
              <li
                key={a.id}
                className="flex flex-col items-center justify-center px-2 py-2 text-center md:border-l-2 md:border-ink/40"
              >
                <span className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink">
                  {a.label.replace(' Inspection', '')}
                </span>
                <span className="num font-display text-2xl leading-none text-red sm:text-3xl">+{money(a.price)}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="border-t-2 border-ink/40 py-2 text-center font-condensed text-sm font-semibold uppercase tracking-wide text-ink/80">
          {PRICING_NOTE} Commercial buildings priced per square foot.{' '}
          <Link to="/services" className="underline decoration-2 underline-offset-4 hover:text-red">
            Full price sheet
          </Link>
        </p>
      </div>
    </div>
  );
}
