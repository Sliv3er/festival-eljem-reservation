import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import StepsIndicator from '../Components/StepsIndicator';
import Button from '../Components/Button';

export default function CheckoutSuccess({ order }) {
  const { t, fc, fd } = useLocale();

  const steps = [t('cart.step1'), t('cart.step2'), t('cart.step3')];

  const demoOrder = order || {
    id: 'EJ-2026-001',
    email: 'guest@example.com',
    total: 290,
    items: [
      { name: 'Vienna Philharmonic — Arène × 2', amount: 170 },
      { name: 'Vienna Philharmonic — VIP × 1', amount: 250 },
    ],
    date: '2026-02-14T23:45:00',
  };

  return (
    <AppLayout>
      <Head title={t('checkoutSuccess.title')} />

      <div className="max-container section-padding py-8 lg:py-16">
        <StepsIndicator steps={steps} currentStep={2} className="mb-12" />

        <div className="mx-auto max-w-lg text-center animate-fade-in">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 mb-6">
            <svg className="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-2xl font-display font-bold text-text lg:text-3xl">{t('checkoutSuccess.title')}</h1>
          <p className="mt-2 text-text/60">{t('checkoutSuccess.subtitle')}</p>

          <div className="mt-2 text-sm text-text/50">
            {t('checkoutSuccess.orderNumber', { number: demoOrder.id })}
          </div>
          <p className="mt-1 text-sm text-text/50">
            {t('checkoutSuccess.emailSent', { email: demoOrder.email })}
          </p>

          {/* Order Summary */}
          <div className="mt-8 card p-6 text-start">
            <h3 className="font-semibold text-text mb-4">{t('checkoutSuccess.summary')}</h3>
            <div className="space-y-3">
              {demoOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-text/70">{item.name}</span>
                  <span className="font-medium text-text">{fc(item.amount)}</span>
                </div>
              ))}
              <hr className="border-sandstone/15" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text">{t('event.total')}</span>
                <span className="text-lg font-bold text-gold">{fc(demoOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/account/tickets">{t('checkoutSuccess.viewTickets')}</Button>
            <Button href="/" variant="secondary">{t('checkoutSuccess.backHome')}</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
