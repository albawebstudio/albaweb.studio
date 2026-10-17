import {defineContentConfig, defineCollection} from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        legal: defineCollection({
            type: 'page',
            source: 'legal/**/*.md',
            schema: z.object({
                last_updated_at: z.string(),
            })
        }),
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md',
            schema: z.object({
                last_updated_at: z.string().optional(),
                backgroundImage: z.string().optional(),
            }),
        }),
    }
})
