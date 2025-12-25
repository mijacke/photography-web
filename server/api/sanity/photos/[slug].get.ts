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
 * Fetches individual photo documents for a category.
 *
 * @param slug - Category URL slug
 *
 * @remarks
 * This uses the legacy `photo` document type. For new implementations,
 * prefer the category endpoint which includes gallery photos directly.
 *
 * @returns Array of photo objects with image refs and orientation
 *
 * @throws 400 - Missing slug parameter
 * @throws 500 - Sanity fetch error
 */
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
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: error instanceof Error ? error.message : 'Failed to fetch photos',
        })
    }
})
