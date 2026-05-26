import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';

type Props = {
  title: string;
  description: string;
  /** Path used as canonical (defaults to current pathname). */
  pathname?: string;
  /** Optional JSON-LD structured data block (e.g. FAQPage). */
  jsonLd?: Record<string, unknown>;
};

/**
 * Manages per-page <title>, <meta description>, OG/Twitter tags, canonical,
 * and optional JSON-LD. Plain DOM updates (no react-helmet dep).
 */
export default function SEO({ title, description, pathname, jsonLd }: Props) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes(siteConfig.businessName)
      ? title
      : `${title} | ${siteConfig.businessName}`;
    document.title = fullTitle;

    setMeta('description', description);

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', siteConfig.businessName, 'property');
    setMeta('og:image', absoluteUrl(siteConfig.ogImage), 'property');

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', absoluteUrl(siteConfig.ogImage));

    // Canonical
    setCanonical(absoluteUrl(pathname ?? location.pathname));

    // JSON-LD
    const jsonLdId = 'page-jsonld';
    removeElement(jsonLdId);
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = jsonLdId;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, pathname, jsonLd, location.pathname]);

  return null;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeElement(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:/i.test(pathOrUrl)) return pathOrUrl;
  if (typeof window === 'undefined') return pathOrUrl;
  return new URL(pathOrUrl, window.location.origin).toString();
}
