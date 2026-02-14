import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import useLocale from '../../hooks/useLocale';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Badge from '../../Components/Badge';
import Alert from '../../Components/Alert';
import EmptyState from '../../Components/EmptyState';

const statusVariant = { open: 'info', in_progress: 'warning', resolved: 'success', closed: 'neutral' };

export default function SupportIndex({ requests: propRequests }) {
  const { t, fd } = useLocale();

  const [form, setForm] = useState({ subject: '', category: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const requests = propRequests || [
    { id: 'SR-001', subject: 'Cannot download my tickets', category: 'technical', status: 'in_progress', date: '2026-02-10T14:00:00' },
    { id: 'SR-002', subject: 'Wrong name on ticket', category: 'order', status: 'resolved', date: '2026-01-28T09:30:00' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ subject: '', category: 'general', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <AppLayout>
      <Head title={t('support.title')} />

      <div className="max-container section-padding py-8 lg:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text lg:text-3xl">{t('support.title')}</h1>
          <Link href="/support/faq" className="btn-ghost text-sm text-gold">
            {t('nav.faq')}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Request */}
          <div>
            <h2 className="text-lg font-semibold text-text mb-4">{t('support.createRequest')}</h2>

            {submitted && <Alert variant="success" dismissible className="mb-4">{t('support.submitted')}</Alert>}

            <form onSubmit={handleSubmit} className="card p-6 space-y-5">
              <Input
                label={t('support.subject')}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <Input
                label={t('support.category')}
                type="select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="general">{t('support.categoryGeneral')}</option>
                <option value="order">{t('support.categoryOrder')}</option>
                <option value="technical">{t('support.categoryTechnical')}</option>
                <option value="refund">{t('support.categoryRefund')}</option>
              </Input>
              <Input
                label={t('support.message')}
                type="textarea"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              <Button type="submit">{t('support.submit')}</Button>
            </form>
          </div>

          {/* Previous Requests */}
          <div>
            <h2 className="text-lg font-semibold text-text mb-4">{t('support.previousRequests')}</h2>

            {requests.length === 0 ? (
              <EmptyState
                title={t('support.noRequests')}
                description={t('support.noRequestsText')}
              />
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <Link key={req.id} href={`/support/${req.id}`} className="card p-5 block hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium text-text text-sm">{req.subject}</h3>
                        <p className="text-xs text-text/50 mt-1">{req.id} • {fd(req.date)}</p>
                      </div>
                      <Badge variant={statusVariant[req.status]} dot>
                        {t(`support.status${req.status === 'in_progress' ? 'InProgress' : req.status.charAt(0).toUpperCase() + req.status.slice(1)}`)}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
