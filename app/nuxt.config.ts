// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    devtools: {enabled: true},

    runtimeConfig: {
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
        apiUrl: process.env.AWS_API_URL,
        public: {
            gtagId: process.env.GAG_ID,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
            honeypotThreshold: process.env.HONEYPOT_THRESHOLD ?? "5",
        }
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    css: [
        '~/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    modules: [
        "@nuxtjs/tailwindcss",
        'nuxt-security',
        '@nuxt/content',
        'nuxt-gtag',
        'nuxt-lodash',
        '@pinia/nuxt',
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

    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
    },

})
