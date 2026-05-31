import { siteConfig, addressIsComplete } from '@/config/siteConfig';

/** Builds the LocalBusiness / HomeAndConstructionBusiness JSON-LD block. */
export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  const c = siteConfig;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: c.businessName,
    legalName: c.legalName,
    description: c.tagline,
    telephone: c.phone,
    email: c.email,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    priceRange: '$$',
    areaServed: c.serviceAreaTowns.map((t) => ({
      '@type': 'City',
      name: t,
    })),
    sameAs: c.socials.map((s) => s.href),
  };

  if (c.inspectorName) {
    data.founder = { '@type': 'Person', name: c.inspectorName };
  }

  if (addressIsComplete()) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: c.address.street,
      addressLocality: c.address.city,
      addressRegion: c.address.region,
      postalCode: c.address.postalCode,
      addressCountry: c.address.country,
    };
  }

  if (c.geo) {
    data.geo = {
      '@type': 'GeoCoordinates',
      latitude: c.geo.latitude,
      longitude: c.geo.longitude,
    };
  }

  const openingHours = c.hours
    .filter((h) => h.open !== 'Closed')
    .map((h) => `${h.day.slice(0, 2)} ${h.open}-${h.close}`);
  if (openingHours.length > 0) {
    data.openingHours = openingHours;
  }

  if (c.testimonials.length > 0) {
    const avg =
      c.testimonials.reduce((sum, t) => sum + t.rating, 0) /
      c.testimonials.length;
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      reviewCount: c.testimonials.length,
    };
  }

  return data;
}

/** Builds the FAQPage JSON-LD block. */
export function buildFaqJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteConfig.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
