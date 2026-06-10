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
  businessName: 'PC Pro Inspections',
  legalName: 'PC Pro Inspections LLC', // TODO: owner to confirm exact registered entity name
  inspectorName: 'Paul Cantrell',
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
  phone: '(618) 599-4446',
  phoneHref: '+16185994446', // E.164, digits only
  email: 'paul@pcproinspections.com',

  // ─── Address ─────────────────────────────────────────────────────────────
  // Mobile / service-area business based in Fairfield, IL (Wayne County).
  // Owner works out of Fairfield with no public office, so `street` is blank
  // by design: the site then shows "Fairfield, IL" and omits PostalAddress
  // from the JSON-LD (the correct shape for a service-area business). The
  // `areaServed` town list + geo coordinates still carry the local SEO signal.
  address: {
    street: '', // intentionally blank — no public office address
    city: 'Fairfield',
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
    { day: 'Monday', open: '07:00', close: '17:00' },
    { day: 'Tuesday', open: '07:00', close: '17:00' },
    { day: 'Wednesday', open: '07:00', close: '17:00' },
    { day: 'Thursday', open: '07:00', close: '17:00' },
    { day: 'Friday', open: '07:00', close: '17:00' },
    { day: 'Saturday', open: '07:00', close: '17:00' },
    { day: 'Sunday', open: '13:00', close: '17:00' },
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
  // The specialty certifications the inspector actually holds. Each `issuer`
  // line is a neutral placeholder — owner should replace it with the exact
  // issuing body + cert/license number (documentation is referenced on the
  // About page). Drop badge images into public/certs/ and reference via badgeSrc.
  certifications: [
    {
      name: 'Thermal Imaging Certified',
      issuer: 'Certified thermographer — documentation on request', // TODO: owner — exact issuing body + cert #
      badgeAlt: 'Thermal imaging / infrared certification seal',
      badgeSrc: '/certs/thermal-imaging.svg',
    },
    {
      name: 'Mold Assessment Certified',
      issuer: 'Certified mold assessor — documentation on request', // TODO: owner — exact issuing body + cert #
      badgeAlt: 'Mold assessment certification seal',
      badgeSrc: '/certs/mold.svg',
    },
    {
      name: 'Termite / WDO Certified',
      issuer: 'Licensed WDO inspector — documentation on request', // TODO: owner — exact issuing body + license #
      badgeAlt: 'Termite / wood-destroying organism certification seal',
      badgeSrc: '/certs/termite.svg',
    },
    {
      name: 'Pool & Spa Inspection Certified',
      issuer: 'Certified pool & spa inspector — documentation on request', // TODO: owner — exact issuing body + cert #
      badgeAlt: 'Pool and spa inspection certification seal',
      badgeSrc: '/certs/pool-spa.svg',
    },
    {
      name: 'Manufactured & Mobile Home Certified',
      issuer: 'Manufactured & mobile home certified — documentation on request', // TODO: owner — exact issuing body + cert #
      badgeAlt: 'Manufactured and mobile home certification seal',
      badgeSrc: '/certs/manufactured-home.svg',
    },
  ],

  // ─── Areas of Expertise ──────────────────────────────────────────────────
  // The full scope of what the inspector covers. `specialty: true` items are
  // advanced/extra capabilities highlighted apart from the standard systems.
  // Drives the "Areas of Expertise" grid on the Services page.
  inspectionExpertise: [
    { label: 'Roofs', blurb: 'Covering, flashing, penetrations, drainage, and visible wear.' },
    { label: 'Electrical', blurb: 'Service entrance, panel, breakers, GFCI/AFCI, wiring, and outlets.' },
    { label: 'HVAC', blurb: 'Heating and cooling condition, distribution, controls, age, and lifespan.' },
    { label: 'Plumbing', blurb: 'Supply lines, drains, fixtures, water heater, and visible leaks.' },
    { label: 'Decks', blurb: 'Ledger attachment, framing, fasteners, railings, and stair safety.' },
    { label: 'Attic', blurb: 'Insulation depth, ventilation, framing, and moisture or pest indicators.' },
    { label: 'Crawl Spaces', blurb: 'Structure, vapor barriers, moisture, drainage, and pest activity.' },
    { label: 'Moisture Intrusion', blurb: 'Meter and infrared scanning for hidden leaks and damp.' },
    { label: 'Pools & Spas', blurb: 'Equipment, finish, decking, bonding, and safety features.', specialty: true },
    { label: 'Mold', blurb: 'Visual assessment with optional accredited-lab air sampling.', specialty: true },
    { label: 'Termite / WDO', blurb: 'Wood-destroying organism evaluation for lenders and buyers.', specialty: true },
    { label: 'Thermal Imaging', blurb: 'Infrared camera reveals what the naked eye cannot.', specialty: true },
    { label: 'Manufactured Homes', blurb: 'HUD-tagged housing — tie-downs, skirting, supports, and systems.', specialty: true },
    { label: 'Mobile Homes', blurb: 'Single- and double-wide setup, blocking, and connected systems.', specialty: true },
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
        'Pricing is driven by square footage, with optional extra services like mold, sewer scope, pool/spa, and termite. Use our quote calculator to see an itemized estimate in seconds; the final price is confirmed at scheduling.',
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
      question: 'Do I need mold testing?',
      answer:
        'Mold testing is recommended when there is visible growth, a moisture history, or symptoms in occupants. It pairs naturally with thermal-imaging and moisture scanning, which are part of how we find hidden damp in the first place. It is a quick extra service at the time of inspection.',
    },
    {
      question: 'How soon can I get on the schedule?',
      answer:
        'We call you back within a few hours and typically inspect within a few business days. Same-week availability is common; rush scheduling is sometimes possible — just ask.',
    },
    {
      question: 'When do I get the report?',
      answer:
        'Same day for most inspections — usually the same evening. It is delivered as a shareable digital report with photos and a summary of priority items.',
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
  ogImage: '/og-image.svg', // Branded 1200×630 share card. Some platforms prefer PNG; export og-image.svg → og-image.png and switch this back if needed.
};

// Helper: returns true when the address has been filled with non-placeholder values.
export const addressIsComplete = (): boolean => {
  const a = siteConfig.address;
  return Boolean(a.street && a.city && a.region && a.postalCode);
};
