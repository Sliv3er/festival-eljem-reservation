import { Link } from '@inertiajs/react';
import useLocale from '../hooks/useLocale';
import Badge from './Badge';

export default function EventCard({ event }) {
  const { t, fc, fd, ft } = useLocale();

  const isSoldOut = event.availability === 'sold_out';
  const isAlmostSoldOut = event.availability === 'almost_sold_out';

  return (
    <article className="card group">
      <Link href={`/events/${event.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-sandstone/10">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-wrap gap-2">
            {isSoldOut && <Badge variant="soldOut">{t('program.soldOut')}</Badge>}
            {isAlmostSoldOut && <Badge variant="warning" dot>{t('program.almostSoldOut')}</Badge>}
          </div>

          {/* Date overlay */}
          <div className="absolute bottom-3 start-3">
            <div className="rounded-lg bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-sm">
              <div className="text-xs font-semibold text-gold">{fd(event.date, { month: 'short', day: 'numeric' })}</div>
              <div className="text-[10px] text-text/60">{ft(event.date)}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-semibold text-text leading-snug line-clamp-2 group-hover:text-gold transition-colors">
            {event.title}
          </h3>
          {event.orchestra && (
            <p className="mt-1.5 text-sm text-text/60 line-clamp-1">{event.orchestra}</p>
          )}

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              {!isSoldOut && (
                <p className="text-sm text-text/50">{t('program.fromPrice', { price: fc(event.priceFrom) })}</p>
              )}
            </div>
            {!isSoldOut ? (
              <span className="btn-primary px-4 py-2 text-sm">
                {t('program.buyNow')}
              </span>
            ) : (
              <span className="rounded-lg bg-neutral px-4 py-2 text-sm font-medium text-text/40">
                {t('program.soldOut')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
