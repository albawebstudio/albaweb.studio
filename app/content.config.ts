import {defineContentConfig, defineCollection} from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        /*blog: defineCollection({
            type: 'page',
            source: 'blog/!**!/!*.md',
            schema: z.object({
                categories: z.array(z.string()),
                backgroundImage: z.string(),
                last_updated_at: z.date()
            }),
            indexes: [
                { columns: ['last_updated_at'] },
                { columns: ['title'] },
                { columns: ['categories'] },
            ],
        }),*/

        legal: defineCollection({
            type: 'page',
            source: 'legal/**/*.md',
            schema: z.object({
                last_updated_at: z.string(),
            })
        }),
    }
})
