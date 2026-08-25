import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { buildFaqJsonLd } from '@/services/seo';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import CTABand from '@/components/CTABand';
import type { PrepGuideSection } from '@/types';

const SAMPLE_REPORT_PATH = '/sample-report.pdf';

/** "For the Seller — Access" → group "For the Seller", title "Access". */
function splitHeading(h: string): { group: string; title: string } {
  const [group, ...rest] = h.split(/\s+[—–-]\s+/);
  const title = rest.join(' — ').trim();
  return { group: group.trim(), title: title || 'What happens' };
}

type Run = { group: string; items: { title: string; body: string }[] };

function groupPrep(sections: PrepGuideSection[]): Run[] {
  const runs: Run[] = [];
  for (const s of sections) {
    const { group, title } = splitHeading(s.heading);
    const last = runs[runs.length - 1];
    if (last && last.group === group) last.items.push({ title, body: s.body });
    else runs.push({ group, items: [{ title, body: s.body }] });
  }
  return runs;
}

const BRING = [
  'Your questions, written down',
  'Your agent’s phone number, for access',
  'Shoes you can walk the yard in',
  'A phone for your own photos',
];

const EXPECT = [
  'Two and a half to six hours on site, depending on the house',
  'Roof and exterior first, then inside, top to bottom',
  'The last 45 minutes walking the house with Paul',
  'The report that evening: photos and a priority summary',
];

/** A report page, cut in paper: folded corner, a photo box, ruled notes, a flagged line. */
function ReportGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 84 108"
      className={className}
      fill="none"
      stroke="#111111"
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M4 4h56l20 20v80H4z" fill="#fbf8f1" />
      <path d="M60 4v20h20" />
      <rect x="14" y="34" width="24" height="18" fill="#0a3161" />
      <path d="M46 38h24M46 46h18" />
      <path d="M14 62h56M14 72h44" />
      <rect x="14" y="82" width="8" height="8" fill="#c8102e" />
      <path d="M28 86h42" />
    </svg>
  );
}

export default function Resources() {
  const c = siteConfig;
  const runs = groupPrep(c.prepGuide);

  return (
    <>
      <SEO
        title={`Sample Report & Prep Guide | ${c.businessName}`}
        description="See the report you will get, how to get the house ready, and what to bring on inspection day. For buyers and sellers."
        pathname="/resources"
        jsonLd={c.faqs.length > 0 ? buildFaqJsonLd() : undefined}
      />

      {/* ─── Title + sample report ───────────────────────────────────── */}
      <Section wide>
        <header className="mb-10 grid gap-4 sm:mb-12 sm:grid-cols-[auto_1fr] sm:items-end">
          <h1 className="display-1 cut-navy">
            Before
            <br />
            inspection day.
          </h1>
          <p className="lede max-w-sm sm:pb-2">
            What the report looks like, how to get the house ready, and what to bring.
          </p>
        </header>

        <Reveal>
          <Card
            ticket
            className="grid items-center gap-6 sm:grid-cols-[7rem_1fr] sm:gap-8 lg:grid-cols-[9rem_1fr_auto] lg:gap-10"
          >
            <ReportGlyph className="w-24 sm:w-full" />
            <div>
              <h2 className="display-3">The report, the same evening.</h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Every inspection ends with a Spectora digital report: a photo for each
                finding, a priority summary up top, and plain notes you can hand to your
                agent for repair talks. It is sent the evening of the inspection and opens
                on a phone. The sample below is a real report with the client&rsquo;s details
                removed.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:flex-col lg:items-stretch lg:gap-3">
              <Button as="a" href={SAMPLE_REPORT_PATH} target="_blank" rel="noopener noreferrer">
                Open the sample report
              </Button>
              <a href={SAMPLE_REPORT_PATH} download className="btn-ghost lg:justify-center">
                Download the PDF
              </a>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* ─── Prep guide ──────────────────────────────────────────────── */}
      {runs.length > 0 && (
        <Section wide tone="deep">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader
                title="Get the house ready."
                description={
                  'A short list for each side. It makes for a faster inspection and fewer lines that read “could not access”.'
                }
                cut="brass"
                className="!mb-0"
              />
            </div>
            <div className="lg:col-span-8">
              {runs.map((run, r) => (
                <div key={run.group} className={r > 0 ? 'mt-10' : ''}>
                  <p className="label-sm mb-2">{run.group}</p>
                  <ul className="border-t-3 border-ink">
                    {run.items.map((it, i) => (
                      <Reveal as="li" key={it.title} delay={i * 60} className="border-b-3 border-ink py-5">
                        <h3 className="display-3">{it.title}</h3>
                        <p className="mt-2 max-w-2xl text-ink-soft">{it.body}</p>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ─── Bring / expect ──────────────────────────────────────────── */}
      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader title="On the day." cut="red" className="!mb-0" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            <Checklist label="What to bring" items={BRING} />
            <Checklist label="What to expect" items={EXPECT} />
          </div>
        </div>
      </Section>

      {/* ─── Questions ───────────────────────────────────────────────── */}
      {c.faqs.length > 0 && (
        <Section wide tone="deep">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader title="Buyers ask" cut="navy" className="!mb-4" />
              <p className="text-ink-soft">
                Anything else,{' '}
                <a
                  href={`tel:${c.phoneHref}`}
                  onClick={() => track('tel_click', { location: 'resources_faq' })}
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
        tone="navy"
        title="Know what to expect? Set a date."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Inspected within ${c.responsePromise.inspectionDays} days.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'resources_cta_band' })}
          className="btn-primary !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/book" variant="secondary" className="!text-lg">
          Book
        </Button>
      </CTABand>
    </>
  );
}

function Checklist({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="label-sm mb-2">{label}</p>
      <ul className="border-t-3 border-ink">
        {items.map((it) => (
          <li key={it} className="grid grid-cols-[1.25rem_1fr] items-start gap-3 border-b-2 border-ink py-3.5">
            <span aria-hidden="true" className="mt-0.5 block h-5 w-5 border-2 border-ink bg-paper-white" />
            <span className="text-ink-soft">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
