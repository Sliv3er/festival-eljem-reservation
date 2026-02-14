import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import EventCard from '../Components/EventCard';
import SkeletonCard from '../Components/SkeletonCard';
import EmptyState from '../Components/EmptyState';
import ErrorState from '../Components/ErrorState';
import Button from '../Components/Button';
import { getImageByCategory } from '../services/ImageService';
import { AmphitheatreArch } from '../Components/Decorations';

export default function Program({ events: propEvents, filters: propFilters, pagination }) {
  const { t, fc } = useLocale();

  const [loading] = useState(false);
  const [error] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const heroImg = getImageByCategory('hero');
  const extImg = getImageByCategory('exterior');
  const intImg = getImageByCategory('interior');
  const panImg = getImageByCategory('panorama');
  const detImg = getImageByCategory('detail');
  const aerImg = getImageByCategory('aerial');

  const demoEvents = propEvents || [
    { id: 1, title: 'Orchestre Symphonique de Tunis — Ouverture', orchestra: 'Orchestre Symphonique de Tunis', date: '2026-07-15T20:30:00', image: heroImg.url, priceFrom: 45, availability: 'available' },
    { id: 2, title: 'Vienna Philharmonic — Mozart & Beethoven', orchestra: 'Vienna Philharmonic', date: '2026-07-18T21:00:00', image: extImg.url, priceFrom: 120, availability: 'almost_sold_out' },
    { id: 3, title: 'Nuit du Piano — Lang Lang', orchestra: 'Solo Recital', date: '2026-07-22T20:00:00', image: intImg.url, priceFrom: 85, availability: 'available' },
    { id: 4, title: 'Berlin Philharmonic — Mahler Symphony No. 5', orchestra: 'Berlin Philharmonic', date: '2026-07-25T20:30:00', image: panImg.url, priceFrom: 150, availability: 'sold_out' },
    { id: 5, title: 'London Symphony Orchestra — Tchaikovsky', orchestra: 'LSO', date: '2026-07-28T21:00:00', image: detImg.url, priceFrom: 90, availability: 'available' },
    { id: 6, title: 'Orchestre de Paris — Ravel & Debussy', orchestra: 'Orchestre de Paris', date: '2026-08-01T20:30:00', image: aerImg.url, priceFrom: 75, availability: 'available' },
  ];

  const hasActiveFilters = dateFilter || priceFilter || artistFilter || availabilityFilter;
  const clearFilters = () => { setDateFilter(''); setPriceFilter(''); setArtistFilter(''); setAvailabilityFilter(''); };

  const currentPage = pagination?.current_page || 1;
  const totalPages = pagination?.last_page || 1;

  const filterOptions = [
    { key: 'date', value: dateFilter, onChange: setDateFilter, options: [
      { value: '', label: t('program.allDates') },
      { value: '2026-07-15', label: '15 Jul' },
      { value: '2026-07-18', label: '18 Jul' },
      { value: '2026-07-22', label: '22 Jul' },
      { value: '2026-07-25', label: '25 Jul' },
      { value: '2026-07-28', label: '28 Jul' },
      { value: '2026-08-01', label: '1 Aug' },
    ]},
    { key: 'price', value: priceFilter, onChange: setPriceFilter, options: [
      { value: '', label: t('program.allPrices') },
      { value: '0-50', label: '< 50 DT' },
      { value: '50-100', label: '50-100 DT' },
      { value: '100+', label: '100+ DT' },
    ]},
    { key: 'artist', value: artistFilter, onChange: setArtistFilter, options: [
      { value: '', label: t('program.allArtists') },
      { value: 'ost', label: 'OST' },
      { value: 'vienna', label: 'Vienna Phil.' },
      { value: 'berlin', label: 'Berlin Phil.' },
      { value: 'lso', label: 'LSO' },
    ]},
    { key: 'availability', value: availabilityFilter, onChange: setAvailabilityFilter, options: [
      { value: '', label: t('program.allAvailability') },
      { value: 'available', label: t('program.available') },
      { value: 'sold_out', label: t('program.soldOut') },
    ]},
  ];

  return (
    <AppLayout>
      <Head title={t('program.title')} />

      {/* Hero Banner */}
      <div className="relative bg-night py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mosaic opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
          <AmphitheatreArch width={500} height={330} color="#D6B25E" />
        </div>
        <div className="relative max-container section-padding text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold/60 mb-3">{t('home.season') || 'Season 2026'}</p>
          <h1 className="text-4xl font-display font-extrabold text-white lg:text-5xl">{t('program.title')}</h1>
          <p className="mt-3 text-white/50 max-w-lg mx-auto">{t('program.subtitle')}</p>
        </div>
      </div>

      <div className="max-container section-padding py-8">
        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 bg-neutral/95 backdrop-blur-lg border-b border-sandstone/10 mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {/* Filter pills */}
            {filterOptions.map((filter) => (
              <select
                key={filter.key}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className={`appearance-none rounded-full px-4 py-2 text-sm font-medium border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  filter.value
                    ? 'bg-gold/10 border-gold/30 text-gold'
                    : 'bg-white border-sandstone/20 text-text/60 hover:border-sandstone/40'
                }`}
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ))}

            {hasActiveFilters && (
              <button onClick={clearFilters} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors whitespace-nowrap">
                ✕ {t('program.clearFilters')}
              </button>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* View toggle */}
            <div className="hidden sm:flex items-center gap-1 rounded-full bg-white border border-sandstone/20 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-full p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gold/10 text-gold' : 'text-text/40 hover:text-text/60'}`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-full p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gold/10 text-gold' : 'text-text/40 hover:text-text/60'}`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <ErrorState title={t('program.errorLoading')} onRetry={() => {}} />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : demoEvents.length === 0 ? (
          <EmptyState
            title={t('program.noEvents')}
            description={t('program.noEventsText')}
            actionLabel={t('program.clearFilters')}
            onAction={clearFilters}
          />
        ) : (
          <>
            <div className={`transition-all duration-500 ${
              viewMode === 'grid'
                ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
            }`}>
              {demoEvents.map((event) => (
                <div key={event.id} className="animate-fade-in">
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button variant="ghost" size="sm" disabled={currentPage <= 1}>
                  {t('program.previous')}
                </Button>
                <span className="text-sm text-text/60">
                  {t('program.page', { current: currentPage, total: totalPages })}
                </span>
                <Button variant="ghost" size="sm" disabled={currentPage >= totalPages}>
                  {t('program.next')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
