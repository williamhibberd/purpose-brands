import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    order: z.number(),
    heroImage: z.string().optional(),
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
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    shortQuote: z.string().optional(),
    author: z.string(),
    title: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const numberedItem = z.object({ title: z.string(), body: z.string() });
const sectionHead = z.object({ eyebrow: z.string(), heading: z.string() });

const home = defineCollection({
  loader: file('./src/content/pages/home.json'),
  schema: z.object({
    hero: z.object({
      headline: z.string(),
      attribution: z.string(),
      sub: z.string(),
      primaryCtaLabel: z.string(),
      secondaryCtaLabel: z.string(),
      secondaryCtaHref: z.string(),
    }),
    proofStats: z.array(z.object({ value: z.string(), label: z.string() })),
    testimonialsSection: sectionHead,
    whoWeAre: sectionHead.extend({
      photoLabel: z.string(),
      body: z.array(z.string()),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
    howItWorks: sectionHead.extend({ items: z.array(numberedItem) }),
    services: sectionHead.extend({ items: z.array(numberedItem) }),
    caseStudies: sectionHead.extend({
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
  }),
});

const about = defineCollection({
  loader: file('./src/content/pages/about.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    intro: sectionHead.extend({ body: z.array(z.string()) }),
    bios: z.array(
      z.object({
        eyebrow: z.string(),
        name: z.string(),
        photoLabel: z.string(),
        lede: z.string(),
        body: z.array(z.string()),
        trustList: z.array(z.string()),
        reverse: z.boolean().default(false),
      }),
    ),
    sas: z.object({ body: z.string() }),
  }),
});

const work = defineCollection({
  loader: file('./src/content/pages/work.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    head: sectionHead.extend({ sub: z.string() }),
    cta: z.object({ headline: z.string(), subtext: z.string() }),
  }),
});

const contact = defineCollection({
  loader: file('./src/content/pages/contact.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    head: sectionHead.extend({ sub: z.string() }),
    calendlyLabel: z.string(),
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
    details: z.object({
      emailLabel: z.string(),
      phoneLabel: z.string(),
      linkedinLabel: z.string(),
      linkedinText: z.string(),
    }),
  }),
});

const settings = defineCollection({
  loader: file('./src/content/settings.json'),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    url: z.string(),
    description: z.string(),
    ga4MeasurementId: z.string(),
    calendly: z.string(),
    linkedin: z.string(),
  }),
});

const contacts = defineCollection({
  loader: file('./src/content/contacts.json'),
  schema: z.object({
    name: z.string(),
    primary: z.boolean().default(false),
    email: z.string(),
    phone: z.string(),
    phoneHref: z.string(),
  }),
});

const navItems = defineCollection({
  loader: file('./src/content/navItems.json'),
  schema: z.object({
    label: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

const clientLogos = defineCollection({
  loader: file('./src/content/clientLogos.json'),
  schema: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

const footer = defineCollection({
  loader: file('./src/content/footer.json'),
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
  settings,
  contacts,
  navItems,
  clientLogos,
  footer,
};
