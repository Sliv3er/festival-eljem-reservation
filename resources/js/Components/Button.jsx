import { forwardRef } from 'react';
import { Link } from '@inertiajs/react';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: '',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', href, className = '', children, loading = false, disabled = false, ...props },
  ref
) {
  const classes = `${variants[variant] || variants.primary} ${sizes[size] || ''} ${className}`.trim();
  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ms-1 me-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} disabled={isDisabled} {...props}>
      {content}
    </button>
  );
});

export default Button;
