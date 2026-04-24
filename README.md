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
├── config.ts               # Central: contact info (Phoebe + Biraj), nav, client logos, GA4 ID
├── content.config.ts       # Collection schemas (heroStat, shortQuote, etc.)
├── content/
│   ├── case-studies/       # One .md per case study (with heroStat frontmatter)
│   └── testimonials.json   # Testimonial list (with shortQuote for homepage)
├── components/
│   ├── ProofBar.astro      # Stat bar: large numbers + labels
│   ├── CtaBlock.astro      # CTA block with optional dualCta mode
│   ├── CaseStudyCard.astro # Card with optional heroStat display
│   ├── TestimonialCard.astro # Quote card with shortQuote support
│   ├── Nav.astro           # Sticky header, "Let's talk" CTA
│   ├── Footer.astro        # Site footer
│   ├── Button.astro        # Primary/secondary/ghost variants
│   ├── Section.astro       # Light/dark/alt tone wrapper
│   ├── NumberedList.astro  # Numbered grid (how it works, services)
│   ├── LogoStrip.astro     # Scrolling client logo marquee
│   ├── CaseStudyLong.astro # Full case study card for /work listing
│   ├── CalendlyEmbed.astro # Calendly iframe or fallback
│   └── CookieBanner.astro  # GDPR consent, gates GA4
├── layouts/Base.astro      # Shared <html>, SEO, nav, footer, cookie banner
├── pages/
│   ├── index.astro         # Home (9 sections: hero, proof bar, logos, testimonials, who we are, how it works, services, results, CTA)
│   ├── about.astro         # Story, founder bios, SAS
│   ├── work/index.astro    # All case studies
│   ├── work/[slug].astro   # Individual case study with hero stat
│   ├── contact.astro       # Calendly + form
│   └── 404.astro
└── styles/global.css       # @theme tokens: brand purple, fonts, spacing
```

## Editing content

### Updating copy, CTAs, contact info
Edit **`src/config.ts`** — email, phone (Phoebe + Biraj), LinkedIn URL, Calendly URL, GA4 ID, and client logo list all live there.

### Updating case studies
Edit the markdown files in **`src/content/case-studies/`**. Each file's frontmatter drives the home card, the `/work` index, and the case study detail page. Add a new case study by dropping in a new `.md` file with the same frontmatter schema — it'll auto-appear.

`featured: true` in the frontmatter means the case study shows on the home page.

### Updating testimonials
Edit **`src/content/testimonials.json`**. `featured: true` → shows on home. The `shortQuote` field provides a punchy one-liner for the homepage cards; `quote` is the full version for detail contexts.

## Deploy (Netlify)
1. Push to GitHub.
2. Connect the repo to Netlify (build command `npm run build`, publish directory `dist` — already configured in `netlify.toml`).
3. After the first deploy:
   - **Forms** → Netlify dashboard → Site configuration → Forms → turn on email notifications to `phoebe@wearepurposebrands.com`.
   - **Domain** → point `wearepurposebrands.com` at Netlify.
   - **Env** — no environment variables needed for launch.

## Pre-launch checklist (client to provide)
Everything below ships as a placeholder and needs real content before launch:

**Assets**
- [ ] Logo SVG + wordmark → `src/assets/brand/` (swap the text wordmark in `Nav.astro`, `Footer.astro`, and `404.astro`)
- [ ] SAS Ocean Network badge → `src/assets/brand/sas-ocean-network.svg` (update `Footer.astro`)
- [ ] 16 client logos (SVG/PNG) → `src/assets/clients/<slug>.svg`, update `LogoStrip.astro` to render images instead of text placeholders
- [ ] Product hero photos for Goodrays, Salcombe, New London Light, Holos → `src/assets/work/<slug>.jpg`, referenced from each case study frontmatter
- [ ] Casual photo of Phoebe and Biraj together → homepage hero + about page
- [ ] Individual portraits for About page bios → `src/assets/team/`, update `about.astro`
- [ ] Trust-signal logos: Moët Hennessy, Heineken, Veuve Clicquot, Belvedere, Heroes Technology, Sports Laboratory → `src/assets/brand-logos/`, update `about.astro`
- [ ] Default OG image → `public/og-default.png` (1200×630)
- [ ] Favicon → already present, swap when brand mark lands

**Config (`src/config.ts`)**
- [ ] `contactBiraj.phone` / `contactBiraj.phoneHref` — Biraj phone number (needed for "Call Biraj" CTA)
- [ ] `contact.linkedin` — LinkedIn URL
- [ ] `contact.calendly` — Calendly embed URL (unlocks `/contact` embed + all CTA buttons)
- [ ] `ga4MeasurementId` — Google Analytics 4 ID (e.g. `G-XXXXXXXXXX`)

**Content**
- [ ] 1-2 additional short testimonials → add to `src/content/testimonials.json` (homepage shows 3-4, currently 2)
- [ ] New London Light case study needs a client testimonial (`pullQuote` in frontmatter)
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
- **Original brief**: `docs/Purpose_Brands_Build_Brief.docx`
- **V2 feedback/amends**: `docs/PB Website V2.docx` — content restructure, copy rewrite, section reordering per client feedback
