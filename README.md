# 🎵 Festival International de Musique Symphonique d'El Jem

> Client frontend for the El Jem International Symphonic Music Festival ticketing platform — built with React, Inertia.js, and Tailwind CSS.

![Theme: Stone & Symphony at Night](https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/El_Djem_Amphitheatre_panorama.jpg/1280px-El_Djem_Amphitheatre_panorama.jpg)

## ✨ Overview

A premium, mobile-first ticketing UI for concerts held at the **UNESCO World Heritage** Amphithéâtre d'El Jem in Tunisia. The design follows a "Stone & Symphony at Night" editorial theme with warm gold accents and sandstone tones.

### Key Features

- 🌍 **Trilingual** — French, English, Arabic with full RTL layout support
- 📱 **Mobile-first** responsive design
- 🎨 **Premium editorial UI** — spacious, minimal, accessible
- 🏛️ **Wikimedia Commons integration** — amphitheatre imagery fetched dynamically
- 🛒 **Full shopping flow** — browse → select tickets → cart → checkout
- 🎫 **Ticket management** — QR preview, PDF download (UI), status badges
- ♿ **Accessible** — keyboard navigation, focus states, contrast ratios
- 💫 **Smooth animations** — hover effects, transitions, loading skeletons

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Server Bridge | [Inertia.js](https://inertiajs.com/) (Laravel backend) |
| Styling | Tailwind CSS 3.4 |
| Build Tool | Vite 6 |
| Fonts | Inter, Manrope, Noto Kufi Arabic |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Sliv3er/festival-eljem-reservation.git
cd festival-eljem-reservation

# Install dependencies
npm install
```

## 🚀 Development

### Standalone mode (no Laravel backend)

```bash
npm run dev
```

Opens at `http://localhost:3000` with a built-in page navigator. All pages render with demo data — use the **📄 Pages** dropdown (top-right) to switch between views.

### With Laravel backend

When integrated into a Laravel project, the standard Inertia entry point is `resources/js/app.jsx`. Configure Laravel Vite plugin accordingly.

### Build for production

```bash
npm run build
npm run preview   # Preview the production build
```

## 🎨 Brand & Theme

| Token | Color | Usage |
|-------|-------|-------|
| `sandstone` | `#C9A77D` | Warm accent, borders, secondary elements |
| `night` | `#071627` | Dark backgrounds, hero sections |
| `gold` | `#D6B25E` | Primary CTA, highlights, interactive elements |
| `neutral` | `#F6F3EE` | Page background |
| `text` | `#101828` | Body text |

## 🗂️ Project Structure

```
resources/
├── css/
│   └── app.css                    # Tailwind config + component classes
└── js/
    ├── app.jsx                    # Inertia.js entry (Laravel mode)
    ├── main.jsx                   # Standalone dev entry
    ├── i18n/
    │   ├── index.js               # Translation engine + formatters
    │   └── locales/
    │       ├── fr.json            # French translations
    │       ├── en.json            # English translations
    │       └── ar.json            # Arabic translations
    ├── services/
    │   └── ImageService.js        # Wikimedia Commons API client
    ├── contexts/
    │   ├── LocaleContext.jsx       # i18n + RTL provider
    │   └── CartContext.jsx         # Shopping cart state
    ├── hooks/
    │   ├── useLocale.js           # Locale context hook
    │   └── useCart.js             # Cart context hook
    ├── Layouts/
    │   ├── AppLayout.jsx          # Main layout (header + footer)
    │   ├── AuthLayout.jsx         # Split-screen auth layout
    │   └── AccountLayout.jsx      # Account area with sidebar
    ├── Components/
    │   ├── Header.jsx             # Sticky header + nav
    │   ├── Footer.jsx             # Site footer
    │   ├── LanguageSwitcher.jsx   # FR/EN/AR dropdown
    │   ├── MobileDrawer.jsx       # Mobile navigation drawer
    │   ├── EventCard.jsx          # Event listing card
    │   ├── SkeletonCard.jsx       # Loading placeholder
    │   ├── EmptyState.jsx         # No results display
    │   ├── ErrorState.jsx         # Error display
    │   ├── Button.jsx             # Primary/secondary/ghost button
    │   ├── Input.jsx              # Form input (text/select/textarea)
    │   ├── Badge.jsx              # Status badges
    │   ├── Alert.jsx              # Dismissible alerts
    │   ├── StepsIndicator.jsx     # Cart → Payment → Tickets
    │   ├── QuantityStepper.jsx    # +/- quantity control
    │   ├── PriceSummary.jsx       # Order summary panel
    │   ├── TicketCard.jsx         # Ticket display card
    │   ├── QRPreview.jsx          # QR code modal preview
    │   ├── ChatbotWidget.jsx      # Support chatbot UI
    │   ├── FloatingHelpButton.jsx # Help FAB (RTL-aware)
    │   └── NewsletterForm.jsx     # Email subscription
    └── Pages/
        ├── Home.jsx               # Landing page
        ├── Program.jsx            # Events listing + filters
        ├── EventDetail.jsx        # Event info + ticket selector
        ├── Cart.jsx               # Shopping cart
        ├── Checkout.jsx           # Payment (Stripe placeholder)
        ├── CheckoutSuccess.jsx    # Order confirmation
        ├── Auth/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── ForgotPassword.jsx
        ├── Account/
        │   ├── Profile.jsx        # User settings
        │   ├── Orders.jsx         # Order history
        │   ├── OrderDetail.jsx    # Single order view
        │   └── Tickets.jsx        # My tickets + QR
        └── Support/
            ├── Index.jsx          # Support requests list
            ├── RequestDetail.jsx  # Conversation thread
            └── FAQ.jsx            # FAQ page
```

## 🌐 Multilingual & RTL

The app supports **French** (default), **English**, and **Arabic** with automatic RTL layout flipping.

- Language switcher in the header persists selection to `localStorage`
- CSS uses logical properties (`ps-`, `pe-`, `ms-`, `me-`, `start`, `end`) for proper RTL
- Date, time, and currency formatting adapts per locale (Intl API)
- Arabic uses the **Noto Kufi Arabic** typeface

## 🖼️ Image Sourcing

Amphitheatre images are fetched at runtime from **Wikimedia Commons** using the MediaWiki API:

- Category: `Amphitheatre_of_El_Jem`
- No API key required
- Graceful fallback if network is unavailable

## 📄 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured events, Why El Jem, newsletter |
| Program | `/program` | Filterable event listing with pagination |
| Event Detail | `/events/:id` | Full event info + ticket type selector |
| Cart | `/cart` | Editable cart with fee breakdown |
| Checkout | `/checkout` | Stripe Elements placeholder + billing |
| Success | `/checkout/success` | Order confirmation with summary |
| Login | `/login` | Authentication |
| Register | `/register` | Account creation |
| Forgot Password | `/forgot-password` | Password reset |
| Profile | `/account/profile` | User settings |
| Orders | `/account/orders` | Order history |
| Order Detail | `/account/orders/:id` | Single order with tickets |
| My Tickets | `/account/tickets` | Ticket cards with QR + PDF |
| Support | `/support` | Support request list + create form |
| Request Detail | `/support/request/:id` | Conversation thread |
| FAQ | `/faq` | Frequently asked questions |

## 📝 Notes

- **No admin/backoffice pages** — this is the client-facing frontend only
- **Stripe integration** is a UI placeholder — wire up Stripe Elements in production
- **QR codes** show a placeholder SVG — integrate a real QR library (`qrcode.react`) for production
- **Ticket PDF download** is UI-only — implement server-side PDF generation
- **No refunds/cancellations** policy is displayed on ticket pages

## 📜 License

This project is private. All rights reserved.

---

*Stone & Symphony at Night* 🏛️🎶
