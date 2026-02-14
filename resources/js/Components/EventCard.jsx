import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import Badge from './Badge';

export default function EventCard({ event }) {
  const { t, fc, fd, ft } = useLocale();

  const isSoldOut = event.availability === 'sold_out';
  const isAlmostSoldOut = event.availability === 'almost_sold_out';

  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-night shadow-sm transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
      <Link href={`/events/${event.id}`} className="block">
        {/* Full image background */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Date badge - floating top left */}
          <div className="absolute top-4 start-4">
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-3 py-2 shadow-lg text-center min-w-[52px] transition-transform duration-300 group-hover:scale-110">
              <div className="text-xl font-display font-extrabold text-night leading-none">{day}</div>
              <div className="text-[10px] font-bold text-gold uppercase tracking-wider mt-0.5">{month}</div>
            </div>
          </div>

          {/* Status badges */}
          <div className="absolute top-4 end-4 flex flex-col gap-2">
            {isSoldOut && <Badge variant="soldOut">{t('program.soldOut')}</Badge>}
            {isAlmostSoldOut && <Badge variant="warning" dot>{t('program.almostSoldOut')}</Badge>}
          </div>

          {/* Content at bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="text-lg font-display font-bold text-white leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-300">
              {event.title}
            </h3>
            {event.orchestra && (
              <p className="mt-1 text-sm text-white/50 line-clamp-1">{event.orchestra}</p>
            )}
            <p className="mt-1 text-xs text-white/30">{ft(event.date)}</p>

            <div className="mt-4 flex items-center justify-between gap-3">
              {!isSoldOut && (
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-white/40">{t('program.from') || 'From'}</span>
                  <span className="text-lg font-bold text-gold">{fc(event.priceFrom)}</span>
                </div>
              )}
              <div className="flex-shrink-0">
                {!isSoldOut ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-night transition-all duration-300 group-hover:shadow-gold-glow group-hover:bg-gold-light">
                    {t('program.buyNow')}
                    <svg className="h-3.5 w-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                ) : (
                  <span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white/40">
                    {t('program.soldOut')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
