import type { AddOn, CommercialTier, QuoteOnlyService, SqftTier } from '@/types';

/**
 * Quote calculator pricing source of truth.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * Edit this file (and ONLY this file) to change pricing. The UI renders
 * whatever calculateQuote() returns — no other code knows the numbers.
 *
 * These numbers mirror PC Pro Inspections' official price sheet
 * (residential + commercial). Update them here when the sheet changes.
 * ───────────────────────────────────────────────────────────────────────────
 */

/** Residential base price by square footage — first match wins (in order). */
export const SQFT_TIERS: SqftTier[] = [
  { min: 0, max: 1000, price: 400, label: '1 – 1,000 sqft', durationLabel: '~2.5 hrs', durationHours: 2.5 },
  { min: 1001, max: 2000, price: 450, label: '1,001 – 2,000 sqft', durationLabel: '~3.5 hrs', durationHours: 3.5 },
  { min: 2001, max: 2500, price: 500, label: '2,001 – 2,500 sqft', durationLabel: '~4 hrs', durationHours: 4 },
  { min: 2501, max: 3000, price: 550, label: '2,501 – 3,000 sqft', durationLabel: '~4.5 hrs', durationHours: 4.5 },
  { min: 3001, max: 4000, price: 600, label: '3,001 – 4,000 sqft', durationLabel: '~5 hrs', durationHours: 5 },
  { min: 4001, max: 5000, price: 700, label: '4,001 – 5,000 sqft', durationLabel: '~6 hrs', durationHours: 6 },
];

/**
 * Commercial base price — charged PER SQUARE FOOT (first match wins).
 * Base estimate = sqft × pricePerSqft, floored at COMMERCIAL_MINIMUM.
 * The sheet prices buildings up to 10,000 sqft; larger ones are a phone call.
 */
export const COMMERCIAL_TIERS: CommercialTier[] = [
  { min: 0, max: 5000, pricePerSqft: 0.2, label: "1 – 5,000 sqft", durationLabel: "~4 hrs", durationHours: 4 },
  { min: 5001, max: 10000, pricePerSqft: 0.225, label: "5,000 – 10,000 sqft", durationLabel: "~6 hrs", durationHours: 6 },
];

/**
 * Every commercial inspection carries a minimum charge, whatever the square
 * footage works out to. Straight from the price sheet.
 */
export const COMMERCIAL_MINIMUM = 500;

/**
 * Optional add-ons with a SET price — selectable in the calculator and added
 * to the running total. The client's official price sheet prices only the
 * Termite Inspection (+$50), so that's the lone entry here. When the owner
 * confirms a price for any QUOTE_ONLY_SERVICE below, move it up into this
 * array (with its real `price`) and it becomes selectable automatically.
 */
export const ADD_ONS: AddOn[] = [
  {
    id: 'termite-wdo',
    label: 'Termite / WDO Inspection',
    description:
      'Wood-destroying organism evaluation, added to your home inspection. Required by many lenders.',
    price: 50,
    durationHours: 0.5,
  },
];

/**
 * Services the inspector offers that AREN'T priced on the sheet. They're shown
 * for transparency with a "Call for quote" tag (no fabricated price) and are
 * NOT selectable in the calculator. To make one priceable, delete it here and
 * add it to ADD_ONS above with a confirmed `price`.
 */
/**
 * Priced services that are NOT an add-on to a home inspection — they stand on
 * their own. From the price sheet: a termite/WDO inspection booked by itself
 * (a lender letter, say) is $100, where the same inspection added to a home
 * inspection is +$50.
 */
export const STANDALONE_SERVICES: AddOn[] = [
  {
    id: "termite-only",
    label: "Termite / WDO inspection only",
    description:
      "A wood-destroying organism inspection booked on its own, without a home inspection.",
    price: 100,
    durationHours: 0.5,
  },
];

export const QUOTE_ONLY_SERVICES: QuoteOnlyService[] = [
  {
    id: 'mold',
    label: 'Mold Assessment',
    description:
      'Visual assessment plus optional air-quality samples sent to an accredited lab.',
  },
  {
    id: 'pool-spa',
    label: 'Pool / Spa Inspection',
    description: 'Equipment, finish, decking, and safety features.',
  },
  {
    id: 'thermal-imaging',
    label: 'Thermal Imaging',
    description:
      'Infrared camera scan to reveal hidden moisture intrusion, missing insulation, and electrical hot spots.',
  },
];

/** Quick lookup helper used by services. */
export const findAddOn = (id: string): AddOn | undefined =>
  ADD_ONS.find((a) => a.id === id);

/** Disclaimer shown alongside pricing — taken verbatim from the price sheet. */
export const PRICING_NOTE = 'Prices subject to change for additional structures.';

/** Default sqft on the calculator when the page loads (residential). */
export const DEFAULT_SQFT = 2000;

/** Residential sqft slider bounds for the UI. */
export const SQFT_MIN = 600;
export const SQFT_MAX = 5000;
export const SQFT_STEP = 50;

/** Commercial sqft slider bounds + default. */
export const COMMERCIAL_SQFT_MIN = 1000;
export const COMMERCIAL_SQFT_MAX = 10000;
export const COMMERCIAL_SQFT_STEP = 250;
export const DEFAULT_COMMERCIAL_SQFT = 4000;
