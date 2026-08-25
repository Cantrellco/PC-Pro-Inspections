import { siteConfig } from '@/config/siteConfig';

type Props = {
  className?: string;
};

/**
 * Locator map of the service region, framed as a printed sheet.
 *
 * Renders a keyless static tile mosaic (CARTO light basemap) centered on
 * `siteConfig.geo`. Tiles are drawn as <img> rather than through OpenStreetMap's
 * `export/embed.html` iframe, which fails to paint its tiles when framed.
 *
 * If the owner sets `siteConfig.mapEmbedSrc` (e.g. a Google "Embed a map" src),
 * that iframe takes over instead.
 */
export default function ServiceAreaMap({ className = '' }: Props) {
  const { mapEmbedSrc, geo, address, serviceAreaSummary } = siteConfig;

  return (
    <div className={`sheet sheet-navy p-0 ${className}`.trim()}>
      <div className="relative h-full min-h-[19rem] w-full overflow-hidden bg-paper-deep">
        {mapEmbedSrc ? (
          <iframe
            src={mapEmbedSrc}
            title={`Service area map — ${serviceAreaSummary}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        ) : geo ? (
          <TileMosaic lat={geo.latitude} lng={geo.longitude} zoom={9} label={serviceAreaSummary} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-mute">
            Service-area map
          </div>
        )}

        {/* Pinned label: where Paul starts from. */}
        <span className="tag pointer-events-none absolute left-3 top-3 text-sm sm:left-4 sm:top-4">
          Based in {address.city}, {address.region}
        </span>
      </div>
    </div>
  );
}

/* ── Static slippy-map mosaic ──────────────────────────────────────────────
 * Web-Mercator tile math. We over-render a box around the center point and
 * center it in the container, so the map fills any responsive size and the
 * marker always sits dead-center. CARTO's `light_all` basemap is key-free.
 * Attribution is required and shown. */

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
          src={`https://${s}.basemaps.cartocdn.com/light_all/${zoom}/${tx}/${ty}@2x.png`}
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
      <div role="img" aria-label={`Map centered on ${label}`} className="absolute inset-0">
        <div
          className="absolute"
          style={{ left: `calc(50% - ${offsetX}px)`, top: `calc(50% - ${offsetY}px)` }}
        >
          {tiles}
        </div>
      </div>

      {/* Center marker: a red square cut with a black line, dead-center on the geo point. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-red"
      />

      {/* Required attribution. */}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-3 bg-paper-white px-1.5 py-0.5 text-[10px] font-semibold leading-none text-ink-soft hover:text-red"
      >
        © OpenStreetMap · CARTO
      </a>

      {/* Explore affordance — replaces the lost iframe interactivity. */}
      <a
        href={osmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tag absolute bottom-3 right-3 text-xs hover:bg-paper"
      >
        View larger map ↗
      </a>
    </>
  );
}
