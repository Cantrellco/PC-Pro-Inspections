import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max px the element drifts toward the cursor. */
  strength?: number;
};

/**
 * Wraps an element so it subtly drifts toward the cursor on hover (desktop,
 * fine-pointer only). Pure transform — disabled for touch and reduced-motion.
 */
export default function Magnetic({ children, className = '', strength = 6 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / r.width) * strength * 2}px, ${(y / r.height) * strength * 2}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-smooth will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
