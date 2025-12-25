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
 * Fetches category data including associated gallery from Sanity CMS.
 *
 * @param slug - Category URL slug (e.g., 'rodina', 'svadby')
 *
 * @returns Category object with hero images, intro image, and nested gallery photos
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
    } catch (error: unknown) {
        throw createError({
            statusCode: 500,
            statusMessage: error instanceof Error ? error.message : 'Failed to fetch category',
        })
    }
})
