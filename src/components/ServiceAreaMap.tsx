import { siteConfig } from '@/config/siteConfig';

type Props = {
  className?: string;
};

/**
 * Framed locator map of the service region.
 *
 * Renders a self-hosted static tile mosaic (CARTO dark basemap, no API key)
 * centered on `siteConfig.geo`, so it ALWAYS draws on the dark theme. We render
 * the tiles ourselves as <img> rather than embedding OpenStreetMap's
 * `export/embed.html` iframe, because that iframe reliably loads its controls
 * but fails to paint its tiles when framed cross-origin (it shows a black map).
 *
 * If the owner sets `siteConfig.mapEmbedSrc` (e.g. a Google "Embed a map" src,
 * which paints fine framed), that takes over instead.
 */
export default function ServiceAreaMap({ className = '' }: Props) {
  const { mapEmbedSrc, geo, address, serviceAreaSummary } = siteConfig;

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
      ) : geo ? (
        <TileMosaic lat={geo.latitude} lng={geo.longitude} zoom={9} label={serviceAreaSummary} />
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

/* ── Static slippy-map mosaic ──────────────────────────────────────────────
 * Web-Mercator tile math. We over-render a box around the center point and
 * center it in the container, so the map fills any responsive size and the
 * marker always sits dead-center. CARTO's `dark_all` basemap is key-free and
 * already matches the near-black canvas. Attribution is required and shown. */

const TILE = 256;
const SUBDOMAINS = ['a', 'b', 'c', 'd'];
/** Half-extent (px) we guarantee to cover around center, each axis. */
const HALF_W = 384;
const HALF_H = 256;

function lngToTileX(lng: number, z: number) {
  return ((lng + 180) / 360) * 2 ** z;
}
function latToTileY(lat: number, z: number) {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z;
}

function TileMosaic({
  lat,
  lng,
  zoom,
  label,
}: {
  lat: number;
  lng: number;
  zoom: number;
  label: string;
}) {
  const max = 2 ** zoom - 1;
  const cx = lngToTileX(lng, zoom) * TILE; // center, in global px
  const cy = latToTileY(lat, zoom) * TILE;

  const clamp = (n: number) => Math.max(0, Math.min(max, n));
  const txMin = clamp(Math.floor((cx - HALF_W) / TILE));
  const txMax = clamp(Math.floor((cx + HALF_W) / TILE));
  const tyMin = clamp(Math.floor((cy - HALF_H) / TILE));
  const tyMax = clamp(Math.floor((cy + HALF_H) / TILE));

  // The grid layer's top-left = tile (txMin, tyMin) top-left in global px.
  // Offset it so the center point (cx, cy) lands at the container center.
  // Individual tiles then sit at exact integer multiples of TILE → no seams.
  const offsetX = cx - txMin * TILE;
  const offsetY = cy - tyMin * TILE;

  const tiles = [];
  for (let ty = tyMin; ty <= tyMax; ty++) {
    for (let tx = txMin; tx <= txMax; tx++) {
      const s = SUBDOMAINS[(tx + ty) % SUBDOMAINS.length];
      tiles.push(
        <img
          key={`${tx}-${ty}`}
          src={`https://${s}.basemaps.cartocdn.com/dark_all/${zoom}/${tx}/${ty}@2x.png`}
          alt=""
          aria-hidden="true"
          width={TILE}
          height={TILE}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute max-w-none select-none"
          // Explicit width/height + max-width:none override Tailwind Preflight's
          // `img { max-width:100%; height:auto }`, which would otherwise collapse
          // these absolutely-positioned tiles (their layer is shrink-to-fit) to 0.
          style={{
            left: (tx - txMin) * TILE,
            top: (ty - tyMin) * TILE,
            width: TILE,
            height: TILE,
          }}
        />,
      );
    }
  }

  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;

  return (
    <>
      <div
        aria-hidden="true"
        role="img"
        aria-label={`Map centered on ${label}`}
        className="absolute inset-0"
        style={{ filter: 'brightness(1.06) saturate(1.08) contrast(1.02)' }}
      >
        <div
          className="absolute"
          style={{ left: `calc(50% - ${offsetX}px)`, top: `calc(50% - ${offsetY}px)` }}
        >
          {tiles}
        </div>
      </div>

      {/* Vignette: darkens the edges so any uncovered corner melts into the canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(8,8,8,0.55) 100%)',
        }}
      />

      {/* Center marker — pulsing crimson dot, anchored dead-center on the geo point. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="map-pulse absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flag-red/40" />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/85 bg-flag-red shadow-[0_2px_8px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Required attribution. */}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-3 text-[10px] leading-none text-bone-dim/70 hover:text-bone-muted"
      >
        © OpenStreetMap · CARTO
      </a>

      {/* Explore affordance — replaces the lost iframe interactivity. */}
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink/80 px-3 py-1.5 text-xs font-semibold text-bone backdrop-blur transition-colors hover:text-white hover:border-white/20"
      >
        View larger map
        <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
