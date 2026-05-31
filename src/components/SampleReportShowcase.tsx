import { siteConfig } from '@/config/siteConfig';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';

const SAMPLE_REPORT_PATH = '/sample-report.pdf';

/** Severity chips mirror the real report's color-coded priority system. */
type Severity = 'safety' | 'repair' | 'monitor';

const SEVERITY: Record<
  Severity,
  { label: string; dot: string; chip: string; ring: string }
> = {
  safety: {
    label: 'Safety',
    dot: 'bg-[#c8102e]',
    chip: 'bg-[#c8102e]/10 text-[#9c0f26]',
    ring: 'ring-[#c8102e]/25',
  },
  repair: {
    label: 'Repair',
    dot: 'bg-[#b9791b]',
    chip: 'bg-[#b9791b]/12 text-[#8c6f18]',
    ring: 'ring-[#b9791b]/25',
  },
  monitor: {
    label: 'Monitor',
    dot: 'bg-[#0a3161]',
    chip: 'bg-[#0a3161]/10 text-[#0a3161]',
    ring: 'ring-[#0a3161]/20',
  },
};

const FINDINGS: { severity: Severity; title: string; note: string }[] = [
  {
    severity: 'safety',
    title: 'Reversed polarity at three kitchen receptacles',
    note: 'Hot and neutral wiring transposed. Correction by a licensed electrician recommended prior to closing.',
  },
  {
    severity: 'repair',
    title: 'Active moisture staining, water heater pan',
    note: 'Evidence of past or intermittent leakage at the tank base. Further evaluation advised.',
  },
  {
    severity: 'monitor',
    title: 'Minor settlement cracks, garage slab',
    note: 'Typical hairline cracking. No displacement observed. Monitor over upcoming seasons.',
  },
];

const PHOTO_NOTES = [
  { caption: 'Fig. 4 — Receptacle tester, north wall', tint: 'from-[#0a3161]/25 to-[#0a3161]/5' },
  { caption: 'Fig. 7 — Thermal scan, water heater base', tint: 'from-[#c8102e]/20 to-[#b9791b]/8' },
];

/** A small color-coded severity chip used in the faux report. */
function Chip({ severity }: { severity: Severity }) {
  const s = SEVERITY[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${s.chip} ${s.ring}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

/**
 * SampleReportShowcase — a contrast-inverted, light "paper" showpiece that
 * renders a faux inspection report as pure HTML/CSS/SVG so visitors can see
 * exactly what they receive. Sits inside the otherwise-dark site to create
 * deliberate visual rhythm.
 */
export default function SampleReportShowcase() {
  const c = siteConfig;

  return (
    <Section tone="dark" ariaLabel="Sample inspection report preview">
      <SectionHeader
        eyebrow="What you actually get"
        title="A photo-rich report you can act on."
        description="Every finding is documented, color-coded by priority, and paired with the photo that proves it. No jargon dumps — a clear plan you can hand to a contractor or read on your phone."
      />

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        {/* The report mockup — light paper on the dark canvas. */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[480px]">
            {/* Stacked pages beneath for printed-document depth. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-4 rotate-[2.2deg] rounded-[14px] bg-[#e7e2d6] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-1.5 translate-y-2 rotate-[1deg] rounded-[14px] bg-[#efeadd] shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]"
            />

            {/* The face page. */}
            <article
              className="relative -rotate-[0.6deg] overflow-hidden rounded-[14px] bg-[#faf7f0] text-[#1c1c20] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-black/5"
              aria-label="Faux sample inspection report page"
            >
              {/* Cover header */}
              <header className="bg-[#0a3161] px-6 pb-5 pt-6 text-bone sm:px-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-bold leading-tight text-white sm:text-xl">
                      {c.businessName}
                    </p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-bone/70">
                      Residential Inspection Report
                    </p>
                  </div>
                  {/* Brass seal */}
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a227]/15 ring-1 ring-[#e0c469]/50"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#e0c469]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.9 7.2 17.4l.9-5.4L4.2 8.2l5.4-.8L12 2z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-white/15 pt-3 text-[11px] text-bone/80">
                  <p>
                    <span className="text-bone/55">Property: </span>
                    <span className="font-medium text-white">123 Maple Street</span>
                  </p>
                  <p className="text-right">
                    <span className="text-bone/55">Report #: </span>
                    <span className="font-medium text-white">PCP-2048</span>
                  </p>
                  <p>
                    <span className="text-bone/55">Inspected: </span>
                    <span className="font-medium text-white">May 14, 2026</span>
                  </p>
                  <p className="text-right">
                    <span className="text-bone/55">Pages: </span>
                    <span className="font-medium text-white">38</span>
                  </p>
                </div>
              </header>

              {/* Body */}
              <div className="px-6 py-5 sm:px-8">
                {/* Priority summary */}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-[#100f12]">
                    Priority Summary
                  </h3>
                  <div className="flex gap-1.5">
                    <Chip severity="safety" />
                    <Chip severity="repair" />
                    <Chip severity="monitor" />
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {FINDINGS.map((f) => {
                    const s = SEVERITY[f.severity];
                    return (
                      <li
                        key={f.title}
                        className="rounded-lg border border-black/[0.06] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${s.dot}`}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-[12.5px] font-semibold leading-snug text-[#1c1c20]">
                                {f.title}
                              </p>
                            </div>
                            <p className="mt-0.5 text-[11.5px] leading-snug text-[#5b5852]">
                              {f.note}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Annotated photo thumbnails */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {PHOTO_NOTES.map((p) => (
                    <figure key={p.caption}>
                      <div
                        className={`relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br ${p.tint} ring-1 ring-black/[0.07]`}
                      >
                        {/* Faux annotation: callout circle + arrow */}
                        <svg
                          viewBox="0 0 120 90"
                          className="absolute inset-0 h-full w-full"
                          aria-hidden="true"
                          preserveAspectRatio="none"
                        >
                          <rect x="0" y="0" width="120" height="90" fill="rgba(255,255,255,0.35)" />
                          <line x1="0" y1="60" x2="120" y2="44" stroke="rgba(28,28,32,0.12)" strokeWidth="2" />
                          <line x1="0" y1="74" x2="120" y2="62" stroke="rgba(28,28,32,0.08)" strokeWidth="2" />
                        </svg>
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c8102e]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-2 top-2 rounded bg-[#1c1c20]/75 px-1.5 py-0.5 text-[9px] font-semibold text-bone"
                        >
                          PHOTO
                        </span>
                      </div>
                      <figcaption className="mt-1.5 text-[10.5px] leading-tight text-[#5b5852]">
                        {p.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <footer className="flex items-center justify-between border-t border-black/[0.07] bg-[#f1ece0] px-6 py-3 text-[10px] text-[#7a766e] sm:px-8">
                <span>{c.businessName} — Confidential client report</span>
                <span>Page 1 of 38</span>
              </footer>
            </article>
          </div>
        </Reveal>

        {/* Narrative + CTAs */}
        <Reveal className="order-1 lg:order-2" delay={120}>
          <ul className="space-y-5">
            {[
              {
                t: 'Color-coded by priority',
                d: 'Safety, Repair, and Monitor chips put the urgent items first — you know what to negotiate and what can wait.',
              },
              {
                t: 'A photo for every finding',
                d: 'Annotated images show exactly what and where, so nothing is left to interpretation.',
              },
              {
                t: 'Delivered fast, readable anywhere',
                d: 'Typically within 24 hours of inspection day, formatted to read cleanly on your phone or print clean for a contractor.',
              },
            ].map((item) => (
              <li key={item.t} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-flag-red/15 text-flag-redSoft"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-white">{item.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-bone-muted">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              as="a"
              href={SAMPLE_REPORT_PATH}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download a sample report
            </Button>
            <Button as="link" to="/services" variant="secondary">
              Get a free quote
            </Button>
          </div>
          <p className="mt-3 text-xs text-bone-dim">
            Sample shown is illustrative. Findings and language vary by property.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
