import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import Brandmark from './Brandmark';

export default function Footer() {
  const year = new Date().getFullYear();
  const c = siteConfig;

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-300">
      <div className="rule-flag h-px w-full opacity-80" aria-hidden="true" />
      <div className="container-wide above-grain py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <Brandmark className="h-10 w-10" />
            <span className="font-display text-xl font-semibold">{c.businessName}</span>
          </Link>
          <p className="mt-4 text-bone-muted max-w-sm leading-relaxed">{c.tagline}</p>
          <p className="mt-5 text-bone-dim text-sm">{c.serviceAreaSummary}</p>
          <p className="mt-6 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] text-brass-soft font-semibold">
            <span aria-hidden="true" className="h-px w-6 bg-brass/70" />
            American-owned &amp; operated
          </p>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone-dim mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`tel:${c.phoneHref}`}
                onClick={() => track('tel_click', { location: 'footer' })}
                className="text-bone hover:text-white text-lg font-display"
              >
                {c.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${c.email}`}
                onClick={() => track('mailto_click', { location: 'footer' })}
                className="text-bone-muted hover:text-white break-all"
              >
                {c.email}
              </a>
            </li>
            {c.address.city && (
              <li className="text-bone-muted pt-1">
                {c.address.city}, {c.address.region}
              </li>
            )}
          </ul>
        </div>

        <nav className="md:col-span-4" aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bone-dim mb-4">
            Explore
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[
              ['/services', 'Services & Pricing'],
              ['/about', 'About'],
              ['/reviews', 'Reviews'],
              ['/resources', 'Resources'],
              ['/service-areas', 'Service Areas'],
              ['/book', 'Book Now'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-bone-muted hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide above-grain py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-bone-dim">
          <p>© {year} {c.legalName || c.businessName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            {c.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
