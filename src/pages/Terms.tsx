import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LegalContent, { type LegalDocContent } from '@/components/LegalContent';

// Set this to the date these terms were last meaningfully changed (it is the
// "date shown" the copy below refers to). Keep it static — a legal document's
// effective date should not silently change on every visit.
const EFFECTIVE_DATE = 'June 15, 2026';

const content: LegalDocContent = {
  intro:
    'Welcome to the PC Pro Inspections website. These Terms of Service set out the rules for using this website and the limits of what the site itself provides. They cover the website only. The home inspection service we perform is governed by a separate written agreement, described below. Please read these terms carefully.',
  sections: [
    {
      heading: '1. Acceptance of These Terms',
      body: [
        {
          type: 'p',
          text: 'By accessing or using this website, you agree to be bound by these Terms of Service and by our Privacy Policy. If you do not agree with any part of them, please discontinue use of the site. These terms apply to everyone who visits or uses the website. Throughout this document, "PC Pro Inspections," "we," "us," and "our" refer to PC Pro Inspections, a residential and light-commercial home inspection business based in Fairfield, Illinois, owned and operated by Paul Cantrell, and "you" refers to the person visiting or using this site.',
        },
        {
          type: 'p',
          text: 'When you submit any form on the site — such as a contact request or a quote request — you affirm that you have read and agree to these terms and to our Privacy Policy. If you are using the site on behalf of someone else, you confirm that you are authorized to accept these terms for them.',
        },
      ],
    },
    {
      heading: '2. About This Website',
      body: [
        {
          type: 'p',
          text: 'This is an informational and marketing website for our home inspection services. It is a static, frontend-only site: it has no user accounts or logins, no online payment processing, and no online store. We do not operate our own server-side database that stores your information through this site, and visiting the site does not require you to share anything about yourself.',
        },
        {
          type: 'p',
          text: 'Any information you choose to share through a form on the site is handled as described in our Privacy Policy, which is the authoritative explanation of how form submissions, optional analytics, and any optional third-party services work. Please review it alongside these terms.',
        },
      ],
    },
    {
      heading: '3. Estimates, Requests, and Scheduling',
      body: [
        {
          type: 'p',
          text: 'Our quote calculator produces a price estimate based on the square footage, add-on services, and other inputs you provide. This figure is an estimate only. It is not an offer, a binding quote, or a guaranteed price. Your final price is confirmed at the time of scheduling, based on the actual property, its size and condition, the services you select, and other relevant details. Where the estimate and the confirmed price differ, the price we confirm with you at scheduling controls.',
        },
        {
          type: 'p',
          text: 'Submitting a contact form or a quote request (or a booking request, if we enable online booking in the future) is a request to be contacted or scheduled. It is not a confirmed appointment, and it does not create a binding agreement to perform an inspection. An inspection is scheduled only once we have communicated with you and confirmed the date, time, scope, and price. Until we provide that confirmation, no appointment exists. We may decline or reschedule any request — for example, due to availability, scheduling conflicts, or service-area limits.',
        },
      ],
    },
    {
      heading: '4. Inspection Services Are Governed by a Separate Agreement',
      body: [
        {
          type: 'p',
          text: 'This website does not set the terms of any inspection. The scope, limitations, exclusions, and standards that apply to any inspection we perform are governed by a separate written pre-inspection agreement, signed before each inspection, together with the Illinois Home Inspector License Act and its administrative rules (the standards of practice for Illinois home inspectors). That signed agreement and those rules — not this website — control the inspection itself, and if anything on this website appears to conflict with your signed agreement, the signed agreement controls.',
        },
        {
          type: 'p',
          text: 'It also helps to understand what a home inspection report is and is not:',
        },
        {
          type: 'ul',
          items: [
            'Visual and non-invasive — a report is a visual, non-invasive survey of the readily accessible areas and systems of the property.',
            'Point-in-time — it reflects the observable condition of the property at the time of inspection only, not its past or future condition.',
            'Not a warranty or guarantee — it is not a warranty, guarantee, or assurance of the condition or future performance of any part of the property.',
            'Not a code-compliance inspection — it is not a building-code, zoning, or municipal compliance inspection.',
            'Not insurance or a home warranty — it is not an insurance policy and does not function as a home warranty.',
            'Not a substitute for specialists — it is not a substitute for evaluation by a structural engineer, licensed trade contractor, laboratory testing, or other specialist, which we may recommend when appropriate.',
          ],
        },
      ],
    },
    {
      heading: '5. Licensing and Regulation',
      body: [
        {
          type: 'p',
          text: 'Home inspections in Illinois are regulated under the Illinois Home Inspector License Act and its administrative rules, and must be performed by a licensed Illinois home inspector. The licensing details that apply to your inspection are provided in your signed pre-inspection agreement and are available on request. This regulatory framework, together with that signed agreement, governs the inspection service itself, as described in the section above.',
        },
      ],
    },
    {
      heading: '6. No Professional or Legal Advice',
      body: [
        {
          type: 'p',
          text: 'The content on this website, including articles, guides, prep checklists, FAQs, and other resources, is provided for general informational purposes. It is not professional, legal, financial, engineering, or real-estate advice, and it should not be relied upon as such.',
        },
        {
          type: 'p',
          text: 'Every property and situation is different. For advice specific to your circumstances, consult a qualified professional, and rely on your signed inspection agreement and the inspection report you receive rather than on general information published on this site.',
        },
      ],
    },
    {
      heading: '7. Intellectual Property',
      body: [
        {
          type: 'p',
          text: 'Unless noted otherwise, the content and branding on this website — including text, graphics, logos, the business name, page design, and layout — belong to PC Pro Inspections or its licensors and are protected by applicable intellectual-property laws. Some images, badges, and trademarks, such as third-party certification marks, belong to their respective owners and appear with permission or under license; nothing here claims ownership of those marks.',
        },
        {
          type: 'p',
          text: 'You may view or print pages from this site for your own personal, non-commercial use in connection with considering or using our services. Please do not copy, reproduce, republish, distribute, modify, or reuse our content or brand marks for any other purpose without our prior written permission.',
        },
      ],
    },
    {
      heading: '8. Acceptable Use',
      body: [
        {
          type: 'p',
          text: 'You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. In particular, you agree not to:',
        },
        {
          type: 'ul',
          items: [
            'Use the site in any way that violates applicable law or regulation.',
            'Submit false, misleading, or fraudulent information through any form on the site.',
            'Attempt to gain unauthorized access to the site or interfere with its normal operation.',
            'Introduce viruses, malware, or other harmful code, or otherwise disrupt the site.',
            'Use automated tools to scrape, harvest, or collect content or data from the site without our prior written permission, or misuse any contact information found on the site, including for unsolicited messages.',
          ],
        },
      ],
    },
    {
      heading: '9. Third-Party Links and Services',
      body: [
        {
          type: 'p',
          text: 'This website may link to, or make use of, third-party websites and services that we do not own or control. Examples include an online scheduler if and when we enable one, a form-delivery service when one is used to deliver a form submission, review platforms, and our social-media pages. Some of these are optional and are not always active; when a feature is not in use, no third party is involved on our behalf.',
        },
        {
          type: 'p',
          text: "When you use such a third-party service, that provider's own terms and privacy policy apply to your use of it. We provide these links and integrations for convenience and are not responsible for the content, accuracy, availability, or practices of any third-party service. Your dealings with any third party are solely between you and that party.",
        },
      ],
    },
    {
      heading: '10. Disclaimer of Warranties',
      body: [
        {
          type: 'p',
          text: 'In short, we work to keep this site accurate and available, but we cannot promise it will always be perfect, so we provide it on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties of any kind regarding the website, whether express or implied, including any implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement.',
        },
        {
          type: 'p',
          text: 'We do not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components, or that any information on it is complete, current, or accurate. This disclaimer applies to the website only and does not limit any obligations set out in a signed inspection agreement.',
        },
      ],
    },
    {
      heading: '11. Limitation of Liability',
      body: [
        {
          type: 'p',
          text: 'In plain terms, our responsibility for the website itself is limited. To the fullest extent permitted by law, PC Pro Inspections and its owner will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or goodwill, arising out of or relating to your use of, or inability to use, this website, even if we have been advised of the possibility of such damages. To the extent any liability for the website is found, it will not exceed the amount, if any, you paid to access this website.',
        },
        {
          type: 'p',
          text: 'This limitation concerns the website only. It does not address liability arising from the inspection services themselves, which is governed by your separate signed pre-inspection agreement and by applicable Illinois law. Nothing in these terms excludes or limits any liability that cannot be excluded or limited under applicable Illinois law.',
        },
      ],
    },
    {
      heading: '12. Indemnification',
      body: [
        {
          type: 'p',
          text: "You agree to defend, indemnify, and hold harmless PC Pro Inspections and its owner from any claims, losses, or expenses, including reasonable attorneys' fees, arising out of your misuse of this website or your breach of these Terms of Service. This provision relates to use of the website and is separate from any terms in a signed inspection agreement.",
        },
      ],
    },
    {
      heading: '13. Time Limit for Claims',
      body: [
        {
          type: 'p',
          text: 'To the extent permitted by Illinois law, any claim arising out of or relating to this website or these Terms of Service must be brought within one year after the event giving rise to the claim, after which it is permanently barred. Any time limits that apply to the inspection itself are set out in your separate signed pre-inspection agreement and are governed by Illinois law, not by these website terms.',
        },
      ],
    },
    {
      heading: '14. Resolving Concerns',
      body: [
        {
          type: 'p',
          text: 'We would much rather talk than litigate. If you have a concern relating to this website or these terms, please contact us first using the contact details provided so we can try to resolve it informally and promptly. We ask that you give us a fair opportunity — at least 30 days from when you raise the issue — to work it out before pursuing any formal action. Most issues can be resolved with a simple conversation.',
        },
      ],
    },
    {
      heading: '15. Governing Law and Venue',
      body: [
        {
          type: 'p',
          text: 'These Terms of Service are governed by the laws of the State of Illinois, without regard to its conflict-of-laws principles. If a dispute relating to this website or these terms cannot be resolved informally, you agree that it will be brought exclusively in the state or federal courts located in or serving Wayne County, Illinois, and you consent to the jurisdiction of those courts.',
        },
      ],
    },
    {
      heading: '16. General Terms',
      body: [
        {
          type: 'p',
          text: 'If any provision of these terms is found to be unenforceable, that provision will be limited or removed to the minimum extent necessary, and the remaining provisions will stay in full force and effect. Our failure to enforce any provision is not a waiver of our right to enforce it later. You may not assign or transfer these terms, but we may assign them in connection with a sale or transfer of the business.',
        },
        {
          type: 'p',
          text: 'These Terms of Service, together with our Privacy Policy, make up the entire agreement between you and PC Pro Inspections regarding your use of this website, and they supersede any prior understandings on that subject. They do not replace or modify any separate signed pre-inspection agreement, which governs the inspection itself.',
        },
      ],
    },
    {
      heading: '17. Changes to These Terms',
      body: [
        {
          type: 'p',
          text: 'We may update these Terms of Service from time to time to reflect changes to the website, our services, or applicable law. When we make changes, the updated terms will appear on this page with a revised date, and your continued use of the website after they are posted means you accept the revised terms. We encourage you to review this page periodically.',
        },
      ],
    },
    {
      heading: '18. Contact',
      body: [
        {
          type: 'p',
          text: 'If you have any questions about these Terms of Service, you can email us at {EMAIL} or call {PHONE}. We are happy to help.',
        },
      ],
    },
  ],
  closingNote:
    'These terms cover your use of this website only — your separate signed pre-inspection agreement governs the inspection itself. We review these terms periodically and welcome any questions.',
};

export default function Terms() {
  const c = siteConfig;

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
          eyebrow="Legal"
          title="Terms of Service"
          description={`Last updated: ${EFFECTIVE_DATE}`}
        />

        <LegalContent {...content} />
      </Section>
    </>
  );
}
