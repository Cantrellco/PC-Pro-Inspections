import { useRef, type ReactNode, type PointerEvent } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Antique-brass hairline along the top edge. */
  rim?: boolean;
  /** Lift on hover (for interactive cards). */
  hover?: boolean;
  /** Soft brass spotlight that tracks the pointer (fine-pointer only). */
  glow?: boolean;
};

export default function Card({
  children,
  className = '',
  rim = false,
  hover = false,
  glow = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Write the pointer position into CSS custom props so the ::after spotlight
  // follows the cursor. Only fires while the pointer is over this one card, and
  // the glow itself only renders on fine-pointer devices (CSS-gated), so touch
  // pays nothing visual for the two var writes.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={glow ? onMove : undefined}
      className={`card ${rim ? 'card-rim' : ''} ${hover ? 'card-hover' : ''} ${
        glow ? 'card-glow' : ''
      } p-6 sm:p-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
