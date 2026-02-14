import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import QuantityStepper from '../Components/QuantityStepper';
import PriceSummary from '../Components/PriceSummary';
import StepsIndicator from '../Components/StepsIndicator';
import EmptyState from '../Components/EmptyState';
import Button from '../Components/Button';

export default function Cart() {
  const { t, fc, fd } = useLocale();
  const { items, updateQuantity, removeItem, subtotal, serviceFees, total } = useCart();

  const steps = [t('cart.step1'), t('cart.step2'), t('cart.step3')];

  return (
    <AppLayout>
      <Head title={t('cart.title')} />

      <div className="max-container section-padding py-8 lg:py-12">
        <StepsIndicator steps={steps} currentStep={0} className="mb-10" />

        <h1 className="text-2xl font-bold text-text lg:text-3xl mb-8">{t('cart.title')}</h1>

        {items.length === 0 ? (
          <EmptyState
            title={t('cart.empty')}
            description={t('cart.emptyText')}
            actionLabel={t('cart.browseCta')}
            actionHref="/program"
            icon={
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sandstone/10">
                <svg className="h-10 w-10 text-sandstone/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            }
          />
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Items */}
            <div className="flex-1 min-w-0 space-y-4">
              {items.map((item) => (
                <div key={item.key} className="card p-5">
                  <div className="flex gap-4">
                    {item.eventImage && (
                      <div className="hidden sm:block w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <img src={item.eventImage} alt={item.eventTitle} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-text line-clamp-1">{item.eventTitle}</h3>
                          <p className="text-sm text-text/60">{item.ticketTypeName}</p>
                          <p className="text-xs text-text/40 mt-1">{fd(item.eventDate)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="shrink-0 rounded-lg p-1.5 text-text/30 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={t('cart.remove')}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(v) => updateQuantity(item.key, v)}
                          min={1}
                        />
                        <span className="font-semibold text-text">{fc(item.unitPrice * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="card p-6 space-y-6 lg:sticky lg:top-24">
                <PriceSummary subtotal={subtotal} fees={serviceFees} total={total} />
                <Button href="/checkout" className="w-full">
                  {t('cart.checkout')}
                </Button>
                <Link href="/program" className="block text-center text-sm font-medium text-text/60 hover:text-gold transition-colors">
                  {t('cart.continueBrowsing')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
