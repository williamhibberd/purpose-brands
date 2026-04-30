import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      brand: z.string(),
      order: z.number(),
      heroImage: image().optional(),
      regions: z.array(z.string()),
      engagement: z.string(),
      headline: z.string(),
      challenge: z.string(),
      whatWeDid: z.string(),
      results: z.array(z.string()),
      heroStat: z
        .object({
          value: z.string(),
          label: z.string(),
        })
        .optional(),
      pullQuote: z
        .object({
          quote: z.string(),
          author: z.string(),
        })
        .optional(),
      featured: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    shortQuote: z.string().optional(),
    author: z.string(),
    title: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const numberedItem = z.object({ title: z.string(), body: z.string() });
const headingOnly = z.object({ heading: z.string() });

const home = defineCollection({
  loader: glob({ pattern: 'home.json', base: './src/content/pages' }),
  schema: z.object({
    hero: z.object({
      headline: z.string(),
      sub: z.string(),
      primaryCtaLabel: z.string(),
      secondaryCtaLabel: z.string(),
      secondaryCtaHref: z.string(),
    }),
    proofStats: z.array(z.object({ value: z.string(), label: z.string() })),
    testimonialsSection: headingOnly,
    whoWeAre: headingOnly.extend({
      photoLabel: z.string(),
      body: z.array(z.string()),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
    howItWorks: headingOnly.extend({ items: z.array(numberedItem) }),
    services: headingOnly.extend({ items: z.array(numberedItem) }),
    caseStudies: headingOnly.extend({
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.json', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      intro: headingOnly.extend({ body: z.array(z.string()) }),
      bios: z.array(
        z.object({
          name: z.string(),
          photoLabel: z.string(),
          lede: z.string(),
          body: z.array(z.string()),
          trustList: z.array(z.string()),
          reverse: z.boolean().default(false),
        }),
      ),
      sas: z.object({
        body: z.string(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        cta: z.object({ label: z.string(), href: z.string() }).optional(),
      }),
    }),
});

const work = defineCollection({
  loader: glob({ pattern: 'work.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    head: headingOnly.extend({ sub: z.string() }),
    cta: z.object({ headline: z.string(), subtext: z.string() }),
    labels: z.object({
      challenge: z.string(),
      whatWeDid: z.string(),
      results: z.string(),
      readMore: z.string(),
      backLink: z.string(),
      situation: z.string(),
      pagerPrev: z.string(),
      pagerNext: z.string(),
    }),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    head: headingOnly.extend({ sub: z.string() }),
    calendly: z.object({
      iframeTitle: z.string(),
      placeholderHeading: z.string(),
      placeholderBody: z.string(),
    }),
    form: z.object({
      honeypotLabel: z.string(),
      fields: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          optionalLabel: z.string().optional(),
          type: z.enum(['text', 'email', 'textarea']),
          autocomplete: z.string().optional(),
          rows: z.number().optional(),
          required: z.boolean().optional(),
        }),
      ),
      submitLabel: z.string(),
    }),
    details: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        href: z.string(),
      }),
    ),
  }),
});

const notFound = defineCollection({
  loader: glob({ pattern: 'not-found.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    sub: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    url: z.string(),
    description: z.string(),
    ga4MeasurementId: z.string(),
    calendly: z.string(),
    linkedin: z.string(),
    cookies: z.object({
      body: z.string(),
      declineLabel: z.string(),
      allowLabel: z.string(),
    }),
    cta: z.object({
      defaultHeadline: z.string(),
      defaultSubtext: z.string(),
      label: z.string(),
      href: z.string(),
    }),
  }),
});

const contacts = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/contacts' }),
  schema: z.object({
    name: z.string(),
    primary: z.boolean().default(false),
    email: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
  }),
});

const navItems = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/nav-items' }),
  schema: z.object({
    label: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

const clientLogos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/client-logos' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/footer' }),
  schema: z.object({
    tagline: z.string(),
    badge: z.array(z.string()),
    navHeading: z.string(),
    contactHeading: z.string(),
    linkedinLabel: z.string(),
    metaText: z.string(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
  testimonials,
  home,
  about,
  work,
  contact,
  notFound,
  settings,
  contacts,
  navItems,
  clientLogos,
  footer,
};
