import { siteConfig } from '@/config/siteConfig';

/** Condense a full certification name into a short, scannable badge label. */
function shortLabel(name: string): string {
  return name
    .replace('Thermal Imaging Certified', 'Thermal Imaging')
    .replace('Mold Assessment Certified', 'Mold Certified')
    .replace('Termite / WDO Certified', 'Termite / WDO')
    .replace('Pool & Spa Inspection Certified', 'Pool & Spa')
    .replace('Manufactured & Mobile Home Certified', 'Mfd. & Mobile Homes');
}

type Props = {
  className?: string;
};

/**
 * Refined "accredited by" credential row. Renders each certification's badge
 * glyph beside a short label, separated by antique-brass hairlines, with a
 * subtle hover lift. Falls back gracefully — items without a badgeSrc are
 * skipped, and the strip hides entirely when there are no badges to show.
 */
export default function CertStrip({ className = '' }: Props) {
  const items = siteConfig.certifications.filter((cert) => cert.badgeSrc);
  if (items.length === 0) return null;

  return (
    <div className={`border-y border-white/10 bg-white/[0.015] ${className}`.trim()}>
      <div className="container-wide above-grain py-7">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-bone-dim">
          Specialty certifications
        </p>
        <div className="hairline mx-auto mt-4 mb-6 max-w-[10rem]" aria-hidden="true" />
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5 sm:gap-x-5">
          {items.map((cert, i) => (
            <li key={cert.name} className="flex items-center">
              <div className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-white/[0.03]">
                <img
                  src={cert.badgeSrc}
                  alt={cert.badgeAlt}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-11 w-11 flex-shrink-0 object-contain transition-transform duration-300 ease-smooth group-hover:scale-105 sm:h-12 sm:w-12"
                />
                <span className="text-sm font-medium leading-tight text-bone-muted transition-colors duration-300 group-hover:text-white">
                  {shortLabel(cert.name)}
                </span>
              </div>
              {i < items.length - 1 && (
                <span
                  className="ml-3 hidden h-8 w-px bg-gradient-to-b from-transparent via-brass-deep/40 to-transparent sm:ml-5 sm:inline-block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
