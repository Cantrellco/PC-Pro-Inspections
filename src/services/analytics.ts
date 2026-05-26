import { siteConfig } from '@/config/siteConfig';

/**
 * Single seam for analytics. No-op when no provider key is set.
 * Swap providers in one place: change init() and track().
 */

type EventProps = Record<string, string | number | boolean | undefined>;

let initialized = false;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function init(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;

  const { provider, domain } = siteConfig.analytics;
  if (!domain || provider === 'none') return;

  if (provider === 'plausible') {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = domain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    initialized = true;
    return;
  }

  if (provider === 'ga4') {
    const gtag = document.createElement('script');
    gtag.async = true;
    gtag.src = `https://www.googletagmanager.com/gtag/js?id=${domain}`;
    document.head.appendChild(gtag);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtagFn(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', domain);
    initialized = true;
  }
}

export function track(event: string, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  const { provider, domain } = siteConfig.analytics;
  if (!domain || provider === 'none') return;

  if (provider === 'plausible' && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
    return;
  }

  if (provider === 'ga4' && window.gtag) {
    window.gtag('event', event, props ?? {});
  }
}
