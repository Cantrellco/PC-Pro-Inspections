import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { buildFaqJsonLd } from '@/services/seo';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Magnetic from '@/components/Magnetic';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import WavingFlag from '@/components/WavingFlag';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CertStrip from '@/components/CertStrip';
import CTABand from '@/components/CTABand';
import FaqAccordion from '@/components/FaqAccordion';
import {
  IconRoof, IconFoundation, IconPlumbing, IconElectrical, IconHvac,
  IconAttic, IconInterior, IconBasement, IconAddons, IconShield, IconClock, IconDoc, IconPhone,
} from '@/components/icons';

const SERVICES = [
  [IconRoof, 'Roof & Exterior', 'Covering, flashing, drainage, siding, soffits, trim, decks, grading.'],
  [IconFoundation, 'Structure & Foundation', 'Visible framing, foundation walls, slabs, settlement indicators.'],
  [IconPlumbing, 'Plumbing', 'Supply, drains, fixtures, water heater, visible piping, leaks.'],
  [IconElectrical, 'Electrical', 'Service entrance, panel, breakers, GFCI/AFCI, wiring, outlets.'],
  [IconHvac, 'Heating & Cooling', 'HVAC condition, distribution, thermostats, age and lifespan.'],
  [IconAttic, 'Attic & Ventilation', 'Insulation depth, ventilation, moisture and pest indicators.'],
  [IconInterior, 'Interior', 'Walls, ceilings, floors, doors, windows, stairs, safety hazards.'],
  [IconBasement, 'Basement / Crawl', 'Moisture, sump pumps, vapor barriers, structural concerns.'],
  [IconAddons, 'Specialty Inspections', 'Pools & spas, mold, termite/WDO, thermal imaging, manufactured & mobile homes.'],
] as const;

const PROCESS = [
  [IconDoc, 'Get a quote', 'Use the live calculator or call. We confirm availability fast — usually same day.'],
  [IconClock, 'Book your slot', 'Online or by phone. We coordinate with your agent and the seller for you.'],
  [IconShield, 'On-site walkthrough', 'Two to three hours. Join us for the last 45 minutes — we tour the home together.'],
  [IconDoc, 'Same-day report', 'A photo-rich digital report with a prioritized summary, typically that evening.'],
] as const;

export default function Home() {
  const c = siteConfig;
  const cityForTitle = c.address.city || 'Your Area';

  return (
    <>
      <SEO
        title={`Home Inspector in ${cityForTitle} | ${c.businessName}`}
        description={`Certified residential home inspections in ${c.serviceAreaSummary}. We call back within ${c.responsePromise.callbackHours} hours and inspect within ${c.responsePromise.inspectionDays} days. Get a free quote.`}
        pathname="/"
        jsonLd={c.faqs.length > 0 ? buildFaqJsonLd() : undefined}
      />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-ink-200" />
          <WavingFlag className="absolute inset-0 h-full w-full" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(102deg, rgba(8,8,9,0.97) 0%, rgba(8,8,9,0.92) 42%, rgba(8,8,9,0.68) 74%, rgba(8,8,9,0.5) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(0deg, rgba(8,8,9,0.96) 0%, transparent 45%)' }}
          />
        </div>

        <div className="container-wide above-grain py-24 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2.5 pr-4 text-[12.5px] font-medium text-bone-muted backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flag-redSoft opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-flag-red" />
              </span>
              Now booking across {c.serviceAreaSummary}
            </p>
            <h1 className="display-1 text-white">
              Buy your home with{' '}
              <span className="italic text-gradient-flag">eyes wide open.</span>
            </h1>
            <p className="lede mt-6 max-w-2xl">
              {c.tagline} Same-day, photo-rich reports — walked through with you on
              site. The biggest purchase of your life deserves a real inspection.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Button as="link" to="/services" className="!px-8 !py-4 !text-base">
                  Get a Free Quote
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  as="a"
                  href={`tel:${c.phoneHref}`}
                  variant="secondary"
                  onClick={() => track('tel_click', { location: 'hero' })}
                  className="!px-8 !py-4 !text-base"
                >
                  Call {c.phone}
                </Button>
              </Magnetic>
            </div>

            <dl className="mt-14 flex flex-wrap items-start gap-x-4 sm:gap-x-9 gap-y-5">
              {([
                { count: 1600, suffix: '+', label: 'Point inspection' },
                { text: 'Same-Day', label: 'Reports' },
                { count: 14, suffix: '', label: 'Areas of expertise' },
              ] as ({ count: number; suffix: string; label: string } | { text: string; label: string })[]).map((s) => (
                <div key={s.label} className="border-l border-white/15 pl-4">
                  <dd className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-none tracking-tight whitespace-nowrap">
                    {'count' in s ? <CountUp value={s.count} suffix={s.suffix} /> : s.text}
                  </dd>
                  <dt className="mt-2.5 text-[11px] uppercase tracking-[0.18em] text-bone-dim whitespace-nowrap">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone-dim motion-reduce:hidden sm:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
            <span className="mt-1.5 h-1.5 w-1 animate-bounce rounded-full bg-brass-soft" />
          </span>
        </div>
      </section>

      {/* ─── Trust / credentials strip ────────────────────────────────── */}
      <CertStrip />

      {/* ─── Response promise (americana) ─────────────────────────────── */}
      <Section tone="americana">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">Our Promise</p>
            <h2 className="display-2 text-white">A quick callback. A quick inspection.</h2>
            <p className="lede mt-5">
              No voicemail black holes. No waiting days to learn whether we have
              availability. You reach out — we move.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            <Reveal delay={60}>
              <Card rim glow className="h-full">
                <IconPhone className="h-7 w-7 text-flag-redSoft" />
                <p className="mt-5 font-display text-6xl font-semibold text-white leading-none">
                  {c.responsePromise.callbackHours}
                  <span className="ml-2 text-xl text-bone-muted font-sans font-normal">hrs</span>
                </p>
                <p className="mt-3 text-bone-muted">to call you back, every time.</p>
              </Card>
            </Reveal>
            <Reveal delay={140}>
              <Card rim glow className="h-full">
                <IconClock className="h-7 w-7 text-brass-soft" />
                <p className="mt-5 font-display text-6xl font-semibold text-white leading-none">
                  {c.responsePromise.inspectionDays}
                  <span className="ml-2 text-xl text-bone-muted font-sans font-normal">days</span>
                </p>
                <p className="mt-3 text-bone-muted">to get you on the schedule.</p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── What we inspect — services grid ──────────────────────────── */}
      <Section tone="elevated">
        <SectionHeader
          eyebrow="What We Inspect"
          title="Every system, head to foundation."
          description="One thorough visual inspection covers the whole house — and a roster of specialty certifications covers the rest."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(([Icon, title, desc], i) => (
            <Reveal key={title} delay={(i % 3) * 70}>
              <Card hover glow className="group h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-flag-navy/20 text-brass-soft transition-colors duration-300 group-hover:border-brass/40 group-hover:text-brass-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-bone-muted leading-relaxed">{desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── Process timeline ─────────────────────────────────────────── */}
      <Section blueprint>
        <SectionHeader eyebrow="How It Works" title="Four steps, zero friction." />
        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Connector rail behind the cards (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[3.15rem] hidden h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent lg:block"
          />
          {PROCESS.map(([Icon, title, desc], i) => (
            <Reveal as="li" key={title} delay={i * 80} className="relative">
              <Card glow className="h-full">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-semibold text-gradient-flag leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 hairline" aria-hidden="true" />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-100/70 text-bone-dim">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-bone-muted leading-relaxed">{desc}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ─── Service area ─────────────────────────────────────────────── */}
      <Section tone="elevated">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <p className="eyebrow mb-4">Where We Work</p>
            <h2 className="display-2 text-white">{c.serviceAreaSummary}</h2>
            <p className="lede mt-5">
              We inspect across the towns and counties below — plus surrounding
              areas on request. Not sure if we cover your address?{' '}
              <a
                href={`tel:${c.phoneHref}`}
                onClick={() => track('tel_click', { location: 'service_area_section' })}
                className="text-flag-redSoft underline-offset-4 hover:underline"
              >
                Give us a call.
              </a>
            </p>
            <Link
              to="/service-areas"
              className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-flag-redSoft"
            >
              <span className="link-underline">See all service areas</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <ServiceAreaMap />
          </Reveal>
        </div>
      </Section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
      {c.testimonials.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Word From Clients" title="Trusted by buyers and their agents." />
          <Reveal>
            <TestimonialCarousel items={c.testimonials} />
          </Reveal>
          <div className="mt-12 text-center">
            <Button as="link" to="/reviews" variant="secondary">Read all reviews</Button>
          </div>
        </Section>
      )}

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      {c.faqs.length > 0 && (
        <Section tone="elevated">
          <SectionHeader eyebrow="Common Questions" title="Answers, before you ask." />
          <Reveal>
            <FaqAccordion items={c.faqs} />
          </Reveal>
        </Section>
      )}

      {/* ─── Closing CTA ──────────────────────────────────────────────── */}
      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="Ready When You Are"
          title={
            <>
              Let's get you a real{' '}
              <span className="italic text-gradient-brass">inspection.</span>
            </>
          }
          description="Free quote in seconds. A callback within hours. A report you can actually act on."
        >
          <Magnetic>
            <Button as="link" to="/services" className="!px-8 !py-4 !text-base">
              Get a Free Quote
            </Button>
          </Magnetic>
          <Button
            as="a"
            href={`tel:${c.phoneHref}`}
            variant="secondary"
            onClick={() => track('tel_click', { location: 'home_cta_band' })}
            className="!px-8 !py-4 !text-base"
          >
            Call {c.phone}
          </Button>
        </CTABand>
      </div>
    </>
  );
}
