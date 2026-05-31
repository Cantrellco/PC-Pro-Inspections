import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { buildFaqJsonLd } from '@/services/seo';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Magnetic from '@/components/Magnetic';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import HeroImage from '@/components/HeroImage';
import WavingFlag from '@/components/WavingFlag';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CertStrip from '@/components/CertStrip';
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
  [IconAddons, 'Optional Add-ons', 'Radon, mold, sewer scope, pool/spa, termite, well water.'],
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
            <p className="eyebrow mb-6">{c.serviceAreaSummary}</p>
            <h1 className="display-1 text-white">
              Buy your home with{' '}
              <span className="italic text-flag-redSoft">eyes wide open.</span>
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
                { text: 'Insured', label: 'Licensed' },
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
              <Card rim className="h-full">
                <IconPhone className="h-7 w-7 text-flag-redSoft" />
                <p className="mt-5 font-display text-6xl font-semibold text-white leading-none">
                  {c.responsePromise.callbackHours}
                  <span className="ml-2 text-xl text-bone-muted font-sans font-normal">hrs</span>
                </p>
                <p className="mt-3 text-bone-muted">to call you back, every time.</p>
              </Card>
            </Reveal>
            <Reveal delay={140}>
              <Card rim className="h-full">
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

      {/* ─── Services feature + grid ──────────────────────────────────── */}
      <Section tone="elevated">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          <Reveal>
            <Photo
              src={c.images.services}
              alt="A certified inspector documenting a home's systems"
              aspectClass="aspect-[5/4]"
              placeholderLabel="Inspection in progress"
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow mb-4">What We Inspect</p>
            <h2 className="display-2 text-white">A full-systems inspection — nothing skipped.</h2>
            <p className="lede mt-5">
              Every visible major system, documented with photos and a clear
              priority summary. Optional add-ons go deeper where the property
              warrants it.
            </p>
            <div className="mt-7">
              <Button as="link" to="/services" variant="secondary">See pricing &amp; calculator</Button>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(([Icon, title, desc], i) => (
            <Reveal key={title} delay={(i % 3) * 70}>
              <Card hover className="h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-flag-navy/20 text-brass-soft">
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
      <Section>
        <SectionHeader eyebrow="How It Works" title="Four steps, zero friction." />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS.map(([Icon, title, desc], i) => (
            <Reveal as="li" key={title} delay={i * 80} className="relative">
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-semibold text-flag-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 hairline" aria-hidden="true" />
                  <Icon className="h-5 w-5 text-bone-dim" />
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
            <Link to="/service-areas" className="mt-6 inline-flex items-center gap-1.5 text-flag-redSoft font-semibold hover:gap-2.5 transition-all">
              See all service areas <span aria-hidden="true">→</span>
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
          <div className="max-w-3xl mx-auto divide-y divide-white/10 border-y border-white/10">
            {c.faqs.map((f, i) => (
              <details key={f.question} className="group" open={i === 0}>
                <summary className="cursor-pointer list-none py-5 flex justify-between items-center gap-4 hover:text-white">
                  <h3 className="font-display text-lg font-medium text-white">{f.question}</h3>
                  <span aria-hidden="true" className="text-brass-soft text-2xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <div className="pb-6 -mt-1 text-bone-muted leading-relaxed max-w-2xl">{f.answer}</div>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* ─── Closing CTA ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <HeroImage src={c.images.ctaBand} flagOpacity={0.28} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,9,0.9) 0%, rgba(8,8,9,0.82) 100%)' }} />
        </div>
        <div className="container-narrow above-grain py-24 sm:py-32 text-center">
          <Reveal>
            <p className="eyebrow mb-5">Ready when you are</p>
            <h2 className="display-1 text-white max-w-3xl mx-auto">
              Inspect with confidence.
            </h2>
            <p className="lede mt-6 max-w-xl mx-auto">
              Get a free, itemized quote in seconds — or call now and we'll pick up.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <Button as="link" to="/services" className="!px-8 !py-4 !text-base">Get a Free Quote</Button>
              <Button
                as="a"
                href={`tel:${c.phoneHref}`}
                variant="secondary"
                onClick={() => track('tel_click', { location: 'home_footer_cta' })}
                className="!px-8 !py-4 !text-base"
              >
                Call {c.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
