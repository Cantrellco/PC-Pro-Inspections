import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Colour block misregistered behind the sheet. */
  ink?: 'brass' | 'red' | 'navy' | 'none';
  /** Notched ticket edges instead of a plain sheet. */
  ticket?: boolean;
  /** Tighter padding. */
  compact?: boolean;
  // Legacy props from the previous world; ignored.
  rim?: boolean;
  hover?: boolean;
  glow?: boolean;
};

/**
 * A printed sheet: paper, 3px keyblock, one colour block peeking 4px past the
 * line. The only container in the system; never nest one inside another.
 */
export default function Card({
  children,
  className = '',
  ink = 'brass',
  ticket = false,
  compact = false,
}: Props) {
  const inkClass = ink === 'none' ? 'sheet-flat' : ink === 'brass' ? '' : `sheet-${ink}`;
  const pad = compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8';
  if (ticket) {
    return (
      <div className="ticket-cast">
        <div className={`ticket ${pad} ${className}`.trim()}>{children}</div>
      </div>
    );
  }
  return <div className={`sheet ${inkClass} ${pad} ${className}`.trim()}>{children}</div>;
}
