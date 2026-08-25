import { useEffect, useRef, useState } from 'react';

export type PrintLabel = {
  text: string;
  /** Percent of width / height where the tag's top-left corner sits. */
  x: number;
  y: number;
};

type Props = {
  /** Asset base name under /art, e.g. "house" → /art/house-red.png … */
  base: string;
  alt: string;
  /** Intrinsic aspect ratio of the print, width / height. */
  ratio: number;
  /** Paper tags pinned over the print. */
  labels?: PrintLabel[];
  /** Printer's registration crosshairs at the corners. */
  crosshairs?: boolean;
  /** Start printing as soon as mounted (hero) instead of when scrolled into view. */
  immediate?: boolean;
  /** Above-the-fold: eager-load the layers. */
  priority?: boolean;
  className?: string;
};

const ORDER = ['red', 'navy', 'brass', 'key'] as const;
/** The hero print sets the pace of the page; prints further down register
 *  faster, because the reader has already met the idea and is scrolling. */
const STAGGER_MS = 420;
const STAGGER_FAST_MS = 190;

/**
 * A four-ink woodblock print that registers one block at a time: red, navy,
 * brass, then the black keyblock last, each wiping on from the left like a
 * sheet pulled off the block. Reduced-motion users get the finished print.
 */
export default function WoodblockPrint({
  base,
  alt,
  ratio,
  labels = [],
  crosshairs = false,
  immediate = false,
  priority = false,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [printed, setPrinted] = useState<number>(immediate ? 0 : -1);
  const [misreg, setMisreg] = useState(true);

  // Start printing when the print enters the viewport (or immediately).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrinted(ORDER.length);
      setMisreg(false);
      return;
    }
    if (immediate) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPrinted(0);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '240px 0px 0px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  // Advance through the inks; once the keyblock lands, the colour blocks
  // settle into register.
  useEffect(() => {
    if (printed < 0 || printed >= ORDER.length) return;
    const stagger = immediate ? STAGGER_MS : STAGGER_FAST_MS;
    const id = window.setTimeout(() => setPrinted((p) => p + 1), printed === 0 ? 60 : stagger);
    return () => window.clearTimeout(id);
  }, [printed, immediate]);
  useEffect(() => {
    if (printed < ORDER.length) return;
    const id = window.setTimeout(() => setMisreg(false), immediate ? 700 : 320);
    return () => window.clearTimeout(id);
  }, [printed, immediate]);

  const offsets: Record<(typeof ORDER)[number], string> = {
    red: misreg ? 'translate(-0.5%, 0.4%)' : 'translate(-0.15%, 0.15%)',
    navy: misreg ? 'translate(0.45%, -0.3%)' : 'translate(0.15%, -0.1%)',
    brass: misreg ? 'translate(0.2%, 0.5%)' : 'translate(0.1%, 0.15%)',
    key: 'none',
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`.trim()}
      style={{ aspectRatio: String(ratio) }}
      role="img"
      aria-label={alt}
    >
      {ORDER.map((ink, i) => (
        <img
          key={ink}
          src={`/art/${base}-${ink}.png`}
          alt=""
          aria-hidden="true"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          // @ts-expect-error fetchpriority is valid HTML, types lag
          fetchpriority={priority && ink === 'key' ? 'high' : undefined}
          className="print-layer"
          data-printed={printed > i}
          style={{
            transform: offsets[ink],
            mixBlendMode: ink === 'key' ? 'multiply' : 'normal',
            transitionDuration: immediate ? undefined : '0.42s',
          }}
        />
      ))}

      {labels.map((l, i) => (
        <span
          key={l.text}
          className="tag absolute text-[0.78rem] sm:text-sm lg:text-base"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            opacity: printed >= ORDER.length ? 1 : 0,
            transform: printed >= ORDER.length ? 'none' : 'translateY(6px)',
            transition: immediate
              ? `opacity 0.25s ${i * 60}ms, transform 0.4s cubic-bezier(0.2,1.35,0.4,1) ${i * 60}ms`
              : `opacity 0.16s ${i * 30}ms, transform 0.28s cubic-bezier(0.2,1.35,0.4,1) ${i * 30}ms`,
          }}
        >
          {l.text}
        </span>
      ))}

      {crosshairs && (
        <>
          <Crosshair className="-left-2 -top-2 sm:-left-5 sm:-top-5" />
          <Crosshair className="-right-2 -top-2 sm:-right-5 sm:-top-5" />
          <Crosshair className="-bottom-2 -left-2 sm:-bottom-5 sm:-left-5" />
          <Crosshair className="-bottom-2 -right-2 sm:-bottom-5 sm:-right-5" />
        </>
      )}
    </div>
  );
}

function Crosshair({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={`absolute h-7 w-7 sm:h-10 sm:w-10 ${className}`}
    >
      <circle cx="20" cy="20" r="11" fill="none" stroke="#111111" strokeWidth="3" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="#c8102e" strokeWidth="3" transform="translate(1.5 1.5)" opacity="0.9" />
      <path d="M20 2v36M2 20h36" stroke="#111111" strokeWidth="3" />
      <circle cx="20" cy="20" r="3.5" fill="#b8952a" />
    </svg>
  );
}
