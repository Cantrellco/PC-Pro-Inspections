import { siteConfig } from '@/config/siteConfig';
import StarRating from './StarRating';
import Button from './Button';

const GoogleG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l6-6C42.9 4.5 38.8 2.5 24 2.5 12.3 2.5 2.5 12.3 2.5 24S12.3 45.5 24 45.5c11.9 0 21-8.3 21-21 0-1.4-.2-2.9-.5-4.5z" />
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16 19.2 13 24 13c3.3 0 6.3 1.2 8.6 3.3l6-6C34.9 6.5 29.8 4.5 24 4.5 16 4.5 9.1 9 6.3 14.7z" opacity="0" />
  </svg>
);

/** Rich Google-reviews summary card driven by siteConfig.googleReviews. */
export default function GoogleReviewsSummary() {
  const g = siteConfig.googleReviews;
  const rating = g.rating ?? 0;
  const count = g.reviewCount ?? 0;
  if (!rating) return null;

  return (
    <div className="card card-rim p-7 sm:p-9 flex flex-col sm:flex-row items-center gap-8">
      <div className="text-center sm:border-r sm:border-white/10 sm:pr-8">
        <div className="font-display text-6xl font-semibold text-white leading-none">
          {rating.toFixed(1)}
        </div>
        <StarRating rating={Math.round(rating) as 1 | 2 | 3 | 4 | 5} className="justify-center mt-3" />
        <p className="mt-2 text-sm text-bone-dim">{count} Google reviews</p>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <GoogleG className="h-5 w-5" />
          <span className="text-sm font-semibold text-bone">Google Business Profile</span>
        </div>
        <p className="text-bone-muted leading-relaxed">
          Every public review, straight from Google — not cherry-picked. Read
          them all, or leave your own after your inspection.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 justify-center sm:justify-start">
          {g.placeUrl ? (
            <>
              <Button as="a" href={g.placeUrl} target="_blank" rel="noopener noreferrer">
                Read on Google
              </Button>
              <Button as="a" href={g.placeUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                Leave a review
              </Button>
            </>
          ) : (
            <span className="text-xs text-bone-dim italic">
              Add your Google Business Profile URL in siteConfig → googleReviews.placeUrl
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
