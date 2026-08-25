import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { useReviews } from '@/services/reviews';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import Seal from '@/components/Seal';
import CTABand from '@/components/CTABand';
import type { Testimonial } from '@/types';

const INKS = ['red', 'navy', 'brass'] as const;

const clamp = (n: number): Testimonial['rating'] =>
  Math.max(1, Math.min(5, Math.round(n))) as Testimonial['rating'];

const sourceName = (s: Testimonial['source']) => (s === 'google' ? 'Google' : 'Spectora');

export default function Reviews() {
  const c = siteConfig;
  const { reviews } = useReviews();
  const reviewUrl = c.google?.writeReviewUrl || c.google?.mapsUrl;

  return (
    <>
      <SEO
        title={`Reviews | ${c.businessName}`}
        description={`Every review of ${c.businessName}, in full, from buyers, sellers and agents across ${c.serviceAreaSummary.replace('Serving ', '')}. Verified reviews left on Spectora after the inspection.`}
        pathname="/reviews"
      />

      {/* ─── The stamp sheet ─────────────────────────────────────────── */}
      <Section wide>
        <header className="mb-10 grid gap-4 sm:mb-12 sm:grid-cols-[auto_1fr] sm:items-end">
          <h1 className="display-1 cut-red">
            Stamped
            <br />
            by clients.
          </h1>
          <p className="lede max-w-sm sm:pb-2">
            Every review, in full. Nothing trimmed, nothing picked. Each one was left on
            Spectora after the report went out.
          </p>
        </header>

        {reviews.length > 0 ? (
          <ul className="border-t-3 border-ink">
            {reviews.map((t, i) => (
              <Reveal
                as="li"
                key={`${t.source ?? 'x'}-${t.name}-${i}`}
                delay={Math.min(i, 4) * 60}
                className="grid grid-cols-[4.25rem_1fr] gap-4 border-b-3 border-ink py-6 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-8"
              >
                <Seal stars={clamp(t.rating)} ink={INKS[i % INKS.length]} className="w-[4.25rem] sm:w-20">
                  <span
                    className="num font-display text-xl leading-none text-ink sm:text-2xl"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {t.rating}
                    <span className="text-ink-mute">/5</span>
                  </span>
                </Seal>
                <div className="min-w-0">
                  <blockquote className="max-w-3xl text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="label">
                      {t.name}
                      <span className="text-ink-mute"> &middot; {t.role}</span>
                    </span>
                    <span className="label-sm">Verified review &middot; {sourceName(t.source)}</span>
                  </footer>
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="border-y-3 border-ink py-8 text-ink-soft">
            Reviews are on their way. Call Paul and ask for a reference in the meantime.
          </p>
        )}
      </Section>

      {/* ─── Leave one ───────────────────────────────────────────────── */}
      {reviewUrl && (
        <Section wide tone="deep" compact>
          <Card ink="red" className="mx-auto max-w-3xl">
            <h2 className="display-3">Worked with Paul? Leave a Google review.</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              One minute on Google is the most useful thing a past client can do for a
              one-man business. It shows up on the listing the next buyer reads.
            </p>
            <div className="mt-6">
              <Button as="a" href={reviewUrl} target="_blank" rel="noopener noreferrer">
                Write a Google review
              </Button>
            </div>
          </Card>
        </Section>
      )}

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="Get the same straight answer."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Report the same evening.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'reviews_cta_band' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/book" variant="secondary" className="!text-lg">
          Book an inspection
        </Button>
      </CTABand>
    </>
  );
}
