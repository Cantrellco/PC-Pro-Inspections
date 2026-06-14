import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import {
  ADD_ONS,
  COMMERCIAL_TIERS,
  OLD_HOME_SURCHARGE,
  PRICING_NOTE,
  SQFT_TIERS,
} from '@/config/pricing';
import { formatPricePerSqft } from '@/services/pricing';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import CTABand from '@/components/CTABand';
import QuoteCalculator from '@/components/QuoteCalculator';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const SERVICES = [
  {
    title: 'Standard Home Inspection',
    body: 'A full visual inspection of every accessible part of the home: roof, exterior, structure, plumbing, electrical, HVAC, attic, basement/crawl, and interior. Includes a same-day photo-rich report.',
  },
  {
    title: 'New Construction Inspection',
    body: 'A second set of expert eyes on a brand-new build before final walk-through. Catches the surprising number of issues that slip past a typical builder QC.',
  },
  {
    title: 'Pre-Listing (Seller) Inspection',
    body: 'For sellers who want to know what an inspector will find — before the buyer does. Lets you fix or disclose proactively and avoid renegotiation.',
  },
  {
    title: '11-Month Warranty Inspection',
    body: "Before your builder's one-year warranty expires, we look for any issues so they can be addressed under warranty. Worth far more than its cost.",
  },
  {
    title: 'Annual Maintenance Inspection',
    body: "An ongoing check-up after you've moved in — catches small issues before they become expensive ones.",
  },
];

export default function Services() {
  const c = siteConfig;
  const cityForTitle = c.address.city || 'Your Area';

  return (
    <>
      <SEO
        title={`Services & Pricing — Home Inspector in ${cityForTitle} | ${c.businessName}`}
        description="See what we inspect, our extra services, and get a real-time estimate with our quote calculator. Estimate only — final price confirmed at scheduling."
        pathname="/services"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Services & Pricing"
          title="Pick what you need. Pay only for what you pick."
          description="Pricing is driven by square footage with optional extra services. Use the calculator below for an itemized estimate in seconds."
        />

        {/* Services list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {SERVICES.map((s) => (
            <Card key={s.title} hover glow className="h-full">
              <h2 className="font-semibold text-lg text-white mb-1.5">
                {s.title}
              </h2>
              <p className="text-bone-muted text-sm leading-relaxed">{s.body}</p>
            </Card>
          ))}
        </div>

        {/* Areas of expertise — full inspection coverage */}
        <div className="mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Areas of Expertise
          </h2>
          <p className="text-bone-muted mb-8 max-w-2xl">
            Every inspection covers the core systems below. Items marked{' '}
            <span className="text-brass-soft font-semibold">Specialty</span> are
            advanced capabilities {c.inspectorName} is certified to inspect —
            beyond what a standard inspection includes.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.inspectionExpertise.map((area) => (
              <li key={area.label}>
                <Card rim={area.specialty} glow className="h-full">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-white">{area.label}</h3>
                    {area.specialty && (
                      <span className="flex-shrink-0 rounded-full border border-brass-deep/40 bg-flag-navy/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brass-soft">
                        Specialty
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-bone-muted leading-relaxed">
                    {area.blurb}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        {/* Calculator */}
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Quote Calculator
          </h2>
          <p className="text-bone-muted mb-8 max-w-2xl">
            Move the slider, toggle the extra services. The breakdown updates live.
            When you are ready, send us the quote — or jump straight to booking.
          </p>
          <QuoteCalculator />
        </div>

        {/* Reference: base prices and add-ons (transparency) */}
        <div className="star-divider" aria-hidden="true">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-flag-red" fill="currentColor">
            <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9L10 1.5z" />
          </svg>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card glow>
            <h3 className="text-sm uppercase tracking-wider text-bone-muted mb-3 font-semibold">
              Residential — base by sqft
            </h3>
            <ul className="space-y-2 text-sm">
              {SQFT_TIERS.map((t) => (
                <li
                  key={t.label}
                  className="flex justify-between gap-3 border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="text-bone">
                    {t.label}
                    {t.durationLabel && (
                      <span className="block text-xs text-bone-dim">{t.durationLabel} on-site</span>
                    )}
                  </span>
                  <span className="text-white font-semibold whitespace-nowrap">
                    {currency.format(t.price)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card glow>
            <h3 className="text-sm uppercase tracking-wider text-bone-muted mb-3 font-semibold">
              Commercial — per sqft
            </h3>
            <ul className="space-y-2 text-sm">
              {COMMERCIAL_TIERS.map((t) => (
                <li
                  key={t.label}
                  className="flex justify-between gap-3 border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="text-bone">
                    {t.label}
                    {t.durationLabel && (
                      <span className="block text-xs text-bone-dim">{t.durationLabel} on-site</span>
                    )}
                  </span>
                  <span className="text-white font-semibold whitespace-nowrap">
                    {formatPricePerSqft(t.pricePerSqft)}/sqft
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card glow>
            <h3 className="text-sm uppercase tracking-wider text-bone-muted mb-3 font-semibold">
              Extra services & modifiers
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-3 border-b border-white/5 pb-2">
                <span className="text-bone">{OLD_HOME_SURCHARGE.label}</span>
                <span className="text-flag-redSoft font-semibold whitespace-nowrap">
                  +{currency.format(OLD_HOME_SURCHARGE.price)}
                </span>
              </li>
              {ADD_ONS.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between gap-3 border-b border-white/5 pb-2 last:border-0"
                >
                  <span className="text-bone">{a.label}</span>
                  <span className="text-flag-redSoft font-semibold whitespace-nowrap">
                    +{currency.format(a.price)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <p className="mt-6 text-xs text-bone-dim text-center">
          {PRICING_NOTE} Estimate only — final price confirmed at scheduling
          based on the actual property and services chosen.
        </p>
      </Section>

      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="Lock It In"
          title={
            <>
              Like your number? <span className="italic text-gradient-brass">Book it.</span>
            </>
          }
          description="Your quote carries straight over to scheduling — square footage, extras, and all."
        >
          <Magnetic>
            <Button as="link" to="/book" className="!px-8 !py-4 !text-base">
              Book Your Inspection
            </Button>
          </Magnetic>
          <Button
            as="a"
            href={`tel:${c.phoneHref}`}
            variant="secondary"
            onClick={() => track('tel_click', { location: 'services_cta_band' })}
            className="!px-8 !py-4 !text-base"
          >
            Call {c.phone}
          </Button>
        </CTABand>
      </div>
    </>
  );
}
