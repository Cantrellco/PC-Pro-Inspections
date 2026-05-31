import { useState } from 'react';
import Flag from './Flag';

type Props = {
  src?: string;
  /** Slow Ken-Burns drift. */
  kenburns?: boolean;
  /** Opacity of the flag fallback when no/failed image. */
  flagOpacity?: number;
  className?: string;
};

/**
 * Full-bleed hero/CTA backdrop: shows the photo when available (with an
 * optional Ken-Burns drift), and falls back to the stylized flag if the image
 * is missing or fails to load — so the backdrop is never blank.
 */
export default function HeroImage({ src, kenburns = false, flagOpacity = 0.6, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        showImg ? 'photo-graded photo-graded--hero' : ''
      } ${className}`.trim()}
      aria-hidden="true"
    >
      <Flag fit="cover" className="absolute inset-0 h-full w-full" />
      {!showImg && (
        <div className="absolute inset-0 bg-ink-200" style={{ opacity: 1 - flagOpacity }} />
      )}
      {showImg && (
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          decoding="async"
          className={`photo-graded-img absolute inset-0 h-full w-full object-cover ${kenburns ? 'kenburns' : ''}`}
        />
      )}
    </div>
  );
}
