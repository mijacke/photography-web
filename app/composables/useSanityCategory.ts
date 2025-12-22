interface SanityImageAsset {
    _id: string
    url: string
}

interface SanityImage {
    asset: { _ref: string }
}

interface SanityCategory {
    _id: string
    title: string
    slug: { current: string }
    heroLeftImage?: SanityImage
    heroRightImage?: SanityImage
    introImage?: SanityImage
    gallery?: {
        portraitPhotos?: Array<{ asset: SanityImageAsset }>
        landscapePhotos?: Array<{ asset: SanityImageAsset }>
    }
}

interface Photo {
    id: number
    src: string
    alt: string
    orientation: 'portrait' | 'landscape'
}

const buildImageUrl = (
    projectId: string,
    dataset: string,
    imageRef: string,
    options?: {
        width?: number
        quality?: number
    }
) => {
    const refParts = imageRef.replace('image-', '').split('-')
    const id = refParts[0]
    const dimensions = refParts[1] || ''
    const format = refParts[2] || 'jpg'

    const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`

    const params: string[] = []
    if (options?.width) params.push(`w=${options.width}`)
    params.push(`q=${options?.quality || 85}`)
    params.push('auto=format')
    params.push('fit=max')

    return `${baseUrl}?${params.join('&')}`
}

const buildOptimizedUrl = (url: string, width: number = 1200, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching category data (hero images, intro, gallery) from Sanity.
 *
 * @param categorySlug - URL slug identifying the category (e.g., 'rodina', 'svadby')
 *
 * @remarks
 * **SSR-compatible**: Uses `useFetch` with category-specific cache key.
 *
 * **Photo interleaving**: Portrait and landscape photos are alternated
 * for visual variety in the masonry grid layout.
 *
 * @returns Object containing:
 * - `heroLeftUrl`, `heroRightUrl`: Hero section images (1600px)
 * - `introImageUrl`: Intro section image (1000px)
 * - `photos`: Interleaved portrait/landscape photos (1200px)
 * - `pending`, `error`: Loading and error states
 */
export const useSanityCategory = (categorySlug: string) => {
    const config = useRuntimeConfig()
    const projectId = config.public.sanityProjectId as string
    const dataset = config.public.sanityDataset as string

    const { data, pending, error } = useFetch<SanityCategory | null>(
        `/api/sanity/category/${categorySlug}`,
        { key: `category-${categorySlug}` }
    )

    const heroLeftUrl = computed(() =>
        data.value?.heroLeftImage
            ? buildImageUrl(projectId, dataset, data.value.heroLeftImage.asset._ref, {
                  width: 1600,
              })
            : null
    )

    const heroRightUrl = computed(() =>
        data.value?.heroRightImage
            ? buildImageUrl(projectId, dataset, data.value.heroRightImage.asset._ref, {
                  width: 1600,
              })
            : null
    )

    const introImageUrl = computed(() =>
        data.value?.introImage
            ? buildImageUrl(projectId, dataset, data.value.introImage.asset._ref, { width: 1000 })
            : null
    )

    // Interleave portrait and landscape photos for visual variety in masonry grid
    const photos = computed<Photo[]>(() => {
        const allPhotos: Photo[] = []
        let id = 1

        const gallery = data.value?.gallery
        const portraits = gallery?.portraitPhotos || []
        const landscapes = gallery?.landscapePhotos || []

        const maxLength = Math.max(portraits.length, landscapes.length)

        for (let i = 0; i < maxLength; i++) {
            const portrait = portraits[i]
            if (portrait?.asset?.url) {
                allPhotos.push({
                    id: id++,
                    src: buildOptimizedUrl(portrait.asset.url, 1200, 85) || '',
                    alt: `Fotografia ${id}`,
                    orientation: 'portrait',
                })
            }

            const landscape = landscapes[i]
            if (landscape?.asset?.url) {
                allPhotos.push({
                    id: id++,
                    src: buildOptimizedUrl(landscape.asset.url, 1200, 85) || '',
                    alt: `Fotografia ${id}`,
                    orientation: 'landscape',
                })
            }
        }

        return allPhotos
    })

    return {
        category: data,
        heroLeftUrl,
        heroRightUrl,
        introImageUrl,
        photos,
        pending,
        error,
    }
}
