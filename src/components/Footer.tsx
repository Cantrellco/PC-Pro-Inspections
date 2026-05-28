import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import StarMark from './StarMark';
import Flag from './Flag';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-200/80 mt-16">
      {/* Refined tri-color hairline cap */}
      <div className="stripe h-px w-full opacity-80" aria-hidden="true" />
      <div className="container-narrow py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <StarMark className="h-8 w-8 text-flag-red" />
            <span className="font-display text-xl font-bold">{siteConfig.businessName}</span>
            <Flag className="h-5 w-[38px] rounded-sm ml-1" />
          </Link>
          <p className="mt-3 text-bone-muted max-w-md">{siteConfig.tagline}</p>
          <p className="mt-4 text-bone-dim text-sm">
            {siteConfig.serviceAreaSummary}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-flag-redSoft font-semibold">
            <span aria-hidden="true" className="text-flag-red">★</span>
            American-owned &amp; operated
            <span aria-hidden="true" className="text-flag-navyLight">★</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-bone mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-bone-muted text-sm">
            <li>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                onClick={() => track('tel_click', { location: 'footer' })}
                className="hover:text-white"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => track('mailto_click', { location: 'footer' })}
                className="hover:text-white break-all"
              >
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.address.city && (
              <li className="pt-1">
                {siteConfig.address.city}, {siteConfig.address.region}
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-bone mb-3">
            Site
          </h3>
          <ul className="space-y-2 text-bone-muted text-sm">
            <li>
              <Link to="/services" className="hover:text-white">
                Services &amp; Pricing
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-white">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/service-areas" className="hover:text-white">
                Service Areas
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:text-white">
                Book Now
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-bone-dim">
          <p>
            © {year} {siteConfig.legalName || siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            {siteConfig.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
