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

/** Extra destinations surfaced only in the command palette. */
export const EXTRA_PAGES: { to: string; label: string; keywords?: string }[] = [
  { to: '/book', label: 'Book an inspection', keywords: 'schedule appointment booking calendar' },
  { to: '/service-areas', label: 'Service areas', keywords: 'towns counties coverage map' },
  { to: '/resources', label: 'Sample report & prep guide', keywords: 'pdf checklist download' },
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms of service' },
];
