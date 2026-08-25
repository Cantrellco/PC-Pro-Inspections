import type { ReactNode } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';

/**
 * Shared renderer for the Privacy Policy and Terms of Service pages.
 *
 * Content lives as plain data in each page (intro + sections + closingNote) so
 * the legal copy is easy to read and edit in one place. This component turns
 * that data into the site's house style: a read-mode sheet, cut-letter
 * headings, ruled lists, and a sticky contents list on desktop.
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

type Props = LegalDocContent & {
  /** Page title (rendered as the h1). */
  title: string;
  /** Static effective date shown under the title. */
  effectiveDate: string;
};

const c = siteConfig;

const LINK = 'font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red';

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\{EMAIL\}|\{PHONE\}|\{WEB3FORMS_PRIVACY\})/g);
  return parts.map((part, i) => {
    switch (part) {
      case '{EMAIL}':
        return (
          <a
            key={i}
            href={`mailto:${c.email}`}
            onClick={() => track('mailto_click', { location: 'legal' })}
            className={LINK}
          >
            {c.email}
          </a>
        );
      case '{PHONE}':
        return (
          <a
            key={i}
            href={`tel:${c.phoneHref}`}
            onClick={() => track('tel_click', { location: 'legal' })}
            className={`${LINK} num`}
          >
            {c.phone}
          </a>
        );
      case '{WEB3FORMS_PRIVACY}':
        return (
          <a key={i} href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className={LINK}>
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
        <strong className="text-ink">{item.slice(0, idx)}</strong>
        {sep}
        {renderInline(item.slice(idx + sep.length))}
      </>
    );
  }
  return renderInline(item);
}

export default function LegalContent({ title, effectiveDate, intro, sections, closingNote }: Props) {
  // Headings are numbered by the renderer; drop any "1. " the copy already carries.
  const toc = sections.map((s, i) => ({
    id: slug(s.heading),
    n: i + 1,
    heading: s.heading.replace(/^\d+\.\s+/, ''),
  }));

  return (
    <div className="container-wide py-10 sm:py-14">
      {/* Title block */}
      <header className="border-b-3 border-ink pb-8 sm:pb-10">
        <h1 className="display-1 cut-navy">{title}</h1>
        <p className="label-sm mt-5">
          Effective <span className="num">{effectiveDate}</span>
        </p>
      </header>

      <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-12 lg:pt-10">
        {/* Contents — sticky on desktop, a ruled list up top on mobile */}
        <nav aria-label="Contents" className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
          <p className="label-sm">Contents</p>
          <ol className="mt-3 border-t-2 border-ink">
            {toc.map((t) => (
              <li key={t.id} className="border-b-2 border-ink">
                <a
                  href={`#${t.id}`}
                  className="label grid grid-cols-[2rem_1fr] items-baseline gap-2 py-2 hover:text-red"
                >
                  <span className="num text-brass">{String(t.n).padStart(2, '0')}</span>
                  <span>{t.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* The document */}
        <div className="max-w-[70ch] text-ink-soft lg:col-span-8">
          <p className="lede">{renderInline(intro)}</p>

          {sections.map((section, i) => (
            <section key={section.heading} id={toc[i].id} className="mt-12 scroll-mt-28 sm:mt-14">
              <h2 className="display-3 grid grid-cols-[2.5rem_1fr] items-baseline gap-2 sm:grid-cols-[3rem_1fr]">
                <span className="num text-brass">{String(i + 1).padStart(2, '0')}</span>
                <span>{toc[i].heading}</span>
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed">
                {section.body.map((block, j) =>
                  block.type === 'p' ? (
                    <p key={j}>{renderInline(block.text)}</p>
                  ) : (
                    <ul key={j} className="border-t-2 border-ink">
                      {block.items.map((it, k) => (
                        <li key={k} className="border-b-2 border-ink py-3">
                          {renderListItem(it)}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}

          <p className="rule mt-14 pt-5 text-sm text-ink-mute">{renderInline(closingNote)}</p>
        </div>
      </div>

      {/* Close: no colour band, one line */}
      <p className="rule mt-14 pt-6 text-lg text-ink-soft sm:mt-16">
        Questions?{' '}
        <a
          href={`tel:${c.phoneHref}`}
          onClick={() => track('tel_click', { location: 'legal_close' })}
          className={LINK}
        >
          Call Paul at <span className="num">{c.phone}</span>
        </a>
        .
      </p>
    </div>
  );
}
