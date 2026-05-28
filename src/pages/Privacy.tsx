import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';

export default function Privacy() {
  const c = siteConfig;
  const updated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SEO
        title={`Privacy Policy | ${c.businessName}`}
        description={`${c.businessName}'s privacy policy — what data we collect, how it is used, and your rights.`}
        pathname="/privacy"
      />

      <Section>
        <SectionHeader
          as="h1"
          flag
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated: ${updated}`}
        />

        {/* TODO: owner to review with counsel — this is a TEMPLATE, not legal advice. */}
        <div className="prose-invert max-w-3xl mx-auto space-y-6 text-bone-muted leading-relaxed">
          <div className="rounded-md border border-flag-redSoft/30 bg-flag-red/5 p-4 text-sm">
            <strong className="text-white">Template notice:</strong> This page is
            placeholder language pending review by qualified counsel. It is not
            legal advice. Review and customize before publishing.
          </div>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">Overview</h2>
            <p>
              {c.businessName} ("we", "our") respects your privacy. This policy
              explains what information we collect when you use this site or
              contact us, how we use it, and your rights regarding it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Contact information you submit:</strong>{' '}
                name, email, phone number, property address, and any message you
                send through our contact and quote-request forms.
              </li>
              <li>
                <strong className="text-white">Analytics data:</strong> aggregated,
                anonymous usage data (pages viewed, device type, referring site).
                We use this only to improve the site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">How We Use It</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiry and schedule an inspection.</li>
              <li>To deliver your report and any follow-up communications.</li>
              <li>To improve the site and our service.</li>
              <li>We do not sell or rent your information.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">
              Third-Party Processors
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Web3Forms</strong> — processes
                form submissions and delivers them to our email. See their privacy
                policy at <a href="https://web3forms.com/privacy" className="text-flag-redSoft underline">web3forms.com/privacy</a>.
              </li>
              <li>
                <strong className="text-white">Analytics provider</strong> — we
                use a privacy-friendly analytics tool that does not use tracking
                cookies or share data with advertising networks (when configured).
              </li>
              <li>
                <strong className="text-white">Scheduler</strong> — if you book
                online, the scheduler we use collects scheduling details to
                confirm your appointment. Its privacy policy applies to that
                transaction.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">Your Rights</h2>
            <p>
              You may request a copy of any personal data we hold about you, or
              ask us to delete it, by emailing{' '}
              <a href={`mailto:${c.email}`} className="text-flag-redSoft underline">
                {c.email}
              </a>
              . We will respond within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">Updates</h2>
            <p>
              We may update this policy from time to time. Material changes
              will be reflected in the "Last updated" date above.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a href={`mailto:${c.email}`} className="text-flag-redSoft underline">
                {c.email}
              </a>{' '}
              or call{' '}
              <a href={`tel:${c.phoneHref}`} className="text-flag-redSoft underline">
                {c.phone}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
