import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import useLocale from '../../hooks/useLocale';
import Badge from '../../Components/Badge';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

export default function RequestDetail({ request: propRequest }) {
  const { t, fd, ft } = useLocale();
  const [reply, setReply] = useState('');

  const request = propRequest || {
    id: 'SR-001',
    subject: 'Cannot download my tickets',
    category: 'technical',
    status: 'in_progress',
    date: '2026-02-10T14:00:00',
    messages: [
      { id: 1, from: 'user', text: 'I purchased tickets for the Vienna Philharmonic concert but the PDF download button does not work. I get a blank page.', date: '2026-02-10T14:00:00' },
      { id: 2, from: 'support', text: 'Thank you for reaching out. We are looking into this issue. Could you please tell us which browser you are using?', date: '2026-02-10T15:30:00' },
      { id: 3, from: 'user', text: 'I am using Chrome on Windows 11.', date: '2026-02-10T16:00:00' },
    ],
  };

  const statusVariant = { open: 'info', in_progress: 'warning', resolved: 'success', closed: 'neutral' };

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setReply('');
  };

  return (
    <AppLayout>
      <Head title={`${t('support.title')} — ${request.id}`} />

      <div className="max-container section-padding py-8 lg:py-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/support" className="inline-flex items-center gap-1.5 text-sm text-text/60 hover:text-gold transition-colors mb-6">
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('common.back')}
          </Link>

          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-bold text-text">{request.subject}</h1>
              <p className="text-sm text-text/50 mt-1">{request.id} • {fd(request.date)}</p>
            </div>
            <Badge variant={statusVariant[request.status]} dot>
              {t(`support.status${request.status === 'in_progress' ? 'InProgress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}`)}
            </Badge>
          </div>

          {/* Conversation */}
          <div className="card p-6">
            <h3 className="font-semibold text-text mb-6">{t('support.conversation')}</h3>

            <div className="space-y-6">
              {request.messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.from === 'user' ? '' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    msg.from === 'user' ? 'bg-sandstone/20 text-sandstone-dark' : 'bg-gold/20 text-gold'
                  }`}>
                    {msg.from === 'user' ? 'U' : 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-text">
                        {msg.from === 'user' ? t('support.you') : t('support.supportTeam')}
                      </span>
                      <span className="text-xs text-text/40">{fd(msg.date)} {ft(msg.date)}</span>
                    </div>
                    <p className="text-sm text-text/80 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply */}
            {request.status !== 'closed' && request.status !== 'resolved' && (
              <form onSubmit={handleReply} className="mt-8 border-t border-sandstone/10 pt-6">
                <Input
                  type="textarea"
                  placeholder={t('support.reply')}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="mb-3"
                />
                <Button type="submit" size="sm" disabled={!reply.trim()}>
                  {t('support.sendReply')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
