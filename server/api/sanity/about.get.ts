import { createClient } from '@sanity/client'

const getSanityClient = () => {
    const config = useRuntimeConfig()
    return createClient({
        projectId: config.public.sanityProjectId as string,
        dataset: config.public.sanityDataset as string,
        apiVersion: '2024-01-01',
        useCdn: true,
    })
}

/**
 * Fetches About page data from Sanity CMS.
 *
 * @returns About page content including hero, main, philosophy, and CTA sections
 *
 * @throws 500 - Sanity fetch error
 */
export default defineEventHandler(async (event) => {
    const client = getSanityClient()

    const ABOUT_QUERY = `*[_type == "about"][0] {
        // Hero section
        heroAccent,
        heroLine1,
        heroLine2,
        heroLine3,
        heroCta,
        
        // Main content
        mainImage {
            asset-> {
                _id,
                url
            }
        },
        mainTitle,
        paragraphs,
        
        // Philosophy section
        philosophyAccent,
        philosophyTitle,
        philosophyItems[] {
            icon,
            title,
            description
        },
        
        // CTA section
        ctaTitle,
        ctaText,
        ctaButtonText
    }`

    try {
        const about = await client.fetch(ABOUT_QUERY)
        // Vercel edge cache must be set in-handler (routeRules headers are
        // not applied to dynamic function responses).
        setResponseHeader(
            event,
            'Cache-Control',
            'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
        )
        return about || null
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: error instanceof Error ? error.message : 'Failed to fetch about page',
        })
    }
})
