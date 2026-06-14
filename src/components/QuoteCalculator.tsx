import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ADD_ONS,
  COMMERCIAL_SQFT_MAX,
  COMMERCIAL_SQFT_MIN,
  COMMERCIAL_SQFT_STEP,
  DEFAULT_COMMERCIAL_SQFT,
  DEFAULT_SQFT,
  PRICING_NOTE,
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
import type { LeadPayload, PropertyType, QuoteResult } from '@/types';

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

const PROPERTY_TYPES: { id: PropertyType; label: string }[] = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
];

export default function QuoteCalculator() {
  const navigate = useNavigate();

  // ─── Calculator state ──────────────────────────────────────────────────
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [sqft, setSqft] = useState<number>(DEFAULT_SQFT);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const isCommercial = propertyType === 'commercial';
  const sliderMin = isCommercial ? COMMERCIAL_SQFT_MIN : SQFT_MIN;
  const sliderMax = isCommercial ? COMMERCIAL_SQFT_MAX : SQFT_MAX;
  const sliderStep = isCommercial ? COMMERCIAL_SQFT_STEP : SQFT_STEP;

  const quote: QuoteResult = useMemo(
    () =>
      calculateQuote({
        propertyType,
        sqft,
        addOnIds: isCommercial ? [] : selectedAddOns,
      }),
    [propertyType, sqft, selectedAddOns, isCommercial],
  );

  // Fill percentage drives the slider's gradient track (see .range-pro).
  const rangeFill = ((sqft - sliderMin) / (sliderMax - sliderMin)) * 100;

  // Switching property type resets sqft to that mode's sensible default.
  const switchType = (t: PropertyType) => {
    if (t === propertyType) return;
    setPropertyType(t);
    setSqft(t === 'commercial' ? DEFAULT_COMMERCIAL_SQFT : DEFAULT_SQFT);
  };

  // Debounced "quote_calculated" event
  useEffect(() => {
    const id = window.setTimeout(() => {
      track('quote_calculated', {
        propertyType,
        sqft,
        addons:
          propertyType === 'commercial'
            ? 'none'
            : selectedAddOns.join(',') || 'none',
        total: quote.total,
      });
    }, 600);
    return () => window.clearTimeout(id);
  }, [propertyType, sqft, selectedAddOns, quote.total]);

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
      type: propertyType,
      sqft: String(sqft),
      estimate: String(quote.total),
    });
    if (!isCommercial && selectedAddOns.length > 0) {
      params.set('addons', selectedAddOns.join(','));
    }
    navigate(`/book?${params.toString()}`);
  };

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Left: inputs */}
      <Card glow className="lg:col-span-3 space-y-8">
        {/* Property type toggle */}
        <div>
          <span className="field-label">Property type</span>
          <div
            role="radiogroup"
            aria-label="Property type"
            className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-ink-100/60 p-1.5"
          >
            {PROPERTY_TYPES.map((pt) => {
              const active = pt.id === propertyType;
              return (
                <button
                  key={pt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => switchType(pt.id)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flag-redSoft focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                    active
                      ? 'bg-flag-red text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]'
                      : 'text-bone-muted hover:text-white'
                  }`}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Square footage slider */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <label htmlFor="sqft" className="field-label !mb-0">
              Square footage
            </label>
            <span className="font-display text-2xl font-semibold text-white">
              {sqft.toLocaleString()}
              <span className="ml-1 text-sm font-sans font-normal text-bone-dim">sqft</span>
            </span>
          </div>
          <input
            id="sqft"
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="range-pro"
            style={{ '--range-fill': `${rangeFill}%` } as CSSProperties}
            aria-describedby="sqft-tier"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-bone-dim">
            <span>{sliderMin.toLocaleString()} sqft</span>
            <span id="sqft-tier">
              Tier: <span className="font-medium text-brass-soft">{quote.tier.label}</span>
              {quote.durationLabel && (
                <span className="text-bone-dim"> · {quote.durationLabel} on-site</span>
              )}
            </span>
            <span>{sliderMax.toLocaleString()}+ sqft</span>
          </div>
        </div>

        {/* Optional add-ons (residential only) */}
        {!isCommercial && (
          <fieldset>
            <legend className="field-label">Optional extra services</legend>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {ADD_ONS.map((a) => {
                const checked = selectedAddOns.includes(a.id);
                return (
                  <li key={a.id}>
                    <label
                      className={`flex cursor-pointer gap-3 rounded-xl border p-3.5 transition-all duration-200 ${
                        checked
                          ? 'border-flag-redSoft/60 bg-flag-red/10 shadow-[0_0_0_1px_rgba(239,74,99,0.15)]'
                          : 'border-white/10 bg-ink-100/60 hover:border-white/25 hover:bg-ink-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(a.id)}
                        className="peer sr-only"
                        aria-describedby={`addon-${a.id}-desc`}
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-flag-redSoft peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink ${
                          checked
                            ? 'border-flag-red bg-flag-red text-white'
                            : 'border-white/25 text-transparent'
                        }`}
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="font-semibold text-white">{a.label}</span>
                          <span className="font-semibold whitespace-nowrap text-flag-redSoft">
                            +{currency.format(a.price)}
                          </span>
                        </span>
                        <span
                          id={`addon-${a.id}-desc`}
                          className="mt-1 block text-xs leading-relaxed text-bone-muted"
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
        )}

        {isCommercial && (
          <p className="rounded-xl border border-white/10 bg-ink-100/60 p-3.5 text-xs leading-relaxed text-bone-muted">
            Commercial inspections are priced per square foot and scale with the
            building. For multi-structure properties or specialty add-ons, call
            us for a tailored quote.
          </p>
        )}
      </Card>

      {/* Right: itemized breakdown (sticky on desktop) */}
      <Card rim className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-bone-muted">
            Your Estimate
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between gap-3">
              <span className="text-bone">{quote.baseLineItem.label}</span>
              <span className="font-semibold whitespace-nowrap text-white">
                {currency.format(quote.baseLineItem.amount)}
              </span>
            </li>
            {quote.addOnLineItems.map((li) => (
              <li key={li.id} className="flex animate-fade-up justify-between gap-3">
                <span className="text-bone">{li.label}</span>
                <span className="font-semibold whitespace-nowrap text-white">
                  +{currency.format(li.amount)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="text-sm uppercase tracking-wider text-bone-muted">
              Estimated Total
            </span>
            <span
              className="font-display text-4xl font-bold text-gradient-brass"
              aria-live="polite"
              aria-label={`Estimated total ${currency.format(quote.total)}`}
            >
              {currency.format(quote.total)}
            </span>
          </div>
          {quote.durationLabel && (
            <div className="mt-2 flex items-center justify-between text-xs text-bone-dim">
              <span>Estimated on-site time</span>
              <span className="font-medium text-bone">{quote.durationLabel}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-bone-dim">
          Estimate only — final price confirmed at scheduling. {PRICING_NOTE}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
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
        <Card rim className="animate-fade-up lg:col-span-5">
          <h3 className="mb-1 font-display text-2xl text-white">
            Send us this quote
          </h3>
          <p className="mb-6 text-bone-muted">
            We will confirm scheduling and answer any questions within a few
            business hours.
          </p>

          {submitted ? (
            <div
              role="status"
              className="rounded-md border border-flag-navyLight/40 bg-flag-navy/15 p-5 text-bone"
            >
              <p className="mb-1 font-semibold text-white">
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
              className="grid gap-5 sm:grid-cols-2"
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
                  className="rounded-md border border-flag-redSoft/40 bg-flag-red/10 p-4 text-sm text-bone sm:col-span-2"
                >
                  {submitError}
                </div>
              )}

              <div className="flex items-center justify-end sm:col-span-2">
                <Button type="submit" loading={submitting}>
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
