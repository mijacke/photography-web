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
 * @returns `{ mainImage: { asset: { _id, url } } }` or `null`
 *
 * @throws 500 - Sanity fetch error
 */
export default defineEventHandler(async () => {
    const client = getSanityClient()

    const ABOUT_QUERY = `*[_type == "about"][0] {
        mainImage {
            asset-> {
                _id,
                url
            }
        }
    }`

    try {
        const about = await client.fetch(ABOUT_QUERY)
        return about || null
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to fetch about page',
        })
    }
})
