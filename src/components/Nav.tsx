import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import Logo from './Logo';
import MobileMenu from './nav/MobileMenu';
import CommandPalette from './nav/CommandPalette';
import { NAV_ITEMS, type NavItem } from './nav/navItems';
import { useMagnetic, useReducedMotion, MOD_KEY, MOD_KEY_LABEL } from './nav/hooks';
import { MenuIcon, PhoneIcon, SearchIcon } from './nav/icons';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const bookRef = useMagnetic<HTMLAnchorElement>();

  // Scroll → condensed state (hysteresis dead-band so the morph can't flip-flop)
  // + a compositor-friendly scroll-progress variable for the top rule.
  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > 20 : y > 44));
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--nav-progress', max > 0 ? String(Math.min(1, y / max)) : '0');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ⌘K / Ctrl+K toggles the command palette.
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

  const openPalette = () => {
    track('command_palette_open', { source: 'button' });
    setPaletteOpen(true);
  };

  return (
    <>
      {/* Constant-height band: the page never reflows on scroll. */}
      <header className="sticky top-0 z-50 h-20 sm:h-24">
        {/* Hairline + scroll-progress rule */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="nav-progress nav-progress--auto absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-flag-red via-brass to-flag-navy"
        />

        <div className="px-3 pt-2 sm:px-5 sm:pt-3">
          {/* The pill's geometry is constant — the condensed state only fades in
              the frosted chrome and scales the logo down (both compositor-only),
              so nothing re-lays-out mid-scroll and the morph can't stutter. */}
          <nav
            aria-label="Primary"
            className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 rounded-2xl px-2 sm:h-16 sm:px-2.5"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-2xl bg-ink-100/85 shadow-[0_12px_44px_-16px_rgba(0,0,0,0.75)] ring-1 ring-brass/15 backdrop-blur-md transition-opacity duration-500 ease-smooth motion-reduce:transition-none ${
                scrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Logo — at rest the seal overhangs the (invisible) pill into the
                band's spare height so the crest reads at badge size; condensed,
                it scales down to sit fully inside the visible capsule. */}
            <Link
              to="/"
              className="group relative flex shrink-0 items-center text-bone hover:text-white"
              aria-label={`${siteConfig.businessName} — home`}
              onClick={() => setMenuOpen(false)}
            >
              <Logo
                variant="full"
                className={`h-16 origin-left text-lg transition-transform duration-500 ease-smooth motion-reduce:transition-none sm:h-20 sm:text-xl [&>span:first-child]:transition-transform [&>span:first-child]:duration-300 [&>span:first-child]:ease-smooth group-hover:[&>span:first-child]:scale-[1.04] ${
                  scrolled ? 'scale-[0.78] sm:scale-[0.7]' : ''
                }`}
                title={siteConfig.businessName}
              />
            </Link>

            {/* Center rail with sliding active indicator (desktop) */}
            <NavRail />

            {/* Actions */}
            <div className="relative flex shrink-0 items-center gap-2">
              {/* Command palette trigger — a full labelled search field with a
                  platform-aware keyboard hint (⌘ on Mac, Ctrl elsewhere, so it
                  never shows a Mac key to a Windows visitor). Reserved for xl,
                  where the rail + phone number + CTA leave room for it without
                  crowding; narrower viewports use the compact icon below. */}
              <button
                type="button"
                onClick={openPalette}
                aria-label={`Open search (${MOD_KEY_LABEL}-K)`}
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-3.5 pr-2 text-[13px] text-bone-muted transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white xl:inline-flex"
              >
                <SearchIcon className="h-4 w-4 text-bone-dim" />
                <span>Search</span>
                <span className="ml-1 inline-flex items-center gap-1" aria-hidden="true">
                  <kbd className="inline-block min-w-[1.4rem] rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none text-bone-muted">
                    {MOD_KEY}
                  </kbd>
                  <kbd className="rounded border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-bone-muted">
                    K
                  </kbd>
                </span>
              </button>

              {/* Compact search trigger (everything below xl) — same circular
                  language as the phone link and hamburger, so the palette is
                  reachable on touch and on tighter laptop widths alike. */}
              <button
                type="button"
                onClick={openPalette}
                aria-label="Open search"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-bone transition-colors hover:bg-white/[0.07] hover:text-white xl:hidden"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              {/* Phone (desktop) */}
              <a
                href={`tel:${siteConfig.phoneHref}`}
                onClick={() => track('tel_click', { location: 'nav' })}
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-[13.5px] font-medium text-bone-muted transition-colors hover:text-white lg:inline-flex"
              >
                <PhoneIcon className="h-4 w-4 text-brass-soft" />
                <span className="hidden xl:inline">{siteConfig.phone}</span>
              </a>

              {/* Primary CTA (desktop) — subtly magnetic */}
              <Link
                ref={bookRef}
                to="/book"
                onClick={() => track('book_now_click', { location: 'nav' })}
                className="btn-primary hidden !px-5 !py-2.5 !text-[13px] lg:inline-flex"
              >
                Book Now
              </Link>

              {/* Hamburger (mobile / tablet) */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-bone transition-colors hover:bg-white/[0.07] hover:text-white lg:hidden"
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

/**
 * Desktop rail with a single FLIP indicator that slides between items. The pill
 * follows hover/focus and settles back onto the active route. It's decorative
 * (aria-hidden); NavLink carries aria-current for semantics.
 */
function NavRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);

  const moveTo = useCallback((el: HTMLElement | null) => {
    const rail = railRef.current;
    if (!el || !rail) return;
    const r = el.getBoundingClientRect();
    const pr = rail.getBoundingClientRect();
    setBox({ x: r.left - pr.left, w: r.width });
  }, []);

  const settle = useCallback(() => {
    const el = railRef.current?.querySelector<HTMLElement>('[data-active="true"]') ?? null;
    moveTo(el);
  }, [moveTo]);

  // Snap to the active item on route change (layout effect → no first-paint flash).
  useLayoutEffect(() => {
    settle();
  }, [settle, pathname]);

  // Re-measure on resize and after webfonts swap in (they change link widths).
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(settle);
    };
    const ro = new ResizeObserver(onResize);
    if (railRef.current) ro.observe(railRef.current);
    document.fonts?.ready.then(() => settle()).catch(() => {});
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [settle]);

  const isItemActive = (it: NavItem) =>
    it.end ? pathname === it.to : pathname === it.to || pathname.startsWith(`${it.to}/`);

  return (
    <ul ref={railRef} onMouseLeave={settle} className="relative hidden items-center gap-0.5 lg:flex">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-1.5 left-0 rounded-full bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-brass/25 ${
          reduced ? '' : 'transition-[transform,width] duration-300 ease-smooth'
        }`}
        style={{ transform: `translateX(${box?.x ?? 0}px)`, width: box?.w ?? 0, opacity: box ? 1 : 0 }}
      />
      {NAV_ITEMS.map((it) => {
        const activeItem = isItemActive(it);
        return (
          <li key={it.to}>
            <NavLink
              to={it.to}
              end={it.end}
              data-active={activeItem}
              onMouseEnter={(e) => moveTo(e.currentTarget)}
              onFocus={(e) => moveTo(e.currentTarget)}
              className={`relative z-10 inline-flex items-center rounded-full px-3.5 py-2 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                activeItem ? 'text-white' : 'text-bone-muted hover:text-white'
              }`}
            >
              {it.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
