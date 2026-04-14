interface PageSeoOptions {
    title: string
    description: string
    path?: string
    image?: string | (() => string | undefined | null) | null
    type?: 'website' | 'article'
    noindex?: boolean
    keywords?: string[]
    structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
    breadcrumbs?: Array<{ name: string, path: string }>
}

const DEFAULT_SITE_URL = 'https://paulifotografka.sk'

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

const BREADCRUMB_LABELS: Record<string, string> = {
    '': 'Domov',
    'portfolio': 'Portfólio',
    'rodina': 'Rodina',
    'svadby': 'Svadby',
    'novorodenci': 'Novorodenci',
    'tehotenstvo': 'Tehotenstvo',
    'services': 'Služby',
    'about': 'O mne',
    'contact': 'Kontakt',
    'privacy': 'Ochrana súkromia',
    'cookies': 'Cookies',
}

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

const humanizeSegment = (segment: string): string => {
    if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment]
    return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const buildBreadcrumbList = (
    path: string,
    siteUrl: string,
    override?: Array<{ name: string, path: string }>
) => {
    const items: Array<{ name: string, url: string }> = [{ name: 'Domov', url: `${siteUrl}/` }]

    if (override?.length) {
        for (const crumb of override) {
            items.push({ name: crumb.name, url: toAbsoluteUrl(crumb.path, siteUrl) })
        }
    } else if (path !== '/') {
        const segments = path.split('/').filter(Boolean)
        let acc = ''
        for (const segment of segments) {
            acc += `/${segment}`
            items.push({ name: humanizeSegment(segment), url: `${siteUrl}${acc}` })
        }
    }

    return {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}${path === '/' ? '' : path}#breadcrumbs`,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export const usePageSeo = (options: PageSeoOptions) => {
    const config = useRuntimeConfig()
    const route = useRoute()
    const business = useBusinessInfo()

    const siteUrl = normalizeSiteUrl(config.public.siteUrl as string | undefined)
    const path = normalizePath(options.path || route.path)
    const canonicalUrl = toAbsoluteUrl(path, siteUrl)
    const imageValue = typeof options.image === 'function' ? options.image() : options.image
    const imageUrl = toAbsoluteUrl(imageValue || business.defaultImagePath, siteUrl)
    const logoUrl = toAbsoluteUrl(business.logoPath, siteUrl)
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
        ogSiteName: business.name,
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
            { name: 'author', content: business.name },
            { name: 'geo.region', content: 'SK-TA' },
            { name: 'geo.placename', content: business.addressLocality },
            { name: 'geo.position', content: `${business.latitude};${business.longitude}` },
            { name: 'ICBM', content: `${business.latitude}, ${business.longitude}` },
        ],
    })

    const extraSchemaNodes = Array.isArray(options.structuredData)
        ? options.structuredData
        : options.structuredData
            ? [options.structuredData]
            : []

    const personNode = {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: business.name,
        alternateName: business.alternateName,
        image: imageUrl,
        url: siteUrl,
        jobTitle: 'Fotografka',
        worksFor: { '@id': `${siteUrl}/#business` },
        sameAs: business.sameAs,
    }

    const localBusinessNode = {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#business`,
        name: business.name,
        alternateName: business.alternateName,
        description: `${business.name} — profesionálna fotografka v meste ${business.addressLocality}. Rodinné, tehotenské, novorodenecké a svadobné fotenie.`,
        url: siteUrl,
        image: imageUrl,
        logo: logoUrl,
        telephone: business.phoneE164,
        email: business.email,
        priceRange: business.priceRange,
        openingHours: business.openingHours,
        knowsLanguage: business.knowsLanguage,
        hasMap: business.mapUrl,
        founder: { '@id': `${siteUrl}/#person` },
        address: {
            '@type': 'PostalAddress',
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            addressCountry: business.addressCountry,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: business.latitude,
            longitude: business.longitude,
        },
        areaServed: business.areaServed.map((name) => ({ '@type': 'City', name })),
        sameAs: business.sameAs,
        serviceType: [
            'Rodinné fotenie',
            'Tehotenské fotenie',
            'Novorodenecké fotenie',
            'Svadobné fotenie',
        ],
    }

    const breadcrumbNode = buildBreadcrumbList(path, siteUrl, options.breadcrumbs)

    const webPageNode: Record<string, unknown> = {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: options.title,
        description: options.description,
        inLanguage: 'sk-SK',
        isPartOf: { '@id': `${siteUrl}/#website` },
        breadcrumb: { '@id': breadcrumbNode['@id'] },
        primaryImageOfPage: {
            '@type': 'ImageObject',
            contentUrl: imageUrl,
            url: imageUrl,
            caption: options.title,
            creator: { '@id': `${siteUrl}/#person` },
        },
    }

    const graph: Array<Record<string, unknown>> = [
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: business.name,
            inLanguage: 'sk-SK',
            publisher: { '@id': `${siteUrl}/#business` },
        },
        webPageNode,
        breadcrumbNode,
        personNode,
        localBusinessNode,
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
