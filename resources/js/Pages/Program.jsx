import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import EventCard from '../Components/EventCard';
import SkeletonCard from '../Components/SkeletonCard';
import EmptyState from '../Components/EmptyState';
import ErrorState from '../Components/ErrorState';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default function Program({ events: propEvents, filters: propFilters, pagination }) {
  const { t, fc } = useLocale();

  // Demo data
  const [loading] = useState(false);
  const [error] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const demoEvents = propEvents || [
    { id: 1, title: 'Orchestre Symphonique de Tunis — Ouverture', orchestra: 'Orchestre Symphonique de Tunis', date: '2026-07-15T20:30:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/800px-Amphitheatre_of_El_Jem.jpg', priceFrom: 45, availability: 'available' },
    { id: 2, title: 'Vienna Philharmonic — Mozart & Beethoven', orchestra: 'Vienna Philharmonic', date: '2026-07-18T21:00:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/El_Djem_Amphitheater_%28II%29.jpg/800px-El_Djem_Amphitheater_%28II%29.jpg', priceFrom: 120, availability: 'almost_sold_out' },
    { id: 3, title: 'Nuit du Piano — Lang Lang', orchestra: 'Solo Recital', date: '2026-07-22T20:00:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/800px-Amphitheatre_of_El_Jem.jpg', priceFrom: 85, availability: 'available' },
    { id: 4, title: 'Berlin Philharmonic — Mahler Symphony No. 5', orchestra: 'Berlin Philharmonic', date: '2026-07-25T20:30:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/El_Djem_Amphitheater_%28II%29.jpg/800px-El_Djem_Amphitheater_%28II%29.jpg', priceFrom: 150, availability: 'sold_out' },
    { id: 5, title: 'London Symphony Orchestra — Tchaikovsky', orchestra: 'LSO', date: '2026-07-28T21:00:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/800px-Amphitheatre_of_El_Jem.jpg', priceFrom: 90, availability: 'available' },
    { id: 6, title: 'Orchestre de Paris — Ravel & Debussy', orchestra: 'Orchestre de Paris', date: '2026-08-01T20:30:00', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/El_Djem_Amphitheater_%28II%29.jpg/800px-El_Djem_Amphitheater_%28II%29.jpg', priceFrom: 75, availability: 'available' },
  ];

  const hasActiveFilters = dateFilter || priceFilter || artistFilter || zoneFilter || availabilityFilter;

  const clearFilters = () => {
    setDateFilter('');
    setPriceFilter('');
    setArtistFilter('');
    setZoneFilter('');
    setAvailabilityFilter('');
  };

  const currentPage = pagination?.current_page || 1;
  const totalPages = pagination?.last_page || 1;

  return (
    <AppLayout>
      <Head title={t('program.title')} />

      {/* Header */}
      <div className="bg-night py-16">
        <div className="max-container section-padding text-center">
          <h1 className="text-3xl font-display font-bold text-white lg:text-4xl">{t('program.title')}</h1>
          <p className="mt-3 text-white/60">{t('program.subtitle')}</p>
        </div>
      </div>

      <div className="max-container section-padding py-8">
        {/* Filters Toggle (Mobile) */}
        <div className="mb-6 lg:hidden">
          <Button variant="secondary" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            {t('program.filters')}
          </Button>
        </div>

        {/* Filters */}
        <div className={`mb-8 rounded-2xl border border-sandstone/10 bg-white p-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Input
              type="select"
              label={t('program.date')}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">{t('program.allDates')}</option>
              <option value="2026-07-15">15 Jul 2026</option>
              <option value="2026-07-18">18 Jul 2026</option>
              <option value="2026-07-22">22 Jul 2026</option>
              <option value="2026-07-25">25 Jul 2026</option>
            </Input>
            <Input
              type="select"
              label={t('program.priceRange')}
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">{t('program.allPrices')}</option>
              <option value="0-50">0 - 50 DT</option>
              <option value="50-100">50 - 100 DT</option>
              <option value="100+">100+ DT</option>
            </Input>
            <Input
              type="select"
              label={t('program.artist')}
              value={artistFilter}
              onChange={(e) => setArtistFilter(e.target.value)}
            >
              <option value="">{t('program.allArtists')}</option>
              <option value="ost">Orchestre Symphonique de Tunis</option>
              <option value="vienna">Vienna Philharmonic</option>
              <option value="berlin">Berlin Philharmonic</option>
            </Input>
            <Input
              type="select"
              label={t('program.zone')}
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              <option value="">{t('program.allZones')}</option>
              <option value="gradins">Gradins</option>
              <option value="arene">Arène</option>
              <option value="vip">VIP</option>
            </Input>
            <Input
              type="select"
              label={t('program.availability')}
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">{t('program.allAvailability')}</option>
              <option value="available">{t('program.available')}</option>
              <option value="sold_out">{t('program.soldOut')}</option>
            </Input>
          </div>
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button onClick={clearFilters} className="text-sm font-medium text-gold hover:text-gold-light transition-colors">
                {t('program.clearFilters')}
              </button>
            </div>
          )}
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {demoEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
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
