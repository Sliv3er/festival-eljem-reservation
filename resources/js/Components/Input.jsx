import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, type = 'text', className = '', id, required = false, ...props },
  ref
) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-text">
          {label}
          {required && <span className="ms-1 text-red-500">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          ref={ref}
          id={inputId}
          className={`input-field min-h-[120px] resize-y ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          required={required}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          ref={ref}
          id={inputId}
          className={`input-field ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          required={required}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`input-field ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          required={required}
          {...props}
        />
      )}
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
