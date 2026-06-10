import type { AddOn, SqftTier } from '@/types';

/**
 * Quote calculator pricing source of truth.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * Edit this file (and ONLY this file) to change pricing. The UI renders
 * whatever calculateQuote() returns — no other code knows the numbers.
 * ───────────────────────────────────────────────────────────────────────────
 */

/** Square footage tiers — first match wins (in order). */
export const SQFT_TIERS: SqftTier[] = [
  { min: 0, max: 999, price: 375, label: 'Under 1,000 sqft' },
  { min: 1000, max: 1999, price: 450, label: '1,000 – 1,999 sqft' },
  { min: 2000, max: 2999, price: 550, label: '2,000 – 2,999 sqft' },
  { min: 3000, max: 3999, price: 650, label: '3,000 – 3,999 sqft' },
  { min: 4000, max: null, price: 750, label: '4,000+ sqft' },
];

/**
 * Optional add-ons. Each adds a flat fee to the total; none of them change
 * the base price. To remove an add-on, delete (or comment out) its entry —
 * the UI will rebuild itself from this array.
 */
export const ADD_ONS: AddOn[] = [
  {
    id: 'mold',
    label: 'Mold Assessment',
    description:
      'Visual assessment plus optional air-quality samples sent to an accredited lab.',
    price: 225,
  },
  {
    id: 'sewer-scope',
    label: 'Sewer Scope',
    description:
      'Camera inspection from cleanout to street. Critical on homes 30+ years old.',
    price: 275,
  },
  {
    id: 'pool-spa',
    label: 'Pool / Spa Inspection',
    description:
      'Equipment, finish, decking, and safety features. Saves five-figure surprises.',
    price: 195,
  },
  {
    id: 'termite-wdo',
    label: 'Termite / WDO Inspection',
    description:
      'Wood-destroying organism evaluation. Required by many lenders in the southern US.',
    price: 125,
  },
  {
    id: 'well-water',
    label: 'Well Water Quality Test',
    description:
      'Lab-analyzed water sample — bacteria, nitrates, and standard chemistry panel.',
    price: 165,
  },
];

/** Quick lookup helper used by services. */
export const findAddOn = (id: string): AddOn | undefined =>
  ADD_ONS.find((a) => a.id === id);

/** Default sqft on the calculator when the page loads. */
export const DEFAULT_SQFT = 2000;

/** Sqft slider bounds for the UI. */
export const SQFT_MIN = 600;
export const SQFT_MAX = 6000;
export const SQFT_STEP = 50;
