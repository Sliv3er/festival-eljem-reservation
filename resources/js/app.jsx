import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { LocaleProvider } from './contexts/LocaleContext';
import { CartProvider } from './contexts/CartContext';

const appName = 'Festival d\'El Jem';

createInertiaApp({
  title: (title) => title ? `${title} — ${appName}` : appName,
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <LocaleProvider>
        <CartProvider>
          <App {...props} />
        </CartProvider>
      </LocaleProvider>
    );
  },
  progress: {
    color: '#D6B25E',
  },
});
