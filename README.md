# Heer Collection — Luxury Women's Fashion

A world-class premium women's clothing eCommerce frontend built with **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **ShadCN UI**, **Framer Motion**, **GSAP**, **Zustand**, **React Hook Form**, and **Zod**.

Design language: premium, minimal, elegant, editorial — inspired by Maria B, Sana Safinaz, Zara, and Massimo Dutti.

## Color Palette

| Token           | Hex       |
| --------------- | --------- |
| Background      | `#F8F5F2` |
| Secondary       | `#E8DDD4` |
| Accent Gold     | `#C9A27E` |
| Text            | `#1A1A1A` |

## Tech Stack

- **Next.js 16** (App Router, Server Components, Streaming, SSG)
- **TypeScript** — strict typing throughout
- **Tailwind CSS v4** — `@theme` tokens, custom animations
- **ShadCN UI** — accessible Radix primitives, 21 reusable components
- **Framer Motion** — page transitions, scroll reveal, micro-interactions
- **GSAP** — hero animations with `ScrollTrigger` parallax
- **Zustand** — persisted cart/wishlist/auth/UI stores
- **React Hook Form + Zod** — typed form validation
- **Axios** — API layer with auth interceptors
- **lucide-react** — elegant icon set

## Features

### Homepage
- Rotating announcement bar with gold CTAs
- Luxury sticky header (blur + shadow on scroll)
- **Mega menu** with category submenus, featured products, and promo cards
- Full-screen GSAP hero with split typography + parallax
- Featured categories, New Arrivals, Best Sellers
- Editorial collection cards (Summer Edit, Luxury Pret)
- Auto-rotating testimonials, Instagram gallery, newsletter capture
- Premium dark footer with social + link columns
- CSS infinite marquee bar

### Catalog
- Grid layout (1/2/3/4 columns responsive)
- Filter sidebar (category, price slider, sizes, colors, stock)
- Sorting dropdown (featured, newest, price, rating)
- Product quick view modal
- Wishlist toggle + persisted wishlist page
- Pagination component
- Search with live results

### Product Detail
- Multi-image gallery with thumbnails, arrows, lightbox zoom
- Color + size selection (out-of-stock disabled & struck)
- Quantity selector, add-to-cart with size guard
- Material & care accordion, trust badges
- Description / Info / Size Guide / Reviews tabs
- Related products + **Recently Viewed** (localStorage, `useSyncExternalStore`)

### Checkout
- Cart page + slide-in cart drawer
- 3-step checkout: Shipping → Payment → Summary
- Payment methods: COD, Card, Bank Transfer, JazzCash, EasyPaisa
- Order summary with coupon field
- Order success page with delivery timeline

### Auth
- Login, Register, Forgot Password, Reset Password
- Email verification page (6-digit code UI)
- Zod-validated forms, split-brand layouts

### SEO & Performance
- Metadata + Open Graph + Twitter cards on every page
- JSON-LD structured data (Product schema) on product pages
- Static generation (`generateStaticParams`) for all catalog routes
- Image-optimized, lazy-loaded, code-split, server components by default
- Zero console errors, `tsc` + `eslint` clean

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run build`  | Production build (+ type check)  |
| `npm run start`  | Serve production build           |
| `npm run lint`   | Run ESLint                       |

## Project Structure

```
src/
├── app/
│   ├── (store)/          # Home, category, product, cart, checkout, wishlist, account, search...
│   ├── auth/             # Login, register, password reset, email verify
│   ├── layout.tsx        # Root layout (fonts, SEO metadata)
│   └── globals.css       # Tailwind v4 theme + luxury tokens/animations
├── components/
│   ├── layout/           # Header, MegaMenu, Footer, AnnouncementBar, MobileMenu, StoreLayout
│   ├── home/             # Hero, Categories, NewArrivals, BestSellers, Collections, ...
│   ├── product/          # ProductCard, Gallery, Info, Tabs, RelatedProducts, QuickView...
│   ├── cart/  checkout/  auth/  common/
│   └── ui/               # ShadCN primitives (21 components)
├── services/  hooks/  store/  lib/  types/
└── lib/                  # API client, constants, validations, utils
```

## Notes

- Storefront data is requested through `src/services/*` and `src/lib/axios.ts`. Set `NEXT_PUBLIC_API_URL` to the backend API base URL when it differs from the local default.
- Auth/cart/wishlist state persists via `localStorage` (Zustand `persist`).
- Launch dev server with Turbopack by default; production build uses static generation for catalog routes.