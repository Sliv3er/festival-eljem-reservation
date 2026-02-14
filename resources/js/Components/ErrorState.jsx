import useLocale from '../hooks/useLocale';
import Button from './Button';

export default function ErrorState({ title, description, onRetry, className = '' }) {
  const { t } = useLocale();

  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
        <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-text">{title || t('common.error')}</h3>
      <p className="mt-2 max-w-sm text-sm text-text/60">{description || t('common.errorText')}</p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="secondary" size="sm">
            {t('common.retry')}
          </Button>
        </div>
      )}
    </div>
  );
}
