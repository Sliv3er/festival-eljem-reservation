import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import LanguageSwitcher from './LanguageSwitcher';
import MobileDrawer from './MobileDrawer';

export default function Header({ transparent = false }) {
  const { t } = useLocale();
  const { itemCount } = useCart();
  const { auth } = usePage().props;
  const user = auth?.user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dark text mode = solid header (default). Light text = transparent over dark hero.
  const isDark = transparent && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textClass = isDark ? 'text-white/80 hover:text-white' : 'text-text/70 hover:text-text';
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-sandstone/10';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isDark
          ? 'bg-transparent border-b border-transparent'
          : 'backdrop-blur-xl bg-white/90 border-b border-sandstone/10 shadow-sm'
      }`}>
        <div className="max-container section-padding">
          <div className="flex h-14 items-center justify-between lg:h-16">
            {/* Mobile menu */}
            <button
              onClick={() => setDrawerOpen(true)}
              className={`rounded-xl p-2 transition-colors lg:hidden ${textClass} ${hoverBg}`}
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 ${
                isDark ? 'bg-white/15 backdrop-blur-sm text-gold border border-gold/30' : 'bg-night text-gold'
              }`}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21V10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10V21" strokeLinecap="round"/>
                  <path d="M7 21V12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12V21" strokeLinecap="round" opacity="0.6"/>
                  <line x1="3" y1="21" x2="21" y2="21" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={`hidden sm:block font-display text-base font-bold leading-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-night'}`}>
                {t('site.name')}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:items-center lg:gap-0.5" aria-label="Main navigation">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/program', label: t('nav.program') },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${textClass} ${hoverBg}`}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link href="/account/tickets" className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${textClass} ${hoverBg}`}>
                    {t('nav.tickets')}
                  </Link>
                  <Link href="/support" className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 ${textClass} ${hoverBg}`}>
                    {t('nav.support')}
                  </Link>
                </>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              <LanguageSwitcher compact scrolled={!isDark} />

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative rounded-lg p-2 transition-all duration-300 ${textClass} ${hoverBg}`}
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
              <div className="hidden lg:flex lg:items-center lg:gap-1.5">
                {user ? (
                  <div className="relative group">
                    <button className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-300 ${textClass} ${hoverBg}`}>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold ring-2 ring-gold/30">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name?.split(' ')[0]}</span>
                    </button>
                    <div className="invisible absolute end-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl bg-white py-1 opacity-0 shadow-xl ring-1 ring-sandstone/10 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                      <Link href="/account/profile" className="block px-4 py-2 text-sm text-text/80 hover:bg-gold/5 hover:text-gold transition-colors">{t('nav.profile')}</Link>
                      <Link href="/account/orders" className="block px-4 py-2 text-sm text-text/80 hover:bg-gold/5 hover:text-gold transition-colors">{t('nav.orders')}</Link>
                      <Link href="/account/tickets" className="block px-4 py-2 text-sm text-text/80 hover:bg-gold/5 hover:text-gold transition-colors">{t('nav.tickets')}</Link>
                      <hr className="my-1 border-sandstone/10" />
                      <Link href="/logout" method="post" as="button" className="block w-full px-4 py-2 text-start text-sm text-red-600 hover:bg-red-50 transition-colors">{t('nav.logout')}</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${textClass} ${hoverBg}`}>{t('nav.login')}</Link>
                    <Link href="/register" className="btn-primary text-sm !py-1.5 !px-4">{t('nav.register')}</Link>
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
