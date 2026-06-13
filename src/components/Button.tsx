import type { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  /** Shows a spinner and blocks input during async work. */
  loading?: boolean;
};
type ButtonAsLink = CommonProps & {
  as: 'link';
  to: string;
};
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Button(props: Props) {
  const variant = props.variant ?? 'primary';
  const cls = `${variantClass[variant]} ${props.className ?? ''}`.trim();

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={cls}>
        {props.children}
      </Link>
    );
  }
  if (props.as === 'a') {
    const { as: _a, variant: _v, className: _c, children, ...rest } = props;
    return (
      <a {...rest} className={cls}>
        {children}
      </a>
    );
  }
  const { as: _a, variant: _v, className: _c, children, loading, disabled, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cls}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
