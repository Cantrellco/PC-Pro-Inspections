import type { AddOn, CommercialTier, SqftTier } from '@/types';

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
  { min: 0, max: 1000, price: 400, label: '1 – 1,000 sqft', durationLabel: '~2.5 hrs' },
  { min: 1001, max: 2000, price: 450, label: '1,001 – 2,000 sqft', durationLabel: '~3.5 hrs' },
  { min: 2001, max: 2500, price: 500, label: '2,001 – 2,500 sqft', durationLabel: '~4 hrs' },
  { min: 2501, max: 3000, price: 550, label: '2,501 – 3,000 sqft', durationLabel: '~4.5 hrs' },
  { min: 3001, max: 4000, price: 600, label: '3,001 – 4,000 sqft', durationLabel: '~5 hrs' },
  { min: 4001, max: 5000, price: 700, label: '4,001 – 5,000 sqft', durationLabel: '~6 hrs' },
];

/**
 * Commercial base price — charged PER SQUARE FOOT (first match wins).
 * Base estimate = sqft × pricePerSqft.
 */
export const COMMERCIAL_TIERS: CommercialTier[] = [
  { min: 0, max: 5000, pricePerSqft: 0.15, label: '1 – 5,000 sqft', durationLabel: '~4 hrs' },
  { min: 5001, max: 7500, pricePerSqft: 0.17, label: '5,001 – 7,500 sqft', durationLabel: '~6 hrs' },
  { min: 7501, max: 10000, pricePerSqft: 0.2, label: '7,501 – 10,000 sqft', durationLabel: '7+ hrs' },
  { min: 10001, max: 15000, pricePerSqft: 0.225, label: '10,001 – 15,000 sqft', durationLabel: '8+ hrs' },
  { min: 15001, max: null, pricePerSqft: 0.25, label: '15,001 – 20,000 sqft', durationLabel: '9+ hrs' },
];

/**
 * Optional add-ons. Each adds a flat fee to the residential total.
 *
 * NOTE: The client's official price sheet lists ONLY the Termite Inspection
 * (+$50) as an add-on. The four services below it (mold, sewer scope, pool/spa,
 * well water) are NOT on that sheet — they're preserved here, commented out,
 * so they can be switched back on the moment the owner confirms they offer
 * them AND supplies a real price. Re-enabling a fabricated price on a live
 * quote calculator would mislead customers, so they stay off until confirmed.
 */
export const ADD_ONS: AddOn[] = [
  {
    id: 'termite-wdo',
    label: 'Termite / WDO Inspection',
    description:
      'Wood-destroying organism evaluation. Required by many lenders. Per the price sheet.',
    price: 50,
  },
  // ── Not on the client's price sheet — confirm offering + real price, then uncomment ──
  // {
  //   id: 'mold',
  //   label: 'Mold Assessment',
  //   description:
  //     'Visual assessment plus optional air-quality samples sent to an accredited lab.',
  //   price: 0, // TODO: owner — set real price
  // },
  // {
  //   id: 'sewer-scope',
  //   label: 'Sewer Scope',
  //   description:
  //     'Camera inspection from cleanout to street. Critical on homes 30+ years old.',
  //   price: 0, // TODO: owner — set real price
  // },
  // {
  //   id: 'pool-spa',
  //   label: 'Pool / Spa Inspection',
  //   description:
  //     'Equipment, finish, decking, and safety features.',
  //   price: 0, // TODO: owner — set real price
  // },
  // {
  //   id: 'well-water',
  //   label: 'Well Water Quality Test',
  //   description:
  //     'Lab-analyzed water sample — bacteria, nitrates, and standard chemistry panel.',
  //   price: 0, // TODO: owner — set real price
  // },
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
export const COMMERCIAL_SQFT_MAX = 20000;
export const COMMERCIAL_SQFT_STEP = 250;
export const DEFAULT_COMMERCIAL_SQFT = 5000;
