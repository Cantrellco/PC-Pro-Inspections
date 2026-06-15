import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import StarRating from '@/components/StarRating';
import Reveal from '@/components/Reveal';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import CTABand from '@/components/CTABand';

export default function Reviews() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`Reviews | ${c.businessName}`}
        description={`Read real reviews from buyers and agents across ${c.serviceAreaSummary}. ${c.testimonials.length}+ testimonials from real clients.`}
        pathname="/reviews"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Reviews"
          title="Reputation, earned one inspection at a time."
          description="Reviews are the single biggest reason buyers choose us — and the biggest thing we protect. Here's the unfiltered picture."
        />

        {c.testimonials.length > 0 && (
          <Reveal className="mb-16">
            <TestimonialCarousel items={c.testimonials} />
          </Reveal>
        )}

        {c.testimonials.length > 0 && (
          <>
            <h2 className="display-3 text-white text-center mb-8">Every word from real clients</h2>
            <ul className="grid md:grid-cols-2 gap-5">
              {c.testimonials.map((t, i) => (
                <Reveal as="li" key={t.name} delay={(i % 2) * 80}>
                  <Card glow hover className="h-full">
                    <StarRating rating={t.rating} />
                    <blockquote className="mt-4 text-bone leading-relaxed">{t.quote}</blockquote>
                    <footer className="mt-5 pt-5 border-t border-white/10 text-sm">
                      <span className="text-white font-semibold">{t.name}</span>
                      <span className="text-bone-dim"> · {t.role}</span>
                    </footer>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </>
        )}

      </Section>

      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="Your Turn"
          title={
            <>
              Get the same <span className="italic text-gradient-brass">straight answer.</span>
            </>
          }
          description="Book an inspection and get a same-evening digital report — photos, priorities, and the unfiltered condition of the home."
        >
          <Button as="link" to="/book" className="!px-8 !py-4 !text-base">
            Book an inspection
          </Button>
        </CTABand>
      </div>
    </>
  );
}
