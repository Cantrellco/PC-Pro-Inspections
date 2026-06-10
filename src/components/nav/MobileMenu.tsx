import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { NAV_ITEMS } from './navItems';
import { useBodyScrollLock, useFocusTrap, useInertBackground } from './hooks';
import { CloseIcon, PhoneIcon } from './icons';

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);

  useInertBackground(open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open, closeRef);

  // Flip `shown` on the next frame after mount so the staggered reveal animates.
  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Esc closes (also handled by focus-trapped buttons, but cover the panel).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur-2xl motion-safe:animate-fade-in lg:hidden"
    >
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-brass/60 to-transparent"
      />

      {/* Top bar with close */}
      <div className="container-wide flex h-16 items-center justify-between sm:h-20">
        <span className="eyebrow !text-bone-dim">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-bone transition-colors hover:bg-white/[0.07] hover:text-white"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Links — big editorial type with staggered reveal */}
      <nav aria-label="Mobile" className="container-wide flex flex-1 flex-col justify-center gap-1 py-6">
        {NAV_ITEMS.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            style={{ transitionDelay: `${70 + i * 45}ms` }}
            data-show={shown}
            className={({ isActive }) =>
              `group flex items-baseline gap-4 border-b border-white/[0.06] py-3.5 font-display text-[clamp(2rem,9vw,3rem)] leading-none tracking-tight transition-all duration-500 ease-smooth data-[show=false]:translate-y-4 data-[show=false]:opacity-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${
                isActive ? 'text-white' : 'text-bone-muted hover:text-white'
              }`
            }
          >
            <span className="font-sans text-xs font-semibold text-brass/70 tabular-nums">
              0{i + 1}
            </span>
            <span className="flex-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* CTAs pinned to the bottom */}
      <div
        className="container-wide grid grid-cols-2 gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-500 ease-smooth data-[show=false]:translate-y-3 data-[show=false]:opacity-0 motion-reduce:transition-none"
        style={{ transitionDelay: '420ms' }}
        data-show={shown}
      >
        <a
          href={`tel:${siteConfig.phoneHref}`}
          onClick={() => {
            track('tel_click', { location: 'mobile_menu' });
            onClose();
          }}
          className="btn-secondary"
        >
          <PhoneIcon className="h-4 w-4" />
          Call
        </a>
        <Link
          to="/book"
          onClick={() => {
            track('book_now_click', { location: 'mobile_menu' });
            onClose();
          }}
          className="btn-primary"
        >
          Book Now
        </Link>
      </div>
    </div>,
    document.body,
  );
}
