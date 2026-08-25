import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { findAddOn } from '@/config/pricing';
import { getBookingConfig, isBookingConfigured } from '@/services/booking';
import { track } from '@/services/analytics';
import { formatTime } from '@/lib/time';
import type { PropertyType } from '@/types';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import CTABand from '@/components/CTABand';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function BookNow() {
  const c = siteConfig;
  const configured = isBookingConfigured();
  const booking = getBookingConfig();
  const [params] = useSearchParams();
  const [embedLoaded, setEmbedLoaded] = useState(false);

  const handoff = useMemo(() => {
    const sqftRaw = params.get('sqft');
    const estimateRaw = params.get('estimate');
    const addonsRaw = params.get('addons') ?? '';
    const typeRaw = params.get('type');

    const sqft = sqftRaw ? Number(sqftRaw) : undefined;
    const estimate = estimateRaw ? Number(estimateRaw) : undefined;
    const addOnIds = addonsRaw ? addonsRaw.split(',').filter(Boolean) : [];
    const propertyType: PropertyType = typeRaw === 'commercial' ? 'commercial' : 'residential';

    return {
      propertyType,
      sqft: Number.isFinite(sqft) ? sqft : undefined,
      estimate: Number.isFinite(estimate) ? estimate : undefined,
      addOnIds,
      addOnLabels: addOnIds.map((id) => findAddOn(id)?.label).filter(Boolean) as string[],
      hasAny: Boolean(sqftRaw || estimateRaw || addonsRaw || typeRaw),
    };
  }, [params]);

  const embedUrl = configured
    ? booking.prefillUrl({
        propertyType: handoff.propertyType,
        sqft: handoff.sqft,
        addOnIds: handoff.addOnIds,
        estimate: handoff.estimate,
      })
    : '';

  // The hand-off, set as ledger rows.
  const rows: [string, string][] = [];
  if (handoff.hasAny) {
    rows.push(['Property', handoff.propertyType === 'commercial' ? 'Commercial' : 'House']);
    if (handoff.sqft !== undefined) rows.push(['Size', `${handoff.sqft.toLocaleString()} sq ft`]);
    if (handoff.addOnLabels.length > 0) rows.push(['Extras', handoff.addOnLabels.join(' · ')]);
    if (handoff.estimate !== undefined) rows.push(['Estimate', currency.format(handoff.estimate)]);
  }
  const summary = [
    handoff.sqft !== undefined ? `${handoff.sqft.toLocaleString()} sq ft` : null,
    ...handoff.addOnLabels,
    handoff.estimate !== undefined ? `estimated ${currency.format(handoff.estimate)}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const firstDay = c.hours[0];

  return (
    <>
      <SEO
        title={`Book a Home Inspection | ${c.businessName}`}
        description={`Pick a time${configured ? ' online' : ''} or call ${c.phone}. Calculator inputs carry over so you only say it once.`}
        pathname="/book"
      />

      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h1 className="display-1 cut-brass animate-fade-up">Pick a time.</h1>
            <p className="lede mt-4 max-w-md">
              {configured
                ? 'Choose a slot below. Paul confirms by phone.'
                : `Online booking is coming. For now, call and Paul will find a slot in ${c.responsePromise.inspectionDays} days or fewer most weeks.`}
            </p>
            {firstDay && (
              <p className="mt-6 text-ink-soft">
                <span className="label mr-2">Hours</span>
                Most days{' '}
                <span className="num">
                  {formatTime(firstDay.open)} – {formatTime(firstDay.close)}
                </span>
                .
              </p>
            )}
          </div>

          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-7">
            {configured ? (
              // ─── Configured: the scheduler on a sheet ─────────────────
              <div>
                <div className="sheet sheet-navy p-0">
                  <div
                    className="relative w-full overflow-hidden bg-paper-deep"
                    style={{ aspectRatio: '4 / 5', minHeight: '40rem' }}
                    aria-busy={!embedLoaded}
                  >
                    <iframe
                      src={embedUrl}
                      title={`${c.businessName} online booking`}
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      onLoad={() => setEmbedLoaded(true)}
                      allow="payment; geolocation; camera"
                    />
                  </div>
                </div>
                {rows.length > 0 && (
                  <p className="mt-4 text-sm text-ink-mute">Your inputs: {summary}. They follow you into the scheduler.</p>
                )}
                <p className="mt-4 text-ink-soft">
                  Rather talk first?{' '}
                  <a
                    href={`tel:${c.phoneHref}`}
                    onClick={() => track('tel_click', { location: 'booking_below_embed' })}
                    className="num font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red"
                  >
                    Call {c.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              // ─── Not configured: a ticket ─────────────────────────────
              <Card ticket>
                <h2 className="display-3 cut-navy">Online booking is coming</h2>
                <p className="mt-3 max-w-lg text-ink-soft">
                  Until it's here, the phone is the schedule. Most appointments are set in one short
                  call.
                </p>

                {rows.length > 0 && (
                  <>
                    <p className="label mt-8">Your inputs: {summary}</p>
                    <dl className="mt-2 border-t-3 border-ink">
                      {rows.map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-2.5">
                          <dt className="label-sm">{k}</dt>
                          <dd className="num font-condensed text-lg font-bold uppercase text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-2 text-sm text-ink-mute">
                      Read these to Paul when you call. The final price is confirmed at scheduling.
                    </p>
                  </>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${c.phoneHref}`}
                    onClick={() => track('tel_click', { location: 'booking_fallback' })}
                    className="btn-primary"
                  >
                    Call <span className="num">{c.phone}</span>
                  </a>
                  <Link to="/services" className="btn-ghost">
                    Send a quote request
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Section>

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="Know the house before you buy it."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Report the same evening.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'book_cta_band' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/contact" variant="secondary" className="!text-lg">
          Send a message
        </Button>
      </CTABand>
    </>
  );
}
