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
    inspector: '/team/paul-portrait.webp', // Paul Cantrell — real portrait (master: src/assets/paul-original.png; .jpg fallback alongside)
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
  // Leave blank: the site renders a reliable, keyless dark-tile locator map
  // centered on `geo` above (CARTO basemap — paints correctly on the dark
  // theme, unlike OpenStreetMap's `export/embed.html` iframe, whose tiles go
  // black when framed). To override with a different provider, paste an iframe
  // `src` here — e.g. Google Maps → Share → "Embed a map".
  mapEmbedSrc: '',

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
  // NOTE: not currently surfaced anywhere on the site — the owner opted not to
  // advertise a years-in-business or inspection count (the About page leans on
  // certifications + real reviews instead). Kept here, with honest values, so a
  // future page can use them. To show them again, wire them back into a page.
  yearsInBusiness: 2, // owner completed training in 2024
  inspectionsCompleted: 0, // not advertised — set a real running count to use

  // ─── Response Promise ────────────────────────────────────────────────────
  responsePromise: {
    callbackHours: 4, // TODO: owner to confirm
    inspectionDays: 3, // TODO: owner to confirm
  },

  // ─── Socials ─────────────────────────────────────────────────────────────
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/p/PC-Pro-Inspections-61570975048865/' },
  ],

  // ─── Primary Certification ───────────────────────────────────────────────
  // The headline professional credential, shown prominently and apart from the
  // specialty certs below. Confirmed by the owner. The seal at /certs/internachi.svg
  // is a clean house-style placeholder — for maximum recognition, replace it with
  // the official "InterNACHI Certified Professional Inspector" badge the owner can
  // download from his InterNACHI member account (drop a PNG/SVG in public/certs/
  // and update badgeSrc). Add `verifyUrl` once the owner shares his InterNACHI
  // inspector-profile link so visitors can verify the credential.
  primaryCertification: {
    name: 'InterNACHI® Certified Professional Inspector',
    shortLabel: 'InterNACHI® Certified',
    issuer: 'International Association of Certified Home Inspectors',
    blurb:
      "Trained and tested against InterNACHI's Standards of Practice and bound by its Code of Ethics — the most widely recognized certification in the home-inspection field.",
    badgeSrc: '/certs/internachi.svg',
    badgeAlt: 'InterNACHI Certified Professional Inspector seal',
    // verifyUrl: '', // TODO: owner — paste your InterNACHI inspector-profile URL to make it a clickable proof link
  },

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
    { label: 'Crawl Spaces', blurb: 'Structure, vapor barriers, moisture, drainage, and pest activity — reached by our robotic crawler when access is tight or unsafe.' },
    { label: 'Moisture Intrusion', blurb: 'Meter and infrared scanning for hidden leaks and damp.' },
    { label: 'Pools & Spas', blurb: 'Equipment, finish, decking, bonding, and safety features.', specialty: true },
    { label: 'Mold', blurb: 'Visual assessment with optional accredited-lab air sampling.', specialty: true },
    { label: 'Termite / WDO', blurb: 'Wood-destroying organism evaluation for lenders and buyers.', specialty: true },
    { label: 'Thermal Imaging', blurb: 'Infrared camera reveals what the naked eye cannot.', specialty: true },
    { label: 'Manufactured Homes', blurb: 'HUD-tagged housing — tie-downs, skirting, supports, and systems.', specialty: true },
    { label: 'Mobile Homes', blurb: 'Single- and double-wide setup, blocking, and connected systems.', specialty: true },
  ],

  // ─── Featured Equipment ──────────────────────────────────────────────────
  // Showcased on the About page. Remove this block (or leave it off) and the
  // section hides itself. Image lives at public/equipment/.
  equipment: {
    eyebrow: 'The Technology',
    name: 'Wombat Inspection Crawler',
    maker: 'UplinkRobotics',
    productUrl: 'https://uplinkroboticsstore.com/products/wombat-inspection-crawler',
    image: '/equipment/wombat-crawler.jpg',
    imageAlt:
      'The Wombat robotic inspection crawler — an all-terrain camera robot used to inspect crawl spaces',
    headline: 'Some crawl spaces are too tight to enter. We send in a robot.',
    body:
      'Crawl spaces are where the costliest problems hide — moisture, rot, failing piers, pest damage — and they are often too low, too wet, or too unsafe to fully reach. So we deploy the Wombat: a rugged, remote-controlled inspection crawler that goes where a person cannot, streaming sharp, well-lit video of every inch beneath your home. Nothing gets skipped just because it was hard to get to.',
    features: [
      {
        label: '4K-capable camera',
        detail:
          'A gimbal-stabilized Sony camera streams crisp, live video of joists, piers, ducts, and vapor barriers.',
      },
      {
        label: '1,000+ lumens of light',
        detail:
          'Bright, dimmable LEDs turn the darkest crawl space into daylight, so nothing hides in the shadows.',
      },
      {
        label: 'Goes anywhere',
        detail:
          'All-terrain tires crawl over debris, mud, and standing water — and keep driving even when flipped.',
      },
      {
        label: 'Documented for your report',
        detail:
          'Findings are captured as photos and video on the spot — proof you can see, not just our word for it.',
      },
    ],
  },

  // ─── Owner's Story ───────────────────────────────────────────────────────
  // The personal letter that anchors the About page, written in the owner's own
  // voice. Remove this block (or leave it off) and the letter hides itself,
  // falling back to a generic intro.
  ownerStory: {
    eyebrow: 'Meet the owner',
    greeting:
      "Hi, I'm Paul Cantrell, owner of PC Pro Inspections in Fairfield, Illinois.",
    paragraphs: [
      "After my wife Mitzie (a real estate agent for the past five years) shared how much our area needed reliable home inspectors, I decided to pursue my certification. I completed my training and quickly discovered my true passion: helping families feel confident and secure about one of the biggest decisions they'll ever make — buying or selling a home.",
      "With a careful eye for detail and a commitment to thorough, honest inspections, I walk clients through every aspect of the property so they can make informed decisions with peace of mind. Whether it's identifying potential safety issues, structural concerns, or maintenance needs, I'm dedicated to providing clear, straightforward reports that put my clients first.",
      "On a personal note, Mitzie and I have been happily married for 28 years. We're proud parents to our son Cody, who has been married to his wife Gracie for two years. We're also excitedly preparing to welcome our first grandchild very soon!",
      "When I'm not inspecting homes, I enjoy spending time with family and being part of this wonderful Fairfield community. I understand how important it is to feel secure in your home — and I'm here to help make that happen.",
      "If you're buying, selling, or just need a thorough home inspection, I'd be honored to serve you. Feel free to reach out — I'm always happy to answer your questions.",
    ],
    pullQuote: {
      text: "Helping families feel confident and secure about one of the biggest decisions they'll ever make.",
      afterParagraph: 1,
    },
    signature: { name: 'Paul Cantrell', title: 'Owner · PC Pro Inspections' },
  },

  // ─── Testimonials ────────────────────────────────────────────────────────
  testimonials: [
    // Real verified reviews (Spectora). Add new ones here as they come in.
    {
      name: 'Larry B.',
      role: 'Client',
      quote:
        'Great, thorough job! Explained everything well and was very courteous. We will gladly recommend your service to anyone needing or wanting a home inspection.',
      rating: 5,
    },
    {
      name: 'Melissa J.',
      role: 'Real estate agent',
      quote:
        'Love working with Paul! He answers his phone and communicates well with the buyers and the agents!',
      rating: 5,
    },
    {
      name: 'Cody H.',
      role: 'Client',
      quote:
        'Extremely thorough! Answered all of our questions and explained everything to us. Highly recommend PC Pro to anybody looking for their new home!',
      rating: 5,
    },
    {
      name: 'Missy W.',
      role: 'Client',
      quote:
        'Paul was great and very thorough and explained everything to us.',
      rating: 5,
    },
    {
      name: 'Jakob & Bailey S.',
      role: 'Client',
      quote: 'Very detailed and well put together.',
      rating: 5,
    },
    {
      name: 'Sandy S.',
      role: 'Client',
      quote: 'Clearly explained what he observed and the condition of the property.',
      rating: 5,
    },
  ],

  // ─── FAQs (drives FAQPage JSON-LD on Home) ───────────────────────────────
  faqs: [
    {
      question: 'How much does a home inspection cost?',
      answer:
        'Residential pricing is a flat rate set by the home’s square footage, with an optional termite inspection. Commercial buildings are priced per square foot. Use our quote calculator to see an itemized estimate in seconds; the final price is confirmed at scheduling.',
    },
    {
      question: 'How long does an inspection take?',
      answer:
        'On-site time scales with the property — roughly 2.5 hours for a smaller home up to 6 hours for a large one, and longer for commercial buildings. You are welcome to attend — we encourage it, especially for first-time buyers, so we can walk you through findings in person.',
    },
    {
      question: 'What is included in a standard inspection?',
      answer:
        'Roof, exterior, structure, attic, insulation, ventilation, plumbing, electrical, HVAC, interior, doors and windows, foundation, and visible drainage. You receive a photo-rich digital report, typically the same evening.',
    },
    {
      question: 'Do I need mold testing?',
      answer:
        'Mold testing is recommended when there is visible growth, a moisture history, or symptoms in occupants. It pairs naturally with the thermal-imaging and moisture scanning that are part of how we find hidden damp in the first place. Mold assessment is available as a separate service — just ask us for a quote.',
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
      body: 'Plan roughly 2.5 to 6 hours depending on the size of the home. We start with the roof and exterior, then work inside top-to-bottom. The full digital report — with photos and a priority summary — is typically delivered the same evening.',
    },
  ],

  // ─── Web3Forms (optional upgrade) ────────────────────────────────────────
  // While this is the DEFAULT placeholder, the forms fall back to a mailto:
  // draft (opens the visitor's email app — works with no account or backend).
  // To deliver leads automatically instead: sign up at https://web3forms.com,
  // get a free access key, paste it here. No other code changes needed.
  web3FormsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY', // optional: set to email leads automatically

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
