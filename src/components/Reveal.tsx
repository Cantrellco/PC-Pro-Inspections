import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

type Props = {
  children: ReactNode;
  /** Element to render. Defaults to div. */
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Re-trigger every time it enters view (default: once). */
  once?: boolean;
};

/**
 * Reveals children with a soft fade-up when scrolled into view. The visual
 * states live in CSS (.reveal / .in-view); reduced-motion users see content
 * immediately (handled in index.css).
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      // Trip a little before the block reaches the fold so it has settled by the
      // time the reader gets there.
      { threshold: 0.05, rootMargin: '140px 0px -4% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
