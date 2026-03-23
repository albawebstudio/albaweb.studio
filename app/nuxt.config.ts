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
            crossOriginEmbedderPolicy: 'unsafe-none',
            crossOriginResourcePolicy: 'cross-origin',
            contentSecurityPolicy: {
                'img-src': ["'self'", "data:", "https:", "blob:"],
                'script-src': [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'",
                    "'wasm-unsafe-eval'",
                    "http://localhost:*",
                    "blob:",                             // <--- ADD THIS for Web Workers
                    "https://www.google.com/recaptcha/",
                    "https://www.gstatic.com/recaptcha/",
                    "https://www.googletagmanager.com/",
                    "https://static.cloudflareinsights.com"
                ],
                // For better security, you can explicitly define worker-src
                'worker-src': ["'self'", "blob:"],       // <--- Recommended for modern apps
                'connect-src': [
                    "'self'",
                    "http://localhost:*",
                    "ws://localhost:*",
                    "https://static.cloudflareinsights.com/",
                    "https://www.google.com/recaptcha/",
                    "https://www.gstatic.com/recaptcha/",
                    "https://*.analytics.google.com",
                    "https://*.google-analytics.com"
                ],
                'frame-src': [
                    "'self'",
                    "https://www.google.com/recaptcha/",
                    "https://recaptcha.google.com/recaptcha/"
                ],
                'base-uri': ["'self'"],
                'object-src': ["'none'"]
            }
        },
    },

})
