import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import type { Testimonial } from '@/types';

/**
 * THE single reviews seam.
 *
 * `getReviews()` returns the hand-entered reviews from config immediately, then
 * (on the deployed site) merges in live Google reviews from /api/google-reviews
 * — a Vercel function that holds the Places API key server-side. Locally, or if
 * the key isn't set, or if Google hiccups, the config reviews are all you see.
 * Components never know which happened.
 */

const ENDPOINT = '/api/google-reviews';
const CACHE_KEY = 'pcpro:google-reviews:v1';
const CACHE_TTL_MS = 60 * 60 * 1000;

export type GoogleReviewSummary = {
  rating: number | null;
  reviewCount: number;
  mapsUrl: string | null;
};

export type ReviewsResult = {
  reviews: Testimonial[];
  google: GoogleReviewSummary | null;
};

type ApiReview = { name: string; quote: string; rating: number; publishedAt: string | null };
type ApiPayload = {
  configured: boolean;
  rating?: number | null;
  reviewCount?: number;
  mapsUrl?: string | null;
  reviews: ApiReview[];
};

const configReviews = (): Testimonial[] => siteConfig.testimonials;

export async function getReviews(): Promise<ReviewsResult> {
  const local = configReviews();
  const payload = await fetchGoogle();
  if (!payload || !payload.configured || payload.reviews.length === 0) {
    return { reviews: local, google: null };
  }

  const fromGoogle: Testimonial[] = payload.reviews.map((r) => ({
    name: r.name,
    role: 'Google review',
    quote: r.quote,
    rating: clampRating(r.rating),
    source: 'google',
  }));

  return {
    reviews: merge(fromGoogle, local),
    google: {
      rating: payload.rating ?? null,
      reviewCount: payload.reviewCount ?? 0,
      mapsUrl: payload.mapsUrl ?? null,
    },
  };
}

/** React convenience: config reviews on first paint, Google merged in when ready. */
export function useReviews(): ReviewsResult {
  const [result, setResult] = useState<ReviewsResult>({ reviews: configReviews(), google: null });
  useEffect(() => {
    let live = true;
    getReviews().then((r) => live && setResult(r));
    return () => {
      live = false;
    };
  }, []);
  return result;
}

// ─── internals ─────────────────────────────────────────────────────────────

async function fetchGoogle(): Promise<ApiPayload | null> {
  if (typeof window === 'undefined') return null;
  const cached = readCache();
  if (cached) return cached;
  try {
    const res = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('json')) return null; // e.g. vite dev serving index.html
    const data = (await res.json()) as ApiPayload;
    writeCache(data);
    return data;
  } catch {
    return null;
  }
}

/** Google first, then config entries that aren't the same review re-posted. */
function merge(google: Testimonial[], local: Testimonial[]): Testimonial[] {
  const seen = google.map(fingerprint);
  const extra = local.filter((t) => !seen.some((g) => sameReview(g, fingerprint(t))));
  return [...google, ...extra];
}

function fingerprint(t: Testimonial) {
  return {
    name: t.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 4),
    text: t.quote.toLowerCase().replace(/[^a-z]/g, '').slice(0, 40),
  };
}

function sameReview(a: ReturnType<typeof fingerprint>, b: ReturnType<typeof fingerprint>) {
  return a.text === b.text || (a.name === b.name && a.text.slice(0, 20) === b.text.slice(0, 20));
}

function clampRating(n: number): Testimonial['rating'] {
  return Math.max(1, Math.min(5, Math.round(n))) as Testimonial['rating'];
}

function readCache(): ApiPayload | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: ApiPayload };
    return Date.now() - at < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: ApiPayload) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable — fine */
  }
}
