import SEO from '@/components/SEO';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';

export default function NotFound() {
  const c = siteConfig;
  return (
    <>
      <SEO
        title={`Page not found | ${c.businessName}`}
        description="The page you tried to reach does not exist. Head back to the home page or call us directly."
      />

      <Section>
        <div className="text-center max-w-xl mx-auto py-10">
          <p className="font-display text-7xl sm:text-9xl font-bold text-flag-red leading-none">
            404
          </p>
          <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold text-white">
            We couldn't find that page.
          </h1>
          <p className="mt-4 text-bone-muted">
            The link may be broken, or the page may have moved. Head back to
            the home page — or call us and we will help you directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button as="link" to="/">
              Back to Home
            </Button>
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              variant="secondary"
              onClick={() => track('tel_click', { location: '404' })}
            >
              Call {c.phone}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
