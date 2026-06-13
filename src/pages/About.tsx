import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import CTABand from '@/components/CTABand';

export default function About() {
  const c = siteConfig;

  const stats = [
    { value: c.yearsInBusiness, suffix: '+', label: 'Years inspecting' },
    { value: c.inspectionsCompleted, suffix: '+', label: 'Inspections completed' },
    { value: c.certifications.length, suffix: '', label: 'Specialty certifications' },
  ];

  return (
    <>
      <SEO
        title={`About — Certifications & Experience | ${c.businessName}`}
        description={`Meet ${c.inspectorName} — ${c.yearsInBusiness}+ years and ${c.inspectionsCompleted.toLocaleString()}+ inspections completed. Certified in thermal imaging, mold, termite/WDO, pool & spa, and manufactured-home inspection.`}
        pathname="/about"
      />

      <Section>
        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Bio */}
          <div className="md:col-span-3">
            <p className="eyebrow mb-4">About {c.businessName}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] mb-6">
              Built on craft,
              <br />
              <span className="italic text-flag-redSoft">paid by trust.</span>
            </h1>
            <div className="space-y-5 text-bone-muted text-lg leading-relaxed">
              <p>
                {/* TODO: owner — replace this paragraph with your real story. */}
                I started inspecting homes after years in the trades, because I
                kept seeing buyers get burned by shallow inspections. A
                home is the biggest purchase most people ever make. The work
                deserves more care than a rushed checklist.
              </p>
              <p>
                Every inspection I do is one I would do on my own family's home —
                same depth, same patience, same plain-language walkthrough at
                the end. If something is wrong, I tell you. If something is
                fine, I tell you that too.
              </p>
              <p>
                After {c.yearsInBusiness}+ years and{' '}
                {c.inspectionsCompleted.toLocaleString()}+ inspections, my
                report is what I want it to be: thorough, photo-rich, prioritized,
                and delivered the same day.
              </p>
            </div>

            <p className="mt-8 font-display text-2xl text-white leading-tight">
              {c.inspectorName}
              <span className="mt-1 block font-sans text-sm tracking-wide text-bone-dim">
                Owner &amp; Home Inspector · {c.businessName}
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="link" to="/services">
                See pricing
              </Button>
              <Button as="link" to="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Photo — framed with a restrained crimson hairline accent */}
          <div className="md:col-span-2">
            <div className="group relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-flag-navy/25 via-transparent to-flag-red/15 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative rounded-2xl border border-white/10 bg-ink-100/60 p-2 shadow-card">
                <div aria-hidden="true" className="absolute -top-px inset-x-6 h-px bg-gradient-to-r from-transparent via-flag-red/70 to-transparent" />
                <Photo
                  src={c.images.inspector}
                  alt={`${c.inspectorName} — ${c.businessName}`}
                  aspectClass="aspect-[4/5]"
                  roundedClass="rounded-xl"
                  placeholderLabel={`Portrait of ${c.inspectorName}`}
                />
              </div>
            </div>
            <p className="mt-8 text-sm text-bone-dim italic">
              {c.inspectorName} — {c.businessName}
            </p>
            {/* TODO: owner — replace the placeholder portrait with a real photo
                via siteConfig.images.inspector. Your own photo beats stock on a
                trust-based service. */}
          </div>
        </div>

        {/* Credentials at a glance */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <Card rim glow className="h-full text-center sm:text-left">
                <p className="font-display text-5xl font-semibold leading-none text-white">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-bone-dim">
                  {s.label}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section tone="elevated">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-3">Our Mission</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5">
            Give buyers the report we would want on our own home.
          </h2>
          <p className="text-bone-muted text-lg leading-relaxed">
            Honest findings. Clear priorities. Plain-language explanations.
            No upselling, no fear-mongering, no rubber-stamp. Just the facts
            you need to decide.
          </p>
        </div>
      </Section>

      {/* Certifications */}
      <Section>
        <SectionHeader
          eyebrow="Credentials"
          title="Specialty certifications."
          description="Advanced certifications beyond the standard inspection — each is verifiable; ask for documentation any time."
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.certifications.map((cert) => (
            <li key={cert.name}>
              <Card rim glow hover className="h-full">
                <div className="flex items-start gap-4">
                  {cert.badgeSrc ? (
                    <img
                      src={cert.badgeSrc}
                      alt={cert.badgeAlt}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 object-contain rounded"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="h-16 w-16 flex-shrink-0 rounded bg-flag-navy/30 border border-flag-navyLight/40 flex items-center justify-center text-flag-redSoft"
                    >
                      <svg viewBox="0 0 20 20" className="h-8 w-8" fill="currentColor">
                        <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9L10 1.5z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-white leading-snug">
                      {cert.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-bone-muted">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="Work With Us"
          title={
            <>
              The same care, on <span className="italic text-gradient-brass">your</span> home.
            </>
          }
          description="See transparent pricing, or reach out and we'll take it from there."
        >
          <Magnetic>
            <Button as="link" to="/services" className="!px-8 !py-4 !text-base">
              See pricing
            </Button>
          </Magnetic>
          <Button
            as="a"
            href={`tel:${c.phoneHref}`}
            variant="secondary"
            onClick={() => track('tel_click', { location: 'about_cta_band' })}
            className="!px-8 !py-4 !text-base"
          >
            Call {c.phone}
          </Button>
        </CTABand>
      </div>
    </>
  );
}
