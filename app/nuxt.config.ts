// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {enabled: true},

    runtimeConfig: {
        recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
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
                '@fortawesome/fontawesome-svg-core',
                '@fortawesome/free-solid-svg-icons',
                '@fortawesome/free-brands-svg-icons',
                'vue-recaptcha-v3', // CJS
                'date-fns'
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
                    "'unsafe-eval'",
                    "'wasm-unsafe-eval'",
                    "https://www.google.com/recaptcha/", // Allow reCAPTCHA scripts
                    "https://www.gstatic.com/recaptcha/"
                ],
                'connect-src': [
                    "'self'",
                    "https://static.cloudflareinsights.com/",
                    "https://www.google.com/recaptcha/", // Fixes your current error
                    "https://www.gstatic.com/recaptcha/"
                ],
                'frame-src': [
                    "'self'",
                    "https://www.google.com/recaptcha/", // Required for the checkbox/challenge iframe
                    "https://recaptcha.google.com/recaptcha/"
                ]
            }
        },
    },

})
