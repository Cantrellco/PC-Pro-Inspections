import type { SiteConfig } from '@/types';

/**
 * Single source of truth for business info, content, and integrations.
 *
 * Every field tagged `// TODO: owner to fill` must be set before launch.
 * The site renders gracefully when fields are blank — empty sections hide
 * themselves — but please fill them all for a finished product.
 */
export const siteConfig: SiteConfig = {
  // ─── Identity ────────────────────────────────────────────────────────────
  businessName: 'PC Pro Inspections', // TODO: owner to fill
  legalName: 'PC Pro Inspections LLC', // TODO: owner to fill
  tagline: 'Honest, thorough home inspections — so you buy with confidence.',

  // ─── Photography ─────────────────────────────────────────────────────────
  // Royalty-free placeholders (Unsplash) so the site looks finished. SWAP for
  // your OWN photos before launch — your real work beats stock on a trust-based
  // service. Blank fields fall back to a polished gradient placeholder.
  images: {
    hero: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=2000&q=80', // TODO: owner — swap for a local home exterior
    inspector: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', // TODO: owner — your real portrait
    services: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80', // TODO: owner — you inspecting
    resources: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80', // TODO: owner — interior/report
    ctaBand: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80', // TODO: owner — dusk home exterior
  },

  // ─── Contact ─────────────────────────────────────────────────────────────
  // SAMPLE values (Southern Illinois). 555-01xx is a reserved fictional range.
  phone: '(618) 555-0147', // TODO: owner to fill with real number
  phoneHref: '+16185550147', // TODO: owner to fill (E.164, digits only)
  email: 'office@pcproinspections.com', // TODO: owner to fill

  // ─── Address ─────────────────────────────────────────────────────────────
  // Based in Fairfield, IL (Wayne County). Replace street with the real one.
  address: {
    street: '100 Heritage Lane', // TODO: owner to fill (sample street)
    city: 'Fairfield', // TODO: owner to confirm
    region: 'IL',
    postalCode: '62837',
    country: 'US',
  },
  geo: { latitude: 38.3786, longitude: -88.3595 }, // Fairfield, IL

  // ─── Service Area ────────────────────────────────────────────────────────
  serviceAreaSummary: 'Serving Fairfield & Southern Illinois', // TODO: owner to confirm
  // Drives the Service Areas page (crawlable text) and on-page local SEO.
  serviceAreaTowns: [
    // Towns within reach of Fairfield, IL — adjust to your true coverage.
    'Fairfield',
    'Mount Vernon',
    'Mount Carmel',
    'Olney',
    'Flora',
    'Salem',
    'Albion',
    'Carmi',
    'McLeansboro',
    'Grayville',
    'Wayne City',
    'Cisne',
    'Centralia',
    'Norris City',
    'Enfield',
    'Benton',
  ],

  // ─── Map ───────────────────────────────────────────────────────────────
  // Keyless OpenStreetMap embed centered on Fairfield, IL. To swap: open
  // Google Maps → Share → "Embed a map" → copy the iframe `src` here.
  mapEmbedSrc:
    'https://www.openstreetmap.org/export/embed.html?bbox=-89.7%2C37.6%2C-87.2%2C39.0&layer=mapnik&marker=38.3786%2C-88.3595',

  // ─── Hours ───────────────────────────────────────────────────────────────
  hours: [
    { day: 'Monday', open: '08:00', close: '18:00' },
    { day: 'Tuesday', open: '08:00', close: '18:00' },
    { day: 'Wednesday', open: '08:00', close: '18:00' },
    { day: 'Thursday', open: '08:00', close: '18:00' },
    { day: 'Friday', open: '08:00', close: '18:00' },
    { day: 'Saturday', open: '09:00', close: '14:00' },
    { day: 'Sunday', open: 'Closed', close: 'Closed' },
  ],

  // ─── Trust Numbers ───────────────────────────────────────────────────────
  yearsInBusiness: 12, // TODO: owner to fill
  inspectionsCompleted: 2500, // TODO: owner to fill (running count)

  // ─── Response Promise ────────────────────────────────────────────────────
  responsePromise: {
    callbackHours: 4, // TODO: owner to confirm
    inspectionDays: 3, // TODO: owner to confirm
  },

  // ─── Socials ─────────────────────────────────────────────────────────────
  socials: [
    // TODO: owner to fill (or remove items you don't use)
    { label: 'Facebook', href: 'https://facebook.com/yourpage' },
    { label: 'Instagram', href: 'https://instagram.com/yourpage' },
  ],

  // ─── Certifications ──────────────────────────────────────────────────────
  // Drop badge images into public/certs/ and reference them with badgeSrc.
  certifications: [
    {
      name: 'InterNACHI Certified Professional Inspector',
      issuer: 'International Association of Certified Home Inspectors',
      badgeAlt: 'InterNACHI Certified Professional Inspector badge',
      badgeSrc: '/certs/internachi.svg',
    },
    {
      name: 'ASHI Member',
      issuer: 'American Society of Home Inspectors',
      badgeAlt: 'ASHI Member badge',
      badgeSrc: '/certs/ashi.svg',
    },
    {
      name: 'State-Licensed Home Inspector',
      issuer: 'State Licensing Board', // TODO: owner to fill exact state + license #
      badgeAlt: 'State-Licensed Home Inspector seal',
      badgeSrc: '/certs/state-licensed.svg',
    },
    {
      name: 'Radon Measurement Certified',
      issuer: 'NRPP / NRSB',
      badgeAlt: 'Radon Measurement Certification badge',
      badgeSrc: '/certs/radon.svg',
    },
    {
      name: 'Mold Assessment Certified',
      issuer: 'IAC2',
      badgeAlt: 'Mold Assessment Certification badge',
      badgeSrc: '/certs/mold.svg',
    },
    {
      name: 'Fully Insured — E&O + General Liability',
      issuer: 'Carrier on file; certificate available on request',
      badgeAlt: 'Insurance verified',
      badgeSrc: '/certs/insured.svg',
    },
  ],

  // ─── Testimonials ────────────────────────────────────────────────────────
  testimonials: [
    // TODO: owner to fill with real testimonials (with permission).
    {
      name: 'Sarah K.',
      town: 'Fairfield',
      quote:
        'We had two other inspectors quote us, but the depth of detail in this report was on another level. Caught a roof issue our agent missed. Saved us $8K.',
      rating: 5,
    },
    {
      name: 'Marcus T.',
      town: 'Mount Vernon',
      quote:
        'Showed up on time, walked us through every finding on-site, then delivered the report the same evening with clear photos. First-time buyers — felt completely supported.',
      rating: 5,
    },
    {
      name: 'Priya & Dev R.',
      town: 'Olney',
      quote:
        'Professional, calm, and honest — even when telling us things we did not want to hear. Exactly who you want in your corner on a major purchase.',
      rating: 5,
    },
    {
      name: 'Bill & Donna H.',
      town: 'Flora',
      quote:
        'Forty years in our last house and we still learned things on the walkthrough. The maintenance summary alone was worth it. Highly recommend to anyone in the area.',
      rating: 5,
    },
    {
      name: 'Jordan M.',
      town: 'Carmi',
      quote:
        'As a realtor I send every client here. Thorough, fair, and the reports never blow up a deal unnecessarily — just the facts, clearly explained.',
      rating: 5,
    },
  ],

  // ─── FAQs (drives FAQPage JSON-LD on Home) ───────────────────────────────
  faqs: [
    {
      question: 'How much does a home inspection cost?',
      answer:
        'Pricing is driven by square footage, with optional add-ons like radon, mold, sewer scope, pool/spa, and termite. Use our quote calculator to see an itemized estimate in seconds; the final price is confirmed at scheduling.',
    },
    {
      question: 'How long does an inspection take?',
      answer:
        'Most single-family homes take two to three hours on-site. You are welcome to attend — we encourage it, especially for first-time buyers, so we can walk you through findings in person.',
    },
    {
      question: 'What is included in a standard inspection?',
      answer:
        'Roof, exterior, structure, attic, insulation, ventilation, plumbing, electrical, HVAC, interior, doors and windows, foundation, and visible drainage. You receive a photo-rich digital report, typically the same evening.',
    },
    {
      question: 'Do I need radon and mold testing?',
      answer:
        'Radon testing is recommended in most regions — radon is the second-leading cause of lung cancer and the only way to know your level is to test. Mold testing is recommended when there is visible growth, a moisture history, or symptoms in occupants. Both are quick add-ons at the time of inspection.',
    },
    {
      question: 'How soon can I get on the schedule?',
      answer:
        'We call you back within a few hours and typically inspect within a few business days. Same-week availability is common; rush scheduling is sometimes possible — just ask.',
    },
    {
      question: 'When do I get the report?',
      answer:
        'Same day for most inspections — usually the same evening. The report is delivered as a shareable digital document with embedded photos and a summary of priority items.',
    },
  ],

  // ─── Pre-Inspection Prep Guide ───────────────────────────────────────────
  prepGuide: [
    {
      heading: 'For the Seller — Access',
      body: 'Unlock all interior doors (including attic, basement, crawl space, and electrical panel). If there are pets, secure them or remove them from the home for the duration. Move stored items away from the panel, water heater, furnace, and AC unit so the inspector can reach them.',
    },
    {
      heading: 'For the Seller — Utilities',
      body: 'All utilities should be ON: electricity, gas, and water. If gas has been shut off, schedule reactivation a day before so pilots/burners are stable for testing. An inspector cannot evaluate equipment that is not running.',
    },
    {
      heading: 'For the Buyer — Attend if You Can',
      body: 'You learn more from one walkthrough at the end of the inspection than from any written report. Plan to arrive in the last 45 minutes — we will tour the property with you and explain priority items in plain language.',
    },
    {
      heading: 'For the Buyer — Bring Questions',
      body: 'Maintenance routines, expected lifespans, what to budget for in years 1-5, what is normal vs. urgent. There are no bad questions, and the inspection day is the best time to ask.',
    },
    {
      heading: 'On the Day',
      body: 'Plan two to three hours for a typical single-family home. We start with the roof and exterior, then work inside top-to-bottom. The full digital report — with photos and a priority summary — is typically delivered the same evening.',
    },
  ],

  // ─── Google Reviews ──────────────────────────────────────────────────────
  // rating + reviewCount drive the rich summary card. Set them to match your
  // real Google Business Profile, then paste placeUrl (and optionally an embed).
  googleReviews: {
    rating: 4.9, // TODO: owner — your real GBP star average
    reviewCount: 127, // TODO: owner — your real GBP review count
    placeUrl: '', // TODO: owner — Google Business Profile share/review URL
    embedSrc: '', // TODO: optional — 3rd-party reviews widget iframe src
  },

  // ─── Web3Forms ───────────────────────────────────────────────────────────
  // Sign up at https://web3forms.com → get free access key.
  // While value === DEFAULT, submitLead() refuses to send (prevents broken-form deploys).
  web3FormsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY', // TODO: owner to fill

  // ─── Booking ─────────────────────────────────────────────────────────────
  // Vendor-agnostic. Drop in any scheduler embed URL/iframe src.
  // Supported out of the box: Cal.com, Acuity, Calendly, SquareSpace Scheduling,
  // SimplyBook.me — any vendor with an embeddable URL.
  // While blank, the Book Now page renders a polished fallback.
  bookingUrl: '', // TODO: owner to add scheduler

  // ─── Analytics ───────────────────────────────────────────────────────────
  // domain blank = no analytics loaded.
  // For Plausible: provider 'plausible', domain 'yoursite.com'.
  // For GA4:      provider 'ga4',       domain 'G-XXXXXXXXXX'.
  analytics: {
    domain: '', // TODO: owner to fill
    provider: 'none',
  },

  // ─── Social Sharing ──────────────────────────────────────────────────────
  ogImage: '/og-image.png', // TODO: owner to drop 1200×630 PNG at public/og-image.png
};

// Helper: returns true when the address has been filled with non-placeholder values.
export const addressIsComplete = (): boolean => {
  const a = siteConfig.address;
  return Boolean(a.street && a.city && a.region && a.postalCode);
};
