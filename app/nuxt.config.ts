// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

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

    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    ui: {
        theme: {
            colors: ['picton-blue'],
        }
    },

    modules: [
        "@nuxt/ui",
        'nuxt-security',
        '@nuxt/content',
        '@nuxt/ui',
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

    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },
        optimizeDeps: {
            include: [
                'remark-gfm',
                'remark-emoji',
                'remark-mdc',
                'remark-rehype',
                'rehype-raw',
                'parse5',
                'unist-util-visit',
                'unified',
                'debug'
            ]
        }
    },

    security: {
        nonce: true,
        headers: {
            contentSecurityPolicy: {
                'img-src': ["'self'", "data:", "https:"],
                'script-src': [
                    "'self'",
                    "https:",
                    "'unsafe-inline'",
                    "'unsafe-eval'", // <--- REQUIRED for WebAssembly/SQLite
                    "'wasm-unsafe-eval'", // <--- Modern browsers prefer this for WASM
                ],
                // Also recommended: allow connect-src if your API is on a different domain
                'connect-src': [
                    "'self'",
                    "https:", process.env.AWS_API_URL || '',
                    "https://static.cloudflareinsights.com/"
                ]
            }
        },
    },

})
