import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Magnetic from '@/components/Magnetic';
import Reveal from '@/components/Reveal';
import CTABand from '@/components/CTABand';
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
            <Card rim glow className="h-full">
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

      </Section>

      <div className="pb-20 sm:pb-28">
        <CTABand
          eyebrow="Beyond the List"
          title={
            <>
              Don't see your <span className="italic text-gradient-brass">town?</span>
            </>
          }
          description="We frequently inspect outside this list. Call us — if it's in range, we'll get you on the schedule."
        >
          <Magnetic>
            <Button
              as="a"
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'service_areas_page' })}
              className="!px-8 !py-4 !text-base"
            >
              Call {c.phone}
            </Button>
          </Magnetic>
          <Button as="link" to="/contact" variant="secondary" className="!px-8 !py-4 !text-base">
            Send a message
          </Button>
        </CTABand>
      </div>
    </>
  );
}
