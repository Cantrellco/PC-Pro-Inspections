import type { SVGProps } from 'react';

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

type P = SVGProps<SVGSVGElement>;

export const IconRoof = (p: P) => (
  <svg {...base} {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v9h14v-9" /><path d="M10 19v-5h4v5" /></svg>
);
export const IconFoundation = (p: P) => (
  <svg {...base} {...p}><path d="M3 8h18M3 8l3-4h12l3 4M5 8v12h14V8" /><path d="M9 20v-6h6v6" /></svg>
);
export const IconPlumbing = (p: P) => (
  <svg {...base} {...p}><path d="M7 3v6a3 3 0 003 3h1v9" /><path d="M14 3h4v4h-4z" /><path d="M16 7v3a3 3 0 01-3 3" /></svg>
);
export const IconElectrical = (p: P) => (
  <svg {...base} {...p}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>
);
export const IconHvac = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></svg>
);
export const IconAttic = (p: P) => (
  <svg {...base} {...p}><path d="M12 3L3 10h18L12 3z" /><path d="M7 10l5 8 5-8" /><path d="M12 10v8" /></svg>
);
export const IconInterior = (p: P) => (
  <svg {...base} {...p}><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /><path d="M4 12h16" /></svg>
);
export const IconBasement = (p: P) => (
  <svg {...base} {...p}><path d="M4 4h16v16H4z" /><path d="M4 14h16M9 14v6M15 14v6" /></svg>
);
export const IconAddons = (p: P) => (
  <svg {...base} {...p}><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="9" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const IconClock = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconDoc = (p: P) => (
  <svg {...base} {...p}><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base} {...p}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.9.7 2.7a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.8.3 1.8.6 2.7.7A2 2 0 0122 16.9z" /></svg>
);
