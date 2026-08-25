import { useState } from 'react';

type Props = {
  /** Image URL. When empty, renders the printed placeholder. */
  src?: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspectClass?: string;
  className?: string;
  /** Caption printed on the placeholder so an empty slot reads as intentional. */
  placeholderLabel?: string;
  /** Above-the-fold hint. */
  priority?: boolean;
  /** Colour block misregistered behind the frame. */
  ink?: 'brass' | 'red' | 'navy';
  /** Legacy prop; frames are square-cut now. Ignored. */
  roundedClass?: string;
};

/**
 * A photograph pasted onto the sheet: keyblock frame, one colour block behind
 * it, and a slight duotone so the photo sits inside the four-ink world.
 * A missing or broken image becomes a printed placeholder, never a broken icon.
 */
export default function Photo({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  placeholderLabel,
  priority = false,
  ink = 'brass',
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`sheet sheet-${ink} p-0 ${className}`.trim()}>
      <div className={`relative overflow-hidden ${aspectClass}`}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            // @ts-expect-error fetchpriority is valid HTML, types lag
            fetchpriority={priority ? 'high' : undefined}
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'saturate(0.8) contrast(1.06)' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-deep p-6 text-center">
            <span className="label-sm">{placeholderLabel ?? 'Photograph'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
