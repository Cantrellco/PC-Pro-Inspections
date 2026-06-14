import { siteConfig } from '@/config/siteConfig';
import type { BookingConfig, BookingPrefillParams } from '@/types';

/**
 * Single seam for online booking. Components ask these questions; they never
 * know the vendor behind them.
 *
 * To go live: set `bookingUrl` in siteConfig.ts.
 * To switch vendors later: change nothing here — paste the new URL.
 * To use your own backend: replace the embed in pages/BookNow.tsx with your
 *   own scheduler UI; this function still controls "is it configured?".
 */
export function getBookingConfig(): BookingConfig {
  const raw = siteConfig.bookingUrl?.trim() ?? '';
  const configured = Boolean(raw);

  return {
    url: raw,
    configured,
    prefillUrl: (params) => buildPrefillUrl(raw, params),
  };
}

export function isBookingConfigured(): boolean {
  return Boolean(siteConfig.bookingUrl?.trim());
}

/**
 * Builds the scheduler embed URL with calculator inputs mapped to prefill params.
 *
 * Each scheduler uses different param names. Adjust the mapping below when the
 * vendor is chosen. See CLAUDE.md → "Mapping Calculator Inputs to Your
 * Scheduler's Prefill" for examples.
 *
 * The current implementation appends a vendor-neutral set of params; most
 * schedulers will simply ignore unrecognised query strings.
 */
function buildPrefillUrl(baseUrl: string, params: BookingPrefillParams): string {
  if (!baseUrl) return '';

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    // baseUrl was not a full URL (e.g. raw embed snippet). Return it as-is.
    return baseUrl;
  }

  if (params.propertyType) {
    url.searchParams.set('type', params.propertyType);
  }
  if (typeof params.sqft === 'number') {
    url.searchParams.set('sqft', String(params.sqft));
  }
  if (params.addOnIds && params.addOnIds.length > 0) {
    url.searchParams.set('addons', params.addOnIds.join(','));
  }
  if (typeof params.estimate === 'number') {
    url.searchParams.set('estimate', String(params.estimate));
  }

  return url.toString();
}
