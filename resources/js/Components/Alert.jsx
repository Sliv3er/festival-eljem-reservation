import { useState } from 'react';

const styles = {
  success: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', icon: '✓' },
  warning: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', icon: '⚠' },
  error: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', icon: '✕' },
  info: { bg: 'bg-sky-50 border-sky-200', text: 'text-sky-800', icon: 'ℹ' },
};

export default function Alert({ variant = 'info', title, children, dismissible = false, className = '' }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const s = styles[variant] || styles.info;

  return (
    <div className={`rounded-xl border p-4 ${s.bg} ${className}`} role="alert">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${s.text}`}>
          {s.icon}
        </span>
        <div className="flex-1 min-w-0">
          {title && <p className={`font-semibold ${s.text}`}>{title}</p>}
          <div className={`text-sm ${s.text} opacity-90`}>{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className={`shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5 ${s.text}`}
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
