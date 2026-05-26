type Props = {
  rating: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

export default function StarRating({ rating, className }: Props) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className ?? ''}`.trim()}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? 'text-flag-red' : 'text-bone-dim/40'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
