interface PageSeoOptions {
    title: string
    description: string
    path?: string
    image?: string | (() => string | undefined | null) | null
    type?: 'website' | 'article'
    noindex?: boolean
    keywords?: string[]
    structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

const DEFAULT_SITE_URL = 'https://paulifotografka.sk'
const DEFAULT_IMAGE_PATH = '/images/brand_logo/logo.png'

const DEFAULT_KEYWORDS = [
    'fotografka galanta',
    'fotografovanie galanta',
    'fotografia galanta',
    'rodinne fotenie galanta',
    'tehotenske fotenie galanta',
    'novorodenecke fotenie galanta',
    'svadobne fotenie galanta',
    'najlepsia fotografka galanta',
]

const normalizeSiteUrl = (value?: string) => (value || DEFAULT_SITE_URL).replace(/\/+$/, '')

const normalizePath = (value?: string) => {
    if (!value || value === '/') return '/'
    const path = value.startsWith('/') ? value : `/${value}`
    return path.replace(/\/+$/, '')
}

const toAbsoluteUrl = (value: string, siteUrl: string) => {
    if (/^https?:\/\//i.test(value)) return value
    const path = value.startsWith('/') ? value : `/${value}`
    return `${siteUrl}${path}`
}

const uniqueKeywords = (keywords: string[]) => {
    const seen = new Set<string>()
    return keywords.filter((keyword) => {
        const normalized = keyword.trim().toLowerCase()
        if (!normalized || seen.has(normalized)) return false
        seen.add(normalized)
        return true
    })
}

export const usePageSeo = (options: PageSeoOptions) => {
    const config = useRuntimeConfig()
    const route = useRoute()

    const siteUrl = normalizeSiteUrl(config.public.siteUrl as string | undefined)
    const path = normalizePath(options.path || route.path)
    const canonicalUrl = toAbsoluteUrl(path, siteUrl)
    const imageValue = typeof options.image === 'function' ? options.image() : options.image
    const imageUrl = toAbsoluteUrl(imageValue || DEFAULT_IMAGE_PATH, siteUrl)
    const robots = options.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

    const keywords = uniqueKeywords([...(options.keywords || []), ...DEFAULT_KEYWORDS])

    useSeoMeta({
        title: options.title,
        description: options.description,
        keywords: keywords.join(', '),
        robots,
        ogTitle: options.title,
        ogDescription: options.description,
        ogType: options.type || 'website',
        ogUrl: canonicalUrl,
        ogSiteName: 'Pauli Fotografka',
        ogLocale: 'sk_SK',
        ogImage: imageUrl,
        twitterCard: 'summary_large_image',
        twitterTitle: options.title,
        twitterDescription: options.description,
        twitterImage: imageUrl,
    })

    useHead({
        htmlAttrs: {
            lang: 'sk',
        },
        link: [
            { rel: 'canonical', href: canonicalUrl },
        ],
        meta: [
            { name: 'author', content: 'Pauli Fotografka' },
            { name: 'geo.region', content: 'SK-TA' },
            { name: 'geo.placename', content: 'Galanta' },
            { name: 'geo.position', content: '48.1900;17.7270' },
            { name: 'ICBM', content: '48.1900, 17.7270' },
        ],
    })

    const extraSchemaNodes = Array.isArray(options.structuredData)
        ? options.structuredData
        : options.structuredData
            ? [options.structuredData]
            : []

    const graph: Array<Record<string, unknown>> = [
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Pauli Fotografka',
            inLanguage: 'sk-SK',
        },
        {
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: options.title,
            description: options.description,
            inLanguage: 'sk-SK',
            isPartOf: { '@id': `${siteUrl}/#website` },
        },
        {
            '@type': 'LocalBusiness',
            '@id': `${siteUrl}/#business`,
            name: 'Pauli Fotografka',
            alternateName: 'Fotografka Galanta',
            url: siteUrl,
            image: imageUrl,
            telephone: '+421903830347',
            email: 'mitchie369@gmail.com',
            priceRange: 'EUR',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Galanta',
                addressCountry: 'SK',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 48.1900,
                longitude: 17.7270,
            },
            areaServed: ['Galanta', 'Trnava', 'Nitra', 'Slovensko'],
            sameAs: [
                'https://www.instagram.com/paulifotografka/',
                'https://www.facebook.com/paulifotografka',
            ],
            serviceType: [
                'Rodinné fotenie',
                'Tehotenské fotenie',
                'Novorodenecké fotenie',
                'Svadobné fotenie',
            ],
        },
        ...extraSchemaNodes,
    ]

    useHead({
        script: [
            {
                key: 'seo-structured-data',
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': graph,
                }),
            },
        ],
    })
}
