import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ADD_ONS,
  COMMERCIAL_MINIMUM,
  COMMERCIAL_TIERS,
  STANDALONE_SERVICES,
  COMMERCIAL_SQFT_MAX,
  COMMERCIAL_SQFT_MIN,
  COMMERCIAL_SQFT_STEP,
  DEFAULT_COMMERCIAL_SQFT,
  DEFAULT_SQFT,
  PRICING_NOTE,
  QUOTE_ONLY_SERVICES,
  SQFT_MAX,
  SQFT_MIN,
  SQFT_STEP,
  SQFT_TIERS,
} from '@/config/pricing';
import { siteConfig } from '@/config/siteConfig';
import { calculateQuote } from '@/services/pricing';
import { submitLead } from '@/services/leads';
import { track } from '@/services/analytics';
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
const initialForm: FormState = { name: '', email: '', phone: '', propertyAddress: '', message: '' };

const PROPERTY_TYPES: { id: PropertyType; label: string }[] = [
  { id: 'residential', label: 'House' },
  { id: 'commercial', label: 'Commercial' },
];

type Props = {
  /**
   * `ticket` — the compact price ticket (Home hero): residential only, slider,
   *            add-ons, the figure, Call + Book.
   * `full`   — the Services page version with the commercial toggle, quote-only
   *            services, and the request form.
   */
  variant?: 'ticket' | 'full';
};

export default function QuoteCalculator({ variant = 'full' }: Props) {
  const navigate = useNavigate();
  const ticket = variant === 'ticket';

  // ─── Calculator state ──────────────────────────────────────────────────
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [sqft, setSqft] = useState<number>(DEFAULT_SQFT);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const isCommercial = propertyType === 'commercial';
  const sliderMin = isCommercial ? COMMERCIAL_SQFT_MIN : SQFT_MIN;
  const sliderMax = isCommercial ? COMMERCIAL_SQFT_MAX : SQFT_MAX;
  const sliderStep = isCommercial ? COMMERCIAL_SQFT_STEP : SQFT_STEP;

  const quote: QuoteResult = useMemo(
    () => calculateQuote({ propertyType, sqft, addOnIds: isCommercial ? [] : selectedAddOns }),
    [propertyType, sqft, selectedAddOns, isCommercial],
  );
  const rangeFill = ((sqft - sliderMin) / (sliderMax - sliderMin)) * 100;
  // Tick scale printed under the track: the top of every price band.
  const ticks = (isCommercial ? COMMERCIAL_TIERS : SQFT_TIERS)
    .map((t) => t.max)
    .filter((m): m is number => typeof m === 'number' && m > sliderMin && m <= sliderMax)
    .map((m) => ({ value: m, pct: ((m - sliderMin) / (sliderMax - sliderMin)) * 100 }));

  const switchType = (t: PropertyType) => {
    if (t === propertyType) return;
    setPropertyType(t);
    setSqft(t === 'commercial' ? DEFAULT_COMMERCIAL_SQFT : DEFAULT_SQFT);
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      track('quote_calculated', {
        propertyType,
        sqft,
        addons: propertyType === 'commercial' ? 'none' : selectedAddOns.join(',') || 'none',
        total: quote.total,
      });
    }, 600);
    return () => window.clearTimeout(id);
  }, [propertyType, sqft, selectedAddOns, quote.total]);

  // Stamp the figure when it changes.
  const [stamp, setStamp] = useState(0);
  useEffect(() => {
    setStamp((s) => s + 1);
  }, [quote.total]);

  // ─── Lead form state ──────────────────────────────────────────────────
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sentVia, setSentVia] = useState<'web3forms' | 'mailto' | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));
  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Tell us your name.';
    if (!form.email.trim()) e.email = 'Add an email so we can confirm.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'That email looks off. Check it.';
    if (!form.phone.trim()) e.phone = 'Add a phone number so Paul can call you back.';
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Phone number looks too short.';
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
      setSentVia(result.via ?? 'web3forms');
      setForm(initialForm);
    } else {
      setSubmitError(result.error);
    }
  };

  const goToBooking = () => {
    track('book_now_click', { location: ticket ? 'home_ticket' : 'calculator' });
    const params = new URLSearchParams({ type: propertyType, sqft: String(sqft), estimate: String(quote.total) });
    if (!isCommercial && selectedAddOns.length > 0) params.set('addons', selectedAddOns.join(','));
    navigate(`/book?${params.toString()}`);
  };

  // ─── Shared pieces ───────────────────────────────────────────────────
  const slider = (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <label htmlFor={`${variant}-sqft`} className="label">
          {isCommercial ? 'Building size' : 'Your house'}
        </label>
        <span className="num font-display text-2xl leading-none text-ink">
          {sqft.toLocaleString()} <span className="font-condensed text-base font-semibold uppercase text-ink-mute">sq ft</span>
        </span>
      </div>
      <input
        id={`${variant}-sqft`}
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={sliderStep}
        value={sqft}
        onChange={(e) => setSqft(Number(e.target.value))}
        className="range-cut"
        style={{ '--range-fill': `${rangeFill}%` } as CSSProperties}
        aria-describedby={`${variant}-sqft-tier`}
      />
      <div aria-hidden="true" className="relative -mt-2 h-6">
        {ticks.map((t) => (
          <span
            key={t.value}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${t.pct}%` }}
          >
            <span className={`w-[2px] bg-ink ${t.value === quote.tier.max ? 'h-3' : 'h-2'}`} />
            <span
              className={`num mt-0.5 font-condensed text-[0.78rem] font-semibold uppercase leading-none tracking-wide ${
                t.value === quote.tier.max ? 'text-red' : 'text-ink-mute'
              }`}
            >
              {t.value >= 1000 ? `${Math.round(t.value / 100) / 10}k` : t.value}
            </span>
          </span>
        ))}
      </div>
      <p id={`${variant}-sqft-tier`} className="num font-condensed text-xs font-semibold uppercase tracking-wide text-ink">
        {quote.tier.label.replace('sqft', 'sq ft')}
        {quote.durationLabel && ` · ${quote.durationLabel} on site`}
      </p>
    </div>
  );

  const addOns = !isCommercial && (
    <fieldset>
      <legend className="label mb-2">Add</legend>
      <ul className="grid gap-2">
        {ADD_ONS.map((a) => {
          const checked = selectedAddOns.includes(a.id);
          return (
            <li key={a.id}>
              <label className="flex cursor-pointer items-start gap-3 border-2 border-ink bg-paper-white p-3 transition-colors hover:bg-paper">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAddOn(a.id)}
                  className="peer sr-only"
                  aria-describedby={`${variant}-addon-${a.id}-desc`}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-2 border-ink peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy ${
                    checked ? 'bg-red text-paper' : 'bg-paper-white text-transparent'
                  }`}
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="square" />
                  </svg>
                </span>
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-condensed text-lg font-bold uppercase leading-none tracking-wide text-ink">
                      {a.label.replace(' Inspection', '')}
                    </span>
                    <span className="num font-display text-lg leading-none text-red">+{currency.format(a.price)}</span>
                  </span>
                  {a.durationHours ? (
                    <span className="label-sm mt-1 block normal-case tracking-normal">
                      Adds about {a.durationHours} hours on site
                    </span>
                  ) : null}
                  {!ticket && (
                    <span id={`${variant}-addon-${a.id}-desc`} className="mt-1 block text-sm text-ink-soft">
                      {a.description}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );

  const figure = (
    <div className="border-t-3 border-ink pt-4">
      <p className="label-sm">Your price</p>
      <p
        key={stamp}
        className="num font-display leading-none text-red motion-safe:animate-register"
        style={{ fontSize: ticket ? 'clamp(3.4rem, 6vw, 4.6rem)' : 'clamp(3rem, 5vw, 4rem)' }}
        aria-live="polite"
        aria-label={`Your price ${currency.format(quote.total)}`}
      >
        {currency.format(quote.total)}
      </p>
      <p className="mt-1 text-sm text-ink-mute">
        {isCommercial
          ? quote.minimumApplied
            ? `Commercial minimum. Above ${Math.round(COMMERCIAL_MINIMUM / 0.2).toLocaleString()} sq ft the rate takes over.`
            : 'Per-square-foot rate.'
          : 'Flat rate.'}{' '}
        Confirmed when you book. {PRICING_NOTE}
      </p>
    </div>
  );

  // ─── Ticket (Home hero) ──────────────────────────────────────────────
  if (ticket) {
    return (
      <div className="ticket-cast">
      <div className="ticket p-5 sm:p-6">
        <h2 className="display-3 cut-brass mb-4">Your price</h2>
        <div className="space-y-5">
          {slider}
          {addOns}
          {figure}
          <div className="grid gap-3">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              onClick={() => track('tel_click', { location: 'home_ticket' })}
              className="btn-primary w-full !text-lg"
            >
              Call <span className="num">{siteConfig.phone}</span>
            </a>
            <button type="button" onClick={goToBooking} className="btn-ghost justify-center">
              Book this inspection
            </button>
          </div>
          <p className="border-t-2 border-ink pt-3 text-sm text-ink-mute">
            Commercial building? Mold, pool, or thermal imaging?{' '}
            <Link to="/services" className="font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red">
              See the full price sheet
            </Link>
            .
          </p>
        </div>
      </div>
      </div>
    );
  }

  // ─── Full (Services page) ────────────────────────────────────────────
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-7 lg:col-span-3">
        <div>
          <span className="label mb-2 block">What are we inspecting?</span>
          <div role="radiogroup" aria-label="Property type" className="grid grid-cols-2 border-3 border-ink">
            {PROPERTY_TYPES.map((pt, i) => {
              const active = pt.id === propertyType;
              return (
                <button
                  key={pt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => switchType(pt.id)}
                  className={`px-4 py-3 font-condensed text-lg font-bold uppercase tracking-wide transition-colors ${
                    i > 0 ? 'border-l-3 border-ink' : ''
                  } ${active ? 'bg-navy text-paper' : 'bg-paper-white text-ink hover:bg-paper'}`}
                >
                  {pt.label}
                </button>
              );
            })}
          </div>
        </div>

        {slider}
        {addOns}

        {!isCommercial && STANDALONE_SERVICES.length > 0 && (
          <div>
            <p className="label mb-2">Booked on its own</p>
            <ul className="grid gap-2 sm:grid-cols-3">
              {STANDALONE_SERVICES.map((a) => (
                <li key={a.id} className="border-2 border-ink bg-paper-white p-3">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-condensed text-lg font-bold uppercase leading-none tracking-wide text-ink">
                      {a.label}
                    </span>
                    <span className="num font-display text-lg leading-none text-ink">
                      {currency.format(a.price)}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-soft">{a.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isCommercial && QUOTE_ONLY_SERVICES.length > 0 && (
          <div>
            <p className="label mb-2">Also available, priced by the job</p>
            <ul className="grid gap-2 sm:grid-cols-3">
              {QUOTE_ONLY_SERVICES.map((s) => (
                <li key={s.id} className="border-2 border-dashed border-ink p-3">
                  <p className="font-condensed text-lg font-bold uppercase leading-none tracking-wide text-ink">{s.label}</p>
                  <p className="mt-1.5 text-sm text-ink-soft">{s.description}</p>
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    onClick={() => track('tel_click', { location: 'calculator_quote_only' })}
                    className="btn-ghost mt-2 text-sm"
                  >
                    Call for a price
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isCommercial && (
          <p className="border-2 border-ink bg-paper-white p-3.5 text-sm text-ink-soft">
            Commercial buildings are priced per square foot, with a{' '}
            {currency.format(COMMERCIAL_MINIMUM)} minimum, up to 10,000 sq ft. Larger buildings,
            multiple structures, or specialty add-ons: call for a tailored price.
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-32 lg:col-span-2 lg:self-start">
      <div className="ticket-cast">
      <div className="ticket flex h-full flex-col gap-5 p-5 sm:p-6">
        <h3 className="display-3 cut-brass">Your ticket</h3>
        <ul className="space-y-2 border-t-2 border-ink pt-3 ">
          <li className="flex justify-between gap-3">
            <span className="text-ink-soft">{quote.baseLineItem.label.replace('sqft', 'sq ft')}</span>
            <span className="num font-semibold text-ink">{currency.format(quote.baseLineItem.amount)}</span>
          </li>
          {quote.addOnLineItems.map((li) => (
            <li key={li.id} className="flex justify-between gap-3 motion-safe:animate-fade-up">
              <span className="text-ink-soft">{li.label}</span>
              <span className="num font-semibold text-ink">+{currency.format(li.amount)}</span>
            </li>
          ))}
        </ul>
        {figure}
        <div className="grid gap-3">
          <Button onClick={goToBooking}>Book this inspection</Button>
          <Button
            variant="secondary"
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
            aria-controls="quote-request-form"
          >
            {formOpen ? 'Hide the form' : 'Send this to Paul'}
          </Button>
        </div>
      </div>
      </div>
      </div>

      {formOpen && (
        <div className="sheet sheet-navy p-6 motion-safe:animate-fade-up sm:p-8 lg:col-span-5">
          <h3 className="display-3">Send this quote to Paul</h3>
          <p className="mt-2 mb-6 text-ink-soft">He confirms scheduling and answers questions within a few business hours.</p>

          {sentVia ? (
            <div role="status" className="border-3 border-navy bg-paper p-5 text-ink-soft">
              {sentVia === 'mailto' ? (
                <>
                  <p className="mb-1 font-condensed text-xl font-bold uppercase text-ink">Your email is ready to send.</p>
                  <p>
                    Your email app opened with this quote in the message. Press <strong>Send</strong>. If nothing opened,
                    email{' '}
                    <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy underline decoration-2 underline-offset-4">
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-1 font-condensed text-xl font-bold uppercase text-ink">Got it.</p>
                  <p>Paul will call you back to confirm scheduling. Keep an eye on your phone.</p>
                </>
              )}
            </div>
          ) : (
            <form id="quote-request-form" onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field id="qf-name" label="Your name" required value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} autoComplete="name" />
              <Field id="qf-phone" label="Phone" required inputMode="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} error={errors.phone} autoComplete="tel" />
              <Field id="qf-email" label="Email" required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} error={errors.email} autoComplete="email" />
              <Field id="qf-address" label="Property address (optional)" value={form.propertyAddress} onChange={(e) => update('propertyAddress', e.target.value)} autoComplete="street-address" />
              <div className="sm:col-span-2">
                <Field as="textarea" id="qf-message" label="Anything Paul should know? (optional)" value={form.message} onChange={(e) => update('message', e.target.value)} hint="Closing date, access notes, specific concerns." />
              </div>
              {submitError && (
                <div role="alert" className="border-3 border-red bg-paper-white p-4 text-sm text-ink sm:col-span-2">
                  {submitError}
                </div>
              )}
              <div className="flex items-center justify-end sm:col-span-2">
                <Button type="submit" loading={submitting}>
                  {submitting ? 'Sending' : 'Send my quote'}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
