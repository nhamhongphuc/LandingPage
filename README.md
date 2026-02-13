# Thành Tín Landing Page

**React + Fastify SSR** landing page for Thành Tín — credit card cash withdrawal & renewal services in HCMC & Bình Dương.

## Tech Stack

- **React 18** with TypeScript
- **Fastify** (production SSR server) + Node.js HTTP (dev server)
- **Vite** — build tooling, HMR in development, SSR bundling
- **Tailwind CSS 3** — utility-first styling
- **React Router 6** — SSR-compatible routing (`StaticRouter` / `BrowserRouter`)

## Project Structure

```
├── public/                    # Static assets (served as-is)
│   ├── logo-round.svg
│   ├── logo.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/            # React UI components
│   │   ├── BackToTop.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── SEOHead.tsx
│   │   └── Services.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useIntersectionObserver.ts
│   ├── pages/                 # Page-level components
│   │   └── HomePage.tsx
│   ├── server/                # Server entry points
│   │   ├── dev.ts             # Dev SSR server (Vite middleware + HMR)
│   │   └── production.ts      # Production Fastify SSR server
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                 # Shared utilities & data
│   │   ├── constants.ts
│   │   ├── debounce.ts
│   │   └── siteData.ts
│   ├── App.tsx                # Root app with React Router
│   ├── entry-client.tsx       # Client hydration entry
│   ├── entry-server.tsx       # Server render entry
│   └── index.css              # Tailwind + custom styles
├── index.html                 # Vite HTML template (with SSR placeholders)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── CNAME                      # GitHub Pages custom domain
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Development (with HMR)

```bash
npm run dev
```

Opens at **http://localhost:3000** with:
- Vite HMR for instant client updates
- SSR re-renders on every request (always fresh)
- Source maps and dev tools

### Production Build

```bash
npm run build
```

This runs:
1. `vite build --outDir dist/client` — bundles client JS/CSS
2. `vite build --ssr src/entry-server.tsx --outDir dist/server` — bundles server render function

### Production Server

```bash
npm run start:prod
```

Starts a Fastify server with:
- Gzip + Brotli compression
- Static file serving from `dist/client/`
- SSR for all page requests

### Preview (build + serve)

```bash
npm run preview
```

## SEO Features

- **SSR** — full HTML rendered on the server, crawlable by Google
- **Dynamic meta tags** — title, description, OpenGraph, Twitter Cards
- **JSON-LD structured data** — `FinancialService` schema
- **sitemap.xml** + **robots.txt** — in `public/`
- **Preloaded state** — server data injected into HTML, hydrated on client
