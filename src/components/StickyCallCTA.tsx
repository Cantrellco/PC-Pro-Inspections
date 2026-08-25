import { siteConfig } from '@/config/siteConfig';
import { track } from '@/services/analytics';
import { PhoneIcon } from './nav/icons';

/** Phone-sized screens: a red block pinned to the bottom edge. */
export default function StickyCallCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t-3 border-ink bg-paper p-2.5 md:hidden"
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href={`tel:${siteConfig.phoneHref}`}
        onClick={() => track('tel_click', { location: 'sticky_mobile' })}
        className="btn-primary w-full !py-3"
        aria-label={`Call ${siteConfig.businessName} at ${siteConfig.phone}`}
      >
        <PhoneIcon className="h-4 w-4" />
        Call <span className="num">{siteConfig.phone}</span>
      </a>
    </div>
  );
}
