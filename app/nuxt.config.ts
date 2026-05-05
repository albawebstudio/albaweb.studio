// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    devtools: {enabled: true},

    runtimeConfig: {
        resendApiKey: process.env.RESEND_API_KEY ?? "",
        contactName: process.env.CONTACT_NAME ?? "",
        contactEmail: process.env.CONTACT_EMAIL ?? "",
        toEmail: process.env.TO_EMAIL ?? "",
        public: {
            gtagId: process.env.GAG_ID,
            resendTemplateId: process.env.RESEND_TEMPLATE_ID ?? "",
        }
    },

    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],

    modules: [
        "@nuxt/ui",
        '@nuxt/content',
        '@nuxt/image',
        'nuxt-gtag',
        'nuxt-security',
    ],

    image: {
        cloudflare: {
            baseURL: 'https://albawebstudio.com/'
        }
    },

    build: {
        transpile: [
            '@fortawesome/vue-fontawesome'
        ]
    },

    gtag: {
        id: process.env.GAG_ID
    },

    nitro: {
        preset: "cloudflare-pages",
        cloudflare: {
            deployConfig: true,
            nodeCompat: true
        },
        esbuild: {
            options: {
                target: 'es2022'  // bump from es2019 to support BigInt
            }
        },
        prerender: {
            ignore: ['/__nuxt_content/**']
        }
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
                    "https://*.analytics.google.com",
                    "https://*.google-analytics.com"
                ],
                'base-uri': ["'self'"],
                'object-src': ["'none'"]
            }
        },
    },

})
