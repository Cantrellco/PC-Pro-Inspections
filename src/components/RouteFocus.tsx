import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Moves keyboard focus to the main heading on route change so screen
 * readers and keyboard users know where they are.
 */
export default function RouteFocus() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const main = document.getElementById('main-content');
    if (main) {
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
}
