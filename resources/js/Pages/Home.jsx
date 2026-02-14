import { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import EventCard from '../Components/EventCard';
import SkeletonCard from '../Components/SkeletonCard';
import NewsletterForm from '../Components/NewsletterForm';
import Button from '../Components/Button';
import { AmphitheatreArch, LyreSvg, FloatingParticles, SectionDivider } from '../Components/Decorations';
import { getHeroImage, fetchAmphitheatreImages, getImageByCategory } from '../services/ImageService';

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-gold-glow">
          <span className="text-3xl sm:text-4xl font-display font-bold text-gold-gradient">{String(value).padStart(2, '0')}</span>
        </div>
      </div>
      <span className="mt-2 text-xs sm:text-sm font-medium text-white/50 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function Home({ featuredEvents = [] }) {
  const { t } = useLocale();
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    getHeroImage().then(setHeroImage);
    fetchAmphitheatreImages(8).then(setGalleryImages);
  }, []);

  // Countdown to July 15, 2026
  useEffect(() => {
    const target = new Date('2026-07-15T20:30:00').getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const fallbackHero = getImageByCategory('hero');
  const heroUrl = heroImage?.url || fallbackHero.url;

  const events = featuredEvents.length > 0 ? featuredEvents : [
    { id: 1, title: 'Orchestre Symphonique de Tunis', orchestra: 'OST', date: '2026-07-15T20:30:00', image: heroUrl, priceFrom: 45, availability: 'available' },
    { id: 2, title: 'Vienna Philharmonic — Mozart & Beethoven', orchestra: 'Vienna Philharmonic', date: '2026-07-18T21:00:00', image: galleryImages[1]?.url || getImageByCategory('exterior').url, priceFrom: 120, availability: 'almost_sold_out' },
    { id: 3, title: 'Nuit du Piano — Lang Lang', orchestra: 'Solo Recital', date: '2026-07-22T20:00:00', image: galleryImages[2]?.url || getImageByCategory('interior').url, priceFrom: 85, availability: 'available' },
  ];

  const pastEditions = [
    { year: '2024', highlight: 'Andrea Bocelli', audience: '35,000' },
    { year: '2023', highlight: 'London Symphony', audience: '32,000' },
    { year: '2022', highlight: 'Orchestre de Paris', audience: '28,000' },
  ];

  return (
    <AppLayout>
      <Head title={t('site.name')} />

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night">
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <img
            src={heroUrl}
            alt="Amphitheatre of El Jem"
            className="absolute inset-0 h-full w-full object-cover opacity-30 scale-110"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/50 to-night" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/40 via-transparent to-night/40" />
        </div>

        {/* Floating particles */}
        <FloatingParticles />

        {/* Decorative arches */}
        <div className="absolute top-20 left-10 opacity-10 hidden lg:block">
          <AmphitheatreArch width={180} height={120} color="#D6B25E" />
        </div>
        <div className="absolute bottom-40 right-10 opacity-10 hidden lg:block rotate-12">
          <AmphitheatreArch width={120} height={80} color="#D6B25E" />
        </div>

        <div className="relative z-10 max-container section-padding py-20 text-center">
          <div className="mx-auto max-w-4xl">
            {/* Festival badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-gold mb-8">
              <LyreSvg size={18} color="#D6B25E" />
              <span>{t('site.fullName')}</span>
            </div>

            {/* Main heading with gold gradient */}
            <h1 className="animate-fade-in-up-delay text-5xl font-display font-extrabold sm:text-6xl lg:text-7xl xl:text-8xl text-balance leading-[1.1]">
              <span className="text-gold-gradient">{t('site.tagline')}</span>
            </h1>

            <p className="animate-fade-in-up-delay-2 mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t('site.heroSubtitle')}
            </p>

            <div className="animate-fade-in-up-delay-2 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/program" size="lg" className="!px-10 !py-4 !text-base shadow-gold-glow-lg">
                {t('home.viewProgram')}
              </Button>
              <Button href="#countdown" variant="secondary" size="lg" className="!border-white/20 !text-white hover:!bg-white/10 !px-8 !py-4 !text-base">
                {t('home.upcomingEvents')}
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
          <svg className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============ COUNTDOWN ============ */}
      <section id="countdown" className="relative bg-night py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mosaic opacity-50" />
        <div className="relative max-container section-padding text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold/60 mb-4">
            {t('home.nextEdition') || 'Next Edition'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            15 {t('program.july') || 'July'} 2026
          </h2>
          <p className="text-white/40 mb-10">20:30 — Amphithéâtre d'El Jem</p>

          <div className="flex justify-center gap-4 sm:gap-6">
            <CountdownUnit value={countdown.days} label={t('home.days') || 'Days'} />
            <div className="flex items-center text-3xl text-gold/30 font-light pt-2">:</div>
            <CountdownUnit value={countdown.hours} label={t('home.hours') || 'Hours'} />
            <div className="flex items-center text-3xl text-gold/30 font-light pt-2">:</div>
            <CountdownUnit value={countdown.minutes} label={t('home.minutes') || 'Min'} />
            <div className="flex items-center text-3xl text-gold/30 font-light pt-2 hidden sm:flex">:</div>
            <div className="hidden sm:block">
              <CountdownUnit value={countdown.seconds} label={t('home.seconds') || 'Sec'} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ EVENTS CAROUSEL ============ */}
      <section className="max-container section-padding py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2">{t('home.season') || 'Season 2026'}</p>
            <h2 className="text-3xl font-display font-bold text-text lg:text-4xl">{t('home.upcomingEvents')}</h2>
          </div>
          <Link href="/program" className="btn-ghost text-sm text-gold hover:text-gold-light group">
            {t('home.viewAll')}
            <svg className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {!heroImage ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            events.map((event) => (
              <div key={event.id} className="min-w-[300px] snap-start lg:min-w-0">
                <EventCard event={event} />
              </div>
            ))
          )}
        </div>
      </section>

      <SectionDivider className="max-container section-padding" />

      {/* ============ WHY EL JEM ============ */}
      <section className="bg-night text-white overflow-hidden">
        <div className="max-container section-padding py-20 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            {/* Text content */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-5 py-2 text-sm font-medium text-gold mb-6 border border-gold/20">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                </svg>
                {t('home.unescoLabel')}
              </div>
              <h2 className="text-3xl font-display font-bold lg:text-5xl leading-tight">{t('home.whyElJem')}</h2>
              <p className="mt-6 text-white/60 leading-relaxed text-lg">{t('home.whyElJemText')}</p>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { value: '35,000', label: t('home.capacity') || 'Capacity', icon: '🏛️' },
                  { value: '238 AD', label: t('home.founded') || 'Founded', icon: '📜' },
                  { value: '★★★★★', label: t('home.acoustics') || 'Acoustics', icon: '🎵' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-gold/20">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-lg font-bold text-gold">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asymmetric image gallery */}
            <div className="lg:col-span-7 relative">
              {/* Decorative arch behind images */}
              <div className="absolute -top-10 -right-10 opacity-5 hidden lg:block">
                <AmphitheatreArch width={300} height={200} color="#D6B25E" />
              </div>

              <div className="grid grid-cols-12 gap-3 relative">
                {/* Large main image */}
                <div className="col-span-8 aspect-[4/3] overflow-hidden rounded-3xl shadow-gold-glow">
                  <img
                    src={galleryImages[0]?.url || getImageByCategory('exterior').url}
                    alt="El Jem Amphitheatre"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Stacked right images */}
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="flex-1 overflow-hidden rounded-3xl">
                    <img
                      src={galleryImages[1]?.url || getImageByCategory('interior').url}
                      alt="Interior view"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden rounded-3xl">
                    <img
                      src={galleryImages[2]?.url || getImageByCategory('detail').url}
                      alt="Detail view"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Bottom row */}
                <div className="col-span-4 aspect-square overflow-hidden rounded-3xl">
                  <img
                    src={galleryImages[3]?.url || getImageByCategory('panorama').url}
                    alt="Panoramic view"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-8 aspect-[21/9] overflow-hidden rounded-3xl relative">
                  <img
                    src={galleryImages[4]?.url || getImageByCategory('aerial').url}
                    alt="Aerial view"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay text on last image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-night/70 to-transparent flex items-center p-6">
                    <div>
                      <p className="text-gold font-display font-bold text-xl">UNESCO</p>
                      <p className="text-white/60 text-sm">World Heritage Site</p>
                    </div>
                  </div>
                </div>
              </div>

              {galleryImages.length === 0 && !heroImage && (
                <div className="aspect-[16/9] rounded-3xl bg-white/5 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAST EDITIONS ============ */}
      <section className="max-container section-padding py-20 lg:py-28">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-2">{t('home.heritage') || 'Heritage'}</p>
          <h2 className="text-3xl font-display font-bold text-text lg:text-4xl">{t('home.pastEditions') || 'Past Editions'}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pastEditions.map((edition) => (
            <div
              key={edition.year}
              className="group relative overflow-hidden rounded-3xl bg-night p-8 text-center transition-all duration-500 hover:shadow-gold-glow hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-mosaic opacity-30" />
              <div className="relative">
                <span className="text-6xl font-display font-extrabold text-gold/20 group-hover:text-gold/30 transition-colors">{edition.year}</span>
                <p className="mt-2 text-lg font-semibold text-white">{edition.highlight}</p>
                <p className="mt-1 text-sm text-white/40">{edition.audience} {t('home.spectators') || 'spectators'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider className="max-container section-padding" />

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-gradient-to-b from-neutral to-white py-20 lg:py-28">
        <div className="max-container section-padding">
          <div className="text-center mb-14">
            <LyreSvg size={40} color="#D6B25E" className="mx-auto mb-4" />
            <h2 className="text-3xl font-display font-bold text-text lg:text-4xl">{t('home.testimonials') || 'What People Say'}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { quote: 'An absolutely magical evening under the stars. The acoustics of this ancient amphitheatre are unmatched.', author: 'Sophie L.', role: 'Music Critic, Le Monde' },
              { quote: "One of the most breathtaking concert venues in the world. The combination of history and music is extraordinary.", author: 'James M.', role: 'The Guardian' },
              { quote: "Chaque année, je reviens. L'atmosphère du festival d'El Jem est unique au monde.", author: 'Amira B.', role: 'Festival Regular' },
            ].map((item, i) => (
              <div
                key={i}
                className="card-premium p-8 relative group hover:-translate-y-1 transition-all duration-500"
              >
                <svg className="h-8 w-8 text-gold/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-text/70 leading-relaxed italic">{item.quote}</p>
                <div className="mt-6 pt-4 border-t border-sandstone/10">
                  <p className="font-semibold text-text text-sm">{item.author}</p>
                  <p className="text-xs text-text/40">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="max-container section-padding py-16">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-text/30 mb-8">{t('home.partners') || 'Our Partners'}</p>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-500">
          {['UNESCO', 'Ministry of Culture', 'Tunisair', 'Orange Tunisia', 'BIAT'].map((name) => (
            <div key={name} className="flex items-center justify-center h-10 px-6 rounded-lg bg-sandstone/10 text-sm font-semibold text-text/60">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="bg-night relative overflow-hidden">
        <div className="absolute inset-0 bg-mosaic opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5">
          <AmphitheatreArch width={600} height={400} color="#D6B25E" />
        </div>
        <div className="relative max-container section-padding py-20">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-2">{t('home.stayTuned') || 'Stay Tuned'}</h2>
            <p className="text-white/50 mb-8">{t('home.newsletterText') || 'Subscribe for early access to tickets and exclusive updates.'}</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
