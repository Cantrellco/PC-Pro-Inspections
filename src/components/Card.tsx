import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Antique-brass hairline along the top edge. */
  rim?: boolean;
  /** Lift on hover (for interactive cards). */
  hover?: boolean;
};

export default function Card({ children, className = '', rim = false, hover = false }: Props) {
  return (
    <div
      className={`card ${rim ? 'card-rim' : ''} ${hover ? 'card-hover' : ''} p-6 sm:p-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
