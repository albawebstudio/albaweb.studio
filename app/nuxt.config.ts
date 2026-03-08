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
        '~/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    ui: {
        theme: {
            colors: ['picton-blue'],
        }
    },

    modules: [
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

    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': [
                    "'self'",
                    "data:",

                ],
                'script-src': [
                    "'self'",
                    "'unsafe-eval'",  // Required for the QR code library
                    'https:',
                    "'unsafe-inline'",
                    "https://static.cloudflareinsights.com/"
                ],
            }
        },
    },

    gtag: {
        id: process.env.GAG_ID
    },

    nitro: {
        preset: "cloudflare_module",
        experimental: {
            database: true, // Enable experimental database features
        },
        cloudflare: {
            deployConfig: true,
            nodeCompat: true,
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
