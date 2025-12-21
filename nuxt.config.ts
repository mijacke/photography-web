// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/critters', '@nuxt/eslint'],
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
    runtimeConfig: {
        // Private keys (server-side only)
        instagramAccessToken:
            process.env.INSTAGRAM_ACCESS_TOKEN || process.env.INSTAGRAM_TOKEN || '',
        instagramToken: process.env.INSTAGRAM_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN || '',
        instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
        instagramApiVersion: process.env.INSTAGRAM_API_VERSION || 'v19.0',
        facebookAppId: process.env.FACEBOOK_APP_ID || '',
        facebookAppSecret: process.env.FACEBOOK_APP_SECRET || '',
        public: {
            googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '',
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
