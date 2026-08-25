import type { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'navy' | 'ghost';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  navy: 'btn-navy',
  ghost: 'btn-ghost',
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  /** Blocks input during async work and says so. */
  loading?: boolean;
};
type ButtonAsLink = CommonProps & {
  as: 'link';
  to: string;
  onClick?: () => void;
};
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/** Block-printed button: paper type on an ink field, a second colour
 *  misregistered behind the keyblock outline. */
export default function Button(props: Props) {
  const variant = props.variant ?? 'primary';
  const cls = `${variantClass[variant]} ${props.className ?? ''}`.trim();

  if (props.as === 'link') {
    return (
      <Link to={props.to} onClick={props.onClick} className={cls}>
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
      {loading && (
        <span aria-hidden="true" className="inline-block h-3 w-3 animate-pulse bg-current" />
      )}
      {children}
    </button>
  );
}
