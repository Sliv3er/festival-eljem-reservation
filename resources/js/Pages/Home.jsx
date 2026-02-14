import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import EventCard from '../Components/EventCard';
import SkeletonCard from '../Components/SkeletonCard';
import NewsletterForm from '../Components/NewsletterForm';
import Button from '../Components/Button';
import { getHeroImage, fetchAmphitheatreImages } from '../services/ImageService';

export default function Home({ featuredEvents = [] }) {
  const { t } = useLocale();
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    getHeroImage().then(setHeroImage);
    fetchAmphitheatreImages(6).then(setGalleryImages);
  }, []);

  // Demo events if none provided
  const events = featuredEvents.length > 0 ? featuredEvents : [
    { id: 1, title: 'Orchestre Symphonique de Tunis', orchestra: 'OST', date: '2026-07-15T20:30:00', image: heroImage?.url || '', priceFrom: 45, availability: 'available' },
    { id: 2, title: 'Vienna Philharmonic — Mozart & Beethoven', orchestra: 'Vienna Philharmonic', date: '2026-07-18T21:00:00', image: galleryImages[1]?.url || heroImage?.url || '', priceFrom: 120, availability: 'almost_sold_out' },
    { id: 3, title: 'Nuit du Piano — Lang Lang', orchestra: 'Solo Recital', date: '2026-07-22T20:00:00', image: galleryImages[2]?.url || heroImage?.url || '', priceFrom: 85, availability: 'available' },
  ];

  return (
    <AppLayout>
      <Head title={t('site.name')} />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-night">
        {heroImage && (
          <img
            src={heroImage.url}
            alt="Amphitheatre of El Jem"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/30" />

        <div className="relative z-10 max-container section-padding py-20 text-center">
          <div className="mx-auto max-w-3xl animate-fade-in">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold backdrop-blur-sm">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7 3.5v7.64l-7 3.5-7-3.5V7.68l7-3.5z" />
              </svg>
              {t('site.fullName')}
            </p>
            <h1 className="text-4xl font-display font-bold text-white sm:text-5xl lg:text-6xl text-balance leading-tight">
              {t('site.tagline')}
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
              {t('site.heroSubtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/program" size="lg">
                {t('home.viewProgram')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-container section-padding py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-text lg:text-3xl">{t('home.upcomingEvents')}</h2>
          </div>
          <Link href="/program" className="btn-ghost text-sm text-gold hover:text-gold-light">
            {t('home.viewAll')}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!heroImage ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </section>

      {/* Why El Jem */}
      <section className="bg-night text-white">
        <div className="max-container section-padding py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold mb-6">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                </svg>
                {t('home.unescoLabel')}
              </div>
              <h2 className="text-3xl font-display font-bold lg:text-4xl">{t('home.whyElJem')}</h2>
              <p className="mt-6 text-white/70 leading-relaxed">{t('home.whyElJemText')}</p>

              <div className="mt-8 grid grid-cols-3 gap-6">
                {[
                  { value: t('home.capacity'), icon: '🏛️' },
                  { value: t('home.founded'), icon: '📜' },
                  { value: t('home.acoustics'), icon: '🎵' },
                ].map((stat) => (
                  <div key={stat.value} className="text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-sm font-semibold text-gold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 4).map((img, i) => (
                <div
                  key={img.id}
                  className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
              {galleryImages.length === 0 && (
                <div className="col-span-2 aspect-[16/9] rounded-2xl bg-white/5 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-container section-padding py-20">
        <div className="mx-auto max-w-lg">
          <NewsletterForm />
        </div>
      </section>
    </AppLayout>
  );
}
