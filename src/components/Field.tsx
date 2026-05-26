import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
    as?: 'input';
  };

type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
    as: 'textarea';
  };

type Props = InputProps | TextareaProps;

export default function Field(props: Props) {
  const { id, label, error, hint, required } = props;
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-err` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  const errorClass = error ? 'border-flag-redSoft focus:border-flag-redSoft' : '';

  let control: ReactNode;
  if (props.as === 'textarea') {
    const {
      as: _a,
      id: _id,
      label: _l,
      error: _e,
      hint: _h,
      required: _r,
      ...rest
    } = props;
    control = (
      <textarea
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        rows={rest.rows ?? 4}
        {...rest}
        className={`field-input ${errorClass} ${rest.className ?? ''}`.trim()}
      />
    );
  } else {
    const {
      as: _a,
      id: _id,
      label: _l,
      error: _e,
      hint: _h,
      required: _r,
      ...rest
    } = props;
    control = (
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...rest}
        className={`field-input ${errorClass} ${rest.className ?? ''}`.trim()}
      />
    );
  }

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span className="text-flag-redSoft ml-0.5">*</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-bone-dim">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
