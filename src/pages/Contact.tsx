import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { formatTime } from '@/lib/time';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import CTABand from '@/components/CTABand';

export default function Contact() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`Contact | ${c.businessName}`}
        description={`Call ${c.phone} or send Paul a message. Callback within ${c.responsePromise.callbackHours} hours on business days.`}
        pathname="/contact"
      />

      <Section wide>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ─── Left: the facts ─────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <h1 className="display-1 cut-red animate-fade-up">Talk to Paul.</h1>
            <p className="lede mt-4 max-w-md">
              Calling is fastest. He calls back within {c.responsePromise.callbackHours} hours on
              business days.
            </p>

            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: 'contact_page' })}
              className="num mt-8 block font-display uppercase leading-none text-red hover:text-red-deep"
              style={{ fontSize: 'clamp(2.4rem, 1.2rem + 5.2vw, 5rem)' }}
            >
              {c.phone}
            </a>
            <a
              href={`mailto:${c.email}`}
              onClick={() => track('mailto_click', { location: 'contact_page' })}
              className="mt-3 inline-block break-all font-condensed text-xl font-bold uppercase tracking-wide text-navy underline decoration-2 underline-offset-4 hover:text-red sm:text-2xl"
            >
              {c.email}
            </a>

            {c.hours.length > 0 && (
              <dl className="mt-10 max-w-md border-t-3 border-ink">
                {c.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-2.5"
                  >
                    <dt className="label">{h.day}</dt>
                    <dd className="num font-condensed text-lg font-semibold text-ink-soft">
                      {h.open === 'Closed' ? 'Closed' : `${formatTime(h.open)} – ${formatTime(h.close)}`}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {c.address.city && (
              <p className="mt-6 text-ink-soft">
                <span className="label mr-2">Based in</span>
                {c.address.city}, {c.address.region} {c.address.postalCode}
              </p>
            )}
          </div>

          {/* ─── Right: the form ─────────────────────────────────────── */}
          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-6">
            <Card ink="navy">
              <h2 className="display-3">Or write it down</h2>
              <p className="mb-6 mt-2 text-ink-soft">
                Paul reads every message himself and replies by phone.
              </p>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* ─── Close ───────────────────────────────────────────────────── */}
      <CTABand
        tone="navy"
        title="Have a price in mind first?"
        description="The calculator gives an itemized estimate in seconds. No account, no email required."
      >
        <Button as="link" to="/services" variant="primary" className="!text-lg">
          Get my price
        </Button>
        <Button as="link" to="/service-areas" variant="secondary" className="!text-lg">
          Where Paul drives
        </Button>
      </CTABand>
    </>
  );
}
