import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Flag from '@/components/Flag';

export default function About() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`About — Certifications & Experience | ${c.businessName}`}
        description={`Meet your inspector — ${c.yearsInBusiness}+ years and ${c.inspectionsCompleted.toLocaleString()}+ inspections completed. Fully certified, licensed, and insured.`}
        pathname="/about"
      />

      <Section>
        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Bio */}
          <div className="md:col-span-3">
            <Flag wave className="h-10 w-[76px] rounded-sm shadow-card mb-4" />
            <p className="eyebrow mb-3">About</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Built on craft, paid by trust.
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="link" to="/services">
                See pricing
              </Button>
              <Button as="link" to="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="md:col-span-2">
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-ink-50 to-ink-200 relative">
              {/* TODO: owner — drop a real photo at public/inspector-photo.jpg and replace this. */}
              <div className="absolute inset-0 flex items-center justify-center text-bone-dim text-sm text-center p-6">
                <span>
                  Photo placeholder
                  <br />
                  <span className="text-xs">
                    Drop a portrait at <code>/public/inspector-photo.jpg</code>
                  </span>
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-bone-dim italic">
              We strongly prefer real photos over stock — inspection is a trust
              business.
            </p>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section tone="elevated">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-3">
            Our Mission
          </p>
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
          title="Certifications & coverage."
          description="The credentials below are verifiable — ask for documentation any time."
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.certifications.map((cert) => (
            <li key={cert.name}>
              <Card accent className="h-full">
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
    </>
  );
}
