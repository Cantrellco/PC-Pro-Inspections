export type ResponsePromise = {
  callbackHours: number;
  inspectionDays: number;
};

export type Certification = {
  name: string;
  issuer: string;
  badgeAlt: string;
  /** Path under /public, e.g. "/certs/mold.svg". Leave blank for text-only fallback. */
  badgeSrc?: string;
};

/**
 * The inspector's headline professional certification (e.g. InterNACHI CPI).
 * Rendered prominently and apart from the specialty `certifications` list —
 * it's the foundational credential, not a specialty. Optional on SiteConfig:
 * every badge/section that uses it hides itself when unset.
 */
export type PrimaryCertification = {
  /** Full name, e.g. "InterNACHI® Certified Professional Inspector". */
  name: string;
  /** Compact label for chips/badges, e.g. "InterNACHI® Certified". */
  shortLabel: string;
  /** Issuing body, e.g. "International Association of Certified Home Inspectors". */
  issuer: string;
  /** One line on what the credential means / why it matters. */
  blurb: string;
  /** Badge image path under /public, e.g. "/certs/internachi.svg". */
  badgeSrc: string;
  badgeAlt: string;
  /** Optional public verification link (e.g. the inspector's InterNACHI profile). */
  verifyUrl?: string;
};

export type ExpertiseArea = {
  /** Short display name, e.g. "Thermal Imaging". */
  label: string;
  /** One-line description of what's covered. */
  blurb: string;
  /** Marks an advanced/specialty capability (vs. a standard home system). */
  specialty?: boolean;
};

export type EquipmentFeature = {
  /** Short capability label, e.g. "4K-capable camera". */
  label: string;
  /** One-line benefit explaining why it matters. */
  detail: string;
};

/**
 * A featured piece of specialty equipment (e.g. a robotic crawler) shown in a
 * showcase block. Optional on SiteConfig — the section hides itself when unset.
 */
export type EquipmentShowcase = {
  /** Small label above the headline, e.g. "The Technology". */
  eyebrow: string;
  /** Product name, e.g. "Wombat Inspection Crawler". */
  name: string;
  /** Manufacturer name, e.g. "UplinkRobotics". */
  maker: string;
  /** Link to the product/maker page; opens in a new tab. Optional. */
  productUrl?: string;
  /** Image path under /public, e.g. "/equipment/wombat-crawler.jpg". */
  image: string;
  imageAlt: string;
  /** Section headline. */
  headline: string;
  /** Supporting paragraph. */
  body: string;
  /** Key capability bullets. */
  features: EquipmentFeature[];
};

/**
 * The owner's personal letter — the centerpiece of the About page.
 * Optional on SiteConfig: the section hides itself when unset.
 */
export type OwnerStory = {
  /** Small label above the headline, e.g. "Meet the owner". */
  eyebrow: string;
  /** Opening line, set as an emphasized lede, e.g. "Hi, I'm Paul…". */
  greeting: string;
  /** Letter body paragraphs, in reading order. */
  paragraphs: string[];
  /** Optional pulled refrain, injected after the given paragraph index. */
  pullQuote?: { text: string; afterParagraph: number };
  /** Closing signature shown beneath the letter. */
  signature: { name: string; title: string };
};

export type Testimonial = {
  name: string;
  /** Secondary attribution shown after the name (e.g. role or town). */
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Platform the review was left on — shown as a small badge. */
  source?: 'google' | 'spectora';
};

export type GoogleBusinessProfile = {
  /** Public Google Maps listing URL (also emitted in JSON-LD `sameAs`). */
  mapsUrl: string;
  /** Direct "write a review" short link from the GBP dashboard. Blank → mapsUrl. */
  writeReviewUrl: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PrepGuideSection = {
  heading: string;
  body: string;
};

export type AnalyticsConfig = {
  /** Provider's site domain (Plausible) or measurement ID (GA4). Blank = disabled. */
  domain: string;
  /** "plausible" | "ga4" — controls which loader runs. */
  provider: 'plausible' | 'ga4' | 'none';
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteImages = {
  /** Hero background — a wide home/exterior shot. */
  hero: string;
  /** Inspector portrait (About page), ideally 4:5 vertical. */
  inspector: string;
  /** Services section accent — inspection in progress. */
  services: string;
  /** Resources / report context image. */
  resources: string;
  /** Closing CTA band background. */
  ctaBand: string;
};

export type SiteConfig = {
  businessName: string;
  legalName: string;
  /** Lead inspector's full name — shown on About and used as JSON-LD `founder`. */
  inspectorName: string;
  tagline: string;
  /** Royalty-free or owner-supplied photo URLs. Blank → elegant placeholder. */
  images: SiteImages;
  phone: string;
  /** Raw digits for tel: link, e.g. "+15555551234". */
  phoneHref: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string; // state abbreviation
    postalCode: string;
    country: string; // ISO, e.g. "US"
  };
  /** Display latitude/longitude for LocalBusiness JSON-LD; optional. */
  geo?: { latitude: number; longitude: number };
  /** Top-line service area description, e.g. "Greater Boston, MA & southern NH". */
  serviceAreaSummary: string;
  /** Towns/counties as crawlable text on the Service Areas page. */
  serviceAreaTowns: string[];
  hours: { day: string; open: string; close: string }[];
  yearsInBusiness: number;
  inspectionsCompleted: number;
  responsePromise: ResponsePromise;
  socials: SocialLink[];
  /** Headline professional certification (e.g. InterNACHI CPI). Optional — hides when unset. */
  primaryCertification?: PrimaryCertification;
  certifications: Certification[];
  /** Full scope of what the inspector covers — drives the "Areas of Expertise" grid. */
  inspectionExpertise: ExpertiseArea[];
  /** Featured specialty equipment showcase (About page). Optional — hides when unset. */
  equipment?: EquipmentShowcase;
  /** The owner's personal letter (About page). Optional — hides when unset. */
  ownerStory?: OwnerStory;
  /** Google Business Profile links. Optional — review CTA hides when unset. */
  google?: GoogleBusinessProfile;
  testimonials: Testimonial[];
  faqs: FaqItem[];
  prepGuide: PrepGuideSection[];
  /** Web3Forms access key. While === DEFAULT, submitLead() falls back to a mailto: draft; set a real key to email leads automatically. */
  web3FormsAccessKey: string;
  /** Scheduler embed URL. Blank → Book Now page shows polished fallback. */
  bookingUrl: string;
  /** Map embed iframe src (keyless OpenStreetMap or a Google "embed a map" src). */
  mapEmbedSrc: string;
  analytics: AnalyticsConfig;
  /** Open Graph image, defaults to /og-image.png in public/. */
  ogImage: string;
};

export type AddOn = {
  /** Stable key — used in URL params, analytics, lead payloads. */
  id: string;
  label: string;
  /** Short pitch shown next to the toggle. */
  description: string;
  /** Flat fee in USD. */
  price: number;
  /** Extra on-site time this adds, in hours (per the price sheet). */
  durationHours?: number;
};

/**
 * A service the inspector offers but that isn't priced on the sheet yet.
 * Listed for transparency with a "Call for quote" tag; not selectable in the
 * calculator until the owner confirms a price (then promote it to AddOn).
 */
export type QuoteOnlyService = {
  id: string;
  label: string;
  description: string;
};

/** Residential vs. commercial — the two pricing models on the price sheet. */
export type PropertyType = 'residential' | 'commercial';

export type SqftTier = {
  /** Inclusive lower bound (sqft). */
  min: number;
  /** Inclusive upper bound, or null for "and up". */
  max: number | null;
  /** Base price USD (flat, residential). */
  price: number;
  label: string;
  /** Approximate on-site time, e.g. "~4 hrs" or "7+ hrs". */
  durationLabel?: string;
  /** The same figure as a number, so add-on time can be summed onto it. */
  durationHours?: number;
};

/** Commercial tier — priced PER SQUARE FOOT (base = sqft × pricePerSqft). */
export type CommercialTier = {
  /** Inclusive lower bound (sqft). */
  min: number;
  /** Inclusive upper bound, or null for "and up". */
  max: number | null;
  /** Price per square foot USD. */
  pricePerSqft: number;
  label: string;
  /** Approximate on-site time, e.g. "~4 hrs" or "9+ hrs". */
  durationLabel?: string;
  /** The same figure as a number, so add-on time can be summed onto it. */
  durationHours?: number;
};

export type QuoteInputs = {
  propertyType: PropertyType;
  sqft: number;
  addOnIds: string[];
};

export type QuoteLineItem = {
  id: string;
  label: string;
  amount: number;
};

export type QuoteResult = {
  inputs: QuoteInputs;
  tier: SqftTier | CommercialTier;
  baseLineItem: QuoteLineItem;
  addOnLineItems: QuoteLineItem[];
  total: number;
  /** Approximate on-site time for the resolved tier. */
  durationLabel?: string;
  /** Commercial only: the sheet minimum set the price, not the square footage. */
  minimumApplied?: boolean;
};

export type LeadSource = 'contact_form' | 'quote_form';

export type LeadPayload = {
  source: LeadSource;
  name: string;
  email: string;
  phone: string;
  message?: string;
  /** Populated only for quote-form leads. */
  quote?: QuoteResult;
  /** Property address (optional, free text). */
  propertyAddress?: string;
};

export type LeadResult =
  | { ok: true; via?: 'web3forms' | 'mailto' }
  | { ok: false; error: string };

export type BookingConfig = {
  /** Falsy when not configured (placeholder URL / empty). */
  url: string;
  configured: boolean;
  /** Pre-built embed URL with calculator inputs mapped to scheduler prefill params. */
  prefillUrl: (params: BookingPrefillParams) => string;
};

export type BookingPrefillParams = {
  propertyType?: PropertyType;
  sqft?: number;
  addOnIds?: string[];
  estimate?: number;
};
