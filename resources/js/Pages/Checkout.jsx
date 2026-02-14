import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import StepsIndicator from '../Components/StepsIndicator';
import PriceSummary from '../Components/PriceSummary';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Alert from '../Components/Alert';

export default function Checkout() {
  const { t, fc } = useLocale();
  const { items, subtotal, serviceFees, total } = useCart();
  const steps = [t('cart.step1'), t('cart.step2'), t('cart.step3')];

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!acceptTerms) { setError(t('checkout.errorTerms')); return; }
    setProcessing(true);
    // Simulate payment
    setTimeout(() => {
      setProcessing(false);
      window.location.href = '/checkout/success';
    }, 2000);
  };

  return (
    <AppLayout>
      <Head title={t('checkout.title')} />

      <div className="max-container section-padding py-8 lg:py-12">
        <StepsIndicator steps={steps} currentStep={1} className="mb-10" />

        <h1 className="text-2xl font-bold text-text lg:text-3xl mb-8">{t('checkout.title')}</h1>

        {error && <Alert variant="error" dismissible className="mb-6">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Form */}
            <div className="flex-1 min-w-0 space-y-8">
              {/* Billing */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-text mb-6">{t('checkout.billingDetails')}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label={t('checkout.firstName')}
                    value={form.firstName}
                    onChange={(e) => updateForm('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label={t('checkout.lastName')}
                    value={form.lastName}
                    onChange={(e) => updateForm('lastName', e.target.value)}
                    required
                  />
                  <Input
                    label={t('checkout.email')}
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    required
                  />
                  <Input
                    label={t('checkout.phone')}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                  />
                </div>
              </div>

              {/* Payment — Stripe Placeholder */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-text mb-6">{t('checkout.paymentMethod')}</h2>
                <div className="space-y-4">
                  <div className="rounded-xl border-2 border-dashed border-sandstone/30 bg-neutral/50 p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sandstone/10 mb-4">
                      <svg className="h-6 w-6 text-sandstone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-text/60">Stripe Elements will be mounted here</p>
                    <p className="mt-1 text-xs text-text/40">Secure payment powered by Stripe</p>
                  </div>

                  {/* Placeholder card fields for visual */}
                  <Input label={t('checkout.cardNumber')} placeholder="4242 4242 4242 4242" disabled />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label={t('checkout.expiry')} placeholder="MM/YY" disabled />
                    <Input label={t('checkout.cvc')} placeholder="123" disabled />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-sandstone/30 text-gold focus:ring-gold/20"
                />
                <span className="text-sm text-text/70">
                  {t('checkout.termsLabel', { link: '' })}
                  <a href="#" className="font-medium text-gold hover:underline">{t('checkout.termsLink')}</a>
                </span>
              </label>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="card p-6 space-y-6 lg:sticky lg:top-24">
                <h3 className="font-semibold text-text">{t('checkout.orderSummary')}</h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between text-sm">
                      <span className="text-text/70 line-clamp-1 flex-1 me-3">
                        {item.ticketTypeName} × {item.quantity}
                      </span>
                      <span className="font-medium text-text shrink-0">{fc(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <PriceSummary subtotal={subtotal} fees={serviceFees} total={total} />

                <Button type="submit" className="w-full" loading={processing} disabled={processing}>
                  {processing ? t('checkout.processing') : t('checkout.pay', { amount: fc(total) })}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
