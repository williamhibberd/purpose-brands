# purpose-brands

Marketing site for Purpose Brands — Amazon agency for food, drink, and wellness brands. Deployed to Netlify.

## Stack
- **Astro** `^6.1.5` (ESM, `type: module`)
- **Tailwind CSS v4** — design tokens in `src/styles/global.css` under `@theme`
- **TypeScript** extending `astro/tsconfigs/strict`
- **Node** `>=22.12.0`
- **Content collections** — all editable copy (page JSON, settings, contacts, nav, logos, footer, testimonials, case studies) under `src/content/`
- **Sveltia CMS** — browser editor at `/admin`, GitHub-OAuth via Netlify Edge Function
- **Netlify Forms** — contact form, no backend
- **Self-hosted fonts** — Maax Raw (woff2)

## Commands
- `npm run dev` — dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview production build
- `npm run astro -- <cmd>` — Astro CLI (e.g. `astro add`, `astro check`)

## Pages
- `/` — Homepage: hero (client quote), proof bar, logos, testimonials, who we are, how it works, services, case study teasers, CTA
- `/about` — Founder story, Phoebe + Biraj bios, SAS section
- `/work` — All case studies (long-form cards)
- `/work/[slug]` — Individual case study with hero stat, situation, results, quote
- `/contact` — Calendly embed + contact form
- `/404` — Not found

## Key files
- `src/content.config.ts` — Zod schemas for every collection (page JSON, settings, contacts, nav, logos, footer, case studies, testimonials)
- `src/lib/site.ts` — helpers: `getSettings`, `getPrimaryContact`, `getSecondaryContact`, `getNavItems`, `getClientLogos`, `getFooter`, `bookCallHref`
- `public/admin/config.yml` — Sveltia CMS schema (must mirror `content.config.ts`)
- `netlify/edge-functions/sveltia-auth.ts` — GitHub OAuth handler for Sveltia
- `src/content/EDITING.md` — per-file editing guide
- `src/styles/global.css` — brand tokens: purple `#7479e2`, fluid typography, spacing, Maax Raw `@font-face` declarations

## Components
- `ProofBar` — row of large stat blocks (value + label)
- `CtaBlock` — single-button CTA driven by `settings.cta.label` + `settings.cta.href` (no more `dualCta`)
- `CaseStudyCard` — card with optional `heroStat` display
- `TestimonialCard` — quote card with optional `shortQuote` for short display
- `ImageOverlay` — full-bleed background image with overlaid display-weight body + optional `Button` CTA. Used by About → SAS section. Falls back to flat dark panel if no image set.
- `Nav` — sticky header, CTA says "Let's talk"
- `Section`, `Button`, `NumberedList`, `LogoStrip`, `CaseStudyLong`, `Footer`, `CalendlyEmbed`, `CookieBanner`

## Typography
- Single family: **Maax Raw** (Regular for body, Bold for headlines + buttons + labels + eyebrows). Maax Mono was removed; all `--font-mono` usages now resolve to `var(--font-display)` at weight 700.
- `.eyebrow` utility = uppercase Maax Raw Bold, used for the few remaining label slots (404 eyebrow, contact details labels, work pager). Most page eyebrows have been deleted from copy.

## Content editing
- All copy is in `src/content/` — see `src/content/EDITING.md` for the full map
- Case studies: markdown in `src/content/case-studies/`. `featured: true` = shows on homepage
- Testimonials: one file per quote in `src/content/testimonials/`. `featured: true` = shows on homepage
- `/contact` details list (`pages/contact.json` → `details[]`) is a repeating `{ label, value, href }` array — add WhatsApp/etc. without touching code. **Decoupled** from `contacts/*.json`; if Phoebe's phone changes, update both.

## Client-dependent blockers
- Biraj phone number (`src/content/contacts/biraj.json`)
- LinkedIn URL (`src/content/settings/site.json` → `linkedin`)
- Calendly embed URL (`src/content/settings/site.json` → `calendly`)
- Default CTA href (`src/content/settings/site.json` → `cta.href`)
- About SAS background image (`src/content/pages/about.json` → `sas.image`)
- Photography (founders, products) — all are placeholders
- Additional testimonials (homepage wants 3-4, currently 2)
- GA4 measurement ID
