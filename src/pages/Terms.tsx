import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';

export default function Terms() {
  const c = siteConfig;
  const updated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SEO
        title={`Terms of Service | ${c.businessName}`}
        description={`${c.businessName}'s terms of service governing use of this website and our inspection services.`}
        pathname="/terms"
      />

      <Section>
        <SectionHeader
          as="h1"
          flag
          eyebrow="Legal"
          title="Terms of Service"
          description={`Last updated: ${updated}`}
        />

        {/* TODO: owner to review with counsel — this is a TEMPLATE, not legal advice. */}
        <div className="max-w-3xl mx-auto space-y-6 text-bone-muted leading-relaxed">
          <div className="rounded-md border border-flag-redSoft/30 bg-flag-red/5 p-4 text-sm">
            <strong className="text-white">Template notice:</strong> This page is
            placeholder language pending review by qualified counsel. It is not
            legal advice. Inspection contracts in particular vary by state and
            should be drafted with a lawyer familiar with your jurisdiction.
          </div>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">1. Acceptance</h2>
            <p>
              By using this website, you agree to these terms. If you do not
              agree, please discontinue use of the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">2. Website Content</h2>
            <p>
              The information on this site is provided for general informational
              purposes. Pricing shown by the quote calculator is an estimate;
              the final inspection price is confirmed at the time of scheduling,
              based on the actual property and services selected.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">3. Inspection Services</h2>
            <p>
              The scope, limitations, and standards governing any inspection we
              perform are defined in the inspection agreement signed before each
              inspection. That agreement — not this website — controls our
              services. Inspection reports are visual surveys of accessible
              areas at the time of inspection; they are not warranties or
              guarantees of future condition.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">4. Intellectual Property</h2>
            <p>
              Site content (text, images, logos) is owned by {c.businessName} or
              its licensors and is provided for personal, non-commercial use.
              Please do not reproduce content without permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">5. Third-Party Links</h2>
            <p>
              The site may link to third-party services (scheduling, reviews,
              social media). We are not responsible for the content or practices
              of those services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">6. Limitation of Liability</h2>
            <p>
              The website is provided "as is" without warranties of any kind.
              To the maximum extent permitted by law, {c.businessName} is not
              liable for indirect, incidental, or consequential damages arising
              from use of the website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of {c.address.region || 'your state'},
              United States. {/* TODO: owner — confirm exact wording with counsel. */}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-white mb-2">8. Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href={`mailto:${c.email}`} className="text-flag-redSoft underline">
                {c.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
