import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { findAddOn } from '@/config/pricing';
import { getBookingConfig } from '@/services/booking';
import { track } from '@/services/analytics';
import { formatTime } from '@/lib/time';
import type { PropertyType } from '@/types';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function BookNow() {
  const c = siteConfig;
  const booking = getBookingConfig();
  const [params] = useSearchParams();
  const [embedLoaded, setEmbedLoaded] = useState(false);

  const handoff = useMemo(() => {
    const sqftRaw = params.get('sqft');
    const estimateRaw = params.get('estimate');
    const addonsRaw = params.get('addons') ?? '';
    const typeRaw = params.get('type');
    const oldRaw = params.get('old');

    const sqft = sqftRaw ? Number(sqftRaw) : undefined;
    const estimate = estimateRaw ? Number(estimateRaw) : undefined;
    const addOnIds = addonsRaw ? addonsRaw.split(',').filter(Boolean) : [];
    const propertyType: PropertyType =
      typeRaw === 'commercial' ? 'commercial' : 'residential';
    const builtBefore1940 = oldRaw === '1';

    return {
      propertyType,
      builtBefore1940,
      sqft: Number.isFinite(sqft) ? sqft : undefined,
      estimate: Number.isFinite(estimate) ? estimate : undefined,
      addOnIds,
      addOnLabels: addOnIds.map((id) => findAddOn(id)?.label).filter(Boolean) as string[],
      hasAny: Boolean(sqftRaw || estimateRaw || addonsRaw || typeRaw),
    };
  }, [params]);

  const embedUrl = booking.configured
    ? booking.prefillUrl({
        propertyType: handoff.propertyType,
        sqft: handoff.sqft,
        addOnIds: handoff.addOnIds,
        estimate: handoff.estimate,
        builtBefore1940: handoff.builtBefore1940,
      })
    : '';

  return (
    <>
      <SEO
        title={`Book a Home Inspection | ${c.businessName}`}
        description="Pick a time online — or call for fastest scheduling. Quote details from the calculator carry over automatically."
        pathname="/book"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Book Now"
          title="Pick a time."
          description={`Online booking ${booking.configured ? 'below' : 'is coming soon — call us for the fastest scheduling'}.`}
        />

        {/* Hand-off summary */}
        {handoff.hasAny && (
          <Card rim glow className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-2">
              We have your quote ready
            </p>
            <ul className="grid sm:grid-cols-3 gap-4 text-sm">
              <li>
                <span className="block text-bone-dim text-xs uppercase tracking-wider">
                  Property type
                </span>
                <span className="text-white capitalize">{handoff.propertyType}</span>
              </li>
              {handoff.sqft !== undefined && (
                <li>
                  <span className="block text-bone-dim text-xs uppercase tracking-wider">
                    Square footage
                  </span>
                  <span className="text-white text-xl font-semibold">
                    {handoff.sqft.toLocaleString()} sqft
                  </span>
                </li>
              )}
              {(handoff.addOnLabels.length > 0 || handoff.builtBefore1940) && (
                <li>
                  <span className="block text-bone-dim text-xs uppercase tracking-wider">
                    Extra services
                  </span>
                  <span className="text-white">
                    {[
                      ...(handoff.builtBefore1940 ? ['Pre-1940 home'] : []),
                      ...handoff.addOnLabels,
                    ].join(', ')}
                  </span>
                </li>
              )}
              {handoff.estimate !== undefined && (
                <li>
                  <span className="block text-bone-dim text-xs uppercase tracking-wider">
                    Estimate
                  </span>
                  <span className="text-white text-xl font-semibold">
                    {currency.format(handoff.estimate)}
                  </span>
                </li>
              )}
            </ul>
            <p className="mt-4 text-xs text-bone-dim">
              These details follow you to scheduling. Final price confirmed
              when we finalize the appointment.
            </p>
          </Card>
        )}

        {booking.configured ? (
          // ─── Configured: render the scheduler embed ──────────────────
          <Card className="!p-2 sm:!p-3">
            <div
              className={`rounded-md overflow-hidden border border-white/10 bg-ink-200 ${
                embedLoaded ? '' : 'skeleton'
              }`}
            >
              <iframe
                src={embedUrl}
                title={`${c.businessName} online booking`}
                className="relative z-10 w-full"
                style={{ minHeight: '720px', border: 0 }}
                loading="lazy"
                onLoad={() => setEmbedLoaded(true)}
                allow="payment; geolocation; camera"
              />
            </div>
          </Card>
        ) : (
          // ─── Not configured: graceful fallback ───────────────────────
          <Card rim glow>
            <div className="max-w-2xl mx-auto text-center py-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-flag-navy/30 border border-flag-navyLight/40 text-flag-redSoft mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Online booking is coming soon
              </h2>
              <p className="text-bone-muted mb-6">
                We are finalizing our online scheduler. In the meantime, calling
                is fastest — we usually pick up, and most appointments get booked
                in under five minutes.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  as="a"
                  href={`tel:${c.phoneHref}`}
                  onClick={() => track('tel_click', { location: 'booking_fallback' })}
                  className="!px-7 !py-4"
                >
                  Call {c.phone}
                </Button>
                <Button as="link" to="/services" variant="secondary" className="!px-7 !py-4">
                  Get a Free Quote
                </Button>
              </div>
              <p className="mt-6 text-xs text-bone-dim">
                Hours: most days{' '}
                {c.hours[0]?.open && c.hours[0]?.close
                  ? `${formatTime(c.hours[0].open)} – ${formatTime(c.hours[0].close)}`
                  : 'business hours'}
                .
              </p>
            </div>
          </Card>
        )}

        {/* Always-available fallback CTAs below the embed */}
        {booking.configured && (
          <div className="mt-8 text-center text-sm text-bone-muted">
            Prefer to talk first?{' '}
            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'booking_below_embed' })}
              className="text-flag-redSoft underline-offset-4 hover:underline font-semibold"
            >
              Call {c.phone}
            </a>
            .
          </div>
        )}
      </Section>
    </>
  );
}
