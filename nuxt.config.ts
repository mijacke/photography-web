// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/critters', '@nuxt/eslint', '@nuxtjs/sitemap'],
    css: ['~/assets/css/tailwind.css'],
    critters: {
        config: {
            preload: 'swap',
        },
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'default',
        },
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '48x48' },
                { rel: 'shortcut icon', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
                { rel: 'preconnect', href: 'https://cdn.sanity.io', crossorigin: '' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
                { rel: 'dns-prefetch', href: 'https://scontent.cdninstagram.com' },
            ],
            style: [
                {
                    innerHTML: `
            body { background-color: #faf8f5; margin: 0; padding: 0; }
            #__nuxt { min-height: 100vh; }
          `,
                },
            ],
        },
    },
    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://paulifotografka.sk',
        name: 'Pauli Fotografka',
        trailingSlash: false,
    },
    sitemap: {
        defaults: {
            changefreq: 'weekly',
            priority: 0.8,
        },
        autoLastmod: true,
        exclude: ['/api/**', '/portfolio', '/privacy', '/cookies'],
    },
    nitro: {
        routeRules: {
            '/**': {
                headers: {
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'SAMEORIGIN',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
                    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
                    'X-DNS-Prefetch-Control': 'on',
                },
            },
            '/api/**': {
                headers: {
                    'Cache-Control': 'no-store',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'no-referrer',
                },
            },
            '/portfolio': {
                redirect: {
                    to: '/portfolio/rodina',
                    statusCode: 301,
                },
            },
        },
    },
    runtimeConfig: {
        // Private keys (server-side only)
        instagramAccessToken:
            process.env.INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_TOKEN || '',
        instagramToken: process.env.INSTAGRAM_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN || '',
        instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
        instagramApiVersion: process.env.INSTAGRAM_API_VERSION || 'v19.0',
        facebookAppId: process.env.FACEBOOK_APP_ID || '',
        facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '',
        resendApiKey: process.env.RESEND_API_KEY || '',
        resendFromEmail: process.env.RESEND_FROM_EMAIL || '',
        contactRecipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || '',
        gaApiSecret: process.env.GA_API_SECRET || '',
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://paulifotografka.sk',
            googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            gaMeasurementId: process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID || '',
            // Sanity - public credentials, safe to hardcode
            sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || 'm42prcjy',
            sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
        },
    },
    image: {
        quality: 85,
        format: ['webp'],
        // Disable responsive srcset generation to avoid invalid w descriptor warnings
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
        },
    },
})
