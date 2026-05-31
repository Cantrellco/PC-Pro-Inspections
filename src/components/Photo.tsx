import { useState } from 'react';

type Props = {
  /** Image URL. When empty, renders the premium placeholder. */
  src?: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspectClass?: string;
  className?: string;
  /** Caption shown on the placeholder so empty slots read as intentional. */
  placeholderLabel?: string;
  /** Above-the-fold hint. */
  priority?: boolean;
  /** Rounded corners class. */
  roundedClass?: string;
};

/**
 * Photo slot. Renders a real <img> when `src` is set; otherwise an elegant
 * gradient placeholder. If the image fails to load (e.g. a hotlinked stock
 * URL 404s), it falls back to the same placeholder — never a broken icon.
 */
export default function Photo({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  placeholderLabel,
  priority = false,
  roundedClass = 'rounded-xl',
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative overflow-hidden ${roundedClass} ${aspectClass} border border-white/10 ${
        showImage ? 'photo-graded' : ''
      } ${className}`.trim()}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          // @ts-expect-error fetchpriority is valid HTML, types lag
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onError={() => setFailed(true)}
          className="photo-graded-img absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="photo-placeholder absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="text-bone-dim text-sm">
            <svg
              viewBox="0 0 24 24"
              className="mx-auto mb-2 h-7 w-7 opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16l5-5 4 4 3-3 6 6M3 5h18v14H3zM9 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            {placeholderLabel ?? 'Photo'}
          </span>
        </div>
      )}
    </div>
  );
}
