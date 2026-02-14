import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import QuantityStepper from '../Components/QuantityStepper';
import PriceSummary from '../Components/PriceSummary';
import StepsIndicator from '../Components/StepsIndicator';
import EmptyState from '../Components/EmptyState';
import Button from '../Components/Button';
import { getImageByCategory } from '../services/ImageService';

export default function Cart() {
  const { t, fc, fd } = useLocale();
  const { items, updateQuantity, removeItem, subtotal, serviceFees, total } = useCart();

  const steps = [t('cart.step1'), t('cart.step2'), t('cart.step3')];
  const fallbackImg = getImageByCategory('exterior');

  return (
    <AppLayout>
      <Head title={t('cart.title')} />

      <div className="max-container section-padding py-8 lg:py-12">
        <StepsIndicator steps={steps} currentStep={0} className="mb-10" />

        <h1 className="text-2xl font-display font-bold text-text lg:text-3xl mb-2">{t('cart.title')}</h1>
        {items.length > 0 && (
          <p className="text-sm text-text/50 mb-8">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        )}

        {items.length === 0 ? (
          <EmptyState
            title={t('cart.empty')}
            description={t('cart.emptyText')}
            actionLabel={t('cart.browseCta')}
            actionHref="/program"
            icon={
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gold/5 border border-gold/10">
                <svg className="h-12 w-12 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
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
                <div key={item.key} className="card-premium p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex gap-4">
                    <div className="hidden sm:block w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img src={item.eventImage || fallbackImg.url} alt={item.eventTitle} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-bold text-text line-clamp-1">{item.eventTitle}</h3>
                          <p className="text-sm text-gold font-medium">{item.ticketTypeName}</p>
                          <p className="text-xs text-text/40 mt-1">{fd(item.eventDate)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="shrink-0 rounded-xl p-2 text-text/30 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:scale-110"
                          aria-label={t('cart.remove')}
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(v) => updateQuantity(item.key, v)}
                          min={1}
                        />
                        <span className="font-display font-bold text-text text-lg">{fc(item.unitPrice * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="card-premium p-6 space-y-6 lg:sticky lg:top-24">
                <PriceSummary subtotal={subtotal} fees={serviceFees} total={total} />
                <Button href="/checkout" className="w-full">
                  {t('cart.checkout')}
                </Button>
                <Link href="/program" className="block text-center text-sm font-medium text-text/60 hover:text-gold transition-colors">
                  {t('cart.continueBrowsing')}
                </Link>
                {/* Trust */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-sandstone/10">
                  <span className="flex items-center gap-1 text-[10px] text-text/30">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text/30">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                    SSL Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
