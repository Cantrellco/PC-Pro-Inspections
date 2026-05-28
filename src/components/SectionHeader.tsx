import Reveal from './Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Override heading level for nested sections (default h2). */
  as?: 'h1' | 'h2' | 'h3';
  centered?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  centered = true,
}: Props) {
  const titleClass = Heading === 'h1' ? 'display-1' : 'display-2';
  return (
    <Reveal
      as="header"
      className={`mb-12 sm:mb-14 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Heading className={`${titleClass} text-white`}>{title}</Heading>
      {description && <p className="lede mt-5">{description}</p>}
    </Reveal>
  );
}
