import { siteConfig } from '@/config/siteConfig';

type Props = {
  className?: string;
};

/**
 * Real, framed map of the service region — a keyless map embed (configured in
 * siteConfig.mapEmbedSrc), dimmed slightly and ringed to sit on the dark theme,
 * with a "Based in …" locator chip. Falls back to a refined panel if unset.
 */
export default function ServiceAreaMap({ className = '' }: Props) {
  const { mapEmbedSrc, address, serviceAreaSummary } = siteConfig;

  return (
    <div
      className={`relative h-full min-h-[19rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-200 shadow-card ${className}`}
    >
      {mapEmbedSrc ? (
        <iframe
          src={mapEmbedSrc}
          title={`Service area map — ${serviceAreaSummary}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0, filter: 'brightness(0.92) contrast(1.02) saturate(0.92)' }}
        />
      ) : (
        <div className="photo-placeholder absolute inset-0 flex items-center justify-center text-bone-dim text-sm">
          Service-area map
        </div>
      )}

      {/* Edge ring + locator chip to blend the map into the dark theme. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/85 px-3.5 py-1.5 text-xs font-semibold text-bone backdrop-blur">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flag-red" />
        Based in {address.city}, {address.region}
      </div>
    </div>
  );
}
