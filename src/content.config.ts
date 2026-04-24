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

export const collections = { 'case-studies': caseStudies, testimonials };
