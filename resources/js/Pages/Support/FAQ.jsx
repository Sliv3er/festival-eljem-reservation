import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import useLocale from '../../hooks/useLocale';
import { getTranslation } from '../../i18n';

export default function FAQ() {
  const { t, locale } = useLocale();
  const [openIndex, setOpenIndex] = useState(null);

  const items = getTranslation(locale, 'faq.items') || [];

  return (
    <AppLayout>
      <Head title={t('faq.title')} />

      <div className="bg-night py-16">
        <div className="max-container section-padding text-center">
          <h1 className="text-3xl font-display font-bold text-white lg:text-4xl">{t('faq.title')}</h1>
          <p className="mt-3 text-white/60">{t('faq.subtitle')}</p>
        </div>
      </div>

      <div className="max-container section-padding py-12">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-3">
            {Array.isArray(items) && items.map((item, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-start text-sm font-medium text-text hover:bg-sandstone/5 transition-colors"
                  aria-expanded={openIndex === i}
                >
                  <span>{item.q}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-text/40 transition-transform duration-200 ms-4 ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-sm text-text/70 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-text/60 mb-4">
              {locale === 'ar' ? 'لم تجد إجابة؟' : locale === 'en' ? "Didn't find your answer?" : "Vous n'avez pas trouvé votre réponse ?"}
            </p>
            <Link href="/support" className="btn-primary">
              {t('support.newRequest')}
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
