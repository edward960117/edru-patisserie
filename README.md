# EDRU PATISSERIE

A production-quality, single-page storefront for **EDRU PATISSERIE**, a cake shop — built with React, TypeScript, Tailwind CSS, and Vite. Recreates the layout and UX patterns of a modern French-patisserie e-commerce site (hero, seasonal product catalogue with pickup scheduling, promo banner, brand story, and footer).

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 8
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js` needed)
- **Linting:** Oxlint

## Project Structure

```
edru-patisserie/
├── index.html                 # Document shell, Google Fonts, meta tags
├── postcss.config.js          # Registers the Tailwind v4 PostCSS plugin
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Page composition (assembles all sections)
│   ├── index.css               # Tailwind import + design tokens (@theme)
│   ├── types.ts                # Shared TypeScript types (Product)
│   ├── data/
│   │   └── products.ts         # Product catalogue data
│   └── components/
│       ├── AnnouncementBar.tsx # Thin top banner
│       ├── Header.tsx          # Sticky nav bar + mobile menu + cart/account icons
│       ├── Hero.tsx            # Full-bleed hero with store info
│       ├── PickupScheduler.tsx # "I will collect my order on" date picker
│       ├── ProductCard.tsx     # Single product tile
│       ├── ProductGrid.tsx     # Category filters + responsive product grid
│       ├── PromoBanner.tsx     # Seasonal collection promo section
│       ├── StoryBanner.tsx     # "Our Maison" split image/text section
│       ├── Footer.tsx          # Multi-column footer
│       └── CookieConsent.tsx   # Persistent cookie consent bar
└── README.md
```

## Component Breakdown

| Component | Purpose |
|---|---|
| `AnnouncementBar` | Slim banner above the header for pre-order/delivery messaging. |
| `Header` | Sticky, translucent nav with brand wordmark, desktop nav links, cart/account icons, and a collapsible mobile menu. |
| `Hero` | Full-viewport hero image with headline, CTA, and store address/hours — mirrors the reference site's hero. |
| `PickupScheduler` | Date input letting shoppers choose a collection date, shown above the catalogue. |
| `ProductGrid` / `ProductCard` | Category-filterable, responsive (2/3/4-column) grid of cake products. |
| `PromoBanner` | Full-width seasonal promotion section with background image + CTA. |
| `StoryBanner` | Split layout introducing the brand's story/craftsmanship. |
| `Footer` | Contact info, quick links, help links, and social — plus a legal bar. |
| `CookieConsent` | Bottom-fixed cookie notice, dismissible and remembered via `localStorage`. |

## Installation

```powershell
cd edru-patisserie
npm install
npm run dev
```

The app runs at `http://localhost:5173/`.

### Other scripts

```powershell
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint       # Run Oxlint
```


## Design Notes

- **Palette:** cream background (`--color-cream`), charcoal text/ink (`--color-charcoal`), gold accent (`--color-gold`) — defined once in [src/index.css](src/index.css) via Tailwind v4's `@theme`, so they're usable as regular utilities (`bg-cream`, `text-gold`, etc.).
- **Typography:** `Playfair Display` (serif) for headings, `Inter` (sans) for body copy — loaded via Google Fonts in `index.html`.
- **Responsiveness:** mobile-first Tailwind breakpoints (`sm`, `md`, `lg`) throughout; the product grid goes 2 → 3 → 4 columns, and the header collapses into a slide-down mobile menu below `md`.

## Assets That Need to Be Replaced

All imagery currently uses placeholder photography from Unsplash. Before shipping to production, replace:

1. **Hero background** — [src/components/Hero.tsx](src/components/Hero.tsx) (`img src`)
2. **Promo banner background** — [src/components/PromoBanner.tsx](src/components/PromoBanner.tsx) (`img src`)
3. **Story section image** — [src/components/StoryBanner.tsx](src/components/StoryBanner.tsx) (`img src`)
4. **All product photography and copy** — [src/data/products.ts](src/data/products.ts) (`image`, `name`, `description`, `price` fields)
5. **Favicon** — `public/favicon.svg`
6. **Store details** — address, hours, phone, and email are hardcoded placeholders in `Hero.tsx` and `Footer.tsx`; update with real EDRU PATISSERIE details.

## Notes on Backend

No backend is required for this static, informational storefront. If real e-commerce functionality (cart persistence, checkout, order scheduling) is needed later, consider adding a lightweight API (Node/Express, or a headless commerce platform) and wiring the existing cart icon / pickup scheduler up to it.

