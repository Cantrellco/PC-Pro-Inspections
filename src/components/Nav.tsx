import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import StarMark from './StarMark';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services & Pricing' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/resources', label: 'Resources' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
      <div className="stripe h-[2px] w-full opacity-80" aria-hidden="true" />
      <nav
        className="container-narrow flex items-center justify-between py-3 sm:py-4"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 text-bone hover:text-white"
          onClick={() => setOpen(false)}
        >
          <StarMark className="h-7 w-7 text-flag-red" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">
            {siteConfig.businessName}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? 'text-white bg-white/5'
                      : 'text-bone-muted hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <Link to="/book" className="btn-secondary !py-2 !px-4 !text-xs">
              Book Now
            </Link>
          </li>
          <li>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              onClick={() => track('tel_click', { location: 'nav' })}
              className="btn-primary !py-2 !px-4 !text-xs"
            >
              Call {siteConfig.phone}
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-bone"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-white/10 bg-ink-100"
        >
          <ul className="container-narrow py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 text-base font-medium rounded ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-bone-muted hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 grid grid-cols-2 gap-2">
              <Link to="/book" className="btn-secondary" onClick={() => setOpen(false)}>
                Book Now
              </Link>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                onClick={() => {
                  track('tel_click', { location: 'mobile_nav' });
                  setOpen(false);
                }}
                className="btn-primary"
              >
                Call Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
