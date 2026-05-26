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
  const { as: _a, variant: _v, className: _c, children, ...rest } = props;
  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
