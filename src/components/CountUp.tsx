import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Final numeric value. */
  value: number;
  /** Rendered prefix/suffix (e.g. "+", "★"). */
  suffix?: string;
  /** Decimal places (for ratings like 4.9). */
  decimals?: number;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
};

/** Counts up to `value` once it scrolls into view. Respects reduced motion. */
export default function CountUp({
  value,
  suffix = '',
  decimals = 0,
  duration = 1400,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              // easeOutExpo
              const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
              setDisplay(value * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
