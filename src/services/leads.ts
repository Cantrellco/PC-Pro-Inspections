import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import type { LeadPayload, LeadResult } from '@/types';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const PLACEHOLDER_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

/**
 * THE single lead-submission seam.
 *
 * Two modes, chosen automatically by whether a Web3Forms key is set:
 *
 *  - No key yet (placeholder still in place): fall back to a `mailto:` draft.
 *    Submitting opens the visitor's email app with everything pre-filled; they
 *    press Send and it reaches `siteConfig.email`. No account, no backend — but
 *    it relies on the visitor having a mail client and taking that final step.
 *  - Key set: POST to Web3Forms, which emails the lead automatically (no extra
 *    step for the visitor). Paste a real key into `web3FormsAccessKey` and the
 *    form upgrades to this path with no other code changes.
 *
 * Tomorrow (own backend): point the `fetch` below at `/api/leads`. Components
 * are untouched in every case.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const keyConfigured =
    !!siteConfig.web3FormsAccessKey &&
    siteConfig.web3FormsAccessKey !== PLACEHOLDER_KEY;

  if (!keyConfigured) {
    return submitViaMailto(payload);
  }

  const body = buildWeb3FormsBody(payload);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return {
        ok: false,
        error: `Submission failed (${response.status}). ${text || 'Please try again or call us directly.'}`,
      };
    }

    const data = (await response.json()) as { success?: boolean; message?: string };
    if (!data.success) {
      return {
        ok: false,
        error: data.message ?? 'Submission failed. Please try again or call us directly.',
      };
    }

    track(
      payload.source === 'quote_form' ? 'quote_request_submit' : 'lead_form_submit',
      { source: payload.source },
    );

    return { ok: true, via: 'web3forms' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      ok: false,
      error: `Could not reach the form server. ${message}. Please call us directly.`,
    };
  }
}

/**
 * No-backend fallback: open the visitor's email client with a pre-filled draft
 * addressed to the business. Used until a Web3Forms key is set.
 */
function submitViaMailto(payload: LeadPayload): LeadResult {
  // Guard against non-browser contexts (SSR, tests).
  if (typeof window === 'undefined') {
    return { ok: false, error: `Please email us directly at ${siteConfig.email}.` };
  }

  window.location.href = buildMailtoUrl(payload);

  track(
    payload.source === 'quote_form' ? 'quote_request_submit' : 'lead_form_submit',
    { source: payload.source, via: 'mailto' },
  );

  return { ok: true, via: 'mailto' };
}

function buildMailtoUrl(payload: LeadPayload): string {
  const subject =
    payload.source === 'quote_form'
      ? `Quote request — ${payload.name}`
      : `Website message — ${payload.name}`;

  const lines: string[] = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
  ];
  if (payload.propertyAddress) lines.push(`Property address: ${payload.propertyAddress}`);
  if (payload.message) lines.push('', 'Message:', payload.message);

  if (payload.quote) {
    const q = payload.quote;
    lines.push(
      '',
      '--- Quote estimate ---',
      `Property: ${q.inputs.sqft.toLocaleString()} sqft — ${q.tier.label}`,
      `Base: $${q.baseLineItem.amount}`,
    );
    if (q.addOnLineItems.length) {
      lines.push(
        `Add-ons: ${q.addOnLineItems.map((li) => `${li.label} ($${li.amount})`).join(', ')}`,
      );
    }
    lines.push(`Estimated total: $${q.total}`);
  }

  const body = lines.join('\r\n');
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildWeb3FormsBody(payload: LeadPayload): Record<string, unknown> {
  const subject =
    payload.source === 'quote_form'
      ? `Quote request — ${payload.name}`
      : `Contact form — ${payload.name}`;

  const base = {
    access_key: siteConfig.web3FormsAccessKey,
    subject,
    from_name: siteConfig.businessName,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    source: payload.source,
    property_address: payload.propertyAddress ?? '',
    message: payload.message ?? '',
    // Honeypot. Web3Forms drops the message if this field has any value.
    botcheck: '',
  };

  if (payload.quote) {
    const q = payload.quote;
    return {
      ...base,
      quote_sqft: q.inputs.sqft,
      quote_tier: q.tier.label,
      quote_base_price: q.baseLineItem.amount,
      quote_addons: q.addOnLineItems.map((li) => `${li.label} ($${li.amount})`).join(', '),
      quote_total: q.total,
    };
  }

  return base;
}
