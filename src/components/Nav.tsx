import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import Logo from './Logo';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/resources', label: 'Resources' },
  { to: '/service-areas', label: 'Areas' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brass/60 to-transparent"
      />
      <nav
        className="container-wide flex items-center justify-between py-3.5 sm:py-4"
        aria-label="Primary"
      >
        <Link
          to="/"
          className="group flex items-center text-bone hover:text-white"
          aria-label={`${siteConfig.businessName} — home`}
          onClick={() => setOpen(false)}
        >
          <Logo
            variant="full"
            className="h-9 text-base sm:text-lg [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-105"
            title={siteConfig.businessName}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[15px] font-medium tracking-[-0.01em] rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-bone-muted hover:text-white hover:bg-white/[0.05]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-flag-red"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              onClick={() => track('tel_click', { location: 'nav' })}
              className="btn-primary !py-2.5 !px-5 !text-[13px]"
            >
              {siteConfig.phone}
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
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-white/10 bg-ink-100/95 backdrop-blur-xl">
          <ul className="container-wide py-4 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 text-base font-medium rounded-lg ${
                      isActive ? 'text-white bg-white/[0.06]' : 'text-bone-muted hover:text-white hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3 grid grid-cols-2 gap-2.5">
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
