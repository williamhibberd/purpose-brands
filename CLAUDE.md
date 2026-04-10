# purpose-brands

Astro 6 minimal starter project. Fresh scaffold — `src/pages/index.astro` is the only page.

## Stack
- **Astro** `^6.1.5` (ESM, `type: module`)
- **TypeScript** extending `astro/tsconfigs/strict`
- **Node** `>=22.12.0`

## Commands
- `npm run dev` — dev server at `localhost:4321`
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview production build
- `npm run astro -- <cmd>` — Astro CLI (e.g. `astro add`, `astro check`)

## Layout
- `src/pages/` — file-based routes (`.astro` / `.md`)
- `public/` — static assets served as-is
- `astro.config.mjs` — currently empty `defineConfig({})`
