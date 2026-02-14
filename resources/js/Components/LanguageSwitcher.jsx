import { useState, useRef, useEffect } from 'react';
import useLocale from '../hooks/useLocale';

export default function LanguageSwitcher({ compact = false }) {
  const { locale, setLocale, locales } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = locales.find((l) => l.code === locale);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-text/80 transition-colors hover:bg-sandstone/10 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        {!compact && <span>{current?.label}</span>}
        {compact && <span>{locale.toUpperCase()}</span>}
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute end-0 top-full z-50 mt-1 min-w-[160px] overflow-hidden rounded-xl bg-white py-1 shadow-lg shadow-night/10 ring-1 ring-sandstone/10 animate-fade-in"
          role="listbox"
          aria-label="Select language"
        >
          {locales.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === locale}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-sandstone/10 ${
                l.code === locale ? 'bg-gold/5 font-semibold text-gold' : 'text-text/80'
              }`}
            >
              <span className="text-base">{l.code === 'fr' ? '🇫🇷' : l.code === 'en' ? '🇬🇧' : '🇹🇳'}</span>
              <span>{l.label}</span>
              {l.code === locale && (
                <svg className="ms-auto h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
