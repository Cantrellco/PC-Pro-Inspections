import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { buildFaqJsonLd } from '@/services/seo';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import WoodblockPrint from '@/components/WoodblockPrint';
import QuoteCalculator from '@/components/QuoteCalculator';
import PriceLedger from '@/components/PriceLedger';
import CertStrip from '@/components/CertStrip';
import Seal from '@/components/Seal';
import CTABand from '@/components/CTABand';
import FaqAccordion from '@/components/FaqAccordion';

/** Paper tags pinned over the house print (percent of the print's box). */
const HOUSE_LABELS = [
  { text: 'Roof', x: 70, y: 9 },
  { text: 'Attic', x: 27, y: 21 },
  { text: 'Electrical panel', x: 6, y: 62 },
  { text: 'Plumbing', x: 60, y: 45 },
  { text: 'Water heater', x: 37, y: 72 },
  { text: 'Crawl space', x: 14, y: 88 },
];

/** What is covered, set as a ledger; every line is in the standard inspection. */
const COVERED = [
  ['Roof & exterior', 'Covering, flashing, drainage, siding, soffits, decks, grading'],
  ['Structure & foundation', 'Visible framing, foundation walls, slabs, settlement signs'],
  ['Attic & ventilation', 'Insulation depth, ventilation, moisture and pest indicators'],
  ['Electrical', 'Service entrance, panel, breakers, GFCI/AFCI, wiring, outlets'],
  ['Plumbing', 'Supply, drains, fixtures, water heater, visible piping, leaks'],
  ['Heating & cooling', 'HVAC condition, distribution, thermostats, age and lifespan'],
  ['Interior', 'Walls, ceilings, floors, doors, windows, stairs, safety hazards'],
  ['Crawl space & basement', 'Moisture, sump, vapor barrier, piers; the crawler goes where we cannot'],
] as const;

export default function Home() {
  const c = siteConfig;
  const seals = c.testimonials.slice(0, 3);

  return (
    <>
      <SEO
        title={`Home Inspector in ${c.address.city}, IL | ${c.businessName}`}
        description={`Flat-rate home inspections from $400 in ${c.serviceAreaSummary.replace('Serving ', '')}. InterNACHI® certified. Callback within ${c.responsePromise.callbackHours} hours, inspected within ${c.responsePromise.inspectionDays} days, report the same evening.`}
        pathname="/"
        jsonLd={c.faqs.length > 0 ? buildFaqJsonLd() : undefined}
      />

      {/* ─── The print ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-wide pb-10 pt-6 sm:pt-8 lg:pb-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            {/* Headline sits over the top-left of the print on desktop */}
            <div className="lg:col-span-8">
              <div className="grid animate-fade-up gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
                <h1 className="display-1 cut-red lg:text-[4.6rem] xl:text-[5.2rem]">
                  Every system.
                  <br />
                  One print.
                </h1>
                <p className="lede max-w-sm sm:pb-2">
                  A full inspection, block by block, and a report the same evening. You walk the
                  house with Paul before you sign anything.
                </p>
              </div>
              <div className="relative mt-6 sm:mt-8 lg:pl-2 xl:pl-8">
                <WoodblockPrint
                  base="house"
                  ratio={1800 / 1005}
                  alt="A farmhouse cut in section as a folk woodblock print, showing the roof, attic, electrical panel, plumbing, water heater and crawl space with the inspection crawler beneath the floor"
                  labels={HOUSE_LABELS}
                  crosshairs
                  immediate
                  priority
                  className="mx-auto w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-4 lg:pt-2">
              <div className="animate-fade-up [animation-delay:120ms]">
                <QuoteCalculator variant="ticket" />
              </div>
            </div>
          </div>
        </div>
        <CertStrip />
      </section>

      {/* ─── How it goes ─────────────────────────────────────────────── */}
      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              title="Call today. Inspected this week."
              description="One inspector, reachable by phone, who shows up when he says he will."
              cut="navy"
              className="!mb-6"
            />
            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'home_process' })}
              className="btn-primary"
            >
              Call <span className="num">{c.phone}</span>
            </a>
          </div>
          <ol className="grid gap-0 border-t-3 border-ink lg:col-span-8">
            {[
              ['You call', `Or send the ticket above. Paul calls back within ${c.responsePromise.callbackHours} hours, not days.`],
              ['We set a date', `Usually within ${c.responsePromise.inspectionDays} days. Paul coordinates access with your agent and the seller.`],
              ['The walk-through', 'Two and a half to six hours on site depending on the house. Come for the last 45 minutes and walk it with him.'],
              ['The report, that evening', 'Photos, a priority summary, and plain-language notes you can hand to your agent for repair talks.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 60} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b-3 border-ink py-5 sm:grid-cols-[5rem_1fr]">
                <span className="num font-display text-4xl leading-none text-brass sm:text-5xl">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none text-ink sm:text-3xl">{t}</h3>
                  <p className="mt-2 max-w-xl text-ink-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── Prices posted ───────────────────────────────────────────── */}
      <PriceLedger />

      {/* ─── What the print covers ───────────────────────────────────── */}
      <Section wide tone="deep">
        <SectionHeader
          title="What's in the standard inspection"
          description="Every line below is included. No tiers, no upsell at the door."
          cut="brass"
        />
        <ul className="grid gap-x-10 border-t-3 border-ink sm:grid-cols-2">
          {COVERED.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={(i % 2) * 60} className="border-b-2 border-ink py-4">
              <h3 className="font-display text-xl uppercase leading-none text-ink sm:text-2xl">{t}</h3>
              <p className="mt-1.5 text-ink-soft">{d}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-ink-soft">
          Specialty work (mold, termite/WDO, pool & spa, thermal imaging, manufactured homes) is
          listed on the{' '}
          <Link to="/services" className="font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red">
            Services page
          </Link>
          .
        </p>
      </Section>

      {/* ─── The crawler ─────────────────────────────────────────────── */}
      {c.equipment && (
        <Section wide tone="navy">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <WoodblockPrint
                base="wombat"
                ratio={1200 / 896}
                alt={c.equipment.imageAlt}
                className="mx-auto w-full max-w-xl"
              />
            </div>
            <div className="lg:col-span-6">
              <h2 className="display-2 text-paper" style={{ textShadow: '0.045em 0.045em 0 #c8102e' }}>
                {c.equipment.headline}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/90">{c.equipment.body}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {c.equipment.features.map((f) => (
                  <li key={f.label} className="border-l-3 border-brass pl-3">
                    <span className="font-condensed text-lg font-bold uppercase leading-none tracking-wide text-paper">{f.label}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-secondary mt-8">
                More about the crawler
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* ─── Seals ───────────────────────────────────────────────────── */}
      {seals.length > 0 && (
        <Section wide>
          <SectionHeader title="Stamped by clients" cut="red" centered />
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {seals.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 80} className="flex flex-col items-center text-center">
                <Seal stars={t.rating} ink={(['red', 'navy', 'brass'] as const)[i % 3]} className="w-56 sm:w-full sm:max-w-[16rem]">
                  <p className="font-display text-[1.05rem] uppercase leading-tight text-ink sm:text-xl">
                    “{shortQuote(t.quote)}”
                  </p>
                </Seal>
                <p className="label mt-3">{t.name}</p>
                <p className="text-sm text-ink-mute">{t.role}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button as="link" to="/reviews" variant="secondary">
              Read every review
            </Button>
          </div>
        </Section>
      )}

      {/* ─── Where ───────────────────────────────────────────────────── */}
      <Section wide tone="deep">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              title={c.serviceAreaSummary.replace('Serving ', '')}
              description="Based in Fairfield. Paul drives to these towns and the country between them."
              cut="navy"
              className="!mb-5"
            />
            <p className="text-ink-soft">
              {c.serviceAreaTowns.join(' · ')}
            </p>
            <Link to="/service-areas" className="btn-ghost mt-5">
              All service areas
            </Link>
          </div>
          <div className="lg:col-span-7">
            <WoodblockPrint
              base="landscape"
              ratio={2000 / 1116}
              alt="A folk woodblock print of Southern Illinois: corn rows, a grain elevator, a water tower, a courthouse dome, a farmhouse and barn"
              className="w-full"
            />
          </div>
        </div>
      </Section>

      {/* ─── Questions ───────────────────────────────────────────────── */}
      {c.faqs.length > 0 && (
        <Section wide>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader title="Buyers ask" cut="brass" className="!mb-4" />
              <p className="text-ink-soft">
                Anything else,{' '}
                <a
                  href={`tel:${c.phoneHref}`}
                  onClick={() => track('tel_click', { location: 'home_faq' })}
                  className="font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red"
                >
                  call Paul
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={c.faqs} />
            </div>
          </div>
        </Section>
      )}

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="Know the house before you buy it."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Report the same evening.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'home_cta_band' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/services" variant="secondary" className="!text-lg">
          Get my price
        </Button>
      </CTABand>
    </>
  );
}

/** Trim a review to the stamp-sized phrase: first clause, max ~6 words. */
function shortQuote(q: string): string {
  const first = q.split(/[.!?]/)[0].replace(/^(Love working with Paul!?\s*)/i, 'Love working with Paul');
  const words = first.split(/\s+/);
  return words.length > 6 ? `${words.slice(0, 6).join(' ')}` : first;
}
