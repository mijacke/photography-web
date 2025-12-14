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

    const CATEGORY_QUERY = `*[
        _type == "category"
        && slug.current == $categorySlug
    ][0] {
        _id,
        title,
        slug,
        heroLeftImage,
        heroRightImage,
        introImage,
        "gallery": *[_type == "gallery" && category._ref == ^._id][0] {
            portraitPhotos[] {
                asset-> { _id, url }
            },
            landscapePhotos[] {
                asset-> { _id, url }
            }
        }
    }`

    try {
        const category = await client.fetch(CATEGORY_QUERY, { categorySlug: slug })
        return category || null
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to fetch category',
        })
    }
})
