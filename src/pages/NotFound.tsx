import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
] as const;

/** A blank sheet: nothing printed at this address. */
export default function NotFound() {
  const c = siteConfig;
  return (
    <>
      <SEO
        title={`Page not found | ${c.businessName}`}
        description="The page you tried to reach does not exist. Head back to the home page or call us directly."
      />

      <section className="container-narrow py-16 sm:py-24">
        <div className="sheet sheet-red mx-auto max-w-3xl p-6 sm:p-10 lg:p-14">
          <p className="label-sm">
            Error <span className="num">404</span>
          </p>
          <h1 className="display-1 cut-red mt-4">Nothing printed here.</h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink-soft">
            That address is blank. The link may be old or mistyped.
          </p>

          <ul className="mt-8 border-t-2 border-ink">
            {LINKS.map((l) => (
              <li key={l.to} className="border-b-2 border-ink">
                <Link to={l.to} className="label flex items-center justify-between py-3 hover:text-red">
                  <span>{l.label}</span>
                  <span aria-hidden="true" className="font-condensed text-brass">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-ink-soft">
            Or{' '}
            <a
              href={`tel:${c.phoneHref}`}
              onClick={() => track('tel_click', { location: '404' })}
              className="font-semibold text-navy underline decoration-2 underline-offset-4 hover:text-red"
            >
              call Paul at <span className="num">{c.phone}</span>
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
