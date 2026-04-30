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
- **Self-hosted Maax Raw** (`src/assets/fonts/`, 205TF) — bundled + hashed by Vite

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
│   ├── settings/site.json     # Site name, URL, GA4 ID, Calendly URL, LinkedIn URL, cookie + CTA defaults
│   ├── footer/footer.json     # Footer copy (tagline, badge, headings, meta)
│   ├── pages/
│   │   ├── home.json          # Homepage copy (hero, sections, services)
│   │   ├── about.json         # About page (intro, bios, SAS)
│   │   ├── work.json          # /work index head, bottom CTA, case study labels
│   │   ├── contact.json       # /contact head, form labels, Calendly placeholder
│   │   └── not-found.json     # 404 page copy
│   ├── contacts/              # One file per contact (phoebe.json, biraj.json)
│   ├── nav-items/              # One file per nav link (home.json, about.json, …)
│   ├── client-logos/           # One file per logo (salcombe-gin.json, …)
│   ├── testimonials/           # One file per testimonial (eoin-keenan.json, …)
│   └── case-studies/           # One .md per case study (with heroStat frontmatter)
├── components/
│   ├── ProofBar.astro         # Stat bar: large numbers + labels
│   ├── CtaBlock.astro         # CTA block, single button driven by settings.cta
│   ├── CaseStudyCard.astro    # Card with optional heroStat display
│   ├── TestimonialCard.astro  # Quote card with shortQuote support
│   ├── ImageOverlay.astro     # Full-bleed image w/ overlaid text + optional CTA
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
| Site name / URL / Calendly URL / GA4 ID / LinkedIn / cookie banner / default CTA | `src/content/settings/site.json` |
| Phoebe or Biraj email/phone | `src/content/contacts/<name>.json` |
| Top nav links | `src/content/nav-items/<page>.json` |
| Client logo strip | `src/content/client-logos/<slug>.json` |
| Footer tagline / SAS badge / meta line | `src/content/footer/footer.json` |
| Homepage copy (hero, services, etc.) | `src/content/pages/home.json` |
| About page (bios, intro, SAS section) | `src/content/pages/about.json` |
| /work index intro + case study section labels | `src/content/pages/work.json` |
| /contact intro + form labels + Calendly placeholder | `src/content/pages/contact.json` |
| 404 page copy | `src/content/pages/not-found.json` |
| Case studies (cards + detail pages) | `src/content/case-studies/*.md` |
| Testimonials | `src/content/testimonials/<slug>.json` |

Schemas are enforced — `npx astro check` validates everything before deploy.

## Sveltia CMS (`/admin`)

Phoebe edits content in the browser at **`https://wearepurposebrands.com/admin`**. Saving commits to the GitHub repo and triggers a Netlify deploy (~2 min).

OAuth runs as a Netlify Edge Function in this same site — no Cloudflare account needed. Source: [`netlify/edge-functions/sveltia-auth.ts`](./netlify/edge-functions/sveltia-auth.ts) (ported from `sveltia/sveltia-cms-auth`).

**Setup (one-time):**

1. **Create a GitHub OAuth App** at <https://github.com/settings/developers>:
   - Homepage URL: `https://wearepurposebrands.com`
   - Authorization callback URL: `https://wearepurposebrands.com/admin/callback`
   - Save the Client ID + Client Secret.
2. **Add three environment variables** in Netlify (Site settings → Environment variables):
   - `GITHUB_CLIENT_ID` = the OAuth App Client ID
   - `GITHUB_CLIENT_SECRET` = the OAuth App Client Secret
   - `ALLOWED_DOMAINS` = `wearepurposebrands.com,*.netlify.app` (so deploy previews can also auth)
3. **Update `public/admin/config.yml`** — replace `REPLACE_ME/purpose-brands` with `<github-org>/purpose-brands`. Confirm `branch: master` matches your default branch.
4. **Push to GitHub**, wait for Netlify deploy, visit `/admin`, click "Sign in with GitHub", authorize the OAuth app.

The edge function only handles `/admin/auth` and `/admin/callback`; everything else under `/admin/` is the static CMS bundle.

**Image uploads** go to `src/assets/uploads/`. Sveltia writes the path into the JSON; Astro's `image()` helper validates and `<Image />` optimizes (WebP/AVIF, responsive srcsets) at build time.

**Schemas live twice** — Zod in `src/content.config.ts` (build-time validation) and YAML in `public/admin/config.yml` (CMS UI). When you change one, change the other. CI catches drift via `astro check`.

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
- [ ] Biraj phone (`src/content/contacts/biraj.json` → `phone` / `phoneHref`) — used by Footer
- [ ] LinkedIn URL (`src/content/settings/site.json` → `linkedin`)
- [ ] Calendly embed URL (`src/content/settings/site.json` → `calendly`) — unlocks `/contact` embed
- [ ] Default CTA target (`src/content/settings/site.json` → `cta.href`, defaults to `/contact`)
- [ ] GA4 measurement ID (`src/content/settings/site.json` → `ga4MeasurementId`, e.g. `G-XXXXXXXXXX`)
- [ ] `/contact` page contact details list (`src/content/pages/contact.json` → `details[]`) — repeating label/value/href rows; add WhatsApp, swap LinkedIn href, etc. (decoupled from `contacts/*.json`)

**Content**
- [ ] 1-2 additional short testimonials → add to `src/content/testimonials/<slug>.json` (homepage shows 3-4, currently 2)
- [ ] New London Light case study needs a client testimonial (`pullQuote` in frontmatter)
- [ ] About page SAS section background image (`src/content/pages/about.json` → `sas.image`, optional `sas.cta`) — uploaded via Sveltia; falls back to flat dark panel if missing
- [ ] Confirm all case study metrics are still accurate
- [ ] Permission confirmed from all brands to use logos + quotes publicly

**Brand tokens (`src/styles/global.css`)**
- Brand purple `#7479e2` and logo SVG are wired in
- Self-hosted **Maax Raw** (body, bold headlines, buttons, labels, credits) from 205TF is loaded from `src/assets/fonts/` via `@font-face` at the top of `global.css`. To swap or add weights, drop the new `.woff2` files in and update the declarations there.

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
