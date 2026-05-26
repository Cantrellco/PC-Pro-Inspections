import {
  ADD_ONS,
  SQFT_TIERS,
  findAddOn,
} from '@/config/pricing';
import type { QuoteInputs, QuoteResult, SqftTier } from '@/types';

const resolveTier = (sqft: number): SqftTier => {
  const found = SQFT_TIERS.find(
    (t) => sqft >= t.min && (t.max === null || sqft <= t.max),
  );
  if (found) return found;
  // Fallback: smallest tier if sqft below 0 (defensive).
  return SQFT_TIERS[0];
};

/**
 * Pure function. Given inputs, returns the full quote breakdown.
 *
 * UI renders this object — it never re-computes pricing. Move this to a
 * server endpoint later by changing only this function's body.
 */
export function calculateQuote(inputs: QuoteInputs): QuoteResult {
  const tier = resolveTier(inputs.sqft);

  const baseLineItem = {
    id: 'base',
    label: `Base inspection — ${tier.label}`,
    amount: tier.price,
  };

  const addOnLineItems = inputs.addOnIds
    .map((id) => findAddOn(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ id: a.id, label: a.label, amount: a.price }));

  const total =
    baseLineItem.amount +
    addOnLineItems.reduce((sum, li) => sum + li.amount, 0);

  return {
    inputs,
    tier,
    baseLineItem,
    addOnLineItems,
    total,
  };
}

export const ALL_ADD_ONS = ADD_ONS;
