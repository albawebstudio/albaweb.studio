// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: process.env.AWS_API_URL,
      gtagId: process.env.GAG_ID,
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [
    '/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    'nuxt-security',
    '@nuxt/content',
    'nuxt-gtag',
  ],

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome'
    ]
  },

  gtag: {
    id: process.env.GAG_ID
  },

  content: {
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      },
      rehypePlugins: [
        'rehype-external-links'
      ]
    }
  },

})
