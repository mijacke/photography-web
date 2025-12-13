import { createClient } from '@sanity/client'

// Create Sanity client on server-side (no CORS issues)
const getSanityClient = () => {
    const config = useRuntimeConfig()
    return createClient({
        projectId: config.public.sanityProjectId as string,
        dataset: config.public.sanityDataset as string,
        apiVersion: '2024-01-01',
        useCdn: true,
    })
}

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
        return about
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to fetch about page',
        })
    }
})
