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
  return (
    <header className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-flag-redSoft">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg text-bone-muted ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
