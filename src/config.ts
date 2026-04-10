// Central site config — edit these values in one place.
// Anything marked TODO must be replaced before launch.

export const site = {
  name: 'Purpose Brands',
  tagline: 'Your Amazon agency for food, drink, and wellness brands.',
  url: 'https://wearepurposebrands.com',
  description:
    'Purpose Brands is an Amazon agency for food, drink, and wellness brands. We manage your Amazon account, grow your sales, and protect your brand — with the same people, every single day.',
} as const;

export const contact = {
  email: 'phoebe@wearepurposebrands.com',
  phone: '+44 (0) 7525 836 824',
  phoneHref: 'tel:+447525836824',
  linkedin: '#', // TODO: Phoebe to provide LinkedIn URL
  calendly: '', // TODO: Phoebe to provide Calendly embed URL
} as const;

// Google Analytics 4 measurement ID. Leave empty to disable analytics entirely.
// When set, the GA script is loaded only after the user accepts the cookie banner.
export const ga4MeasurementId = ''; // TODO: e.g. 'G-XXXXXXXXXX'

// Until Calendly is wired up, CTA buttons fall back to /contact.
export const bookCallHref = contact.calendly || '/contact';

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
] as const;

// Client logos shown in the "Trusted by" strip.
// Logo files go in src/assets/clients/<slug>.svg (or .png) — placeholders until Phoebe provides.
export const clientLogos = [
  { name: 'Salcombe Gin', slug: 'salcombe-gin' },
  { name: 'New London Light', slug: 'new-london-light' },
  { name: 'Folc', slug: 'folc' },
  { name: 'Goodrays', slug: 'goodrays' },
  { name: 'Well Lab', slug: 'well-lab' },
  { name: 'Cru', slug: 'cru' },
  { name: 'Always Ready', slug: 'always-ready' },
  { name: 'Happy Heroes', slug: 'happy-heroes' },
  { name: 'Sports Laboratory', slug: 'sports-laboratory' },
  { name: 'CampKerala', slug: 'campkerala' },
  { name: 'The Uncommon', slug: 'the-uncommon' },
  { name: 'Common Functional Drinks', slug: 'common-functional-drinks' },
  { name: 'Salt Brewing', slug: 'salt-brewing' },
  { name: "Willy's ACV", slug: 'willys-acv' },
  { name: 'Holos', slug: 'holos' },
  { name: '1936 Bière', slug: '1936-biere' },
] as const;
