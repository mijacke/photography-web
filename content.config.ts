import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const portfolio = defineCollection({
  type: 'page',
  source: 'portfolio/**/*',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    location: z.string().optional(),
    cover: z.string().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
})

export default defineContentConfig({
  collections: {
    portfolio
  }
})
