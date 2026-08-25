import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import WoodblockPrint from '@/components/WoodblockPrint';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CTABand from '@/components/CTABand';

export default function ServiceAreas() {
  const c = siteConfig;
  const home = c.address.city || 'Fairfield';
  // Home base first, then the rest in the order the owner listed them.
  const towns = [home, ...c.serviceAreaTowns.filter((t) => t !== home)];

  return (
    <>
      <SEO
        title={`Service Areas — Home Inspections Near ${home} | ${c.businessName}`}
        description={`${c.serviceAreaSummary}. Every town Paul drives to for a home inspection, from ${home}, ${c.address.region} outward.`}
        pathname="/service-areas"
      />

      {/* ─── The print ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-wide pb-10 pt-6 sm:pt-8 lg:pb-14">
          <div className="grid animate-fade-up gap-4 lg:grid-cols-12 lg:items-end">
            <h1 className="display-1 cut-navy lg:col-span-8">{c.serviceAreaSummary}.</h1>
            <p className="lede max-w-sm lg:col-span-4 lg:pb-2">
              Based in {home}. Paul drives to the towns below and the country between them.
            </p>
          </div>
          <div className="mt-6 sm:mt-8">
            <WoodblockPrint
              base="landscape"
              ratio={2000 / 1116}
              alt="A folk woodblock print of Southern Illinois: corn rows, a grain elevator, a water tower, a courthouse dome, a farmhouse and barn"
              immediate
              priority
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ─── The towns ───────────────────────────────────────────────── */}
      <Section wide ruled>
        <SectionHeader
          title="Towns Paul drives to"
          description="Every one of these is a normal trip, not a special request."
          cut="red"
          className="!mb-8"
        />
        <ul className="columns-2 gap-x-8 border-t-3 border-ink sm:columns-3 sm:gap-x-12">
          {towns.map((t) => (
            <li
              key={t}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 border-ink py-3 [break-inside:avoid] sm:py-4"
            >
              <span className="display-3">{t}</span>
              {t === home && <span className="tag text-[0.7rem] sm:text-xs">Home base</span>}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-lg text-ink-soft">
          Not on the list? Call; Paul drives further for the right job.{' '}
          <a
            href={`tel:${c.phoneHref}`}
            onClick={() => track('tel_click', { location: 'service_areas_list' })}
            className="num font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red"
          >
            {c.phone}
          </a>
        </p>
      </Section>

      {/* ─── The map ─────────────────────────────────────────────────── */}
      <Section wide tone="deep">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeader
              title={`From ${home}, outward`}
              description="One inspector, one truck. Most jobs are inside an hour's drive."
              cut="brass"
              className="!mb-6"
            />
            <Link to="/contact" className="btn-ghost">
              Send Paul a message
            </Link>
          </div>
          <div className="lg:col-span-8">
            <ServiceAreaMap className="h-[22rem] sm:h-[26rem] lg:h-[30rem]" />
          </div>
        </div>
      </Section>

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        title="In range? Call and find out."
        description={`Callback within ${c.responsePromise.callbackHours} hours. Inspected within ${c.responsePromise.inspectionDays} days most weeks.`}
      >
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'service_areas_page' })}
          className="btn-navy !text-lg"
        >
          Call <span className="num">{c.phone}</span>
        </a>
        <Button as="link" to="/contact" variant="secondary" className="!text-lg">
          Send a message
        </Button>
      </CTABand>
    </>
  );
}
