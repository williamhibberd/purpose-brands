# Purpose Brands

Marketing site for Purpose Brands — an Amazon agency for food, drink, and wellness brands.

Built with [Astro](https://astro.build) 6, Tailwind v4, deployed to Netlify.

## Stack
- **Astro 6** — static output, no JS framework islands (zero JS by default)
- **Tailwind v4** — design tokens defined in `src/styles/global.css` under `@theme`
- **Content collections** — case studies as markdown in `src/content/case-studies/`, testimonials as JSON
- **astro-seo** — meta/OG tags
- **@astrojs/sitemap** — auto sitemap
- **Netlify Forms** — contact form, no backend code
- **Self-hosted Maax Raw + Maax Mono** (`src/assets/fonts/`, 205TF) — bundled + hashed by Vite

## Commands
| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build |
| `npx astro check` | TypeScript + content schema check |

## Project structure
```
src/
├── config.ts               # Central: contact info, nav, client logos, GA4 ID
├── content.config.ts       # Collection schemas
├── content/
│   ├── case-studies/       # One .md per case study
│   └── testimonials.json   # Testimonial list
├── components/             # Nav, Footer, Button, Section, NumberedList, etc.
├── layouts/Base.astro      # Shared <html>, SEO, nav, footer, cookie banner
├── pages/
│   ├── index.astro         # Home
│   ├── about.astro
│   ├── work/index.astro    # All case studies
│   ├── work/[slug].astro   # Individual case study
│   ├── contact.astro
│   └── 404.astro
└── styles/global.css       # @theme tokens: brand purple, fonts, spacing
```

## Editing content

### Updating copy, CTAs, contact info
Edit **`src/config.ts`** — email, phone, LinkedIn URL, Calendly URL, GA4 ID, and client logo list all live there.

### Updating case studies
Edit the markdown files in **`src/content/case-studies/`**. Each file's frontmatter drives the home card, the `/work` index, and the case study detail page. Add a new case study by dropping in a new `.md` file with the same frontmatter schema — it'll auto-appear.

`featured: true` in the frontmatter means the case study shows on the home page.

### Updating testimonials
Edit **`src/content/testimonials.json`**. `featured: true` → shows on home.

## Deploy (Netlify)
1. Push to GitHub.
2. Connect the repo to Netlify (build command `npm run build`, publish directory `dist` — already configured in `netlify.toml`).
3. After the first deploy:
   - **Forms** → Netlify dashboard → Site configuration → Forms → turn on email notifications to `phoebe@wearepurposebrands.com`.
   - **Domain** → point `wearepurposebrands.com` at Netlify.
   - **Env** — no environment variables needed for launch.

## Pre-launch checklist (Phoebe to provide)
Everything below ships as a placeholder and needs real content before launch:

**Assets**
- [ ] Logo SVG + wordmark → `src/assets/brand/` (swap the text wordmark in `Nav.astro`, `Footer.astro`, and `404.astro`)
- [ ] SAS Ocean Network badge → `src/assets/brand/sas-ocean-network.svg` (update `Footer.astro`)
- [ ] 16 client logos (SVG/PNG) → `src/assets/clients/<slug>.svg`, update `LogoStrip.astro` to render images instead of text placeholders
- [ ] Product hero photos for Goodrays, Salcombe, New London Light, Holos → `src/assets/work/<slug>.jpg`, referenced from each case study frontmatter
- [ ] Casual photos of Phoebe and Biraj → `src/assets/team/`, update `about.astro`
- [ ] Trust-signal logos: Moët Hennessy, Heineken, Veuve Clicquot, Belvedere, Heroes Technology, Sports Laboratory → `src/assets/brand-logos/`, update `about.astro`
- [ ] Default OG image → `public/og-default.png` (1200×630)
- [ ] Favicon → already present, swap when brand mark lands

**Config (`src/config.ts`)**
- [ ] `contact.linkedin` — LinkedIn URL
- [ ] `contact.calendly` — Calendly embed URL (unlocks `/contact` embed + all "Book a call" CTAs)
- [ ] `ga4MeasurementId` — Google Analytics 4 ID (e.g. `G-XXXXXXXXXX`)

**Copy**
- [ ] Final About intro, Phoebe bio, Biraj bio in `src/pages/about.astro` (current copy is the brief's draft)
- [ ] Any additional testimonials → add to `src/content/testimonials.json`
- [ ] Confirm all case study metrics are still accurate
- [ ] Permission confirmed from all brands to use logos + quotes publicly

**Brand tokens (`src/styles/global.css`)**
- Brand purple `#7479e2` and logo SVG are wired in
- Self-hosted **Maax Raw** (body + bold headlines) and **Maax Mono** (buttons, labels, credits) from 205TF are loaded from `src/assets/fonts/` via `@font-face` at the top of `global.css`. To swap or add weights, drop the new `.woff2` files in and update the declarations there.

## Performance + a11y
- No JS framework, no islands → zero JS by default except small vanilla scripts for the mobile nav, cookie banner, and logo marquee
- Self-hosted variable fonts (`font-display: swap`) — no layout shift, no network round-trip
- All images should use Astro `<Image />` for automatic WebP/AVIF + responsive srcsets (wire in once real photos arrive)
- GA4 loads only after explicit consent via the cookie banner
- Semantic landmarks, skip link, focus-visible outlines, `prefers-reduced-motion` respected (logo marquee pauses)

## Notes
- **Design reference**: elevatefmcg.com (Framer site) — not copied, but its editorial / serif-display / dark-surface mood informs the type + layout system.
- **Brief**: `docs/Purpose_Brands_Build_Brief.docx`
