# Editing site content

You have two ways to edit content:

1. **The CMS at `/admin`** (recommended for non-developers). Sign in with GitHub, edit in a friendly form, click Save. Your edit becomes a commit on the repo and the live site updates in ~2 minutes.
2. **Editing files directly** in this folder, if you're working in the codebase. The rest of this guide covers that path.

Both paths edit the same files — pick whichever feels easier.

All editable text on the site lives in this folder. Open the file you want to edit, change the text in quotes, save. The site picks it up on the next build (or instantly during `npm run dev`).

## Rules of the road

- **Keep the punctuation around text.** `"` quotes, `,` commas, `[` `]` brackets, `{` `}` braces — those are JSON syntax. Touch the words, leave the punctuation.
- **Apostrophes in JSON** must be plain (`'`) or, if they break the file, escape with `\'`. Double quotes inside text must be escaped as `\"` (e.g. `"\"They get shit done.\""`).
- **Em dashes (`—`) and curly apostrophes (`'`)** are fine — paste them in as-is.
- **`id` fields** uniquely identify each entry. Don't change them or the page will break.
- **`order` fields** control display order — lowest number first.
- **`featured: true`** on a case study or testimonial means it shows on the homepage. Set to `false` to hide without deleting.
- After editing, run `npx astro check` if you want to confirm nothing is broken before pushing.

---

## Top-level files

### `settings/site.json` — site-wide settings

Single record. Edit values, keep keys.

| Field              | What it does                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `name`             | Site name (used in page titles, footer, OG tags)                                                                   |
| `tagline`          | Short tagline appended to the homepage `<title>`                                                                   |
| `url`              | Production URL — used for canonical links, OG, sitemap                                                             |
| `description`      | Default meta description (overridden per page)                                                                     |
| `ga4MeasurementId` | Google Analytics 4 ID (e.g. `G-XXXXXXXXXX`). Leave empty to disable analytics.                                     |
| `calendly`         | Calendly embed URL. When empty, all "Let's talk" CTAs route to `/contact`; when set, they go straight to Calendly. |
| `linkedin`         | LinkedIn URL used in footer + contact page                                                                         |
| `cookies`          | Cookie banner copy: `body`, `declineLabel`, `allowLabel`                                                           |
| `cta`              | Defaults for the bottom-of-page CTA block: `defaultHeadline`, `defaultSubtext`, `defaultLabel`, `dualCtaPrefix` (e.g. `"Call "` → "Call Phoebe") |

### `contacts/` — Phoebe + Biraj contact records

One file per contact: `phoebe.json` and `biraj.json`. `phoebe` is the primary contact (used in footer, homepage hero, contact page). `biraj` is used in the homepage dual-CTA "Call Biraj" button. The filename becomes the contact's id; don't rename.

| Field       | Notes                                                         |
| ----------- | ------------------------------------------------------------- |
| `name`      | First name only (shown in "Call Phoebe" / "Call Biraj" CTAs)  |
| `primary`   | Don't change — `true` for Phoebe, `false` for Biraj           |
| `email`     | Email address (used as `mailto:` link)                        |
| `phone`     | Display version with formatting (e.g. `+44 (0) 7525 836 824`) |
| `phoneHref` | Click-to-call version, no spaces (e.g. `tel:+447525836824`)   |

### `nav-items/` — top navigation

One file per link. Filename becomes the id. `order` controls left-to-right order.

### `client-logos/` — logo strip on homepage

One file per logo. Filename should match `src/assets/clients/<filename>.svg` once real logos land.

### `footer/footer.json` — footer copy

Single record. Edit the tagline, the SAS badge text (`badge` is a list of two lines), section headings, and the bottom-right meta line ("Made on the South Devon coast.").

### `testimonials/` — testimonial records

One file per testimonial. Filename becomes the id. Each file has:

- `quote` — full quote (used on case study pages where space allows)
- `shortQuote` — shorter version for homepage cards (optional; falls back to `quote`)
- `author` — name
- `title` — role + brand
- `featured: true` to show on homepage
- `order` — controls display order

---

## Page copy (`pages/`)

Each file is one page. Structure mirrors the page sections.

### `pages/home.json`

- `hero` — headline (the big quote), attribution, sub-paragraph, CTA labels
- `proofStats` — three big stats above the logo strip (value + label)
- `testimonialsSection` — eyebrow + heading above the testimonial cards
- `whoWeAre` — the "We're Phoebe and Biraj" section (eyebrow, heading, body paragraphs, CTA)
- `howItWorks` — the three-step block (eyebrow, heading, items)
- `services` — the four-service block (eyebrow, heading, items)
- `caseStudies` — eyebrow + heading + "All case studies →" CTA above the case study grid

### `pages/about.json`

- `title` / `description` — used in `<title>` and meta description
- `intro` — eyebrow, heading, body paragraphs
- `bios` — list of founder bios. Each has `eyebrow`, `name`, `photoLabel`, `lede` (big intro line), `body` (paragraphs), `trustList` (brand pills), `reverse` (set `true` to flip image to the right)
- `sas` — SAS Ocean Network paragraph

### `pages/work.json`

- `title` / `description` — meta
- `head` — eyebrow, heading, sub-paragraph
- `cta` — bottom-of-page CTA headline + subtext
- `labels` — text used across the case study cards and detail pages:
  - `challenge` / `whatWeDid` / `results` — section headings on `/work` cards
  - `situation` — heading on individual case study pages (replaces `challenge` heading there)
  - `readMore` — "Read full case study →" link label
  - `backLink` — "← All work" link on a case study detail page
  - `pagerPrev` / `pagerNext` — eyebrow labels for the prev/next pager

### `pages/contact.json`

- `title` / `description` — meta
- `head` — page heading + sub-paragraph
- `calendlyLabel` — eyebrow above the Calendly embed
- `calendly` — Calendly iframe + placeholder copy:
  - `iframeTitle` — accessible title for the embedded iframe
  - `placeholderHeading` — bold line shown when no Calendly URL is set
  - `placeholderBody` — body sentence (rendered as `[name] [body] [email]`)
- `form.fields` — form field list. **Don't change `id` values** — they map to Netlify form submissions
- `form.submitLabel` — submit button text
- `form.honeypotLabel` — anti-spam label, hidden from view
- `details` — labels for the email / phone / LinkedIn list

### `pages/not-found.json`

- `title` — `<title>` for the 404 page
- `eyebrow` / `heading` / `sub` — page copy
- `primaryCta` / `secondaryCta` — `{ label, href }` for the two buttons

---

## Case studies (`case-studies/`)

One markdown file per case study. The filename (e.g. `goodrays.md`) becomes the URL slug (`/work/goodrays`).

The frontmatter (YAML at the top, between the `---` lines) controls the content. The body of the file is currently unused — all content is in the frontmatter.

| Field            | Notes                                                 |
| ---------------- | ----------------------------------------------------- |
| `title`          | Page `<title>`                                        |
| `brand`          | Brand name shown in card                              |
| `order`          | Display order on `/work` (lowest first)               |
| `regions`        | List of markets, e.g. `[UK, US]`                      |
| `engagement`     | Type of work (e.g. "Vendor management + brand store") |
| `headline`       | Card headline                                         |
| `challenge`      | "The situation" section copy                          |
| `whatWeDid`      | "What we did" section copy                            |
| `results`        | List of result bullets                                |
| `heroStat`       | Optional. `value` + `label` for the big stat block    |
| `pullQuote`      | Optional. `quote` + `author` for client quote         |
| `featured: true` | Show on homepage case-study grid                      |

To add a new case study, copy an existing `.md`, rename, edit the frontmatter, set `featured: true` if it should appear on the homepage.

---

## Got stuck?

- Save the file you broke and run `npx astro check`. The error message tells you the line number and what's wrong.
- If JSON breaks because of an unescaped quote, search the line for a `"` inside a value and replace with `\"`.
- The build will fail loudly if a required field is missing — fix the field, save, rebuild.
