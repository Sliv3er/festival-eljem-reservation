import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import LanguageSwitcher from '../Components/LanguageSwitcher';

export default function AuthLayout({ children }) {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-night text-gold transition-transform group-hover:scale-105">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-night">{t('site.name')}</span>
            </Link>
            <LanguageSwitcher compact />
          </div>

          {children}

          {/* Social proof */}
          <div className="mt-12 rounded-xl bg-neutral p-4 text-center">
            <p className="text-xs text-text/50">
              {t('auth.socialProof', { count: '10,000' })}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-night">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/1200px-Amphitheatre_of_El_Jem.jpg"
            alt="Amphitheatre of El Jem"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <blockquote className="text-2xl font-display font-bold text-white leading-relaxed">
              "{t('site.tagline')}"
            </blockquote>
            <p className="mt-4 text-sm text-white/50">{t('home.unescoLabel')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
