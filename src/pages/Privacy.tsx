import { siteConfig } from '@/config/siteConfig';
import SEO from '@/components/SEO';
import Section from '@/components/Section';
import SectionHeader from '@/components/SectionHeader';
import LegalContent, { type LegalDocContent } from '@/components/LegalContent';

// Set this to the date this policy was last meaningfully changed (it is the
// "date shown with this policy" the copy below refers to). Keep it static — a
// legal document's effective date should not silently change on every visit.
const EFFECTIVE_DATE = 'June 15, 2026';

const content: LegalDocContent = {
  intro:
    'PC Pro Inspections (referred to here as "we," "us," or "our") respects your privacy. This Privacy Policy explains, in plain language, what information we collect when you visit our website or reach out to us, how we use that information, who we share it with, and the choices you have. We are a home inspection business based in Fairfield, Illinois, serving Wayne County and the surrounding area, and we keep our data practices simple and honest — the same way we approach our inspections.',
  sections: [
    {
      heading: 'Overview',
      body: [
        {
          type: 'p',
          text: 'Our website is a static, informational marketing site, so most people can browse it without giving us any personal information at all. It has no user accounts, no login, no shopping cart, and no payment processing built into it, and it does not keep its own server-side database of visitor information.',
        },
        {
          type: 'p',
          text: 'We collect personal information only when you choose to share it — for example, by filling out our contact form or requesting a quote. This policy covers information collected through our website and your initial contact with us. A scheduled inspection itself, and any records created during it, are also governed by the separate written agreement you sign before the inspection.',
        },
      ],
    },
    {
      heading: 'Information You Provide',
      body: [
        {
          type: 'p',
          text: 'When you reach out through our contact form or quote-request form, you may provide the following information so we can respond to you and prepare for an inspection:',
        },
        {
          type: 'ul',
          items: [
            'Contact details — your name, email address, and phone number.',
            'Property information — the address of the home or property you would like inspected.',
            'Your message — any free-text notes, questions, or details you choose to include.',
            'Quote inputs — if you use our quote calculator and submit a quote request, the square footage you entered, any add-on services you selected, and the estimated price the calculator displayed are included so we can review your request accurately.',
          ],
        },
        {
          type: 'p',
          text: 'You decide what to share. The only information we receive from these forms is what you type into them and choose to send.',
        },
      ],
    },
    {
      heading: 'Information Collected Automatically',
      body: [
        {
          type: 'p',
          text: 'If analytics is enabled, our site may use a privacy-friendly, cookieless analytics tool (such as Plausible) to help us understand how the site is used overall. When this kind of tool is in use, it collects only aggregated, anonymous information, such as:',
        },
        {
          type: 'ul',
          items: [
            'Which pages are viewed and how often.',
            'General device and browser type (for example, mobile versus desktop).',
            'The referring website or source that brought a visitor to our site.',
          ],
        },
        {
          type: 'p',
          text: 'A privacy-friendly analytics tool of this kind does not use advertising cookies, does not build a profile of you, and does not track you across other websites or devices. It is designed to report trends, not to identify individuals. Analytics is off unless it has been configured. If we ever change our analytics provider to one that works differently, we will update this policy to reflect how that tool handles information.',
        },
      ],
    },
    {
      heading: 'Information We Do Not Collect',
      body: [
        {
          type: 'p',
          text: 'We want to be clear about what does not happen on this site:',
        },
        {
          type: 'ul',
          items: [
            'No accounts or passwords — there is nothing to register for, log into, or maintain.',
            'No payment-card data on the site — we do not collect or store credit card or banking details through the website.',
            'No selling or renting of your information — we do not sell, rent, or trade your personal information to anyone, and we do not share it with advertising networks.',
            'No advertising or cross-site tracking — we do not use the site to follow you around the internet or target you with ads.',
            'No data sent to outside font services — our fonts are self-hosted, so simply loading the site does not share your information with a third-party font provider.',
          ],
        },
      ],
    },
    {
      heading: 'How We Use Your Information',
      body: [
        {
          type: 'p',
          text: 'We use the information you provide only for the purposes you would reasonably expect from a home inspection business, including to:',
        },
        {
          type: 'ul',
          items: [
            'Respond to your inquiry, answer your questions, and follow up with you.',
            'Review your quote request and confirm an accurate price for the actual property and services.',
            'Schedule and perform a requested inspection and deliver your inspection report.',
            'Keep necessary records of our communications, services, and legal and tax obligations.',
            'Maintain, understand, and improve our website and the quality of our service.',
            'Comply with applicable law and protect our legal rights when necessary.',
          ],
        },
      ],
    },
    {
      heading: 'How Your Form Submissions Are Delivered',
      body: [
        {
          type: 'p',
          text: 'Our contact and quote-request forms can deliver your message to us in one of two ways. The site selects the method automatically, and you do not need to do anything different.',
        },
        {
          type: 'ul',
          items: [
            'Email-draft method (default) — by default, submitting a form opens a pre-filled message in your own email application, addressed to us, containing the information you entered. You review it and press Send yourself. In this mode, no third-party form service receives your information; it is sent using your own email account directly to our inbox.',
            'Form-processing method (optional) — if a form-processing service is configured, your submission is sent through a third-party form-to-email provider (Web3Forms) that delivers it to our email inbox. In that case, your form data passes through Web3Forms solely to reach us, and Web3Forms handles it under its own privacy policy. We use such a provider only to receive your message reliably, not to market to you.',
          ],
        },
      ],
    },
    {
      heading: 'Third-Party Services We May Use',
      body: [
        {
          type: 'p',
          text: 'We keep outside services to a minimum and use only what helps us serve you. When a third-party service is involved, that service handles your information under its own privacy policy. The services that may be used are:',
        },
        {
          type: 'ul',
          items: [
            "Form-to-email processor — when configured, Web3Forms delivers contact and quote-request submissions to our inbox, as described above. You can review Web3Forms' own privacy policy at {WEB3FORMS_PRIVACY}.",
            'Cookieless analytics provider — when enabled, a privacy-friendly analytics tool provides anonymous, aggregated usage statistics without advertising cookies or cross-site tracking.',
            'Online scheduler (if added in the future) — we may later embed a third-party scheduling tool so you can book an inspection online. If an online scheduler is added and you choose to book through it, the scheduling details you enter are handled by that scheduler under its own privacy policy. This feature is not currently active; it would apply only if and when you book online through such a tool.',
          ],
        },
      ],
    },
    {
      heading: 'Cookies and Similar Technologies',
      body: [
        {
          type: 'p',
          text: 'This website does not use advertising or tracking cookies, and we do not allow third parties to use the site to track you for advertising purposes. When a privacy-friendly analytics tool is in use, it is cookieless, so it does not place tracking cookies on your device.',
        },
        {
          type: 'p',
          text: 'Your browser may use limited local storage only where needed for basic site function; we do not use it to profile or track you. If an online scheduler is added in the future and you choose to book through it, that scheduler may set its own cookies under its own policy.',
        },
        {
          type: 'p',
          text: 'Because we do not sell or share your personal information and do not use advertising cookies, browser-based opt-out signals such as Do Not Track or Global Privacy Control do not change what we collect. If analytics is enabled, you can still block analytics scripts using your browser’s privacy or tracking-protection settings.',
        },
      ],
    },
    {
      heading: 'How We Share Information',
      body: [
        {
          type: 'p',
          text: 'As noted above, we do not sell or rent your personal information. We share it only in the limited circumstances described below:',
        },
        {
          type: 'ul',
          items: [
            'Service providers — with the third-party services described in this policy, strictly so they can perform their function. The form processor and any scheduler receive the details you submit only to deliver your message or appointment to us; a privacy-friendly analytics provider receives only anonymous, aggregated usage data and not the personal details you submit.',
            'Legal and safety compliance — when we believe in good faith that disclosure is required to comply with applicable law, legal process, or a lawful government request, or to protect the rights, property, or safety of our customers, the public, or our business.',
            'Business transfer — if our business is ever sold or transferred, customer information may transfer as part of that transaction, and we would seek to ensure it continues to be handled consistent with this policy.',
          ],
        },
      ],
    },
    {
      heading: 'Data Retention',
      body: [
        {
          type: 'p',
          text: 'We keep the information you provide only as long as is reasonably necessary for the purposes described in this policy — for example, to respond to your inquiry, perform and document an inspection, maintain our business and tax records, and meet legal obligations. When information is no longer needed, we take reasonable steps to delete it or otherwise remove it from active use. You may also ask us to delete your information, as described below.',
        },
      ],
    },
    {
      heading: 'Data Security',
      body: [
        {
          type: 'p',
          text: 'We take reasonable, common-sense measures to protect the information you share with us, appropriate to the size of our business and the nature of the information. Depending on how a form is delivered, your submission either travels directly from your own email program to our inbox, or passes through our form processor to reach our email. In all cases it lives in our email and standard business records, not in a database on this website.',
        },
        {
          type: 'p',
          text: 'No method of transmitting or storing information is completely secure, however, and we cannot guarantee absolute security. To keep things simple and safe, please share only the details needed for your request, and avoid sending sensitive information you would not want transmitted by email.',
        },
      ],
    },
    {
      heading: 'Your Privacy Choices and Rights',
      body: [
        {
          type: 'p',
          text: 'You have meaningful choices about your information:',
        },
        {
          type: 'ul',
          items: [
            'Access and correction — you may ask us what personal information we hold about you and ask us to correct it if it is inaccurate.',
            'Deletion — you may ask us to delete the personal information you have provided, subject to any records we are required to keep by law.',
            'Limiting analytics — our analytics, when enabled, is cookieless and anonymous, so it does not identify you. If you still prefer, your browser’s privacy or tracking-protection settings can block analytics scripts entirely.',
            'Marketing — we do not run advertising or sell your information, so there is nothing to opt out of in that respect.',
          ],
        },
        {
          type: 'p',
          text: 'To exercise any of these choices, simply reach out using the contact details below, and we will respond within a reasonable time. To protect your privacy, we may need to verify your identity before granting a request to access, correct, or delete your information. We will not discriminate against you for exercising your privacy rights.',
        },
        {
          type: 'p',
          text: "Depending on where you live, you may have additional rights under your state's privacy laws — for example, residents of California and a number of other states with comprehensive privacy laws. These can include the right to know or access the personal information we have collected, the right to request correction or deletion, and the right not to be discriminated against for exercising those rights. Because we do not sell or share your personal information and do not use targeted advertising, any right to opt out of those activities does not apply to us. To exercise any applicable right, please contact us using the details below.",
        },
      ],
    },
    {
      heading: "Children's Privacy",
      body: [
        {
          type: 'p',
          text: 'Our website and services are intended for adults arranging home inspections and are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can delete it.',
        },
      ],
    },
    {
      heading: 'Third-Party Links',
      body: [
        {
          type: 'p',
          text: "Our site may link to outside websites or services, such as a scheduling tool, review platforms, or social media pages. We are not responsible for the content, privacy practices, or security of websites we do not operate. When you follow a link to another site, we encourage you to review that site's own privacy policy.",
        },
      ],
    },
    {
      heading: 'Governing Law',
      body: [
        {
          type: 'p',
          text: 'This Privacy Policy, and any dispute relating to it, are governed by the laws of the State of Illinois, without regard to its conflict-of-laws principles.',
        },
      ],
    },
    {
      heading: 'Changes to This Policy',
      body: [
        {
          type: 'p',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, our tools, or applicable law. When we make a meaningful change, we will revise the date shown with this policy. We encourage you to review it periodically so you stay informed about how we handle your information.',
        },
      ],
    },
    {
      heading: 'How to Contact Us',
      body: [
        {
          type: 'p',
          text: 'If you have any questions about this Privacy Policy or about how we handle your information, you can email us at {EMAIL} or call {PHONE}. We will respond as promptly as we reasonably can.',
        },
      ],
    },
  ],
  closingNote:
    'Thank you for trusting us with your home inspection. We review this policy periodically, and if anything here is unclear or you have a privacy question, we are glad to help — just email us at {EMAIL} or call {PHONE}.',
};

export default function Privacy() {
  const c = siteConfig;

  return (
    <>
      <SEO
        title={`Privacy Policy | ${c.businessName}`}
        description={`${c.businessName}'s privacy policy — what data we collect, how it is used, who we share it with, and your rights.`}
        pathname="/privacy"
      />

      <Section>
        <SectionHeader
          as="h1"
          eyebrow="Legal"
          title="Privacy Policy"
          description={`Last updated: ${EFFECTIVE_DATE}`}
        />

        <LegalContent {...content} />
      </Section>
    </>
  );
}
