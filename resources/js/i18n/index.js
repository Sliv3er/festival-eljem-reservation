import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const translations = { en, fr, ar };

export const LOCALES = [
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
];

export const DEFAULT_LOCALE = 'fr';

/**
 * Get a nested translation by dot path, e.g. "nav.home"
 * Supports interpolation: "Hello {name}" with vars { name: "World" }
 */
export function getTranslation(locale, path, vars = {}) {
  const keys = path.split('.');
  let value = translations[locale] || translations[DEFAULT_LOCALE];

  for (const key of keys) {
    if (value == null) return path;
    value = value[key];
  }

  if (value == null) {
    // Fallback to default locale
    let fallback = translations[DEFAULT_LOCALE];
    for (const key of keys) {
      if (fallback == null) return path;
      fallback = fallback[key];
    }
    value = fallback;
  }

  if (typeof value !== 'string') return value ?? path;

  // Interpolate variables
  return value.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

/**
 * Format currency for the given locale
 */
export function formatCurrency(amount, locale = 'fr') {
  const num = Number(amount);
  if (isNaN(num)) return amount;

  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-TN' : 'fr-TN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);

  const symbol = locale === 'ar' ? 'د.ت' : 'DT';
  return locale === 'ar' ? `${formatted} ${symbol}` : `${formatted} ${symbol}`;
}

/**
 * Format date for the given locale
 */
export function formatDate(dateStr, locale = 'fr', options = {}) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const loc = locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-GB' : 'fr-FR';
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat(loc, { ...defaults, ...options }).format(date);
}

/**
 * Format time for the given locale
 */
export function formatTime(dateStr, locale = 'fr') {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const loc = locale === 'ar' ? 'ar-TN' : locale === 'en' ? 'en-GB' : 'fr-FR';
  return new Intl.DateTimeFormat(loc, { hour: '2-digit', minute: '2-digit' }).format(date);
}

export function getDirection(locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export default translations;
