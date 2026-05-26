import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import type { LeadPayload, LeadResult } from '@/types';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const PLACEHOLDER_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

/**
 * THE single lead-submission seam.
 *
 * Today: POSTs to Web3Forms.
 * Tomorrow: change the URL/body to your own /api/leads. Components untouched.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (
    !siteConfig.web3FormsAccessKey ||
    siteConfig.web3FormsAccessKey === PLACEHOLDER_KEY
  ) {
    return {
      ok: false,
      error:
        'The contact form is not yet configured. Please call or email us using the contact info above — and tell the owner to set the Web3Forms key.',
    };
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

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return {
      ok: false,
      error: `Could not reach the form server. ${message}. Please call us directly.`,
    };
  }
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
