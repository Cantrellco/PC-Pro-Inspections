import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';

export default function StickyCallCTA() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-ink/95 p-3"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href={`tel:${siteConfig.phoneHref}`}
        onClick={() => track('tel_click', { location: 'sticky_mobile' })}
        className="btn-primary w-full !py-3 !text-sm"
        aria-label={`Call ${siteConfig.businessName} at ${siteConfig.phone}`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.94.36 1.86.7 2.74a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.34-1.27a2 2 0 012.11-.45c.88.34 1.8.57 2.74.7A2 2 0 0122 16.92z"
          />
        </svg>
        Call Now — {siteConfig.phone}
      </a>
    </div>
  );
}
