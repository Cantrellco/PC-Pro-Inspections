import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import ServiceAreaMap from '@/components/ServiceAreaMap';

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
          eyebrow="Service Areas"
          title={`${c.serviceAreaSummary}.`}
          description={`Based in ${c.address.city || cityForTitle}, ${c.address.region}, we cover the towns and counties below — plus surrounding areas on request. Not sure if your address is in our radius? Give us a quick call.`}
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-10">
          <Reveal className="min-h-[20rem]">
            <ServiceAreaMap />
          </Reveal>
          <Reveal delay={80}>
            <Card rim className="h-full">
              <h2 className="eyebrow mb-5">Towns &amp; Counties Served</h2>
              <ul className="grid grid-cols-2 gap-2.5">
                {c.serviceAreaTowns.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-bone-muted hover:text-white transition-colors"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flag-red" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

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
