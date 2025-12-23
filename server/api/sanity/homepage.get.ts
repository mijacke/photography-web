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
 * Fetches Homepage content from Sanity CMS.
 *
 * @returns Homepage object with hero images, gallery carousel, about image, and portfolio previews
 *
 * @throws 500 - Sanity fetch error
 */
export default defineEventHandler(async () => {
    const client = getSanityClient()

    const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
        heroImages[] {
            asset-> {
                _id,
                url
            }
        },
        galleryCarouselImages[] {
            asset-> {
                _id,
                url
            }
        },
        aboutImage {
            asset-> {
                _id,
                url
            }
        },
        portfolioRodinaImage {
            asset-> { _id, url }
        },
        portfolioSvadbyImage {
            asset-> { _id, url }
        },
        portfolioNovorodenciImage {
            asset-> { _id, url }
        },
        portfolioTehotenstvoImage {
            asset-> { _id, url }
        }
    }`

    try {
        const homepage = await client.fetch(HOMEPAGE_QUERY)
        return homepage || null
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to fetch homepage',
        })
    }
})
