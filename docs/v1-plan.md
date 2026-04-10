# Purpose Brands — Website Build Plan

## Context
Purpose Brands is an Amazon agency for food, drink, and wellness brands (founders Phoebe Bocchinelli + Biraj Parmar). They need a marketing site: **Home**, **About**, **Work** (case studies), **Contact**. The brief (copy, structure, dev notes, assets list) lives in `docs/Purpose_Brands_Build_Brief.docx`. Reference aesthetic: [elevatefmcg.com](https://elevatefmcg.com) — editorial, dark-leaning, serif display headlines + geometric sans body, heavy on whitespace, numbered sections.

Current repo: fresh Astro 6 minimal starter (empty `src/pages/index.astro`). Node `>=22.12.0`. TypeScript strict already on.

**User decisions confirmed**
1. Brand identity assets live in Figma — I'll scaffold with placeholders and wire in the logo SVG, brand purple hex, and licensed typeface from Figma during build.
2. Content editing → **markdown files only** via Astro content collections (no CMS UI).
3. Hosting → **Netlify** (with Netlify Forms for the contact form).
4. Typography → same spirit as Elevate (serif display + geometric sans), **different fonts** so it doesn't feel derivative. Proposing **Fraunces** (display serif) + **Inter** (body sans), self-hosted via `@fontsource-variable`. Easy to swap if Figma specifies a different pair.

---

## Stack additions
| Package | Why |
|---|---|
| `@astrojs/netlify` | Netlify deploy adapter (static output; form handling is Netlify-native) |
| `@astrojs/sitemap` | Sitemap for SEO |
| `@tailwindcss/vite` + `tailwindcss@4` | Tailwind v4 (Astro 6 recommended install path) |
| `@fontsource-variable/fraunces` + `@fontsource-variable/inter` | Self-hosted variable fonts (no network request, no CLS) |
| `astro-seo` | Clean meta/OG tag component |

No React/Vue/Svelte islands — every section in the brief is static markup. Keeps bundle near-zero JS. The only interactive bits are the mobile nav toggle, logo-strip marquee, and cookie banner — all vanilla JS in small `<script>` blocks.

---

## File layout
```
src/
├── layouts/
│   └── Base.astro              # <html>, fonts, SEO meta, GA4, cookie banner, nav, footer
├── components/
│   ├── Nav.astro               # sticky header; mobile hamburger; “Book a Call” CTA
│   ├── Footer.astro            # logo, SAS badge, contact, LinkedIn, © 2026
│   ├── Button.astro            # primary (brand purple fill) + secondary (outline) variants
│   ├── Section.astro           # wrapper with consistent vertical rhythm + container widths
│   ├── LogoStrip.astro         # scrolling marquee (CSS-only keyframes, pauses on hover)
│   ├── NumberedList.astro      # 1–2–3 “why us” / services layout
│   ├── CaseStudyCard.astro     # product image + logo + one-line headline (home)
│   ├── CaseStudyLong.astro     # image-left/text-right challenge/what-we-did/results (work)
│   ├── TestimonialCard.astro   # quote + name + title
│   ├── ComparisonTable.astro   # Purpose Brands vs Other Agencies two-column
│   ├── CtaBlock.astro          # bottom CTA with headline/subtext/button/contact
│   ├── CalendlyEmbed.astro     # iframe wrapper with loading state
│   └── CookieBanner.astro      # minimal GDPR banner; gates GA4
├── content/
│   ├── config.ts               # zod schemas for the collections below
│   ├── case-studies/           # goodrays.md, salcombe.md, new-london-light.md, holos.md
│   ├── testimonials/           # eoin-keenan.md, howard-davies.md, ...
│   └── client-logos/           # one .json or an index.ts exporting the logo list
├── pages/
│   ├── index.astro             # Home: hero, logo strip, why-us, services, case cards, testimonials, vs, bottom CTA
│   ├── about.astro             # Intro, Phoebe bio + trust logos, Biraj bio + trust logos
│   ├── work/
│   │   ├── index.astro         # Lists all case studies
│   │   └── [slug].astro        # Full case study page (challenge/what-we-did/results + testimonial)
│   └── contact.astro           # Headline, form (Netlify), Calendly embed, contact details
├── styles/
│   └── global.css              # Tailwind v4 @theme tokens: brand purple, charcoal, off-white, type scale
└── assets/
    ├── brand/                  # logo.svg, wordmark.svg, sas-ocean-network.svg
    ├── clients/                # 16 client logos (SVG/PNG) — placeholders until Phoebe delivers
    └── work/                   # product hero images for case studies — placeholders
```

---

## Content collections (`src/content/config.ts`)
```ts
import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),                      // "Goodrays CBD"
    slug: z.string(),                       // "goodrays"
    order: z.number(),                      // display order
    heroImage: image(),
    logo: image(),
    regions: z.array(z.string()),           // ["UK"]
    engagement: z.string(),                 // "Vendor (special invite) | Full account management"
    headline: z.string(),                   // home-card one-liner
    challenge: z.string(),
    whatWeDid: z.string(),
    results: z.array(z.string()),           // bullet list
    pullQuote: z.object({
      quote: z.string(),
      author: z.string(),
    }).optional(),
    featured: z.boolean().default(false),   // show on home
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    quote: z.string(),
    author: z.string(),
    title: z.string(),                      // "Founder, Goodrays"
    photo: image().optional(),
    order: z.number(),
  }),
});

export const collections = { 'case-studies': caseStudies, testimonials };
```
Each case study is one markdown file — Phoebe (or you) edits text in-place and commits. The home page pulls `featured: true` items, `/work` pulls all and sorts by `order`.

---

## Design tokens (`src/styles/global.css`)
Tailwind v4 uses an `@theme` block — tokens become CSS custom properties *and* utility classes automatically.

```css
@import "tailwindcss";

@theme {
  /* Placeholders — replace with Figma exact values */
  --color-brand-purple: #5b2ee0;       /* primary CTA fill */
  --color-brand-purple-ink: #2b1270;   /* darker variant */
  --color-ink: #0e0e10;                /* near-black text */
  --color-surface: #fafaf7;            /* warm off-white bg */
  --color-mute: #6b6b70;               /* secondary text */
  --color-hairline: #e6e6e1;           /* dividers */

  --font-display: "Fraunces Variable", ui-serif, Georgia, serif;
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;

  --text-display-xl: clamp(3rem, 6vw + 1rem, 6.5rem);
  --text-display-lg: clamp(2.25rem, 3.5vw + 1rem, 4.25rem);
  --text-display-md: clamp(1.75rem, 2vw + 1rem, 2.75rem);
}

html { font-family: var(--font-sans); color: var(--color-ink); background: var(--color-surface); }
h1, h2, h3 { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.02em; }
```

Rationale for Fraunces + Inter:
- **Fraunces Variable** — contemporary serif with optical size + "softness" axes; pairs premium gravitas with warmth. Free, self-hostable.
- **Inter Variable** — workhorse UI sans that's neutral enough to let the serif do the talking.
- Both are OFL-licensed, zero runtime cost via `@fontsource-variable/*`, no FOIT.

---

## Page-by-page build

### Home (`src/pages/index.astro`)
1. `<Nav />`
2. **Hero** — full-bleed `Section`, dark surface variant. H1 headline, subheadline, primary `Button` ("Book a free call"), secondary text link ("See our work →"), contact row (email + phone) visible without scroll. No animation.
3. **Logo strip** — `LogoStrip` component, CSS marquee (no JS lib). Label: "Trusted by brands who stand for something".
4. **Why us** — `NumberedList` with the 3 statements from brief §Why Us.
5. **Services** — `NumberedList` (4 items). Space to add a 5th later (Global Expansion / US Launch) per brief note.
6. **Case study cards** — grid of `CaseStudyCard`, pulling `featured: true` from the collection.
7. **Testimonials** — `TestimonialCard` stacked on desktop, carousel only if more than 3 testimonials ever get added (deferred).
8. **What sets us apart** — `ComparisonTable`, two-column.
9. **Bottom CTA** — `CtaBlock`.
10. `<Footer />`

### About (`src/pages/about.astro`)
- Intro paragraphs (from brief, marked clearly as draft copy for Phoebe to rewrite).
- Phoebe bio + Moët Hennessy / Heineken / Veuve Clicquot / Belvedere logos as trust signals (placeholder imgs).
- Biraj bio + Heroes Technology / Sports Laboratory logos.
- Bottom CTA.

### Work (`src/pages/work/index.astro`)
- Heading + intro line.
- Maps every case study → `CaseStudyLong` (image left, text right on desktop; stacked mobile). Each card links to `/work/[slug]` for the full page.
- Bottom CTA.

### Work detail (`src/pages/work/[slug].astro`)
- `getStaticPaths()` over the case-studies collection.
- Hero image, title, regions/engagement, challenge, what we did, results bullets, pull-quote, next/prev case study.

### Contact (`src/pages/contact.astro`)
- Headline + subtext from brief.
- Contact details (email, phone, LinkedIn placeholder).
- **Form**: native HTML `<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">` — zero backend code. Fields: Name, Email, Brand name (optional), Message (textarea). Submissions appear in Netlify dashboard + email to `phoebe@wearepurposebrands.com` (set in Netlify UI post-deploy).
- `CalendlyEmbed` below the form. Until Phoebe provides the link, iframe points to `about:blank` with a "Calendly link coming soon" placeholder.

---

## Global concerns

**SEO**
- `Base.astro` takes `title`, `description`, `ogImage` props and emits `<title>`, `<meta>`, OG, Twitter card via `astro-seo`.
- `@astrojs/sitemap` integration in `astro.config.mjs`.
- Clean URLs (Astro default), `robots.txt` in `public/`.

**Analytics + consent**
- GA4 script gated by `CookieBanner` — no tracking until consent. Banner is a small dismissable strip at the bottom, writes `pb_consent=granted|denied` to localStorage, fires a custom event that `Base.astro` listens for to inject the GA4 snippet. Matches the brief's "no pop-ups / no dark patterns" rule: small, honest, dismissable.

**Performance budget**
- Target the brief's ≤3s load:
  - No JS framework, no client islands by default.
  - Self-hosted variable fonts, `font-display: swap`.
  - Astro `<Image />` for all bitmap assets (auto webp/avif + responsive `srcset`).
  - Lighthouse target: 95+ across the board. Will verify pre-launch.

**Accessibility**
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Colour contrast verified against brand purple once Figma hex lands.
- Focus-visible styles on all interactive elements.
- Skip link in `Base.astro`.

**Netlify config (`netlify.toml`)**
- `[build] command = "npm run build"`, `publish = "dist"`.
- Form notifications to `phoebe@wearepurposebrands.com` configured in Netlify dashboard (manual — document in README).
- Security headers (`X-Frame-Options`, `Referrer-Policy`, a conservative CSP that allows Calendly + Google Fonts + GA4).

---

## Assets handled with placeholders
Per the brief's "Phoebe to do" list, the following will ship with clearly-marked placeholders (README will list them so nothing gets missed at launch):
- Logo SVG, wordmark, SAS Ocean Network badge
- 16 client logos (`src/assets/clients/`)
- Product photos for Goodrays, Salcombe, New London Light, Holos
- Casual photos of Phoebe and Biraj
- Corporate trust-signal logos (Moët Hennessy, Heineken, Veuve Clicquot, Belvedere, Heroes Technology, Sports Laboratory)
- Final bio copy for Phoebe + Biraj
- Calendly link → drop into `src/config.ts` constant
- LinkedIn URL → same
- Brand purple exact hex, typeface (if Figma differs from Fraunces/Inter) → swap in `global.css`

---

## Implementation order (execution phase)
1. **Foundation** — install deps (Tailwind v4, Netlify adapter, sitemap, fontsource, astro-seo); set up `global.css` tokens; `Base.astro` layout with nav/footer skeletons; `netlify.toml`.
2. **Primitives** — `Button`, `Section`, `NumberedList`, `LogoStrip` components + a Storybook-free visual sanity check by wiring them into `index.astro` one at a time.
3. **Content collections** — `config.ts` + seed every case study and testimonial from the brief into markdown files with placeholder images.
4. **Home page** — wire all sections end-to-end with real copy from brief.
5. **About + Work index + Work detail + Contact** — in that order.
6. **Global concerns** — SEO meta, sitemap, GA4 + cookie banner, favicon, `robots.txt`, 404 page.
7. **Polish** — Lighthouse pass, axe a11y pass, responsive check at 375 / 768 / 1024 / 1440, tidy README with Phoebe's asset checklist + Netlify deploy steps.

---

## Verification
- `npm run dev` → walk through every page at mobile + desktop widths; confirm nav sticky behaviour, mobile hamburger, logo strip marquee, comparison table layout.
- `npm run build && npm run preview` → confirm static output, no console errors, all routes render.
- `npx astro check` → TypeScript + content schema validation passes.
- Lighthouse (Chrome DevTools) on each page → Performance, Accessibility, Best Practices, SEO all ≥ 95.
- Submit the contact form in preview → confirm Netlify Forms captures it once deployed.
- Manual a11y pass: keyboard-only navigation, screen reader landmark check, focus visibility.
- Deploy preview to Netlify; share link for Phoebe to review before pointing DNS.

---

## Out of scope for v1 (explicit non-goals)
- Blog / CMS UI — brief says "add blog posts later"; collection can be added without refactor.
- Internationalisation — single-locale (en-GB) for launch.
- Dark mode toggle — pick one light/dark surface treatment from Figma and commit.
- Client-side search, filtering, animations beyond the logo marquee and subtle hover states.
