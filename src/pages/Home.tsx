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
import Flag from '@/components/Flag';
import Photo from '@/components/Photo';
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
      <section className="relative overflow-hidden bg-ink-200 min-h-[88vh] flex items-center">
        {/* Backdrop: a real home photo when set, otherwise the stylized flag. */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {c.images.hero ? (
            <img
              src={c.images.hero}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Flag
              wave
              animate={!reducedMotion}
              fit="cover"
              className="absolute inset-0 w-full h-full opacity-[0.7]"
            />
          )}
          {/* Cinematic gradient: deep at the bottom-left where the copy sits. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.74) 42%, rgba(8,8,8,0.5) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(0deg, rgba(8,8,8,0.85) 0%, transparent 40%)',
            }}
          />
          {/* Thin tri-color accent rail down the left edge. */}
          <div className="stripe absolute left-0 top-0 bottom-0 w-[3px] opacity-90" />
        </div>

        <div className="container-narrow relative py-20 sm:py-28">
          <p className="eyebrow mb-6">{c.serviceAreaSummary}</p>
          <h1 className="font-display font-semibold text-white leading-[1.02] max-w-4xl text-[2.75rem] sm:text-6xl lg:text-7xl">
            Honest, thorough{' '}
            <span className="italic text-flag-redSoft">home inspections</span>{' '}
            in {cityForTitle}.
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-bone-muted max-w-2xl leading-relaxed">
            {c.tagline} Same-day, photo-rich reports — walked through with you on
            site. It's the biggest purchase of your life. Go in with eyes open.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button as="link" to="/services" className="!px-8 !py-4 !text-base">
              Get a Free Quote
            </Button>
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              variant="secondary"
              onClick={() => track('tel_click', { location: 'hero' })}
              className="!px-8 !py-4 !text-base"
            >
              Call {c.phone}
            </Button>
          </div>

          {/* Trust numbers */}
          <dl className="mt-16 grid grid-cols-3 gap-5 sm:gap-10 max-w-2xl">
            {[
              ['Years experience', `${c.yearsInBusiness}+`, null],
              ['Inspections', `${c.inspectionsCompleted.toLocaleString()}+`, null],
              [
                'Average rating',
                (
                  c.testimonials.reduce((a, t) => a + t.rating, 0) /
                  Math.max(c.testimonials.length, 1)
                ).toFixed(1),
                '★',
              ],
            ].map(([label, value, suffix]) => (
              <div key={label as string} className="border-l border-white/15 pl-4">
                <dd className="text-3xl sm:text-5xl font-semibold text-white font-display flex items-baseline gap-1">
                  {value}
                  {suffix && <span className="text-flag-red text-2xl">{suffix}</span>}
                </dd>
                <dt className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-bone-dim">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
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
          <div className="relative rounded-xl border border-white/10 bg-ink-100/70 backdrop-blur-sm shadow-card p-8 sm:p-10">
            <p className="eyebrow mb-4">We call back within</p>
            <p className="text-6xl sm:text-7xl font-semibold font-display text-white leading-none">
              {c.responsePromise.callbackHours}
              <span className="ml-2 text-2xl text-bone-muted font-sans font-normal">hours</span>
            </p>
            <p className="mt-5 text-bone-muted leading-relaxed">
              You message us. We reply. No voicemail black holes, no waiting
              days to learn whether we have availability.
            </p>
          </div>
          <div className="relative rounded-xl border border-white/10 bg-ink-100/70 backdrop-blur-sm shadow-card p-8 sm:p-10">
            <p className="eyebrow mb-4">We inspect within</p>
            <p className="text-6xl sm:text-7xl font-semibold font-display text-white leading-none">
              {c.responsePromise.inspectionDays}
              <span className="ml-2 text-2xl text-bone-muted font-sans font-normal">days</span>
            </p>
            <p className="mt-5 text-bone-muted leading-relaxed">
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14">
          <Photo
            src={c.images.services}
            alt="Home inspection in progress"
            aspectClass="aspect-[4/3]"
            placeholderLabel="Inspection in progress"
          />
          <div>
            <p className="eyebrow mb-3">What We Inspect</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4 leading-tight">
              A full-systems inspection — nothing skipped.
            </h2>
            <p className="text-bone-muted text-lg leading-relaxed">
              Every visible major system, documented with photos and a clear
              priority summary. Optional add-ons go deeper where the property
              warrants it — radon, mold, sewer scope, and more.
            </p>
            <div className="mt-6">
              <Button as="link" to="/services" variant="secondary">
                See pricing &amp; calculator
              </Button>
            </div>
          </div>
        </div>
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
            <Card key={title} className="p-6">
              <h3 className="text-lg font-semibold text-white mb-1.5">{title}</h3>
              <p className="text-sm text-bone-muted leading-relaxed">{desc}</p>
            </Card>
          ))}
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
            <p className="eyebrow mb-3">Where We Work</p>
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

      {/* ─── Footer CTA — cinematic photo band ────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {c.images.ctaBand ? (
            <img src={c.images.ctaBand} alt="" className="h-full w-full object-cover" />
          ) : (
            <Flag wave animate={!reducedMotion} fit="cover" className="h-full w-full opacity-30" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,8,8,0.86) 0%, rgba(8,8,8,0.78) 100%)',
            }}
          />
          <div className="stripe absolute inset-x-0 top-0 h-[3px] opacity-90" />
        </div>
        <div className="container-narrow relative py-20 sm:py-28 text-center">
          <p className="eyebrow mb-5 justify-center">Ready when you are</p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white mb-4 max-w-2xl mx-auto leading-tight">
            Inspect your future home with confidence.
          </h2>
          <p className="text-bone-muted max-w-xl mx-auto mb-9 text-lg">
            Get a free, itemized quote in seconds — or call now and we'll pick up.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button as="link" to="/services" className="!px-8 !py-4 !text-base">
              Get a Free Quote
            </Button>
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
        </div>
      </section>
    </>
  );
}
