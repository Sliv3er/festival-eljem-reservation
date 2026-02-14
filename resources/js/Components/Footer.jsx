import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white/80">
      <div className="max-container section-padding py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-lg font-bold text-white">{t('site.name')}</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {t('site.fullName')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">{t('nav.program')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/program" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('program.title')}
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('nav.support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">{t('nav.account')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/login" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('nav.login')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('nav.register')}
                </Link>
              </li>
              <li>
                <Link href="/account/tickets" className="text-sm text-white/60 transition-colors hover:text-gold">
                  {t('nav.tickets')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">{t('nav.support')}</h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/60">
                Amphithéâtre d'El Jem<br />El Jem, Tunisia
              </li>
              <li>
                <a href="mailto:contact@eljem-festival.tn" className="text-sm text-white/60 transition-colors hover:text-gold">
                  contact@eljem-festival.tn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/40">
            {t('site.copyright', { year })}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40 flex items-center gap-1.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              {t('home.unescoLabel')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
