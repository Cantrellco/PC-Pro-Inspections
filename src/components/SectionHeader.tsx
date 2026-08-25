import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  title: ReactNode;
  description?: ReactNode;
  /** Override heading level for nested sections (default h2). */
  as?: 'h1' | 'h2' | 'h3';
  centered?: boolean;
  /** Misregistered colour behind the cut letters. */
  cut?: 'red' | 'brass' | 'navy' | 'none';
  className?: string;
  /** Legacy prop; the heading carries its own weight now. Ignored. */
  eyebrow?: string;
};

export default function SectionHeader({
  title,
  description,
  as: Heading = 'h2',
  centered = false,
  cut = 'red',
  className = '',
}: Props) {
  const titleClass = Heading === 'h1' ? 'display-1' : 'display-2';
  return (
    <Reveal
      as="header"
      className={`mb-10 sm:mb-12 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`.trim()}
    >
      <Heading className={`${titleClass} ${cut === 'none' ? '' : `cut-${cut}`}`}>{title}</Heading>
      {description && <p className="lede mt-4">{description}</p>}
    </Reveal>
  );
}
