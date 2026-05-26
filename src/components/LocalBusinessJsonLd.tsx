import { useEffect } from 'react';
import { buildLocalBusinessJsonLd } from '@/services/seo';

/**
 * Persistent JSON-LD for LocalBusiness. Lives on every page via Layout.
 * Per-page JSON-LD (FAQPage, etc.) is handled by <SEO jsonLd=...>.
 */
export default function LocalBusinessJsonLd() {
  useEffect(() => {
    const id = 'localbusiness-jsonld';
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(buildLocalBusinessJsonLd());
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return null;
}
