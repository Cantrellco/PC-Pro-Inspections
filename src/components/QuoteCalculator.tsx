import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ADD_ONS,
  DEFAULT_SQFT,
  SQFT_MAX,
  SQFT_MIN,
  SQFT_STEP,
} from '@/config/pricing';
import { calculateQuote } from '@/services/pricing';
import { submitLead } from '@/services/leads';
import { track } from '@/services/analytics';
import Card from './Card';
import Field from './Field';
import Button from './Button';
import type { LeadPayload, QuoteResult } from '@/types';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  propertyAddress: '',
  message: '',
};

export default function QuoteCalculator() {
  const navigate = useNavigate();

  // ─── Calculator state ──────────────────────────────────────────────────
  const [sqft, setSqft] = useState<number>(DEFAULT_SQFT);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const quote: QuoteResult = useMemo(
    () => calculateQuote({ sqft, addOnIds: selectedAddOns }),
    [sqft, selectedAddOns],
  );

  // Debounced "quote_calculated" event
  useEffect(() => {
    const id = window.setTimeout(() => {
      track('quote_calculated', {
        sqft,
        addons: selectedAddOns.join(',') || 'none',
        total: quote.total,
      });
    }, 600);
    return () => window.clearTimeout(id);
  }, [sqft, selectedAddOns, quote.total]);

  // ─── Lead form state ──────────────────────────────────────────────────
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
    );
  };

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    if (!form.email.trim()) {
      e.email = 'Please share an email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'That email looks off — please double-check it.';
    }
    if (!form.phone.trim()) {
      e.phone = 'A phone number speeds up scheduling.';
    } else if (form.phone.replace(/\D/g, '').length < 10) {
      e.phone = 'Phone number looks too short.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    const payload: LeadPayload = {
      source: 'quote_form',
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      propertyAddress: form.propertyAddress.trim(),
      message: form.message.trim(),
      quote,
    };
    const result = await submitLead(payload);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      setForm(initialForm);
    } else {
      setSubmitError(result.error);
    }
  };

  const goToBooking = () => {
    track('book_now_click', { location: 'calculator' });
    const params = new URLSearchParams({
      sqft: String(sqft),
      estimate: String(quote.total),
    });
    if (selectedAddOns.length > 0) {
      params.set('addons', selectedAddOns.join(','));
    }
    navigate(`/book?${params.toString()}`);
  };

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Left: inputs */}
      <Card className="lg:col-span-3 space-y-7">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="sqft" className="field-label !mb-0">
              Square footage
            </label>
            <span className="text-white font-semibold text-lg">
              {sqft.toLocaleString()} sqft
            </span>
          </div>
          <input
            id="sqft"
            type="range"
            min={SQFT_MIN}
            max={SQFT_MAX}
            step={SQFT_STEP}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="w-full accent-flag-red"
            aria-describedby="sqft-tier"
          />
          <p id="sqft-tier" className="mt-1 text-xs text-bone-dim">
            Tier: <span className="text-bone-muted">{quote.tier.label}</span>
          </p>
        </div>

        <fieldset>
          <legend className="field-label">Optional extra services</legend>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {ADD_ONS.map((a) => {
              const checked = selectedAddOns.includes(a.id);
              return (
                <li key={a.id}>
                  <label
                    className={`flex gap-3 cursor-pointer rounded-md border p-3 transition-colors ${
                      checked
                        ? 'border-flag-redSoft bg-flag-red/10'
                        : 'border-white/10 bg-ink-100/60 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddOn(a.id)}
                      className="mt-1 accent-flag-red"
                      aria-describedby={`addon-${a.id}-desc`}
                    />
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold text-white">{a.label}</span>
                        <span className="text-flag-redSoft font-semibold whitespace-nowrap">
                          +{currency.format(a.price)}
                        </span>
                      </span>
                      <span
                        id={`addon-${a.id}-desc`}
                        className="block text-xs text-bone-muted mt-1"
                      >
                        {a.description}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </Card>

      {/* Right: itemized breakdown */}
      <Card rim className="lg:col-span-2 flex flex-col gap-5">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-bone-muted mb-3 font-semibold">
            Your Estimate
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between gap-3">
              <span className="text-bone">{quote.baseLineItem.label}</span>
              <span className="text-white font-semibold whitespace-nowrap">
                {currency.format(quote.baseLineItem.amount)}
              </span>
            </li>
            {quote.addOnLineItems.map((li) => (
              <li key={li.id} className="flex justify-between gap-3 animate-fade-up">
                <span className="text-bone">{li.label}</span>
                <span className="text-white font-semibold whitespace-nowrap">
                  +{currency.format(li.amount)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 mt-4 pt-4 flex items-baseline justify-between">
            <span className="text-bone-muted text-sm uppercase tracking-wider">
              Estimated Total
            </span>
            <span
              className="text-4xl font-bold text-white font-display"
              aria-live="polite"
            >
              {currency.format(quote.total)}
            </span>
          </div>
        </div>
        <p className="text-xs text-bone-dim">
          Estimate only — final price confirmed at scheduling.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <Button onClick={goToBooking} className="!py-3">
            Book This Inspection
          </Button>
          <Button
            variant="secondary"
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
            aria-controls="quote-request-form"
            className="!py-3"
          >
            {formOpen ? 'Hide Form' : 'Request This Quote'}
          </Button>
        </div>
      </Card>

      {/* Lead form */}
      {formOpen && (
        <Card
          rim
          className="lg:col-span-5 animate-fade-up"
        >
          <h3 className="font-display text-2xl text-white mb-1">
            Send us this quote
          </h3>
          <p className="text-bone-muted mb-6">
            We will confirm scheduling and answer any questions within a few
            business hours.
          </p>

          {submitted ? (
            <div
              role="status"
              className="rounded-md border border-flag-navyLight/40 bg-flag-navy/15 p-5 text-bone"
            >
              <p className="font-semibold text-white mb-1">
                Thanks — we got it.
              </p>
              <p className="text-sm text-bone-muted">
                We will call you back shortly to confirm scheduling. Keep an eye
                on your phone.
              </p>
            </div>
          ) : (
            <form
              id="quote-request-form"
              onSubmit={handleSubmit}
              noValidate
              className="grid sm:grid-cols-2 gap-5"
            >
              <Field
                id="qf-name"
                label="Your name"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="qf-phone"
                label="Phone"
                required
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                error={errors.phone}
                autoComplete="tel"
              />
              <Field
                id="qf-email"
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                id="qf-address"
                label="Property address (optional)"
                value={form.propertyAddress}
                onChange={(e) => update('propertyAddress', e.target.value)}
                autoComplete="street-address"
              />
              <div className="sm:col-span-2">
                <Field
                  as="textarea"
                  id="qf-message"
                  label="Anything we should know? (optional)"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  hint="Closing date, access notes, specific concerns, etc."
                />
              </div>

              {submitError && (
                <div
                  role="alert"
                  className="sm:col-span-2 rounded-md border border-flag-redSoft/40 bg-flag-red/10 p-4 text-sm text-bone"
                >
                  {submitError}
                </div>
              )}

              <div className="sm:col-span-2 flex items-center justify-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send My Quote Request'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      )}
    </div>
  );
}
