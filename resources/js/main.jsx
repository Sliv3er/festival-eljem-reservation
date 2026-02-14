/**
 * Standalone dev entry point.
 * 
 * In production with Laravel, use app.jsx (Inertia.js createInertiaApp).
 * This file allows running the frontend independently with `npm run dev`.
 * It provides a simple hash-based router to preview all pages.
 */
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { LocaleProvider } from './contexts/LocaleContext';
import { CartProvider } from './contexts/CartContext';
import { useState, useEffect, createElement } from 'react';

// Import all pages
import Home from './Pages/Home';
import Program from './Pages/Program';
import EventDetail from './Pages/EventDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import CheckoutSuccess from './Pages/CheckoutSuccess';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Profile from './Pages/Account/Profile';
import Orders from './Pages/Account/Orders';
import OrderDetail from './Pages/Account/OrderDetail';
import Tickets from './Pages/Account/Tickets';
import SupportIndex from './Pages/Support/Index';
import RequestDetail from './Pages/Support/RequestDetail';
import FAQ from './Pages/Support/FAQ';

const routes = {
  '': Home,
  'program': Program,
  'events/1': EventDetail,
  'cart': Cart,
  'checkout': Checkout,
  'checkout/success': CheckoutSuccess,
  'login': Login,
  'register': Register,
  'forgot-password': ForgotPassword,
  'account/profile': Profile,
  'account/orders': Orders,
  'account/orders/1': OrderDetail,
  'account/tickets': Tickets,
  'support': SupportIndex,
  'support/request/1': RequestDetail,
  'faq': FAQ,
};

// Mock demo data for pages
const demoEvent = {
  id: 1,
  title: 'Orchestre Symphonique de Tunis',
  orchestra: 'OST',
  conductor: 'Mohamed Saada',
  date: '2026-07-15T20:30:00',
  image: '',
  priceFrom: 45,
  availability: 'available',
  description: 'A spectacular evening of classical music under the stars at the ancient Roman amphitheatre.',
  repertoire: ['Beethoven — Symphony No. 9', 'Mozart — Requiem in D minor', 'Bizet — Carmen Suite No. 1'],
  ticketTypes: [
    { id: 1, name: 'Gradins', price: 45, description: 'Stone seating tiers', available: 120 },
    { id: 2, name: 'Tribune VIP', price: 120, description: 'Premium reserved seating with cushions', available: 30 },
    { id: 3, name: 'Fosse Orchestre', price: 200, description: 'Ground-level seats near the stage', available: 8 },
  ],
  rules: [
    'Gates open 1 hour before the performance',
    'No food or drinks inside the amphitheatre',
    'Photography without flash is permitted',
  ],
};

const demoOrder = {
  id: 'ORD-20260715-001',
  status: 'paid',
  date: '2026-07-10T14:30:00',
  createdAt: '2026-07-10T14:30:00',
  event: demoEvent,
  items: [
    { ticketType: 'Gradins', quantity: 2, unitPrice: 45 },
    { ticketType: 'Tribune VIP', quantity: 1, unitPrice: 120 },
  ],
  subtotal: 210,
  fees: 10.5,
  serviceFees: 10.5,
  total: 220.5,
  payment: { method: 'Visa ending in 4242', date: '2026-07-10T14:35:00' },
  tickets: [
    { id: 'TK-001', eventTitle: 'Orchestre Symphonique de Tunis', zone: 'Gradins', quantity: 2, unitPrice: 45, eventDate: '2026-07-15T20:30:00', type: 'Gradins', status: 'valid', qrCode: 'demo-qr-1' },
    { id: 'TK-002', eventTitle: 'Orchestre Symphonique de Tunis', zone: 'Gradins', quantity: 2, unitPrice: 45, eventDate: '2026-07-15T20:30:00', type: 'Gradins', status: 'valid', qrCode: 'demo-qr-2' },
    { id: 'TK-003', eventTitle: 'Orchestre Symphonique de Tunis', zone: 'Tribune VIP', quantity: 1, unitPrice: 120, eventDate: '2026-07-15T20:30:00', type: 'Tribune VIP', status: 'used', qrCode: 'demo-qr-3' },
  ],
};

const pageProps = {
  '': {},
  'program': { events: [] },
  'events/1': { event: demoEvent },
  'cart': {},
  'checkout': {},
  'checkout/success': { order: demoOrder },
  'login': {},
  'register': {},
  'forgot-password': {},
  'account/profile': { user: { name: 'Ahmed Ben Ali', email: 'ahmed@example.com', locale: 'fr' } },
  'account/orders': {
    orders: [
      { ...demoOrder },
      { ...demoOrder, id: 'ORD-20260718-002', status: 'pending', event: { ...demoEvent, title: 'Vienna Philharmonic' } },
    ],
  },
  'account/orders/1': { order: demoOrder },
  'account/tickets': {
    tickets: demoOrder.tickets.map((tk, i) => ({
      ...tk,
      event: demoEvent,
    })),
  },
  'support': {
    requests: [
      { id: 1, subject: 'Ticket not received', status: 'open', createdAt: '2026-07-11T10:00:00', lastReply: '2026-07-11T12:00:00' },
    ],
  },
  'support/request/1': {
    request: {
      id: 1,
      subject: 'Ticket not received',
      status: 'open',
      createdAt: '2026-07-11T10:00:00',
      messages: [
        { id: 1, sender: 'user', text: 'I paid but did not receive my tickets by email.', createdAt: '2026-07-11T10:00:00' },
        { id: 2, sender: 'support', text: 'We are looking into this. Please allow 24 hours.', createdAt: '2026-07-11T12:00:00' },
      ],
    },
  },
  'faq': {},
};

function DevNav() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || '');

  useEffect(() => {
    const handler = () => setHash(window.location.hash.slice(1) || '');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <div className="fixed top-0 end-0 z-[100] m-2">
      <details className="group">
        <summary className="cursor-pointer rounded-lg bg-night px-3 py-1.5 text-xs font-medium text-gold shadow-lg hover:bg-night-light transition-colors">
          📄 Pages ({Object.keys(routes).length})
        </summary>
        <div className="absolute end-0 mt-1 w-56 rounded-lg bg-white shadow-xl border border-sandstone/20 p-2 max-h-[70vh] overflow-y-auto">
          {Object.keys(routes).map((path) => (
            <a
              key={path}
              href={`#${path}`}
              className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                hash === path
                  ? 'bg-gold/10 text-gold font-medium'
                  : 'text-text hover:bg-neutral'
              }`}
            >
              /{path || '(home)'}
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}

function App() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || '');

  useEffect(() => {
    const handler = () => setHash(window.location.hash.slice(1) || '');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const Page = routes[hash] || Home;
  const props = pageProps[hash] || {};

  return (
    <LocaleProvider>
      <CartProvider>
        <DevNav />
        <Page {...props} />
      </CartProvider>
    </LocaleProvider>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
