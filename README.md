# Purpose Brands

Marketing site for Purpose Brands — an Amazon agency for food, drink, and wellness brands.

Built with [Astro](https://astro.build) 6, Tailwind v4, deployed to Netlify.

## Stack
- **Astro 6** — static output, no JS framework islands (zero JS by default)
- **Tailwind v4** — design tokens defined in `src/styles/global.css` under `@theme`
- **Content collections** — all editable content (page copy, settings, contacts, nav, logos, footer, case studies, testimonials) lives under `src/content/`
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
├── content.config.ts          # Collection schemas (Zod)
├── lib/site.ts                # Helpers: getSettings, getPrimaryContact, getNavItems, etc.
├── content/
│   ├── EDITING.md             # ← Read this to edit any text on the site
│   ├── settings.json          # Site name, URL, GA4 ID, Calendly URL, LinkedIn URL
│   ├── contacts.json          # Phoebe + Biraj (email, phone)
│   ├── navItems.json          # Top-nav links
│   ├── clientLogos.json       # Logo strip on homepage
│   ├── footer.json            # Footer copy (tagline, badge, headings, meta)
│   ├── pages/
│   │   ├── home.json          # Homepage copy (hero, sections, services)
│   │   ├── about.json         # About page (intro, bios, SAS)
│   │   ├── work.json          # /work index head, bottom CTA, case study labels
│   │   ├── contact.json       # /contact head, form labels, Calendly placeholder
│   │   └── notFound.json      # 404 page copy
│   ├── case-studies/          # One .md per case study (with heroStat frontmatter)
│   └── testimonials.json      # Testimonial list (with shortQuote for homepage)
├── components/
│   ├── ProofBar.astro         # Stat bar: large numbers + labels
│   ├── CtaBlock.astro         # CTA block with optional dualCta mode
│   ├── CaseStudyCard.astro    # Card with optional heroStat display
│   ├── TestimonialCard.astro  # Quote card with shortQuote support
│   ├── Nav.astro              # Sticky header, "Let's talk" CTA
│   ├── Footer.astro           # Site footer
│   ├── Button.astro           # Primary/secondary/ghost variants
│   ├── Section.astro          # Light/dark/alt tone wrapper
│   ├── NumberedList.astro     # Numbered grid (how it works, services)
│   ├── LogoStrip.astro        # Scrolling client logo marquee
│   ├── CaseStudyLong.astro    # Full case study card for /work listing
│   ├── CalendlyEmbed.astro    # Calendly iframe or fallback
│   └── CookieBanner.astro     # GDPR consent, gates GA4
├── layouts/Base.astro         # Shared <html>, SEO, nav, footer, cookie banner
├── pages/
│   ├── index.astro            # Home (9 sections)
│   ├── about.astro            # Story, founder bios, SAS
│   ├── work/index.astro       # All case studies
│   ├── work/[slug].astro      # Individual case study with hero stat
│   ├── contact.astro          # Calendly + form
│   └── 404.astro
└── styles/global.css          # @theme tokens: brand purple, fonts, spacing
```

## Editing content
**All editable text lives under `src/content/`** — nothing in `.astro` files needs to change to update copy.

See **[`src/content/EDITING.md`](./src/content/EDITING.md)** for a full per-file guide. Quick reference:

| To change… | Edit |
|---|---|
| Site name / URL / Calendly URL / GA4 ID / LinkedIn | `src/content/settings.json` |
| Cookie banner copy + default CTA copy | `src/content/settings.json` |
| Phoebe or Biraj email/phone | `src/content/contacts.json` |
| Top nav links | `src/content/navItems.json` |
| Client logo strip | `src/content/clientLogos.json` |
| Footer tagline / SAS badge / meta line | `src/content/footer.json` |
| Homepage copy (hero, services, etc.) | `src/content/pages/home.json` |
| About page (bios, intro, SAS section) | `src/content/pages/about.json` |
| /work index intro + case study section labels | `src/content/pages/work.json` |
| /contact intro + form labels + Calendly placeholder | `src/content/pages/contact.json` |
| 404 page copy | `src/content/pages/notFound.json` |
| Case studies (cards + detail pages) | `src/content/case-studies/*.md` |
| Testimonials | `src/content/testimonials.json` |

Schemas are enforced — `npx astro check` validates everything before deploy.

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

**Settings + contacts**
- [ ] Biraj phone (`src/content/contacts.json` → `biraj.phone` / `biraj.phoneHref`) — needed for "Call Biraj" CTA
- [ ] LinkedIn URL (`src/content/settings.json` → `linkedin`)
- [ ] Calendly embed URL (`src/content/settings.json` → `calendly`) — unlocks `/contact` embed + all CTA buttons
- [ ] GA4 measurement ID (`src/content/settings.json` → `ga4MeasurementId`, e.g. `G-XXXXXXXXXX`)

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
