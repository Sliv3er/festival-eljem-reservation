import useLocale from '../hooks/useLocale';

export default function PriceSummary({ subtotal, fees, total, className = '' }) {
  const { t, fc } = useLocale();

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text/60">{t('event.subtotal')}</span>
        <span className="font-medium text-text">{fc(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-text/60">{t('event.fees')}</span>
        <span className="font-medium text-text">{fc(fees)}</span>
      </div>
      <hr className="border-sandstone/15" />
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text">{t('event.total')}</span>
        <span className="text-lg font-bold text-gold">{fc(total)}</span>
      </div>
    </div>
  );
}
