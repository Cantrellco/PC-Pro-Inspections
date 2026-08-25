import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { LogoMark } from './Logo';
import WavingFlag from './WavingFlag';

const HOURS_SHORT = (() => {
  const h = siteConfig.hours;
  const fmt = (t: string) => {
    const [hh, mm] = t.split(':').map(Number);
    const ap = hh >= 12 ? 'pm' : 'am';
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return mm ? `${h12}:${String(mm).padStart(2, '0')}${ap}` : `${h12}${ap}`;
  };
  const weekdays = h.filter((d) => !['Saturday', 'Sunday'].includes(d.day));
  const sat = h.find((d) => d.day === 'Saturday');
  const sun = h.find((d) => d.day === 'Sunday');
  const rows: [string, string][] = [];
  if (weekdays.length) rows.push(['Mon – Fri', `${fmt(weekdays[0].open)} – ${fmt(weekdays[0].close)}`]);
  if (sat) rows.push(['Saturday', `${fmt(sat.open)} – ${fmt(sat.close)}`]);
  if (sun) rows.push(['Sunday', `${fmt(sun.open)} – ${fmt(sun.close)}`]);
  return rows;
})();

/**
 * The flag, printed full-width as a band, then the sheet's colophon:
 * who, where, when, and the phone number one more time.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const c = siteConfig;

  return (
    <footer className="mt-20">
      <div className="flag-band h-28 sm:h-40" aria-hidden="true">
        <WavingFlag className="absolute inset-0 h-full w-full" angle={0} anchor="top" />
      </div>

      <div className="container-wide grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="inline-flex items-center gap-4" aria-label={`${c.businessName} — home`}>
            <LogoMark className="h-16 w-auto" title={c.businessName} />
            <span className="font-display text-3xl uppercase leading-[0.9]">
              <span className="block text-navy">PC Pro</span>
              <span className="block text-red">Inspections</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-ink-soft">{c.tagline}</p>
          <p className="label-sm mt-4">{c.serviceAreaSummary}</p>
          {c.primaryCertification && (
            <p className="mt-6 flex items-center gap-3">
              <img
                src={c.primaryCertification.badgeSrc}
                alt={c.primaryCertification.badgeAlt}
                width={44}
                height={44}
                loading="lazy"
                className="h-11 w-11 shrink-0 object-contain"
              />
              <span className="font-condensed text-sm font-semibold uppercase leading-tight tracking-wide text-ink">
                {c.primaryCertification.name}
              </span>
            </p>
          )}
        </div>

        <div className="md:col-span-3">
          <h2 className="display-3 mb-4">Reach Paul</h2>
          <a
            href={`tel:${c.phoneHref}`}
            onClick={() => track('tel_click', { location: 'footer' })}
            className="num block font-display text-2xl text-red hover:text-navy"
          >
            {c.phone}
          </a>
          <a
            href={`mailto:${c.email}`}
            onClick={() => track('mailto_click', { location: 'footer' })}
            className="mt-1 block break-all text-ink-soft underline decoration-2 underline-offset-4 hover:text-red"
          >
            {c.email}
          </a>
          <p className="mt-3 text-ink-soft">
            {c.address.city}, {c.address.region} {c.address.postalCode}
          </p>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {HOURS_SHORT.map(([d, t]) => (
              <div key={d} className="contents">
                <dt className="font-condensed font-semibold uppercase tracking-wide text-ink">{d}</dt>
                <dd className="num text-ink-soft">{t}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-4">
          <h2 className="display-3 mb-4">Around the site</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {[
              ['/services', 'Services & pricing'],
              ['/about', 'About Paul'],
              ['/reviews', 'Reviews'],
              ['/resources', 'Resources'],
              ['/service-areas', 'Service areas'],
              ['/contact', 'Contact'],
              ['/book', 'Book an inspection'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="label text-[0.9rem] transition-colors hover:text-red"
                  onClick={to === '/book' ? () => track('book_now_click', { location: 'footer' }) : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {c.socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3">
              {c.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !px-3.5 !py-2 !text-sm"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t-3 border-ink bg-paper-deep">
        <div className="container-wide flex flex-col gap-2 py-4 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {c.legalName}. Owner-operated in {c.address.city}, Illinois.
          </p>
          <p className="flex gap-4">
            <Link to="/privacy" className="hover:text-red">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-red">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
