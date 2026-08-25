import { siteConfig } from '@/config/siteConfig';

/** Condense a full certification name into a short strip label. */
function shortLabel(name: string): string {
  return name
    .replace('Thermal Imaging Certified', 'Thermal imaging')
    .replace('Mold Assessment Certified', 'Mold assessment')
    .replace('Termite / WDO Certified', 'Termite / WDO')
    .replace('Pool & Spa Inspection Certified', 'Pool & spa')
    .replace('Manufactured & Mobile Home Certified', 'Manufactured homes');
}

type Props = {
  className?: string;
};

/**
 * The credential strip: a brass band ruled top and bottom, the headline
 * credential first, then each specialty in cut letters with star ornaments.
 */
export default function CertStrip({ className = '' }: Props) {
  const primary = siteConfig.primaryCertification;
  const items = siteConfig.certifications;
  if (!primary && items.length === 0) return null;

  return (
    <div className={`block-brass border-y-3 border-ink ${className}`.trim()}>
      <ul className="container-wide flex flex-wrap items-center justify-center gap-x-2 gap-y-2 py-3 text-center">
        {primary && (
          <li className="flex items-center gap-2.5 px-2">
            <img
              src={primary.badgeSrc}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 object-contain"
            />
            <span className="label text-[1rem]">{primary.shortLabel}</span>
          </li>
        )}
        {items.map((cert) => (
          <li key={cert.name} className="flex items-center gap-2 px-1">
            <Star />
            <span className="label">{shortLabel(cert.name)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 text-ink">
      <path d="M6 0l1.5 4.2H12L8.4 6.8l1.4 4.4L6 8.5 2.2 11.2l1.4-4.4L0 4.2h4.5z" fill="currentColor" />
    </svg>
  );
}
