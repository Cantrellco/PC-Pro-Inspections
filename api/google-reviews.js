// Vercel serverless function — pulls live Google reviews for the business.
//
// Why a function: the Places API key must never ship to the browser. The
// browser calls /api/google-reviews; this file calls Google with the key from
// the Vercel environment and returns a trimmed, cacheable JSON payload.
//
// Environment variables (Vercel dashboard → Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY  required — Google Cloud key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID        optional — the listing's Place ID (ChIJ…). When blank
//                          we resolve it once via Text Search and cache it.
//   GOOGLE_PLACE_QUERY     optional — text used for that lookup
//                          (default: "PC Pro Inspections Fairfield IL 62837")
//
// Google returns at most 5 reviews per listing ("most relevant"). Older ones
// live in src/config/reviews.ts; the site merges both.

const PLACES = 'https://places.googleapis.com/v1';
const DEFAULT_QUERY = 'PC Pro Inspections Fairfield IL 62837';
const CACHE_SECONDS = 60 * 60 * 6; // 6h at the CDN edge, 24h stale-while-revalidate

let resolvedPlaceId = process.env.GOOGLE_PLACE_ID || '';

async function findPlaceId(key) {
  const res = await fetch(`${PLACES}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({ textQuery: process.env.GOOGLE_PLACE_QUERY || DEFAULT_QUERY }),
  });
  if (!res.ok) throw new Error(`searchText ${res.status}`);
  const data = await res.json();
  const id = data.places?.[0]?.id;
  if (!id) throw new Error('place not found');
  return id;
}

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  res.setHeader('Content-Type', 'application/json');

  if (!key) {
    // Not configured yet — the site silently falls back to config reviews.
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json({ configured: false, reviews: [] });
  }

  try {
    if (!resolvedPlaceId) resolvedPlaceId = await findPlaceId(key);

    const r = await fetch(`${PLACES}/places/${encodeURIComponent(resolvedPlaceId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'id,rating,userRatingCount,googleMapsUri,reviews',
      },
    });
    if (!r.ok) throw new Error(`placeDetails ${r.status}`);
    const place = await r.json();

    const reviews = (place.reviews || [])
      .filter((rv) => rv.text?.text)
      .map((rv) => ({
        name: rv.authorAttribution?.displayName || 'Google user',
        quote: rv.text.text.trim(),
        rating: Math.max(1, Math.min(5, Math.round(rv.rating || 5))),
        publishedAt: rv.publishTime || null,
        relativeTime: rv.relativePublishTimeDescription || null,
        photo: rv.authorAttribution?.photoUri || null,
      }));

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 4}`,
    );
    return res.status(200).json({
      configured: true,
      placeId: place.id,
      rating: place.rating ?? null,
      reviewCount: place.userRatingCount ?? 0,
      mapsUrl: place.googleMapsUri ?? null,
      reviews,
    });
  } catch (err) {
    // Never break the page over a reviews hiccup — fall back to config.
    res.setHeader('Cache-Control', 'public, max-age=120');
    return res.status(200).json({
      configured: true,
      error: err instanceof Error ? err.message : 'unknown',
      reviews: [],
    });
  }
}
