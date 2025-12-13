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

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Category slug is required',
        })
    }

    const client = getSanityClient()

    const PHOTOS_QUERY = `*[
        _type == "photo"
        && category->slug.current == $categorySlug
    ] | order(order asc) {
        _id,
        title,
        alt,
        image,
        orientation,
        order
    }`

    try {
        const photos = await client.fetch(PHOTOS_QUERY, { categorySlug: slug })
        return photos || []
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to fetch photos',
        })
    }
})
