import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import {
  ADD_ONS,
  COMMERCIAL_MINIMUM,
  COMMERCIAL_TIERS,
  STANDALONE_SERVICES,
  PRICING_NOTE,
  QUOTE_ONLY_SERVICES,
  SQFT_TIERS,
} from '@/config/pricing';
import { formatPricePerSqft } from '@/services/pricing';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import CTABand from '@/components/CTABand';
import QuoteCalculator from '@/components/QuoteCalculator';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;
const band = (label: string) => label.replace('sqft', 'sq ft');

/** The kinds of inspection Paul does. Same price sheet, different reason to call. */
const INSPECTION_TYPES: [string, string][] = [
  [
    'Standard buyer inspection',
    'Every accessible part of the house: roof, exterior, structure, plumbing, electrical, heating and cooling, attic, basement or crawl space, interior. Photo report the same evening.',
  ],
  [
    'New construction',
    'A second look at a brand-new build before the final walk-through. Builder quality control misses more than you would think.',
  ],
  [
    'Pre-listing (seller)',
    'Find out what the buyer’s inspector will find before they do. Fix it or disclose it, and skip the renegotiation.',
  ],
  [
    '11-month warranty',
    'Before the builder’s one-year warranty runs out, Paul walks the house so anything wrong gets fixed on the builder’s dime.',
  ],
  [
    'Annual maintenance',
    'A check-up after you have moved in. Small problems are cheap; the same problems two years later are not.',
  ],
];

/** Match a specialty expertise line to the certification Paul holds for it (by name only). */
function certFor(label: string): string | undefined {
  const key = label.split(/[\s/&]+/)[0].replace(/s$/, '').toLowerCase();
  return siteConfig.certifications.find((c) => c.name.toLowerCase().includes(key))?.name;
}

export default function Services() {
  const c = siteConfig;
  const cityForTitle = c.address.city || 'Southern Illinois';
  const standard = c.inspectionExpertise.filter((a) => !a.specialty);
  const specialty = c.inspectionExpertise.filter((a) => a.specialty);

  const rowCls = 'grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-b-2 border-ink py-3 sm:grid-cols-[1fr_8rem_9rem]';
  const headCls = 'label-sm hidden border-b-3 border-ink pb-2 sm:grid sm:grid-cols-[1fr_8rem_9rem] sm:gap-x-4';

  return (
    <>
      <SEO
        title={`Home Inspection Prices & Services in ${cityForTitle}, IL | ${c.businessName}`}
        description="The full PC Pro Inspections price sheet: flat residential prices by square footage, commercial rates per square foot, termite add-on, and every inspection type Paul offers. Get your figure in seconds."
        pathname="/services"
      />

      {/* ─── Title + calculator ──────────────────────────────────────── */}
      <Section wide className="!pb-10 sm:!pb-14">
        <SectionHeader
          as="h1"
          title="The price sheet."
          description="Prices are flat by square footage. They are posted here, and confirmed when you book. No tiers, no surprise at the door."
          cut="red"
          className="!mb-8 sm:!mb-10"
        />
        <QuoteCalculator variant="full" />
      </Section>

      {/* ─── The ledger ──────────────────────────────────────────────── */}
      <Section wide tone="deep">
        <SectionHeader
          title="Posted prices"
          description="Straight from the sheet. Residential is a flat figure; commercial is charged by the square foot."
          cut="brass"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Residential */}
          <Reveal>
            <h3 className="display-3 mb-4">Residential</h3>
            <div className={headCls}>
              <span>Square footage</span>
              <span>On site</span>
              <span className="text-right">Price</span>
            </div>
            <ul className="border-t-3 border-ink sm:border-t-0">
              {SQFT_TIERS.map((t) => (
                <li key={t.label} className={rowCls}>
                  <span className="num font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {band(t.label)}
                  </span>
                  <span className="num order-3 col-span-2 text-sm text-ink-mute sm:order-none sm:col-span-1 sm:text-base">
                    {t.durationLabel ? `${t.durationLabel} on site` : '—'}
                  </span>
                  <span className="num text-right font-display text-2xl leading-none text-ink sm:text-3xl">
                    {money(t.price)}
                  </span>
                </li>
              ))}
              {ADD_ONS.map((a) => (
                <li key={a.id} className={rowCls}>
                  <span className="font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {a.label}
                    <span className="label-sm mt-1 block max-w-md normal-case leading-snug tracking-normal">Add to any residential inspection</span>
                  </span>
                  <span className="num order-3 col-span-2 text-sm text-ink-mute sm:order-none sm:col-span-1 sm:text-base">
                    {a.durationHours ? `+${a.durationHours} hrs on site` : ''}
                  </span>
                  <span className="num text-right font-display text-2xl leading-none text-red sm:text-3xl">
                    +{money(a.price)}
                  </span>
                </li>
              ))}
              {STANDALONE_SERVICES.map((a) => (
                <li key={a.id} className={rowCls}>
                  <span className="font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {a.label}
                    <span className="label-sm mt-1 block max-w-md normal-case leading-snug tracking-normal">
                      {a.description}
                    </span>
                  </span>
                  <span className="num order-3 col-span-2 text-sm text-ink-mute sm:order-none sm:col-span-1 sm:text-base">
                    {a.durationHours ? `~${a.durationHours} hrs on site` : ''}
                  </span>
                  <span className="num text-right font-display text-2xl leading-none text-ink sm:text-3xl">
                    {money(a.price)}
                  </span>
                </li>
              ))}
              {QUOTE_ONLY_SERVICES.map((s) => (
                <li key={s.id} className={rowCls}>
                  <span className="font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {s.label}
                    <span className="label-sm mt-1 block max-w-md normal-case leading-snug tracking-normal">{s.description}</span>
                  </span>
                  <span className="hidden sm:block" aria-hidden="true" />
                  <a
                    href={`tel:${c.phoneHref}`}
                    onClick={() => track('tel_click', { location: 'services_quote_only' })}
                    className="justify-self-end whitespace-nowrap font-condensed text-base font-bold uppercase tracking-wide text-navy underline decoration-red decoration-[3px] underline-offset-4 hover:decoration-navy"
                  >
                    Call for a price
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Commercial */}
          <Reveal delay={80}>
            <h3 className="display-3 mb-4">Commercial</h3>
            <div className={headCls}>
              <span>Square footage</span>
              <span>On site</span>
              <span className="text-right">Per sq ft</span>
            </div>
            <ul className="border-t-3 border-ink sm:border-t-0">
              {COMMERCIAL_TIERS.map((t) => (
                <li key={t.label} className={rowCls}>
                  <span className="num font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {band(t.label)}
                  </span>
                  <span className="num order-3 col-span-2 text-sm text-ink-mute sm:order-none sm:col-span-1 sm:text-base">
                    {t.durationLabel ? `${t.durationLabel} on site` : '—'}
                  </span>
                  <span className="num whitespace-nowrap text-right font-display text-2xl leading-none text-ink sm:text-3xl">
                    {formatPricePerSqft(t.pricePerSqft)}
                    <span className="font-condensed text-base font-semibold uppercase tracking-wide text-ink-mute">/sq ft</span>
                  </span>
                </li>
              ))}
              <li className={rowCls}>
                <span className="num font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                  Minimum charge
                </span>
                <span className="num order-3 col-span-2 text-sm text-ink-mute sm:order-none sm:col-span-1 sm:text-base">
                  ~4 hrs on site
                </span>
                <span className="num whitespace-nowrap text-right font-display text-2xl leading-none text-ink sm:text-3xl">
                  {money(COMMERCIAL_MINIMUM)}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-ink-soft">
              Commercial total = square footage &times; the rate for its band, and never less than the{' '}
              {money(COMMERCIAL_MINIMUM)} minimum. Larger than 10,000 sq ft,{' '}
              <a
                href={`tel:${c.phoneHref}`}
                onClick={() => track('tel_click', { location: 'services_commercial_note' })}
                className="font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red"
              >
                call Paul
              </a>
              .
            </p>
          </Reveal>
        </div>

        <p className="mt-10 border-t-2 border-ink pt-4 font-condensed text-base font-semibold uppercase tracking-wide text-ink/80">
          {PRICING_NOTE} Final price confirmed at booking for the actual property and services chosen.
        </p>
      </Section>

      {/* ─── Inspection types ────────────────────────────────────────── */}
      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              title="Kinds of inspection"
              description="Same sheet, same report. The difference is why you are calling."
              cut="navy"
              className="!mb-6"
            />
            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'services_types' })}
              className="btn-primary"
            >
              Call <span className="num">{c.phone}</span>
            </a>
          </div>
          <ul className="border-t-3 border-ink lg:col-span-8">
            {INSPECTION_TYPES.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="grid gap-2 border-b-3 border-ink py-5 sm:grid-cols-[15rem_1fr] sm:gap-6">
                <h3 className="font-display text-2xl uppercase leading-none text-ink sm:text-3xl">{t}</h3>
                <p className="max-w-xl text-ink-soft">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── What Paul inspects ──────────────────────────────────────── */}
      <Section wide tone="deep" className="!border-b-0">
        <SectionHeader
          title={`What ${c.inspectorName.split(' ')[0]} inspects`}
          description="Every system below is in the standard inspection. Nothing here is an extra."
          cut="brass"
        />
        <ul className="grid gap-x-10 border-t-3 border-ink sm:grid-cols-2">
          {standard.map((a, i) => (
            <Reveal as="li" key={a.label} delay={(i % 2) * 60} className="border-b-2 border-ink py-4">
              <h3 className="font-display text-xl uppercase leading-none text-ink sm:text-2xl">{a.label}</h3>
              <p className="mt-1.5 text-ink-soft">{a.blurb}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {specialty.length > 0 && (
        <Section wide tone="navy">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="display-2 text-paper" style={{ textShadow: '0.045em 0.045em 0 #c8102e' }}>
                Specialty work
              </h2>
              <p className="mt-4 max-w-md text-lg text-paper/90">
                Work that takes its own certification. {c.inspectorName.split(' ')[0]} holds each one listed;
                documentation on request.
              </p>
            </div>
            <ul className="border-t-3 border-paper lg:col-span-8">
              {specialty.map((a, i) => {
                const cert = certFor(a.label);
                return (
                  <Reveal as="li" key={a.label} delay={i * 50} className="grid gap-2 border-b-2 border-paper/60 py-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-6">
                    <div>
                      <h3 className="flex flex-wrap items-center gap-3 font-display text-xl uppercase leading-none text-paper sm:text-2xl">
                        {a.label}
                        <span className="tag text-xs">Specialty</span>
                      </h3>
                      <p className="mt-1.5 text-paper/90">{a.blurb}</p>
                    </div>
                    {cert && (
                      <p className="font-condensed text-sm font-semibold uppercase tracking-wide text-brass-pale sm:max-w-[13rem] sm:text-right">
                        {cert}
                      </p>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Section>
      )}

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="Like the number? Book it."
        description="Your square footage and add-ons carry straight over to scheduling."
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'services_cta_band' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button
          as="link"
          to="/book"
          variant="secondary"
          className="!text-lg"
          onClick={() => track('book_now_click', { location: 'services_cta_band' })}
        >
          Book this inspection
        </Button>
      </CTABand>
    </>
  );
}
