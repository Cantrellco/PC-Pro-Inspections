import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import StarRating from '@/components/StarRating';

export default function Reviews() {
  const c = siteConfig;
  const hasGoogle = Boolean(c.googleReviews.placeUrl || c.googleReviews.embedSrc);

  return (
    <>
      <SEO
        title={`Reviews | ${c.businessName}`}
        description={`Read real reviews from buyers we've worked with. ${c.testimonials.length} testimonials and ongoing Google reviews.`}
        pathname="/reviews"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Reviews"
          title="What our clients say."
          description="A working list of testimonials and live Google reviews. Reviews drive everything in this business — we earn each one."
        />

        {/* Google Reviews block */}
        <div className="mb-12">
          {c.googleReviews.embedSrc ? (
            <Card>
              <h2 className="text-lg font-semibold text-white mb-4">
                Google Reviews
              </h2>
              <div className="aspect-video w-full rounded-md overflow-hidden bg-ink-200 border border-white/10">
                <iframe
                  src={c.googleReviews.embedSrc}
                  title="Google Reviews"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              {c.googleReviews.placeUrl && (
                <div className="mt-4 text-center">
                  <Button
                    as="a"
                    href={c.googleReviews.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    See all on Google →
                  </Button>
                </div>
              )}
            </Card>
          ) : c.googleReviews.placeUrl ? (
            <Card rim className="text-center">
              <h2 className="text-2xl font-display font-semibold text-white mb-3">
                Read our Google Reviews
              </h2>
              <p className="text-bone-muted mb-5 max-w-xl mx-auto">
                We post every public review to our Google Business Profile.
                Click through to read them all and leave your own after your
                inspection.
              </p>
              <Button
                as="a"
                href={c.googleReviews.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on Google →
              </Button>
            </Card>
          ) : (
            <Card className="text-center">
              <p className="text-sm uppercase tracking-wider text-bone-dim mb-2">
                Google Reviews
              </p>
              <p className="text-bone-muted">
                Live Google review embed coming soon — testimonials below in
                the meantime.
              </p>
            </Card>
          )}
        </div>

        {/* Manual testimonials */}
        {c.testimonials.length > 0 && (
          <>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
              From recent inspections
            </h2>
            <ul className="grid md:grid-cols-2 gap-5">
              {c.testimonials.map((t) => (
                <li key={t.name}>
                  <Card className="h-full">
                    <StarRating rating={t.rating} />
                    <blockquote className="mt-3 text-bone leading-relaxed">
                      "{t.quote}"
                    </blockquote>
                    <footer className="mt-4 text-sm text-bone-muted">
                      — {t.name}, {t.town}
                    </footer>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-bone-muted mb-4">
            Worked with us? We would deeply appreciate a Google review — it is
            the single biggest thing you can do to help.
          </p>
          {hasGoogle && c.googleReviews.placeUrl && (
            <Button
              as="a"
              href={c.googleReviews.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              Leave a Google review
            </Button>
          )}
        </div>
      </Section>
    </>
  );
}
