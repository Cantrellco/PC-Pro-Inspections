import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function ServiceAreas() {
  const c = siteConfig;
  const cityForTitle = c.address.city || 'Your Area';

  return (
    <>
      <SEO
        title={`Service Areas — Home Inspections Near ${cityForTitle} | ${c.businessName}`}
        description={`We inspect homes across ${c.serviceAreaSummary}. Full list of towns and counties served.`}
        pathname="/service-areas"
      />

      <Section>
        <SectionHeader
          as="h1"
          flag
          eyebrow="Service Areas"
          title={`Home inspections across ${c.serviceAreaSummary}.`}
          description={`Based in ${c.address.city || cityForTitle}, ${c.address.region}, we cover the towns and counties listed below. Not sure if your address is in our radius? Give us a quick call.`}
        />

        <Card accent className="mb-10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-4">
            Towns &amp; Counties Served
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {c.serviceAreaTowns.map((t) => (
              <li
                key={t}
                className="rounded-md border border-white/10 bg-ink-100/60 px-4 py-3 text-bone-muted hover:border-white/25 hover:text-white transition-colors"
              >
                {t}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="text-center">
          <h3 className="font-display text-2xl text-white mb-2">
            Don't see your town?
          </h3>
          <p className="text-bone-muted max-w-xl mx-auto mb-5">
            We frequently inspect outside this list. Call us — if it is in
            range, we will get you on the schedule.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'service_areas_page' })}
            >
              Call {c.phone}
            </Button>
            <Button as="link" to="/contact" variant="secondary">
              Send a message
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
