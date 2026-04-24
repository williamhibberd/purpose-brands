# purpose-brands

Marketing site for Purpose Brands — Amazon agency for food, drink, and wellness brands. Deployed to Netlify.

## Stack
- **Astro** `^6.1.5` (ESM, `type: module`)
- **Tailwind CSS v4** — design tokens in `src/styles/global.css` under `@theme`
- **TypeScript** extending `astro/tsconfigs/strict`
- **Node** `>=22.12.0`
- **Content collections** — case studies (markdown), testimonials (JSON)
- **Netlify Forms** — contact form, no backend
- **Self-hosted fonts** — Maax Raw + Maax Mono (woff2)

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
- `src/config.ts` — contact info (Phoebe + Biraj), nav, client logos, GA4 ID, Calendly URL
- `src/content.config.ts` — schemas for case studies (`heroStat`, `pullQuote`, etc.) and testimonials (`shortQuote`)
- `src/content/case-studies/*.md` — one file per case study, frontmatter-driven
- `src/content/testimonials.json` — testimonial entries with `shortQuote` for homepage
- `src/styles/global.css` — brand tokens: purple `#7479e2`, fluid typography, spacing

## Components
- `ProofBar` — row of large stat blocks (value + label)
- `CtaBlock` — CTA with optional `dualCta` prop for "Call Phoebe" / "Call Biraj" buttons
- `CaseStudyCard` — card with optional `heroStat` display
- `TestimonialCard` — quote card with optional `shortQuote` for short display
- `Nav` — sticky header, CTA says "Let's talk"
- `Section`, `Button`, `NumberedList`, `LogoStrip`, `CaseStudyLong`, `Footer`, `CalendlyEmbed`, `CookieBanner`

## Content editing
- **Config/CTAs/contact**: edit `src/config.ts`
- **Case studies**: edit markdown in `src/content/case-studies/`. `featured: true` = shows on homepage
- **Testimonials**: edit `src/content/testimonials.json`. `featured: true` = shows on homepage

## Client-dependent blockers
- Biraj phone number (`src/config.ts` → `contactBiraj.phone`)
- LinkedIn URL (`src/config.ts` → `contact.linkedin`)
- Calendly embed URL (`src/config.ts` → `contact.calendly`)
- Photography (founders, products) — all images are placeholders
- Additional testimonials (homepage wants 3-4, currently 2)
- GA4 measurement ID
