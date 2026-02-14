import { useState } from 'react';
import useLocale from '../hooks/useLocale';
import Badge from './Badge';
import QRPreview from './QRPreview';

export default function TicketCard({ ticket }) {
  const { t, fd, ft } = useLocale();
  const [showQr, setShowQr] = useState(false);

  const isValid = ticket.status === 'valid';

  return (
    <>
      <div className={`card overflow-hidden ${!isValid ? 'opacity-70' : ''}`}>
        <div className="flex flex-col sm:flex-row">
          {/* Left accent */}
          <div className={`w-full sm:w-2 shrink-0 ${isValid ? 'bg-gold' : 'bg-text/20'}`} />

          {/* Image */}
          <div className="relative hidden sm:block sm:w-40 shrink-0">
            <img
              src={ticket.eventImage}
              alt={ticket.eventTitle}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-text">{ticket.eventTitle}</h3>
                <p className="mt-1 text-sm text-text/60">
                  {fd(ticket.eventDate)} • {ft(ticket.eventDate)}
                </p>
              </div>
              <Badge variant={isValid ? 'success' : 'neutral'} dot>
                {isValid ? t('tickets.statusValid') : t('tickets.statusUsed')}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-text/60">
              <span>{t('tickets.zone')}: <span className="font-medium text-text">{ticket.zone}</span></span>
              {ticket.seat && <span>{t('tickets.seat')}: <span className="font-medium text-text">{ticket.seat}</span></span>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {isValid && (
                <>
                  <button
                    onClick={() => setShowQr(true)}
                    className="btn-ghost px-3 py-1.5 text-sm"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                    </svg>
                    {t('tickets.showQr')}
                  </button>
                  <button className="btn-ghost px-3 py-1.5 text-sm">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {t('tickets.downloadPdf')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showQr && (
        <QRPreview ticket={ticket} onClose={() => setShowQr(false)} />
      )}
    </>
  );
}
