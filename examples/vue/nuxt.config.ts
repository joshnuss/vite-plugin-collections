import collection from 'vite-plugin-collections'
import * as z from 'zod'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [
      collection({
        base: 'posts',
        fields: z.object({
          title: z.string().nonempty(),
          summary: z.string().optional()
        })
      })
    ]
  }
})
