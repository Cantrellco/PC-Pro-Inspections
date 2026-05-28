export type ResponsePromise = {
  callbackHours: number;
  inspectionDays: number;
};

export type Certification = {
  name: string;
  issuer: string;
  badgeAlt: string;
  /** Path under /public, e.g. "/certs/internachi.svg". Leave blank for text-only fallback. */
  badgeSrc?: string;
};

export type Testimonial = {
  name: string;
  town: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PrepGuideSection = {
  heading: string;
  body: string;
};

export type GoogleReviewsConfig = {
  /** Real GBP star average (e.g. 4.9) for the summary card. */
  rating?: number;
  /** Real GBP total review count. */
  reviewCount?: number;
  /** Public Google Maps "place" URL — used as fallback CTA. */
  placeUrl: string;
  /** Embed src for an iframe (e.g. a 3rd-party review embed); optional. */
  embedSrc?: string;
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
  certifications: Certification[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  prepGuide: PrepGuideSection[];
  googleReviews: GoogleReviewsConfig;
  /** Web3Forms access key. While === DEFAULT, submitLead() throws to prevent live deploys. */
  web3FormsAccessKey: string;
  /** Scheduler embed URL. Blank → Book Now page shows polished fallback. */
  bookingUrl: string;
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
};

export type SqftTier = {
  /** Inclusive lower bound (sqft). */
  min: number;
  /** Inclusive upper bound, or null for "and up". */
  max: number | null;
  /** Base price USD. */
  price: number;
  label: string;
};

export type QuoteInputs = {
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
  tier: SqftTier;
  baseLineItem: QuoteLineItem;
  addOnLineItems: QuoteLineItem[];
  total: number;
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
  | { ok: true }
  | { ok: false; error: string };

export type BookingConfig = {
  /** Falsy when not configured (placeholder URL / empty). */
  url: string;
  configured: boolean;
  /** Pre-built embed URL with calculator inputs mapped to scheduler prefill params. */
  prefillUrl: (params: BookingPrefillParams) => string;
};

export type BookingPrefillParams = {
  sqft?: number;
  addOnIds?: string[];
  estimate?: number;
};
