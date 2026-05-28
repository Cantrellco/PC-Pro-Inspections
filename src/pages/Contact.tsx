import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`Contact | ${c.businessName}`}
        description={`Call ${c.phone} or send a message — we reply within ${c.responsePromise.callbackHours} hours during business days.`}
        pathname="/contact"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Contact"
          title="Let's talk about your inspection."
          description={`We call back within ${c.responsePromise.callbackHours} business hours. For closings in a hurry, just call — we usually pick up.`}
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <Card className="lg:col-span-3">
            <ContactForm />
          </Card>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <Card accent>
              <h2 className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-3">
                Reach us directly
              </h2>
              <ul className="space-y-3 text-bone">
                <li>
                  <a
                    href={`tel:${c.phoneHref}`}
                    onClick={() => track('tel_click', { location: 'contact_page' })}
                    className="text-xl font-display font-semibold text-white hover:text-flag-redSoft"
                  >
                    {c.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${c.email}`}
                    onClick={() => track('mailto_click', { location: 'contact_page' })}
                    className="text-bone hover:text-white break-all"
                  >
                    {c.email}
                  </a>
                </li>
                {c.address.city && (
                  <li className="text-bone-muted text-sm pt-2">
                    {c.address.street && (
                      <>
                        {c.address.street}
                        <br />
                      </>
                    )}
                    {c.address.city}, {c.address.region} {c.address.postalCode}
                  </li>
                )}
              </ul>
            </Card>

            <Card>
              <h2 className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-3">
                Hours
              </h2>
              <ul className="space-y-1.5 text-sm">
                {c.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3">
                    <span className="text-bone-muted">{h.day}</span>
                    <span className="text-bone font-medium">
                      {h.open === 'Closed'
                        ? 'Closed'
                        : `${h.open} – ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-xs uppercase tracking-[0.2em] text-flag-redSoft font-semibold mb-3">
                Our Response Promise
              </h2>
              <p className="text-bone-muted text-sm">
                <span className="text-white font-semibold">
                  {c.responsePromise.callbackHours} hours
                </span>{' '}
                to call you back; inspection booked within{' '}
                <span className="text-white font-semibold">
                  {c.responsePromise.inspectionDays} business days
                </span>{' '}
                in most cases.
              </p>
            </Card>

            <div className="aspect-video rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-flag-navy/20 to-ink-200 flex items-center justify-center text-bone-dim text-sm">
              {/* TODO: owner — replace with real embedded Google Map iframe */}
              Map placeholder — service area: {c.serviceAreaSummary}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
