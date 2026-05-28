import Flag from './Flag';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Override heading level for nested sections (default h2). */
  as?: 'h1' | 'h2' | 'h3';
  centered?: boolean;
  /** Show a small stylized flag above the eyebrow. */
  flag?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  centered = true,
  flag = false,
}: Props) {
  return (
    <header className={`mb-10 ${centered ? 'text-center' : ''}`}>
      {flag && (
        <div className={`mb-5 ${centered ? 'flex justify-center' : ''}`}>
          <Flag className="h-10 w-[76px] rounded-sm shadow-card" />
        </div>
      )}
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
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
