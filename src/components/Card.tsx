import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Render a subtle red top-edge accent to highlight the card. */
  accent?: boolean;
};

export default function Card({ children, className = '', accent = false }: Props) {
  return (
    <div
      className={`card p-6 sm:p-7 ${
        accent ? 'relative overflow-hidden' : ''
      } ${className}`.trim()}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-flag-red"
        />
      )}
      {children}
    </div>
  );
}
