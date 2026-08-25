import {
  ADD_ONS,
  COMMERCIAL_MINIMUM,
  COMMERCIAL_TIERS,
  SQFT_TIERS,
  findAddOn,
} from '@/config/pricing';
import type {
  CommercialTier,
  QuoteInputs,
  QuoteLineItem,
  QuoteResult,
  SqftTier,
} from '@/types';

const resolveResidentialTier = (sqft: number): SqftTier => {
  const found = SQFT_TIERS.find(
    (t) => sqft >= t.min && (t.max === null || sqft <= t.max),
  );
  // Fallback: smallest tier if sqft below the first tier (defensive).
  return found ?? SQFT_TIERS[0];
};

const resolveCommercialTier = (sqft: number): CommercialTier => {
  const found = COMMERCIAL_TIERS.find(
    (t) => sqft >= t.min && (t.max === null || sqft <= t.max),
  );
  return found ?? COMMERCIAL_TIERS[0];
};

/** "~4 hrs" / "~4.5 hrs" from a number of hours. */
export function formatDuration(hours: number): string {
  const rounded = Math.round(hours * 2) / 2;
  return `~${rounded} hrs`;
}

/** Display a per-sqft rate as "$0.15" / "$0.20" / "$0.225". */
export function formatPricePerSqft(rate: number): string {
  const trimmed = rate.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
  const [int, dec = ''] = trimmed.split('.');
  return `$${int}.${dec.padEnd(2, '0')}`;
}

/**
 * Pure function. Given inputs, returns the full quote breakdown.
 *
 * UI renders this object — it never re-computes pricing. Move this to a
 * server endpoint later by changing only this function's body.
 */
export function calculateQuote(inputs: QuoteInputs): QuoteResult {
  return inputs.propertyType === 'commercial'
    ? commercialQuote(inputs)
    : residentialQuote(inputs);
}

function residentialQuote(inputs: QuoteInputs): QuoteResult {
  const tier = resolveResidentialTier(inputs.sqft);

  const baseLineItem: QuoteLineItem = {
    id: 'base',
    label: `Residential inspection — ${tier.label}`,
    amount: tier.price,
  };

  const addOnLineItems = inputs.addOnIds
    .map((id) => findAddOn(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ id: a.id, label: a.label, amount: a.price }));

  const total =
    baseLineItem.amount +
    addOnLineItems.reduce((sum, li) => sum + li.amount, 0);

  // Add-ons lengthen the visit; the sheet puts termite at half an hour.
  const addOnHours = inputs.addOnIds
    .map((id) => findAddOn(id)?.durationHours ?? 0)
    .reduce((sum, h) => sum + h, 0);
  const durationLabel =
    tier.durationHours != null && addOnHours > 0
      ? formatDuration(tier.durationHours + addOnHours)
      : tier.durationLabel;

  return {
    inputs,
    tier,
    baseLineItem,
    addOnLineItems,
    total,
    durationLabel,
  };
}

function commercialQuote(inputs: QuoteInputs): QuoteResult {
  const tier = resolveCommercialTier(inputs.sqft);
  const byArea = Math.round(inputs.sqft * tier.pricePerSqft);
  // Every commercial job carries the sheet's minimum, whatever the area works out to.
  const minimumApplied = byArea < COMMERCIAL_MINIMUM;
  const amount = minimumApplied ? COMMERCIAL_MINIMUM : byArea;

  const baseLineItem: QuoteLineItem = {
    id: 'base',
    label: minimumApplied
      ? `Commercial — ${COMMERCIAL_MINIMUM.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        })} minimum`
      : `Commercial — ${inputs.sqft.toLocaleString()} sqft @ ${formatPricePerSqft(
          tier.pricePerSqft,
        )}/sqft`,
    amount,
  };

  return {
    inputs,
    tier,
    baseLineItem,
    addOnLineItems: [],
    total: amount,
    durationLabel: tier.durationLabel,
    minimumApplied,
  };
}

export const ALL_ADD_ONS = ADD_ONS;
