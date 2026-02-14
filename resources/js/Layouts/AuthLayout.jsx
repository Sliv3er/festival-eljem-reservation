import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import LanguageSwitcher from '../Components/LanguageSwitcher';
import { getImageByCategory } from '../services/ImageService';
import { AmphitheatreArch } from '../Components/Decorations';

export default function AuthLayout({ children }) {
  const { t } = useLocale();
  const bgImage = getImageByCategory('hero');

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 relative">
        {/* Subtle mosaic background */}
        <div className="absolute inset-0 bg-mosaic opacity-30" />

        <div className="relative mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-night text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-gold-glow">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21V10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10V21" strokeLinecap="round"/>
                  <path d="M7 21V12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12V21" strokeLinecap="round" opacity="0.6"/>
                  <line x1="3" y1="21" x2="21" y2="21" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-night">{t('site.name')}</span>
            </Link>
            <LanguageSwitcher compact />
          </div>

          {/* Form card */}
          <div className="card-premium p-8 sm:p-10">
            {children}
          </div>

          {/* Social login placeholders */}
          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-sandstone/20" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-neutral px-4 text-text/40">{t('auth.orContinueWith') || 'Or continue with'}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-sandstone/20 bg-white px-4 py-2.5 text-sm font-medium text-text/60 hover:bg-sandstone/5 hover:border-sandstone/30 transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-sandstone/20 bg-white px-4 py-2.5 text-sm font-medium text-text/60 hover:bg-sandstone/5 hover:border-sandstone/30 transition-all duration-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-8 rounded-2xl bg-gold/5 border border-gold/10 p-4 text-center">
            <p className="text-xs text-text/50">
              🏛️ {t('auth.socialProof', { count: '10,000' })}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-night">
          <img
            src={bgImage.url}
            alt="Amphitheatre of El Jem"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/60 to-transparent" />

          {/* Decorative arch */}
          <div className="absolute top-20 right-20 opacity-10">
            <AmphitheatreArch width={200} height={133} color="#D6B25E" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-12">
            <blockquote className="text-3xl font-display font-bold text-white leading-relaxed max-w-lg">
              <span className="text-gold-gradient">"{t('site.tagline')}"</span>
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10 max-w-[60px]" />
              <p className="text-sm text-white/40">{t('home.unescoLabel')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
