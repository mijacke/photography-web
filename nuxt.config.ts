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
            // Vercel Speed Insights (Core Web Vitals) — only on Vercel builds
            script: process.env.VERCEL
                ? [{ src: '/_vercel/speed-insights/script.js', defer: true }]
                : [],
        },
    },
    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.paulifotografka.sk',
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
                    // Framing governed by CSP frame-ancestors below (X-Frame-Options
                    // cannot express an allow-list of external origins).
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
                    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
                    'X-DNS-Prefetch-Control': 'on',
                    'Content-Security-Policy': [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                        "img-src 'self' data: blob: https://cdn.sanity.io https://*.cdninstagram.com https://*.fbcdn.net https://www.google-analytics.com https://*.googletagmanager.com https://maps.googleapis.com https://maps.gstatic.com https://stats.g.doubleclick.net",
                        "font-src 'self' data: https://fonts.gstatic.com",
                        "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://vitals.vercel-insights.com https://cdn.sanity.io",
                        "media-src 'self' blob: https://cdn.sanity.io",
                        'frame-src https://www.google.com https://maps.google.com',
                        "object-src 'none'",
                        "base-uri 'self'",
                        "form-action 'self'",
                        // daktus.sk embeds the site as a live portfolio preview
                        // (*.netlify.app covers its deploy previews, localhost its dev)
                        "frame-ancestors 'self' https://daktus.sk https://www.daktus.sk https://*.netlify.app http://localhost:3000",
                        'upgrade-insecure-requests',
                    ].join('; '),
                },
            },
            // Content pages: ISR keeps HTML cached at the edge (10 min) — Sanity
            // content changes rarely, TTFB drops dramatically for SK visitors.
            '/': { isr: 600 },
            '/about': { isr: 600 },
            '/portfolio/rodina': { isr: 600 },
            '/portfolio/svadby': { isr: 600 },
            '/portfolio/novorodenci': { isr: 600 },
            '/portfolio/tehotenstvo': { isr: 600 },
            '/api/**': {
                headers: {
                    'Cache-Control': 'no-store',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'no-referrer',
                },
            },
            // Sanity content is edge-cached with stale-while-revalidate;
            // services stays uncached (see CLAUDE.md caching table).
            '/api/sanity/**': {
                headers: {
                    'Cache-Control': 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'no-referrer',
                },
            },
            '/api/sanity/services': {
                headers: {
                    'Cache-Control': 'no-store',
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
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.paulifotografka.sk',
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
