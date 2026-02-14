import { useState } from 'react';
import useLocale from '../hooks/useLocale';

export default function NewsletterForm() {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-text">{t('home.newsletter')}</h3>
      <p className="mt-2 text-sm text-text/60">{t('home.newsletterText')}</p>

      {submitted ? (
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 animate-fade-in">
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('home.subscribeSuccess')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('home.emailPlaceholder')}
            required
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary shrink-0 px-6">
            {t('home.subscribe')}
          </button>
        </form>
      )}
    </div>
  );
}
