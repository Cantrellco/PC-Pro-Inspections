import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import WoodblockPrint from '@/components/WoodblockPrint';
import CTABand from '@/components/CTABand';

/**
 * About — Paul's letter, printed. The portrait sits beside the letter, then a
 * certificate ledger, the crawler print, a short "how Paul works" list, and
 * the closing band. No counters, no mission statement: the letter says it.
 */
export default function About() {
  const c = siteConfig;
  const story = c.ownerStory;
  const eq = c.equipment;
  const pc = c.primaryCertification;

  const HOW: [string, string][] = [
    ['He calls you back himself', `Within ${c.responsePromise.callbackHours} hours. There is no front desk. You get Paul.`],
    ['You walk the last 45 minutes', 'Come at the end and walk the house with him. Ask anything before you leave.'],
    ['The report lands that evening', 'Photos, a priority summary, and plain-language notes your agent can use.'],
    ['No upsell. Prices are posted.', 'The price on the Services page is the price. Nothing gets added at the door.'],
  ];

  return (
    <>
      <SEO
        title={`Meet ${c.inspectorName} — About | ${c.businessName}`}
        description={`${c.inspectorName} owns and runs ${c.businessName} in ${c.address.city}, IL. InterNACHI® Certified Professional Inspector with thermal, mold, termite/WDO, pool & spa and manufactured-home certifications. He calls back within ${c.responsePromise.callbackHours} hours and sends the report the same evening.`}
        pathname="/about"
      />

      {/* ─── The letter ──────────────────────────────────────────────── */}
      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait: first on mobile, right-hand and sticky on desktop. */}
          <div className="lg:order-last lg:col-span-5">
            <div className="mx-auto max-w-sm lg:sticky lg:top-24 lg:max-w-none">
              <Photo
                src={c.images.inspector}
                alt={`${c.inspectorName}, owner of ${c.businessName}`}
                aspectClass="aspect-[4/5]"
                ink="red"
                priority
                placeholderLabel={`Portrait of ${c.inspectorName}`}
              />
              <p className="label-sm mt-4">
                {c.inspectorName} · {c.address.city}, Illinois
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h1 className="display-1 cut-red">Meet Paul.</h1>

            {story ? (
              <div className="mt-8 max-w-[68ch]">
                <p className="lede">{story.greeting}</p>

                <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                  {story.paragraphs.flatMap((para, i) => {
                    const nodes = [<p key={`p-${i}`}>{para}</p>];
                    if (story.pullQuote && story.pullQuote.afterParagraph === i) {
                      nodes.push(
                        <figure key={`q-${i}`} className="!my-10 border-y-3 border-red py-6">
                          <blockquote className="display-3 text-navy">
                            “{story.pullQuote.text}”
                          </blockquote>
                        </figure>,
                      );
                    }
                    return nodes;
                  })}
                </div>

                {/* Signature */}
                <div className="mt-10 border-t-3 border-ink pt-5">
                  <p className="font-display text-3xl uppercase leading-none text-ink sm:text-4xl">
                    {story.signature.name}
                  </p>
                  <p className="label-sm mt-2">{story.signature.title}</p>
                </div>
              </div>
            ) : (
              <p className="lede mt-8 max-w-[68ch]">
                {c.inspectorName} owns and runs {c.businessName} in {c.address.city}, Illinois.
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`tel:${c.phoneHref}`}
                onClick={() => track('tel_click', { location: 'about_letter' })}
                className="btn-primary"
              >
                Call <span className="num">{c.phone}</span>
              </a>
              <Button as="link" to="/services" variant="secondary">
                See prices
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Certificate ledger ──────────────────────────────────────── */}
      {(pc || c.certifications.length > 0) && (
        <Section wide tone="deep">
          <SectionHeader
            title="Certified. Glad to prove it."
            description="Paul carries the papers. Ask to see any of them."
            cut="brass"
          />

          {pc && (
            <Reveal>
              <Card ink="brass">
                <div className="grid gap-6 sm:grid-cols-[7rem_1fr] sm:items-start">
                  <img
                    src={pc.badgeSrc}
                    alt={pc.badgeAlt}
                    width={112}
                    height={112}
                    className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                  />
                  <div>
                    <h3 className="display-3 text-ink">{pc.name}</h3>
                    <p className="label-sm mt-2">{pc.issuer}</p>
                    <p className="mt-4 max-w-[62ch] text-ink-soft">{pc.blurb}</p>
                    {pc.verifyUrl && (
                      <a
                        href={pc.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost mt-5"
                      >
                        Verify this credential
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </Reveal>
          )}

          {c.certifications.length > 0 && (
            <ul className={`border-t-3 border-ink ${pc ? 'mt-12' : ''}`}>
              {c.certifications.map((cert, i) => (
                <Reveal
                  as="li"
                  key={cert.name}
                  delay={i * 50}
                  className="grid grid-cols-[40px_1fr] items-center gap-4 border-b-2 border-ink py-4 sm:grid-cols-[40px_1fr_auto] sm:gap-6"
                >
                  {cert.badgeSrc ? (
                    <img
                      src={cert.badgeSrc}
                      alt={cert.badgeAlt}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <span aria-hidden="true" className="block h-10 w-10 border-2 border-ink" />
                  )}
                  <h3 className="font-display text-xl uppercase leading-none text-ink sm:text-2xl">
                    {cert.name}
                  </h3>
                  <p className="col-start-2 text-sm text-ink-mute sm:col-start-auto sm:text-right">
                    {cert.issuer}
                  </p>
                </Reveal>
              ))}
            </ul>
          )}
        </Section>
      )}

      {/* ─── The crawler ─────────────────────────────────────────────── */}
      {eq && (
        <Section wide tone="navy">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <WoodblockPrint
                base="wombat"
                ratio={1200 / 896}
                alt={eq.imageAlt}
                className="mx-auto w-full max-w-xl"
              />
              <figure className="mx-auto mt-8 max-w-[16rem] sm:max-w-xs">
                <Photo
                  src={eq.image}
                  alt={eq.imageAlt}
                  aspectClass="aspect-square"
                  ink="brass"
                  placeholderLabel={eq.name}
                />
                <figcaption className="label-sm mt-3 !text-paper/80">
                  {eq.name} · {eq.maker}
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-6">
              <h2 className="display-2 text-paper" style={{ textShadow: '0.045em 0.045em 0 #c8102e' }}>
                {eq.headline}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-paper/90">{eq.body}</p>

              <ul className="mt-8 border-t-3 border-paper">
                {eq.features.map((f) => (
                  <li key={f.label} className="border-b-2 border-paper/40 py-4">
                    <h3 className="font-condensed text-xl font-bold uppercase leading-none tracking-wide text-paper">
                      {f.label}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-paper/80">{f.detail}</p>
                  </li>
                ))}
              </ul>

              {eq.productUrl && (
                <a
                  href={eq.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-condensed font-bold uppercase tracking-[0.06em] text-paper underline decoration-brass decoration-[3px] underline-offset-[5px] hover:decoration-paper"
                >
                  See the {eq.name} by {eq.maker}
                </a>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* ─── How Paul works ──────────────────────────────────────────── */}
      <Section wide>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              title="How Paul works"
              description="One inspector. Same rules on every house."
              cut="navy"
              className="!mb-6"
            />
            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'about_how' })}
              className="btn-primary"
            >
              Call <span className="num">{c.phone}</span>
            </a>
          </div>
          <ol className="border-t-3 border-ink lg:col-span-8">
            {HOW.map(([t, d], i) => (
              <Reveal
                as="li"
                key={t}
                delay={i * 60}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-b-3 border-ink py-5 sm:grid-cols-[5rem_1fr]"
              >
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

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="Call Paul. He picks up."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Report the same evening.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'about_cta_band' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/services" variant="secondary" className="!text-lg">
          See prices
        </Button>
      </CTABand>
    </>
  );
}
