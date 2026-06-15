import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import CTABand from '@/components/CTABand';
import { track } from '@/services/analytics';
import SampleReportShowcase from '@/components/SampleReportShowcase';

const SAMPLE_REPORT_PATH = '/sample-report.pdf';

export default function Resources() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`Resources — Sample Report & Prep Guide | ${c.businessName}`}
        description="See exactly what our inspection report looks like, and how to prepare for inspection day — for both buyers and sellers."
        pathname="/resources"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Resources"
          title="What to expect — before and after."
          description="A sample of the report you will receive, plus everything you need to prepare for inspection day."
        />
      </Section>

      {/* Signature sample-report showpiece */}
      <SampleReportShowcase />

      <Section>
        {/* Sample Report */}
        <Card rim glow className="mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 h-28 w-20 rounded border border-white/10 bg-gradient-to-br from-flag-navy/30 to-ink-200 flex items-center justify-center text-flag-redSoft">
              <svg
                viewBox="0 0 24 24"
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Sample Inspection Report
              </h2>
              <p className="text-bone-muted mb-5">
                A redacted PDF showing exactly what you receive after your
                inspection: priority summary, photos for every finding,
                clear next-step recommendations, and a maintenance section.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  as="a"
                  href={SAMPLE_REPORT_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Sample Report
                </Button>
                <Button
                  as="a"
                  href={SAMPLE_REPORT_PATH}
                  download
                  variant="secondary"
                >
                  Download PDF
                </Button>
              </div>
              <p className="mt-4 text-xs text-bone-dim">
                Sample shown is illustrative. Findings and language vary by
                property; client details are redacted.
              </p>
            </div>
          </div>
        </Card>

        {/* Prep Guide */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Pre-Inspection Prep Guide
            </h2>
            <p className="text-bone-muted">
              A short, practical checklist for both sides. Following this gets
              you a faster, cleaner inspection and avoids the common avoidable
              snags.
            </p>
          </div>
          <ul className="md:col-span-2 space-y-4">
            {c.prepGuide.map((s) => (
              <li key={s.heading}>
                <Card glow hover>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {s.heading}
                  </h3>
                  <p className="text-bone-muted leading-relaxed">{s.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="When You're Ready"
          title={
            <>
              Know what to expect? <span className="italic text-gradient-brass">Let's schedule.</span>
            </>
          }
          description="Get a free quote in seconds, or call and we'll find you a slot."
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
            onClick={() => track('tel_click', { location: 'resources_cta_band' })}
            className="!px-8 !py-4 !text-base"
          >
            Call {c.phone}
          </Button>
        </CTABand>
      </div>
    </>
  );
}
