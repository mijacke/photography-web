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
        exclude: ['/api/**'],
    },
    nitro: {
        routeRules: {
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
