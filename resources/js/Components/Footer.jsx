import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import { AmphitheatreArch } from './Decorations';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night text-white/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03]">
        <AmphitheatreArch width={800} height={533} color="#D6B25E" />
      </div>
      <div className="absolute inset-0 bg-mosaic opacity-20" />

      <div className="relative max-container section-padding pt-20 pb-8">
        {/* Top section: Brand + Newsletter */}
        <div className="grid gap-12 lg:grid-cols-2 items-start mb-16 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20">
                <svg className="h-7 w-7 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21V10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10V21" strokeLinecap="round"/>
                  <path d="M7 21V12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12V21" strokeLinecap="round" opacity="0.6"/>
                  <line x1="3" y1="21" x2="21" y2="21" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white">{t('site.name')}</div>
                <div className="text-xs text-white/40">{t('site.fullName')}</div>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              The world's most spectacular open-air classical music festival, held in the UNESCO World Heritage amphitheatre of El Jem, Tunisia.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a key={social} href="#" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all duration-300 hover:bg-gold/10 hover:text-gold border border-white/10 hover:border-gold/20">
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:text-end">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-3">{t('home.stayTuned') || 'Stay Tuned'}</h3>
            <p className="text-sm text-white/40 mb-4">{t('home.newsletterText') || 'Get early access to tickets and exclusive updates.'}</p>
            <form className="flex gap-2 lg:justify-end" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold/30 focus:ring-1 focus:ring-gold/20 focus:outline-none transition-colors w-full max-w-xs"
              />
              <button className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-night hover:bg-gold-light transition-all duration-300 hover:shadow-gold-glow shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('nav.program')}</h3>
            <ul className="space-y-3">
              <li><Link href="/program" className="text-sm text-white/50 transition-colors hover:text-gold">{t('program.title')}</Link></li>
              <li><Link href="/support/faq" className="text-sm text-white/50 transition-colors hover:text-gold">{t('nav.faq')}</Link></li>
              <li><Link href="/support" className="text-sm text-white/50 transition-colors hover:text-gold">{t('nav.support')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('nav.account')}</h3>
            <ul className="space-y-3">
              <li><Link href="/login" className="text-sm text-white/50 transition-colors hover:text-gold">{t('nav.login')}</Link></li>
              <li><Link href="/register" className="text-sm text-white/50 transition-colors hover:text-gold">{t('nav.register')}</Link></li>
              <li><Link href="/account/tickets" className="text-sm text-white/50 transition-colors hover:text-gold">{t('nav.tickets')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-white/50 transition-colors hover:text-gold">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-white/50 transition-colors hover:text-gold">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-white/50 transition-colors hover:text-gold">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t('nav.support')}</h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/50">
                Amphithéâtre d'El Jem<br/>El Jem 5160, Tunisia
              </li>
              <li>
                <a href="mailto:contact@eljem-festival.tn" className="text-sm text-white/50 transition-colors hover:text-gold">
                  contact@eljem-festival.tn
                </a>
              </li>
              <li>
                <a href="tel:+21673630000" className="text-sm text-white/50 transition-colors hover:text-gold">
                  +216 73 630 000
                </a>
              </li>
            </ul>

            {/* Map placeholder */}
            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 h-24 flex items-center justify-center text-xs text-white/20">
              📍 Map
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/30">
            {t('site.copyright', { year })}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30 flex items-center gap-1.5">
              🏛️ {t('home.unescoLabel')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
