import { Head, Link } from '@inertiajs/react';
import AccountLayout from '../../Layouts/AccountLayout';
import useLocale from '../../hooks/useLocale';
import Badge from '../../Components/Badge';
import EmptyState from '../../Components/EmptyState';

const statusVariant = {
  pending: 'warning',
  paid: 'success',
  failed: 'danger',
  expired: 'neutral',
};

export default function Orders({ orders: propOrders }) {
  const { t, fc, fd } = useLocale();

  const orders = propOrders || [
    { id: 'EJ-2026-001', date: '2026-02-14T20:00:00', status: 'paid', total: 290 },
    { id: 'EJ-2026-002', date: '2026-01-20T14:30:00', status: 'pending', total: 85 },
    { id: 'EJ-2025-015', date: '2025-08-10T18:00:00', status: 'expired', total: 120 },
  ];

  return (
    <AccountLayout>
      <Head title={t('account.ordersTitle')} />

      <h2 className="text-xl font-bold text-text mb-6">{t('account.ordersTitle')}</h2>

      {orders.length === 0 ? (
        <EmptyState
          title={t('account.noOrders')}
          description={t('account.noOrdersText')}
          actionLabel={t('home.viewProgram')}
          actionHref="/program"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-text">{t('account.orderNumber', { number: order.id })}</h3>
                  <p className="text-sm text-text/50 mt-0.5">{t('account.orderDate', { date: fd(order.date) })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={statusVariant[order.status]} dot>
                    {t(`account.status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`)}
                  </Badge>
                  <span className="font-semibold text-text">{fc(order.total)}</span>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="text-sm font-medium text-gold hover:text-gold-light transition-colors"
                  >
                    {t('account.viewOrder')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
