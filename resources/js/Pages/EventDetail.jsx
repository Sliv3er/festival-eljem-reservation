import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import QuantityStepper from '../Components/QuantityStepper';
import PriceSummary from '../Components/PriceSummary';
import Button from '../Components/Button';
import Badge from '../Components/Badge';
import Alert from '../Components/Alert';
import { AmphitheatreSeating, SectionDivider, LyreSvg } from '../Components/Decorations';
import { getImageByCategory, fetchAmphitheatreImages } from '../services/ImageService';

export default function EventDetail({ event: propEvent }) {
  const { t, fc, fd, ft } = useLocale();
  const { addItem } = useCart();
  const [relatedImages, setRelatedImages] = useState([]);

  const fallbackImg = getImageByCategory('hero');

  const event = propEvent || {
    id: 1,
    title: 'Vienna Philharmonic — Mozart & Beethoven',
    orchestra: 'Vienna Philharmonic',
    conductor: 'Riccardo Muti',
    date: '2026-07-18T21:00:00',
    image: fallbackImg.url,
    repertoire: [
      'Mozart — Symphony No. 40 in G minor, K. 550',
      'Beethoven — Symphony No. 7 in A major, Op. 92',
    ],
    ticketTypes: [
      { id: 'gradins', name: 'Gradins', price: 120, available: true },
      { id: 'arene', name: 'Arène', price: 85, available: true },
      { id: 'vip', name: 'VIP Lounge', price: 250, available: true },
      { id: 'gradins-haut', name: 'Gradins Hauts', price: 45, available: false },
    ],
    availability: 'almost_sold_out',
  };

  useEffect(() => {
    fetchAmphitheatreImages(4).then(setRelatedImages);
  }, []);

  const [quantities, setQuantities] = useState(
    Object.fromEntries(event.ticketTypes.map((tt) => [tt.id, 0]))
  );
  const [addedAlert, setAddedAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const SERVICE_FEE_RATE = 0.05;
  const subtotal = event.ticketTypes.reduce((sum, tt) => sum + tt.price * (quantities[tt.id] || 0), 0);
  const fees = Math.round(subtotal * SERVICE_FEE_RATE * 100) / 100;
  const total = subtotal + fees;
  const hasSelection = Object.values(quantities).some((q) => q > 0);

  const handleAddToCart = () => {
    if (!hasSelection) { setErrorAlert(true); setTimeout(() => setErrorAlert(false), 3000); return; }
    event.ticketTypes.forEach((tt) => {
      if (quantities[tt.id] > 0) addItem(event, tt, quantities[tt.id], tt.price);
    });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
    setQuantities(Object.fromEntries(event.ticketTypes.map((tt) => [tt.id, 0])));
  };

  const isSoldOut = event.availability === 'sold_out';

  // Related events demo
  const relatedEvents = [
    { id: 2, title: 'Orchestre Symphonique de Tunis', date: '2026-07-15', image: relatedImages[0]?.url || fallbackImg.url },
    { id: 3, title: 'Nuit du Piano — Lang Lang', date: '2026-07-22', image: relatedImages[1]?.url || getImageByCategory('interior').url },
  ];

  return (
    <AppLayout>
      <Head title={event.title} />

      {/* Full-bleed Hero with Parallax */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-night">
        <img
          src={event.image || fallbackImg.url}
          alt={event.title}
          className="h-full w-full object-cover opacity-40 scale-105"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/30 via-transparent to-night/30" />

        {/* Back button */}
        <div className="absolute top-24 inset-x-0 max-container section-padding">
          <Link href="/program" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors glass rounded-xl px-4 py-2">
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('common.back')}
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-0 max-container section-padding pb-24 lg:pb-32">
          {event.availability === 'almost_sold_out' && (
            <Badge variant="warning" dot className="mb-4">{t('program.almostSoldOut')}</Badge>
          )}
          <h1 className="text-3xl font-display font-extrabold text-white sm:text-4xl lg:text-5xl xl:text-6xl max-w-3xl leading-tight">
            {event.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-white/50">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {fd(event.date)} — {ft(event.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <LyreSvg size={16} color="currentColor" />
              {event.orchestra}
            </span>
          </div>
        </div>
      </div>

      {/* Floating info card overlapping hero */}
      <div className="max-container section-padding -mt-16 relative z-10">
        <div className="card-premium p-6 sm:p-8 grid sm:grid-cols-3 gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.dateTime')}</h3>
            <p className="font-semibold text-text">{fd(event.date)}</p>
            <p className="text-sm text-gold font-medium">{ft(event.date)}</p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.orchestra')}</h3>
            <p className="font-semibold text-text">{event.orchestra}</p>
            {event.conductor && <p className="text-sm text-text/50">{event.conductor}</p>}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.venue') || 'Venue'}</h3>
            <p className="font-semibold text-text">Amphithéâtre d'El Jem</p>
            <p className="text-sm text-text/50">El Jem, Tunisia</p>
          </div>
        </div>
      </div>

      <div className="max-container section-padding py-8 lg:py-12">
        {addedAlert && <Alert variant="success" dismissible className="mb-6">{t('event.addedToCart')}</Alert>}
        {errorAlert && <Alert variant="warning" dismissible className="mb-6">{t('event.selectTickets')}</Alert>}

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-10">
            {/* Repertoire */}
            {event.repertoire && (
              <div className="card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <LyreSvg size={24} color="#D6B25E" />
                  <h2 className="text-xl font-display font-bold text-text">{t('event.repertoire')}</h2>
                </div>
                <ul className="space-y-3">
                  {event.repertoire.map((piece, i) => (
                    <li key={i} className="flex items-start gap-3 text-text/80 group/item hover:text-text transition-colors">
                      <span className="mt-2 h-2 w-2 rounded-full bg-gold shrink-0 group-hover/item:shadow-gold-glow transition-shadow" />
                      <span className="text-base leading-relaxed">{piece}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Seating Map + Ticket Types */}
            {!isSoldOut && (
              <div>
                <h2 className="text-xl font-display font-bold text-text mb-6">{t('event.ticketTypes')}</h2>

                {/* Seating diagram */}
                <div className="card p-6 mb-6 bg-night/[0.02]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-4">{t('event.seatingMap') || 'Seating Map'}</p>
                  <AmphitheatreSeating className="w-full max-w-md mx-auto" />
                </div>

                <div className="space-y-3">
                  {event.ticketTypes.map((tt) => (
                    <div
                      key={tt.id}
                      className={`card-premium p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 ${
                        !tt.available ? 'opacity-50 !border-sandstone/10' : quantities[tt.id] > 0 ? '!border-gold/30 !shadow-gold-glow' : ''
                      }`}
                    >
                      <div>
                        <h3 className="font-display font-bold text-text">{tt.name}</h3>
                        <p className="text-lg text-gold font-bold">{fc(tt.price)}</p>
                      </div>
                      {tt.available ? (
                        <QuantityStepper
                          value={quantities[tt.id] || 0}
                          onChange={(v) => setQuantities({ ...quantities, [tt.id]: v })}
                        />
                      ) : (
                        <Badge variant="soldOut">{t('event.soldOut')}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-text">{t('event.importantInfo')}</h2>
              <div className="card p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-text mb-2">{t('event.entryRules')}</h3>
                  <p className="text-sm text-text/60 leading-relaxed">{t('event.entryRulesText')}</p>
                </div>
                <hr className="border-sandstone/10" />
                <div>
                  <h3 className="font-semibold text-text mb-2">{t('event.seatingInfo')}</h3>
                  <p className="text-sm text-text/60 leading-relaxed">{t('event.seatingInfoText')}</p>
                </div>
              </div>

              {/* Mini FAQ */}
              <div className="card p-6 sm:p-8">
                <h3 className="font-semibold text-text mb-4">{t('event.faqTitle')}</h3>
                <div className="space-y-4">
                  {[
                    { q: t('event.faqDress'), a: t('event.faqDressAnswer') },
                    { q: t('event.faqParking'), a: t('event.faqParkingAnswer') },
                    { q: t('event.faqAccessibility'), a: t('event.faqAccessibilityAnswer') },
                  ].map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-medium text-text hover:text-gold transition-colors">
                        {faq.q}
                        <svg className="h-4 w-4 text-text/40 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="pb-2 text-sm text-text/60 animate-fade-in">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Events */}
            <div>
              <h2 className="text-xl font-display font-bold text-text mb-6">{t('event.relatedEvents') || 'You May Also Like'}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedEvents.map((re) => (
                  <Link key={re.id} href={`/events/${re.id}`} className="group flex gap-4 card p-4 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img src={re.image} alt={re.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text text-sm line-clamp-2 group-hover:text-gold transition-colors">{re.title}</h4>
                      <p className="text-xs text-text/40 mt-1">{re.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Price Summary — Desktop */}
          {!isSoldOut && (
            <div className="hidden lg:block lg:w-80 shrink-0">
              <div className="sticky top-24 card-premium p-6 space-y-6">
                <h3 className="font-display font-bold text-text">{t('checkout.orderSummary')}</h3>
                <PriceSummary subtotal={subtotal} fees={fees} total={total} />
                <div className="space-y-3">
                  <Button onClick={handleAddToCart} className="w-full" disabled={!hasSelection}>
                    {t('event.addToCart')}
                  </Button>
                  <Button href="/cart" variant="secondary" className="w-full" disabled={!hasSelection}>
                    {t('event.buyNow')}
                  </Button>
                </div>
                {/* Trust badges */}
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-sandstone/10">
                  <span className="flex items-center gap-1 text-[10px] text-text/30">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
                    Secure
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-text/30">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                    SSL
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {!isSoldOut && (
        <div className="bottom-sheet p-5 lg:hidden safe-bottom">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text/60">{t('event.total')}</span>
            <span className="text-lg font-bold text-gold">{fc(total)}</span>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddToCart} className="flex-1" size="sm" disabled={!hasSelection}>
              {t('event.addToCart')}
            </Button>
            <Button href="/cart" variant="secondary" size="sm" disabled={!hasSelection}>
              {t('event.buyNow')}
            </Button>
          </div>
        </div>
      )}

      {!isSoldOut && <div className="h-32 lg:hidden" />}
    </AppLayout>
  );
}
