import Button from './Button';

export default function EmptyState({ icon, title, description, actionLabel, actionHref, onAction, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      {icon ? (
        <div className="mb-6">{icon}</div>
      ) : (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-sandstone/10">
          <svg className="h-10 w-10 text-sandstone/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-text/60">{description}</p>}
      {(actionLabel && (actionHref || onAction)) && (
        <div className="mt-6">
          <Button href={actionHref} onClick={onAction} variant="secondary" size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
