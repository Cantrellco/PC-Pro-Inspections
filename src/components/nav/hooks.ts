import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Platform-aware command-key glyph. Apple devices use ⌘; everyone else (the
 * majority of this site's audience — Windows/Android) uses Ctrl. Showing a Mac
 * ⌘ to a Windows user reads as broken, so we detect once at load. The keyboard
 * handler in Nav listens for both metaKey and ctrlKey, so the binding works
 * regardless of which glyph we display.
 */
const IS_APPLE =
  typeof navigator !== 'undefined' &&
  // Prefer the stable userAgent over the deprecated navigator.platform; fall
  // back to platform for the rare engine that trims the UA. (iPadOS 13+ reports
  // "Macintosh" → matches Mac → ⌘, which is correct for an iPad with a keyboard.)
  /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.platform || '');

/** What to render on a keycap: '⌘' on Apple, 'Ctrl' elsewhere. */
export const MOD_KEY = IS_APPLE ? '⌘' : 'Ctrl';
/** Spoken/aria form of the modifier, for accessible labels. */
export const MOD_KEY_LABEL = IS_APPLE ? 'Command' : 'Control';

/**
 * Live `prefers-reduced-motion` flag. Used to fully *skip* JS-driven animation
 * (the sliding indicator measure/tween, magnetic transforms), not just hide it —
 * CSS `transition-none` alone can't stop a running rAF loop.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input:not([disabled]),select,[tabindex]:not([tabindex="-1"])';

/**
 * Minimal, dependency-free focus trap. Moves focus in on activate (to
 * `initialFocus` if given), keeps Tab inside `ref`, and restores focus to the
 * previously-focused element on deactivate.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  active: boolean,
  initialFocus?: RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const prev = document.activeElement as HTMLElement | null;

    // Defer initial focus a frame so the node is painted/measurable.
    const id = requestAnimationFrame(() => {
      (initialFocus?.current ?? node.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    node.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(id);
      node.removeEventListener('keydown', onKey);
      // Restore focus on the next frame — after sibling cleanups (e.g. removing
      // `inert` from the background root) have run, so the target is focusable.
      const toRestore = prev;
      requestAnimationFrame(() => toRestore?.focus?.());
    };
  }, [active, ref, initialFocus]);
}

/**
 * Locks body scroll while `locked`. Pairs with `scrollbar-gutter: stable` on
 * <html> (set in index.css) so toggling overflow causes zero layout shift.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/**
 * Marks the app root `inert` while an overlay (portaled to <body>) is open, so
 * the background is removed from tab order, the a11y tree, and pointer events.
 * Strictly better than aria-hidden (which leaves focusable descendants).
 */
export function useInertBackground(active: boolean, rootId = 'root') {
  useEffect(() => {
    if (!active) return;
    const el = document.getElementById(rootId);
    if (!el) return;
    el.toggleAttribute('inert', true);
    return () => {
      el.toggleAttribute('inert', false);
    };
  }, [active, rootId]);
}

/**
 * Subtle "magnetic" pull toward the pointer for a single element (the primary
 * CTA). Pointer-only and reduced-motion–guarded; eases back via CSS on leave.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.22, max = 6) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(pointer: coarse)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(-max, Math.min(max, (e.clientX - (r.left + r.width / 2)) * strength));
      const y = Math.max(-max, Math.min(max, (e.clientY - (r.top + r.height / 2)) * strength));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [strength, max]);
  return ref;
}
