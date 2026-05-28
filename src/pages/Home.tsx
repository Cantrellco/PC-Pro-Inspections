import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { buildFaqJsonLd } from '@/services/seo';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import StarRating from '@/components/StarRating';
import Bunting from '@/components/Bunting';
import Flag from '@/components/Flag';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Home() {
  const c = siteConfig;
  const showcaseTestimonials = c.testimonials.slice(0, 3);
  const cityForTitle = c.address.city || 'Your Area';
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <SEO
        title={`Home Inspector in ${cityForTitle} | ${c.businessName}`}
        description={`Certified residential home inspections in ${c.serviceAreaSummary}. We call back within ${c.responsePromise.callbackHours} hours and inspect within ${c.responsePromise.inspectionDays} days. Get a free quote.`}
        pathname="/"
        jsonLd={c.faqs.length > 0 ? buildFaqJsonLd() : undefined}
      />

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-200">
        {/* Full stylized flag fills the hero edge-to-edge (cover-fit). */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <Flag
            wave
            animate={!reducedMotion}
            fit="cover"
            className="absolute inset-0 w-full h-full opacity-65"
          />
          {/* Dark gradient overlay for text legibility. Heavier toward the
              bottom-right where the copy sits; lighter top-left so the canton
              and stars read clearly. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.72) 45%, rgba(10,10,10,0.93) 100%)',
            }}
          />
          {/* Subtle ambient color wash for depth on top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 5% 95%, rgba(212,38,58,0.18), transparent 60%)',
            }}
          />
        </div>

        <div className="container-narrow relative pt-16 pb-16 sm:pt-24 sm:pb-24">
          <p className="eyebrow mb-5">Serving {c.serviceAreaSummary}</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
            Honest, thorough
            <br />
            <span className="relative inline-block text-flag-red">
              home inspections
              <span
                aria-hidden="true"
                className="absolute -left-1 -right-1 -bottom-1.5 h-1 stripe rounded-full opacity-80"
              />
            </span>
            <br />
            in {cityForTitle}.
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-bone-muted max-w-2xl">
            {c.tagline} Same-day photo-rich reports, walked through with you on
            site. Buying a home is the biggest purchase of your life — go in
            with eyes open.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="link" to="/services" className="!px-7 !py-4 !text-base">
              <span aria-hidden="true">★</span>
              Get a Free Quote
            </Button>
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              variant="secondary"
              onClick={() => track('tel_click', { location: 'hero' })}
              className="!px-7 !py-4 !text-base"
            >
              Call {c.phone}
            </Button>
          </div>

          {/* Trust numbers — each on a navy-tinted plinth with a star divider */}
          <dl className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl">
            {[
              ['Years', `${c.yearsInBusiness}+`, null],
              ['Inspections', `${c.inspectionsCompleted.toLocaleString()}+`, null],
              [
                'Avg Rating',
                (
                  c.testimonials.reduce((a, t) => a + t.rating, 0) /
                  Math.max(c.testimonials.length, 1)
                ).toFixed(1),
                '★',
              ],
            ].map(([label, value, suffix], idx) => (
              <div
                key={label as string}
                className="relative pl-3 sm:pl-4 border-l-2 border-flag-red/70"
              >
                <dt className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-bone-dim mb-1">
                  {label}
                </dt>
                <dd className="text-3xl sm:text-4xl font-bold text-white font-display flex items-baseline gap-1">
                  {value}
                  {suffix && <span className="text-flag-red text-xl">{suffix}</span>}
                </dd>
                {idx === 2 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-0 text-flag-navyLight text-xl"
                  >
                    ★
                  </span>
                )}
              </div>
            ))}
          </dl>
        </div>
        {/* Bunting drape at the hero's lower edge */}
        <Bunting className="relative w-full h-10 sm:h-12 -mb-1" swags={10} />
      </section>

      {/* ─── Response Promise ─────────────────────────────────────────── */}
      <Section tone="americana">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Our Promise to You</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Quick callback. Quick inspection.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-lg border border-flag-red/40 bg-ink-100/85 shadow-card p-7 sm:p-8 overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 stripes-bar opacity-90" />
            <span aria-hidden="true" className="absolute top-3 right-4 text-2xl text-flag-red">★</span>
            <p className="text-xs uppercase tracking-[0.22em] text-flag-redSoft font-semibold mb-2">
              We Call Back In
            </p>
            <p className="text-5xl sm:text-6xl font-bold font-display text-white">
              {c.responsePromise.callbackHours}{' '}
              <span className="text-2xl text-bone-muted font-normal">hours</span>
            </p>
            <p className="mt-3 text-bone-muted">
              You message us. We reply. No voicemail black holes, no waiting
              days to learn whether we have availability.
            </p>
          </div>
          <div className="relative rounded-lg border border-flag-navyLight/50 bg-ink-100/85 shadow-card p-7 sm:p-8 overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 stripes-bar opacity-90" />
            <span aria-hidden="true" className="absolute top-3 right-4 text-2xl text-flag-navyLight">★</span>
            <p className="text-xs uppercase tracking-[0.22em] text-flag-redSoft font-semibold mb-2">
              We Inspect Within
            </p>
            <p className="text-5xl sm:text-6xl font-bold font-display text-white">
              {c.responsePromise.inspectionDays}{' '}
              <span className="text-2xl text-bone-muted font-normal">days</span>
            </p>
            <p className="mt-3 text-bone-muted">
              Quick turnaround that keeps your closing on track. Same-week
              availability is the norm.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── Certifications strip ─────────────────────────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="Credentials"
          title="Certified, licensed, fully insured."
          description="Your inspector's qualifications matter. Here are ours, plainly listed — verify any of them."
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {c.certifications.map((cert) => (
            <li key={cert.name}>
              <Card className="!p-4 h-full">
                <div className="flex items-start gap-3">
                  {cert.badgeSrc ? (
                    <img
                      src={cert.badgeSrc}
                      alt={cert.badgeAlt}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="h-12 w-12 object-contain rounded"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="h-12 w-12 flex-shrink-0 rounded bg-flag-navy/40 border border-flag-navyLight/40 flex items-center justify-center text-flag-redSoft"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-6 w-6"
                        fill="currentColor"
                      >
                        <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9L10 1.5z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white text-sm leading-snug">
                      {cert.name}
                    </p>
                    <p className="mt-1 text-xs text-bone-dim">{cert.issuer}</p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── Services overview ────────────────────────────────────────── */}
      <Section tone="elevated">
        <SectionHeader
          eyebrow="What We Inspect"
          title="A full-systems inspection — nothing skipped."
          description="Standard inspections cover every visible major system. Optional add-ons go deeper where the property warrants it."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ['Roof & Exterior', 'Roof covering, flashing, drainage, siding, soffits, trim, decks, grading.'],
            ['Structure & Foundation', 'Visible framing, foundation walls, slabs, settlement indicators.'],
            ['Plumbing', 'Supply, drains, fixtures, water heater, visible piping, leaks.'],
            ['Electrical', 'Service entrance, panel, breakers, GFCI/AFCI, visible wiring, outlets, fixtures.'],
            ['HVAC', 'Heating, cooling, distribution, thermostats, age and condition.'],
            ['Attic, Insulation, Ventilation', 'Insulation depth, ventilation, signs of water or pests.'],
            ['Interior', 'Walls, ceilings, floors, doors, windows, stairs, safety hazards.'],
            ['Basement / Crawl Space', 'Moisture indicators, sump pumps, vapor barriers, structural concerns.'],
            ['Optional Add-ons', 'Radon, mold, sewer scope, pool/spa, termite/WDO, well water.'],
          ].map(([title, desc]) => (
            <Card key={title}>
              <h3 className="text-lg font-semibold text-white mb-1.5">{title}</h3>
              <p className="text-sm text-bone-muted">{desc}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" to="/services">
            See pricing &amp; quote calculator
          </Button>
        </div>
      </Section>

      {/* ─── How It Works ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="How It Works"
          title="Four steps, no friction."
        />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            ['1', 'Get a quote', 'Use the calculator or call us. We confirm availability fast.'],
            ['2', 'Book your slot', 'Online or by phone. We coordinate with your agent and seller.'],
            ['3', 'On-site walkthrough', 'Two to three hours. Come for the last 45 minutes — we tour with you.'],
            ['4', 'Same-day report', 'Photo-rich digital report with a priority summary in your inbox.'],
          ].map(([n, title, desc]) => (
            <li key={n} className="relative">
              <Card className="h-full">
                <div className="relative inline-flex items-center justify-center mb-3">
                  <svg
                    viewBox="0 0 60 60"
                    className="h-14 w-14 text-flag-red"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M30 2 L37 22 L58 22 L41 35 L48 56 L30 43 L12 56 L19 35 L2 22 L23 22 Z" />
                  </svg>
                  <span className="absolute font-display text-2xl font-bold text-white">
                    {n}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm text-bone-muted">{desc}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* ─── Service area teaser ──────────────────────────────────────── */}
      <Section tone="elevated">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-2">
              Where We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              {c.serviceAreaSummary}
            </h2>
            <p className="text-bone-muted mb-5">
              We inspect across the towns and counties listed below — plus
              surrounding areas on request. Not sure if we cover your address?{' '}
              <a
                href={`tel:${c.phoneHref}`}
                onClick={() => track('tel_click', { location: 'service_area_section' })}
                className="text-flag-redSoft underline-offset-4 hover:underline"
              >
                Give us a quick call.
              </a>
            </p>
            <Link
              to="/service-areas"
              className="text-flag-redSoft font-semibold inline-flex items-center gap-1.5 hover:underline"
            >
              See all service areas →
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2 self-start">
            {c.serviceAreaTowns.slice(0, 12).map((town) => (
              <li
                key={town}
                className="inline-flex items-center gap-1.5 rounded-full border border-flag-navyLight/40 bg-flag-navy/10 px-3.5 py-1.5 text-sm text-bone-muted"
              >
                <span aria-hidden="true" className="text-flag-red text-xs">★</span>
                {town}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="Word From Clients"
          title="What buyers say."
          description="A few of our reviews. See more on our Reviews page or on Google."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {showcaseTestimonials.map((t) => (
            <Card key={t.name}>
              <StarRating rating={t.rating} />
              <blockquote className="mt-3 text-bone leading-relaxed">
                "{t.quote}"
              </blockquote>
              <footer className="mt-4 text-sm text-bone-muted">
                — {t.name}, {t.town}
              </footer>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" to="/reviews" variant="secondary">
            Read all reviews
          </Button>
        </div>
      </Section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      {c.faqs.length > 0 && (
        <Section tone="elevated">
          <SectionHeader
            eyebrow="Common Questions"
            title="Quick answers."
          />
          <div className="space-y-3 max-w-3xl mx-auto">
            {c.faqs.map((f, i) => (
              <details
                key={f.question}
                className="group rounded-lg border border-white/10 bg-ink-100/60 overflow-hidden"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex justify-between items-center gap-3 hover:bg-white/5">
                  <h3 className="font-semibold text-white">{f.question}</h3>
                  <span
                    aria-hidden="true"
                    className="text-flag-redSoft transition-transform group-open:rotate-45 text-2xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-bone-muted leading-relaxed">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* ─── Footer CTA ───────────────────────────────────────────────── */}
      <Section tone="americana">
        <Bunting className="absolute top-0 inset-x-0 w-full h-10 sm:h-12" swags={12} />
        <div className="text-center max-w-3xl mx-auto py-6 sm:py-10 pt-12 sm:pt-16 relative">
          <div className="flex items-center justify-center gap-3 mb-5" aria-hidden="true">
            <span className="text-flag-red text-3xl">★</span>
            <span className="text-bone text-3xl">★</span>
            <span className="text-flag-navyLight text-3xl">★</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            Ready to inspect your future home?
          </h2>
          <p className="text-bone-muted max-w-xl mx-auto mb-8 text-lg">
            Get a free quote in seconds, or call now and we will pick up.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button as="link" to="/services" className="!px-7 !py-4 !text-base">
              <span aria-hidden="true">★</span>
              Get a Free Quote
            </Button>
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              variant="secondary"
              onClick={() => track('tel_click', { location: 'home_footer_cta' })}
              className="!px-7 !py-4 !text-base"
            >
              Call {c.phone}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
