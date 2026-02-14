import { Head, Link } from '@inertiajs/react';
import AccountLayout from '../../Layouts/AccountLayout';
import useLocale from '../../hooks/useLocale';
import Badge from '../../Components/Badge';
import PriceSummary from '../../Components/PriceSummary';

export default function OrderDetail({ order: propOrder }) {
  const { t, fc, fd } = useLocale();

  const order = propOrder || {
    id: 'EJ-2026-001',
    date: '2026-02-14T20:00:00',
    status: 'paid',
    subtotal: 275.24,
    fees: 14.76,
    total: 290,
    payment: { method: 'Visa ending in 4242', date: '2026-02-14T20:01:00' },
    tickets: [
      { id: 't1', eventTitle: 'Vienna Philharmonic — Mozart & Beethoven', zone: 'Arène', quantity: 2, unitPrice: 85, eventDate: '2026-07-18T21:00:00' },
      { id: 't2', eventTitle: 'Vienna Philharmonic — Mozart & Beethoven', zone: 'VIP Lounge', quantity: 1, unitPrice: 250, eventDate: '2026-07-18T21:00:00' },
    ],
  };

  const statusVariant = { pending: 'warning', paid: 'success', failed: 'danger', expired: 'neutral' };

  return (
    <AccountLayout>
      <Head title={t('account.orderDetail')} />

      <div className="max-w-2xl">
        <Link href="/account/orders" className="inline-flex items-center gap-1.5 text-sm text-text/60 hover:text-gold transition-colors mb-6">
          <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {t('common.back')}
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-bold text-text">{t('account.orderNumber', { number: order.id })}</h2>
          <Badge variant={statusVariant[order.status]} dot>
            {t(`account.status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
          </Badge>
        </div>

        {/* Tickets */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-text mb-4">{t('account.tickets')}</h3>
          <div className="space-y-4">
            {order.tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between py-3 border-b border-sandstone/10 last:border-0">
                <div>
                  <p className="font-medium text-text text-sm">{ticket.eventTitle}</p>
                  <p className="text-xs text-text/50 mt-0.5">{ticket.zone} × {ticket.quantity} — {fd(ticket.eventDate)}</p>
                </div>
                <span className="font-semibold text-text text-sm">{fc(ticket.unitPrice * ticket.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-text mb-4">{t('account.paymentInfo')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text/60">{t('checkout.paymentMethod')}</span>
              <span className="text-text">{order.payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text/60">{t('program.date')}</span>
              <span className="text-text">{fd(order.payment.date)}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6">
          <PriceSummary subtotal={order.subtotal} fees={order.fees} total={order.total} />
        </div>
      </div>
    </AccountLayout>
  );
}
