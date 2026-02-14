import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileDrawer({ open, onClose, user }) {
  const { t } = useLocale();
  const { itemCount } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/program', label: t('nav.program') },
    { href: '/cart', label: t('nav.cart'), badge: itemCount },
    ...(user
      ? [
          { href: '/account/tickets', label: t('nav.tickets') },
          { href: '/account/orders', label: t('nav.orders') },
          { href: '/account/profile', label: t('nav.profile') },
          { href: '/support', label: t('nav.support') },
        ]
      : []),
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-night/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 start-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sandstone/10 px-6 py-4">
            <span className="font-display text-lg font-bold text-night">{t('site.name')}</span>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-text/60 transition-colors hover:bg-sandstone/10 hover:text-text"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-text/80 transition-colors hover:bg-sandstone/10 hover:text-text"
                  >
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-xs font-bold text-night">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-sandstone/10 px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
            </div>
            {!user ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="btn-secondary flex-1 text-center text-sm"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="btn-primary flex-1 text-center text-sm"
                >
                  {t('nav.register')}
                </Link>
              </div>
            ) : (
              <Link
                href="/logout"
                method="post"
                as="button"
                onClick={onClose}
                className="btn-ghost w-full text-sm text-red-600 hover:bg-red-50"
              >
                {t('nav.logout')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
