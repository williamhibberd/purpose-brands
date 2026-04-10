// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wearepurposebrands.com',
  integrations: [sitemap()],
  adapter: netlify({ edgeMiddleware: false }),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
