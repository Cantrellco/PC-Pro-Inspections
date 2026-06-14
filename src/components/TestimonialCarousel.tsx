import { useEffect, useRef, useState } from 'react';
import type { Testimonial } from '@/types';
import StarRating from './StarRating';

type Props = {
  items: Testimonial[];
  /** Auto-advance interval in ms (0 disables). */
  interval?: number;
};

/**
 * Accessible testimonial carousel — one large quote at a time, auto-advancing
 * (pauses on hover/focus), with dot controls and prev/next. Swipeable on touch.
 */
export default function TestimonialCarousel({ items, interval = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (!interval || paused || count <= 1) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((p) => (p + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [interval, paused, count]);

  if (count === 0) return null;
  const t = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="card card-rim p-8 sm:p-12 text-center min-h-[18rem] flex flex-col items-center justify-center">
        <span aria-hidden="true" className="font-display text-7xl leading-none text-gradient-brass mb-2">“</span>
        <div key={index} className="animate-fade-up">
          <StarRating rating={t.rating} className="justify-center mb-5" />
          <blockquote className="font-display text-xl sm:text-2xl text-bone leading-relaxed">
            {t.quote}
          </blockquote>
          <footer className="mt-6 text-sm">
            <span className="text-white font-semibold">{t.name}</span>
            <span className="text-bone-dim"> · {t.role}</span>
          </footer>
        </div>
      </div>

      {count > 1 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-7 bg-flag-red' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-bone hover:text-white hover:border-white/35 backdrop-blur"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-bone hover:text-white hover:border-white/35 backdrop-blur"
          >
            <span aria-hidden="true">›</span>
          </button>
        </>
      )}
    </div>
  );
}
