import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import LanguageSwitcher from './LanguageSwitcher';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const { t } = useLocale();
  const { itemCount } = useCart();
  const { auth } = usePage().props;
  const user = auth?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky-header">
        <div className="max-container section-padding">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Mobile menu button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-lg p-2 text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-night text-gold transition-transform group-hover:scale-105">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-lg font-bold leading-tight text-night">{t('site.name')}</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text"
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/program"
                className="rounded-lg px-4 py-2 text-sm font-medium text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text"
              >
                {t('nav.program')}
              </Link>
              {user && (
                <>
                  <Link
                    href="/account/tickets"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text"
                  >
                    {t('nav.tickets')}
                  </Link>
                  <Link
                    href="/support"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text"
                  >
                    {t('nav.support')}
                  </Link>
                </>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher compact />

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-lg p-2 text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text"
                aria-label={`${t('nav.cart')} (${itemCount})`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-night">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              <div className="hidden lg:flex lg:items-center lg:gap-2">
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text/70 transition-colors hover:bg-sandstone/10 hover:text-text">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sandstone/20 text-xs font-bold text-sandstone-dark">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name?.split(' ')[0]}</span>
                    </button>
                    <div className="invisible absolute end-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl bg-white py-1 opacity-0 shadow-lg ring-1 ring-sandstone/10 transition-all group-hover:visible group-hover:opacity-100">
                      <Link href="/account/profile" className="block px-4 py-2.5 text-sm text-text/80 hover:bg-sandstone/10">{t('nav.profile')}</Link>
                      <Link href="/account/orders" className="block px-4 py-2.5 text-sm text-text/80 hover:bg-sandstone/10">{t('nav.orders')}</Link>
                      <Link href="/account/tickets" className="block px-4 py-2.5 text-sm text-text/80 hover:bg-sandstone/10">{t('nav.tickets')}</Link>
                      <hr className="my-1 border-sandstone/10" />
                      <Link href="/logout" method="post" as="button" className="block w-full px-4 py-2.5 text-start text-sm text-red-600 hover:bg-red-50">{t('nav.logout')}</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="btn-ghost text-sm">{t('nav.login')}</Link>
                    <Link href="/register" className="btn-primary text-sm">{t('nav.register')}</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} user={user} />
    </>
  );
}
