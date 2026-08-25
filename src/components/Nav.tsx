import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { LogoMark } from './Logo';
import MobileMenu from './nav/MobileMenu';
import CommandPalette from './nav/CommandPalette';
import { NAV_ITEMS } from './nav/navItems';
import { MenuIcon, PhoneIcon } from './nav/icons';
import WavingFlag from './WavingFlag';

/**
 * The printed header: crest and wordmark, a small waving-flag chip in a
 * keyblock frame, cut-letter nav with star ornaments, and the phone as a red
 * block. One row, ruled below; it condenses a little once the page scrolls.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > 24 : y > 56));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => {
          if (!o) track('command_palette_open', { source: 'hotkey' });
          return !o;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-3 border-ink bg-paper">
        <div className="container-wide">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ease-smooth ${
              scrolled ? 'h-16' : 'h-20 sm:h-24'
            }`}
          >
            {/* Crest + wordmark + flag chip */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-2.5 sm:gap-3"
                aria-label={`${siteConfig.businessName} — home`}
                onClick={() => setMenuOpen(false)}
              >
                <LogoMark
                  className={`w-auto transition-[height] duration-300 ease-smooth ${scrolled ? 'h-11' : 'h-12 sm:h-16'}`}
                  title={siteConfig.businessName}
                />
                <span className="font-display uppercase leading-[0.9] text-navy">
                  <span className={`block transition-[font-size] duration-300 ${scrolled ? 'text-xl' : 'text-xl sm:text-[1.7rem]'}`}>
                    PC Pro
                  </span>
                  <span className={`block text-red transition-[font-size] duration-300 ${scrolled ? 'text-xl' : 'text-xl sm:text-[1.7rem]'}`}>
                    Inspections
                  </span>
                </span>
              </Link>
              <span
                aria-hidden="true"
                className={`relative hidden overflow-hidden border-3 border-ink bg-navy transition-[height,width] duration-300 ease-smooth md:block ${
                  scrolled ? 'h-9 w-16' : 'h-11 w-20'
                }`}
              >
                <WavingFlag className="absolute inset-0 h-full w-full" angle={0} />
              </span>
              <span className="label-sm hidden whitespace-nowrap xl:inline">Fairfield, Ill.</span>
            </div>

            {/* Cut-letter rail */}
            <ul className="hidden items-center lg:flex">
              {NAV_ITEMS.filter((it) => it.to !== '/').map((it, i) => (
                <li key={it.to} className="flex items-center">
                  {i > 0 && <Star />}
                  <NavLink
                    to={it.to}
                    end={it.end}
                    className={({ isActive }) =>
                      `label px-2.5 py-2 transition-colors hover:text-red ${
                        isActive ? 'text-red underline decoration-[3px] underline-offset-[6px]' : 'text-ink'
                      }`
                    }
                  >
                    {it.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                onClick={() => track('tel_click', { location: 'nav' })}
                className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex"
              >
                <PhoneIcon className="h-4 w-4" />
                <span className="hidden md:inline">Call</span>
                <span className="num">{siteConfig.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center border-2 border-ink bg-paper-white text-ink transition-colors hover:bg-paper-deep lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="mx-0.5 h-2.5 w-2.5 text-brass">
      <path
        d="M6 0l1.5 4.2H12L8.4 6.8l1.4 4.4L6 8.5 2.2 11.2l1.4-4.4L0 4.2h4.5z"
        fill="currentColor"
      />
    </svg>
  );
}
