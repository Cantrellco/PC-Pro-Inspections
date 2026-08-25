import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { NAV_ITEMS } from './navItems';
import { useBodyScrollLock, useFocusTrap, useInertBackground } from './hooks';
import { CloseIcon, PhoneIcon } from './icons';

/** A full paper sheet slides over the page; links are big cut letters. */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);

  useInertBackground(open);
  useBodyScrollLock(open);
  useFocusTrap(panelRef, open, closeRef);

  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

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
      className="fixed inset-0 z-[95] flex flex-col bg-paper motion-safe:animate-fade-in lg:hidden"
    >
      <div className="container-wide flex h-20 items-center justify-between border-b-3 border-ink">
        <span className="label">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center border-2 border-ink bg-paper-white text-ink"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-wide flex flex-1 flex-col justify-center py-4">
        {NAV_ITEMS.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            style={{ transitionDelay: `${40 + i * 35}ms` }}
            data-show={shown}
            className={({ isActive }) =>
              `flex items-center justify-between border-b-2 border-ink py-3 font-display text-[clamp(2rem,9vw,3rem)] uppercase leading-none transition-all duration-300 ease-register data-[show=false]:translate-y-3 data-[show=false]:opacity-0 motion-reduce:transition-none ${
                isActive ? 'text-red' : 'text-ink hover:text-navy'
              }`
            }
          >
            <span>{item.label}</span>
            <span aria-hidden="true" className="font-condensed text-lg text-brass">
              ★
            </span>
          </NavLink>
        ))}
      </nav>

      <div
        className="container-wide grid grid-cols-2 gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-300 ease-register data-[show=false]:translate-y-3 data-[show=false]:opacity-0 motion-reduce:transition-none"
        style={{ transitionDelay: '320ms' }}
        data-show={shown}
      >
        <a
          href={`tel:${siteConfig.phoneHref}`}
          onClick={() => {
            track('tel_click', { location: 'mobile_menu' });
            onClose();
          }}
          className="btn-primary"
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
          className="btn-navy"
        >
          Book
        </Link>
      </div>
    </div>,
    document.body,
  );
}
