# Support Weald Schooling Site

Next.js website for the Support Weald Schooling campaign.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploying to Vercel

1. Import this project into Vercel.
2. Framework preset: `Next.js` (auto-detected).
3. Build command: `npm run build`.
4. Output is handled by Next.js automatically.

## SEO and routing

- Each section is a real Next route at `/<section-slug>`.
- Section pages are statically generated via `generateStaticParams`.
- Each section has route-level metadata (`title` and `description`).

## Content source

Content is structured from:

- `/Users/jimgroome/Downloads/Draft of Broad Outline for Annex Proposal Feb 21 2026 (1).docx`

Section data is in `lib/sections.js` and each section is rendered as its own page route.
