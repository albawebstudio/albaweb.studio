// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    /** Content is loaded in the browser via Nuxt Content SQLite WASM, not SSR. */
    ssr: false,

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

    content: {
        /** Local SQLite at build time; deployed reads use browser WASM + static dumps. */
        database: {
            type: 'sqlite',
            filename: '.data/content.sqlite',
        },
        experimental: {
            nativeSqlite: true,
        },
    },

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
            nodeCompat: true,
            pages: {
                defaultRoutes: false,
                routes: {
                    version: 1,
                    include: ['/api/send'],
                    exclude: [],
                },
            },
        },
        esbuild: {
            options: {
                target: 'es2022'  // bump from es2019 to support BigInt
            }
        },
        prerender: {
            crawlLinks: true,
            routes: [
                '/',
                '/blog',
                '/legal/privacy',
                '/legal/terms',
            ],
        },
    },

    routeRules: {
        '/api/**': { prerender: false },
    },

    hooks: {
        'nitro:config'(nitroConfig) {
            // Build-time SQLite only; production reads use WASM + static sql_dump.txt assets.
            const contentDb = nitroConfig.runtimeConfig?.content?.database
            if (contentDb?.type === 'd1') {
                nitroConfig.runtimeConfig!.content!.database = {
                    type: 'sqlite',
                    filename: '.data/content.sqlite',
                }
            }
            if (nitroConfig.cloudflare && 'd1_databases' in nitroConfig.cloudflare) {
                delete nitroConfig.cloudflare.d1_databases
            }
        },
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
