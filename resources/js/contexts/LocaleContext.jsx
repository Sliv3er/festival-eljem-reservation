import { createContext, useState, useEffect, useCallback } from 'react';
import { getTranslation, formatCurrency, formatDate, formatTime, getDirection, LOCALES, DEFAULT_LOCALE } from '../i18n';

export const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('eljem_locale') || DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  });

  const dir = getDirection(locale);
  const isRtl = dir === 'rtl';

  useEffect(() => {
    localStorage.setItem('eljem_locale', locale);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);
    if (locale === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, [locale, dir]);

  const setLocale = useCallback((newLocale) => {
    if (LOCALES.find((l) => l.code === newLocale)) {
      setLocaleState(newLocale);
    }
  }, []);

  const t = useCallback((path, vars) => getTranslation(locale, path, vars), [locale]);
  const fc = useCallback((amount) => formatCurrency(amount, locale), [locale]);
  const fd = useCallback((dateStr, opts) => formatDate(dateStr, locale, opts), [locale]);
  const ft = useCallback((dateStr) => formatTime(dateStr, locale), [locale]);

  const value = {
    locale,
    setLocale,
    dir,
    isRtl,
    t,
    fc,
    fd,
    ft,
    locales: LOCALES,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
