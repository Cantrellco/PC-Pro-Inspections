import type { ReactNode } from 'react';

type Tone = 'paper' | 'deep' | 'navy' | 'red' | 'brass' | 'ink';

type Props = {
  children: ReactNode;
  /** Ground the section is printed on. Colour tones own the whole band. */
  tone?: Tone | 'default' | 'elevated' | 'dark' | 'americana';
  className?: string;
  id?: string;
  ariaLabel?: string;
  /** Use the wider container. */
  wide?: boolean;
  /** Keyblock rules top and bottom (a printed band). */
  ruled?: boolean;
  /** Tighter vertical rhythm. */
  compact?: boolean;
  // Legacy props from the previous world; ignored.
  aurora?: boolean;
  blueprint?: boolean;
};

const TONE: Record<Tone, string> = {
  paper: '',
  deep: 'bg-paper-deep',
  navy: 'bg-navy text-paper',
  red: 'bg-red text-paper',
  brass: 'bg-brass text-ink',
  ink: 'bg-ink text-paper',
};

function normalize(t: Props['tone']): Tone {
  if (t === 'elevated' || t === 'default' || t === undefined) return t === 'elevated' ? 'deep' : 'paper';
  if (t === 'dark' || t === 'americana') return 'navy';
  return t;
}

export default function Section({
  children,
  tone,
  className = '',
  id,
  ariaLabel,
  wide = false,
  ruled = false,
  compact = false,
}: Props) {
  const t = normalize(tone);
  const colored = t !== 'paper' && t !== 'deep';
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      data-tone={t}
      className={`relative ${compact ? 'py-12 sm:py-16' : 'py-16 sm:py-24'} ${TONE[t]} ${
        ruled || colored ? 'border-y-3 border-ink' : ''
      } ${className}`.trim()}
    >
      <div className={`${wide ? 'container-wide' : 'container-narrow'} relative above-grain`}>
        {children}
      </div>
    </section>
  );
}
