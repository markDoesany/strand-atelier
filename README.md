# Strand Intelligence

**Market Intelligence Dashboard** (premium UI): Bloomberg-terminal–inspired density with a neutral + gold palette. One hero **Three.js** scene (React Three Fiber + Drei), animated **SVG price trends**, regional cards, a dark **signals** strip, and Lenis + Framer Motion for scroll and motion.

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- `three` + `@react-three/fiber` + `@react-three/drei` (hero canvas, dynamically imported, `ssr: false`)
- `framer-motion` · `lenis`

## Performance choices

- **Single WebGL canvas** in the hero; the rest of the page is DOM + SVG.
- **No canvas** when `prefers-reduced-motion: reduce` or viewport **≤768px** (static gradient fallback).
- **`dpr` capped** at 2; `transpilePackages: ['three']` in [`next.config.ts`](next.config.ts).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

Import the repo, framework preset **Next.js**. Set `NEXT_PUBLIC_SITE_URL` to your production URL for correct metadata (see [`.env.example`](.env.example)).

## Content

- Brand, CTA, footer: [`src/data/site.ts`](src/data/site.ts)
- KPIs, chart series, regions, highlights, signals: [`src/data/market.ts`](src/data/market.ts)

All figures are **illustrative** for portfolio use—not live MLS data.

## Disk / install issues

If `npm install` fails (e.g. disk space), free space and run `npm install` again. Dependencies are listed in [`package.json`](package.json).
