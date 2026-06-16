import type { ReactNode } from 'react';
import { siteConfig } from '@/config/siteConfig';

/**
 * Shared renderer for the Privacy Policy and Terms of Service pages.
 *
 * Content lives as plain data in each page (intro + sections + closingNote) so
 * the legal copy is easy to read and edit in one place. This component turns
 * that data into the site's house style.
 *
 * Inline tokens supported inside any text/list string (kept out of the content
 * so the copy stays portable — the renderer inserts the real, current values):
 *   {EMAIL}             → mailto link to siteConfig.email
 *   {PHONE}             → tel link to siteConfig.phone
 *   {WEB3FORMS_PRIVACY} → link to Web3Forms' privacy policy
 *
 * List items written as "Lead-in term — explanation" get the lead-in
 * emphasized automatically (matches the rest of the site's definition lists).
 */

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type LegalSection = { heading: string; body: LegalBlock[] };

export type LegalDocContent = {
  intro: string;
  sections: LegalSection[];
  closingNote: string;
};

const c = siteConfig;

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\{EMAIL\}|\{PHONE\}|\{WEB3FORMS_PRIVACY\})/g);
  return parts.map((part, i) => {
    switch (part) {
      case '{EMAIL}':
        return (
          <a key={i} href={`mailto:${c.email}`} className="text-flag-redSoft underline">
            {c.email}
          </a>
        );
      case '{PHONE}':
        return (
          <a key={i} href={`tel:${c.phoneHref}`} className="text-flag-redSoft underline">
            {c.phone}
          </a>
        );
      case '{WEB3FORMS_PRIVACY}':
        return (
          <a
            key={i}
            href="https://web3forms.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-flag-redSoft underline"
          >
            web3forms.com/privacy
          </a>
        );
      default:
        return <span key={i}>{part}</span>;
    }
  });
}

function renderListItem(item: string): ReactNode {
  const sep = ' — ';
  const idx = item.indexOf(sep);
  // A short lead-in followed by an em dash is a definition-style item — emphasize it.
  if (idx > 0 && idx < 45) {
    return (
      <>
        <strong className="text-white">{item.slice(0, idx)}</strong>
        {sep}
        {renderInline(item.slice(idx + sep.length))}
      </>
    );
  }
  return renderInline(item);
}

export default function LegalContent({ intro, sections, closingNote }: LegalDocContent) {
  return (
    <div className="max-w-3xl mx-auto space-y-8 text-bone-muted leading-relaxed">
      <p className="text-lg text-bone">{renderInline(intro)}</p>

      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-display text-2xl text-white mb-3">{section.heading}</h2>
          <div className="space-y-3">
            {section.body.map((block, i) =>
              block.type === 'p' ? (
                <p key={i}>{renderInline(block.text)}</p>
              ) : (
                <ul key={i} className="list-disc pl-6 space-y-2">
                  {block.items.map((it, j) => (
                    <li key={j}>{renderListItem(it)}</li>
                  ))}
                </ul>
              ),
            )}
          </div>
        </section>
      ))}

      <div className="rounded-md border border-white/10 bg-white/[0.02] p-4 text-sm text-bone-muted/90">
        {renderInline(closingNote)}
      </div>
    </div>
  );
}
