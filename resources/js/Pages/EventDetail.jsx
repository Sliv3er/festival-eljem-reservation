import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import useLocale from '../hooks/useLocale';
import useCart from '../hooks/useCart';
import QuantityStepper from '../Components/QuantityStepper';
import PriceSummary from '../Components/PriceSummary';
import Button from '../Components/Button';
import Badge from '../Components/Badge';
import Alert from '../Components/Alert';

export default function EventDetail({ event: propEvent }) {
  const { t, fc, fd, ft } = useLocale();
  const { addItem } = useCart();

  const event = propEvent || {
    id: 1,
    title: 'Vienna Philharmonic — Mozart & Beethoven',
    orchestra: 'Vienna Philharmonic',
    conductor: 'Riccardo Muti',
    date: '2026-07-18T21:00:00',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Amphitheatre_of_El_Jem.jpg/1200px-Amphitheatre_of_El_Jem.jpg',
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
      if (quantities[tt.id] > 0) {
        addItem(event, tt, quantities[tt.id], tt.price);
      }
    });
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 3000);
    setQuantities(Object.fromEntries(event.ticketTypes.map((tt) => [tt.id, 0])));
  };

  const isSoldOut = event.availability === 'sold_out';

  return (
    <AppLayout>
      <Head title={event.title} />

      {/* Hero */}
      <div className="relative h-72 sm:h-96 lg:h-[28rem] overflow-hidden bg-night">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 max-container section-padding pb-8">
          <Link href="/program" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-4 transition-colors">
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('common.back')}
          </Link>
          {event.availability === 'almost_sold_out' && (
            <Badge variant="warning" dot className="mb-3">{t('program.almostSoldOut')}</Badge>
          )}
          <h1 className="text-2xl font-display font-bold text-white sm:text-3xl lg:text-4xl">{event.title}</h1>
        </div>
      </div>

      <div className="max-container section-padding py-8 lg:py-12">
        {/* Alerts */}
        {addedAlert && <Alert variant="success" dismissible className="mb-6">{t('event.addedToCart')}</Alert>}
        {errorAlert && <Alert variant="warning" dismissible className="mb-6">{t('event.selectTickets')}</Alert>}

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Event Info */}
            <div className="card p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.dateTime')}</h3>
                  <p className="font-medium text-text">{fd(event.date)} — {ft(event.date)}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.orchestra')}</h3>
                  <p className="font-medium text-text">{event.orchestra}</p>
                </div>
                {event.conductor && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-1">{t('event.conductor')}</h3>
                    <p className="font-medium text-text">{event.conductor}</p>
                  </div>
                )}
              </div>

              {event.repertoire && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text/40 mb-2">{t('event.repertoire')}</h3>
                  <ul className="space-y-1.5">
                    {event.repertoire.map((piece, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text/80">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        {piece}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Ticket Types */}
            {!isSoldOut && (
              <div>
                <h2 className="text-xl font-bold text-text mb-4">{t('event.ticketTypes')}</h2>
                <div className="space-y-3">
                  {event.ticketTypes.map((tt) => (
                    <div
                      key={tt.id}
                      className={`card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                        !tt.available ? 'opacity-50' : ''
                      }`}
                    >
                      <div>
                        <h3 className="font-semibold text-text">{tt.name}</h3>
                        <p className="text-sm text-gold font-medium">{fc(tt.price)}</p>
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
              <h2 className="text-xl font-bold text-text">{t('event.importantInfo')}</h2>

              <div className="card p-6 space-y-6">
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
              <div className="card p-6">
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
                        <svg className="h-4 w-4 text-text/40 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="pb-2 text-sm text-text/60">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Price Summary — Desktop */}
          {!isSoldOut && (
            <div className="hidden lg:block lg:w-80 shrink-0">
              <div className="sticky top-24 card p-6 space-y-6">
                <h3 className="font-semibold text-text">{t('checkout.orderSummary')}</h3>
                <PriceSummary subtotal={subtotal} fees={fees} total={total} />
                <div className="space-y-3">
                  <Button onClick={handleAddToCart} className="w-full" disabled={!hasSelection}>
                    {t('event.addToCart')}
                  </Button>
                  <Button href="/cart" variant="secondary" className="w-full" disabled={!hasSelection}>
                    {t('event.buyNow')}
                  </Button>
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

      {/* Spacer for bottom sheet on mobile */}
      {!isSoldOut && <div className="h-32 lg:hidden" />}
    </AppLayout>
  );
}
