import { useEffect } from 'react';
import useLocale from '../hooks/useLocale';

export default function QRPreview({ ticket, onClose }) {
  const { t } = useLocale();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Generate a simple SVG QR-like pattern (UI placeholder)
  const generateQRPattern = () => {
    const size = 21;
    const cells = [];
    // Create a deterministic pattern from ticket id
    const seed = (ticket.id || 'ticket').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Position detection patterns (corners)
        const isFinderPattern =
          (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
        const isFinderBorder =
          isFinderPattern &&
          (x === 0 || y === 0 || x === 6 || y === 6 || x === size - 1 || y === size - 1 || x === size - 7 || y === size - 7);
        const isFinderInner =
          isFinderPattern &&
          ((x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
           (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) ||
           (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3));

        const isFilled =
          isFinderBorder || isFinderInner ||
          (!isFinderPattern && ((seed * (x + 1) * (y + 1) + x * 7 + y * 13) % 3 === 0));

        if (isFilled) {
          cells.push(
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className="fill-night" />
          );
        }
      }
    }
    return cells;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm animate-slide-up rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute end-4 top-4 rounded-lg p-2 text-text/40 transition-colors hover:bg-sandstone/10 hover:text-text"
          aria-label={t('tickets.close')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-text">{t('tickets.qrTitle')}</h3>
          <p className="mt-1 text-sm text-text/60">{ticket.eventTitle}</p>
        </div>

        {/* QR Code */}
        <div className="mx-auto mt-6 flex items-center justify-center rounded-2xl border-2 border-sandstone/15 bg-white p-6">
          <svg viewBox="0 0 21 21" className="h-48 w-48">
            {generateQRPattern()}
          </svg>
        </div>

        <p className="mt-4 text-center text-xs text-text/50">{t('tickets.qrInstructions')}</p>

        <div className="mt-4 rounded-xl bg-neutral p-3 text-center">
          <p className="text-xs text-text/50">{t('tickets.zone')}: <span className="font-semibold text-text">{ticket.zone}</span></p>
          {ticket.seat && <p className="text-xs text-text/50 mt-1">{t('tickets.seat')}: <span className="font-semibold text-text">{ticket.seat}</span></p>}
        </div>
      </div>
    </div>
  );
}
