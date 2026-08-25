type Variant = 'full' | 'mark' | 'plaque';

type Props = {
  /**
   * `full`   = crest + wordmark (nav & footer)
   * `plaque` = crest on its paper plaque
   * `mark`   = raw transparent crest
   */
  variant?: Variant;
  className?: string;
  /** Accessible label for the mark. */
  title?: string;
};

/**
 * PC Pro Inspections brand crest. Drawn on white, so on the paper ground it
 * sits bare with no plaque. Source art: `src/assets/PC Pro Logo.png`; web
 * asset: `public/brand/logo-mark.png`.
 */
const MARK_SRC = '/brand/logo-mark.png';
const MARK_W = 419;
const MARK_H = 512;

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <img
      src={MARK_SRC}
      width={MARK_W}
      height={MARK_H}
      alt={title ?? 'PC Pro Inspections'}
      className={className}
      decoding="async"
    />
  );
}

export function LogoSeal({ className, title }: { className?: string; title?: string }) {
  return (
    <span className={`inline-flex h-full items-center justify-center ${className ?? ''}`}>
      <LogoMark className="h-full w-auto" title={title} />
    </span>
  );
}

export default function Logo({ variant = 'full', className, title }: Props) {
  if (variant === 'mark') return <LogoMark className={className} title={title} />;
  if (variant === 'plaque') return <LogoSeal className={className} title={title} />;

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <LogoSeal title={title} />
      <span className="font-display uppercase leading-none tracking-[0.01em] whitespace-nowrap">
        <span className="text-navy">PC Pro</span>{' '}
        <span className="text-red">Inspections</span>
      </span>
    </span>
  );
}
