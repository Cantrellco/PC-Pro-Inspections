export type NavItem = { to: string; label: string; end?: boolean };

/** Primary navigation shown in the desktop rail and the mobile menu. */
export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/resources', label: 'Resources' },
  { to: '/service-areas', label: 'Areas' },
  { to: '/contact', label: 'Contact' },
];

/**
 * Destinations listed under "Pages" in the command palette — ONE entry per
 * route, with search keywords. Kept separate from NAV_ITEMS on purpose: the rail
 * needs terse labels ("Areas"), but the palette can afford fuller, more
 * searchable names ("Service areas"). Concatenating the two arrays (the old
 * approach) listed several routes twice under different names — the source of
 * the "confusing" duplicates. `/book` lives only in Quick actions, so it's
 * intentionally absent here.
 */
export const COMMAND_PAGES: { to: string; label: string; keywords?: string }[] = [
  { to: '/', label: 'Home', keywords: 'start homepage main' },
  { to: '/services', label: 'Services & pricing', keywords: 'price estimate cost free quote calculator inspection types radon mold termite' },
  { to: '/about', label: 'About', keywords: 'inspector experience credentials certifications story who' },
  { to: '/reviews', label: 'Reviews', keywords: 'testimonials ratings google stars feedback' },
  { to: '/resources', label: 'Resources', keywords: 'sample report prep guide checklist pdf download' },
  { to: '/service-areas', label: 'Service areas', keywords: 'towns counties coverage map where region' },
  { to: '/contact', label: 'Contact', keywords: 'email phone message reach hours get in touch' },
  { to: '/privacy', label: 'Privacy policy', keywords: 'data cookies legal' },
  { to: '/terms', label: 'Terms of service', keywords: 'legal conditions agreement' },
];
