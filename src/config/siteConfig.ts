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
  // Paste royalty-free (or your own) image URLs. Blank fields render a
  // polished gradient placeholder, so the site never looks broken.
  // Suggested free sources: Unsplash, Pexels, Pixabay (verify each loads).
  // Prefer your OWN photos before launch — stock hurts trust on a service site.
  images: {
    hero: '', // TODO: owner — wide home/neighborhood exterior (≥1920px)
    inspector: '', // TODO: owner — portrait of the inspector (4:5 vertical)
    services: '', // TODO: owner — inspection in progress (roof, panel, etc.)
    resources: '', // TODO: owner — clipboard/report or home interior
    ctaBand: '', // TODO: owner — dusk home exterior for the closing banner
  },

  // ─── Contact ─────────────────────────────────────────────────────────────
  phone: '(555) 123-4567', // TODO: owner to fill
  phoneHref: '+15551234567', // TODO: owner to fill (E.164, digits only)
  email: 'hello@pcproinspections.com', // TODO: owner to fill

  // ─── Address ─────────────────────────────────────────────────────────────
  // If you operate mobile-only, use a service-area centroid; do not leave blank.
  address: {
    street: '123 Main Street', // TODO: owner to fill
    city: 'Anytown', // TODO: owner to fill
    region: 'NY', // TODO: owner to fill
    postalCode: '10001', // TODO: owner to fill
    country: 'US',
  },
  geo: undefined, // TODO: owner to fill (optional but boosts local SEO JSON-LD)

  // ─── Service Area ────────────────────────────────────────────────────────
  serviceAreaSummary: 'Serving the greater metro area and surrounding counties.', // TODO: owner to fill
  // Drives the Service Areas page (crawlable text) and on-page local SEO.
  serviceAreaTowns: [
    // TODO: owner to fill — at least 8-15 towns/cities you actively serve.
    'Anytown',
    'Springfield',
    'Riverside',
    'Lakeview',
    'Brookfield',
    'Maplewood',
    'Hillcrest',
    'Fairview',
  ],

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
      badgeSrc: '', // TODO: owner to add /certs/internachi.svg
    },
    {
      name: 'ASHI Member',
      issuer: 'American Society of Home Inspectors',
      badgeAlt: 'ASHI Member badge',
      badgeSrc: '', // TODO: owner to add /certs/ashi.svg
    },
    {
      name: 'State-Licensed Home Inspector',
      issuer: 'State Licensing Board', // TODO: owner to fill exact state + license #
      badgeAlt: 'State-Licensed Home Inspector seal',
      badgeSrc: '',
    },
    {
      name: 'Radon Measurement Certified',
      issuer: 'NRPP / NRSB',
      badgeAlt: 'Radon Measurement Certification badge',
      badgeSrc: '',
    },
    {
      name: 'Mold Assessment Certified',
      issuer: 'IAC2',
      badgeAlt: 'Mold Assessment Certification badge',
      badgeSrc: '',
    },
    {
      name: 'Fully Insured — E&O + General Liability',
      issuer: 'Carrier on file; certificate available on request',
      badgeAlt: 'Insurance verified',
      badgeSrc: '',
    },
  ],

  // ─── Testimonials ────────────────────────────────────────────────────────
  testimonials: [
    // TODO: owner to fill with real testimonials (with permission).
    {
      name: 'Sarah K.',
      town: 'Brookfield',
      quote:
        'We had two other inspectors quote us, but the depth of detail in this report was on another level. Caught a roof issue our agent missed. Saved us $8K.',
      rating: 5,
    },
    {
      name: 'Marcus T.',
      town: 'Riverside',
      quote:
        'Showed up on time, walked us through every finding on-site, then delivered the report the same evening with clear photos. First-time buyers — felt completely supported.',
      rating: 5,
    },
    {
      name: 'Priya & Dev R.',
      town: 'Maplewood',
      quote:
        'Professional, calm, and honest — even when telling us things we did not want to hear. Exactly who you want in your corner on a $500K purchase.',
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
  googleReviews: {
    placeUrl: '', // TODO: owner to fill — Google Business Profile "share" URL
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
