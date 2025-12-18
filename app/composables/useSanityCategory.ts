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

// Helper to build Sanity image URL with optimization
const buildImageUrl = (projectId: string, dataset: string, imageRef: string, options?: {
    width?: number
    quality?: number
}) => {
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

// Helper to build optimized URL from direct URL
const buildOptimizedUrl = (url: string, width: number = 1200, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

export const useSanityCategory = (categorySlug: string) => {
    const config = useRuntimeConfig()
    const projectId = config.public.sanityProjectId as string
    const dataset = config.public.sanityDataset as string

    const { data, pending, error } = useFetch<SanityCategory | null>(
        `/api/sanity/category/${categorySlug}`,
        { key: `category-${categorySlug}` }
    )

    // Hero images - optimized for large screens (1600px wide)
    const heroLeftUrl = computed(() =>
        data.value?.heroLeftImage
            ? buildImageUrl(projectId, dataset, data.value.heroLeftImage.asset._ref, { width: 1600 })
            : null
    )

    const heroRightUrl = computed(() =>
        data.value?.heroRightImage
            ? buildImageUrl(projectId, dataset, data.value.heroRightImage.asset._ref, { width: 1600 })
            : null
    )

    // Intro image - optimized for content width (1000px)
    const introImageUrl = computed(() =>
        data.value?.introImage
            ? buildImageUrl(projectId, dataset, data.value.introImage.asset._ref, { width: 1000 })
            : null
    )

    // Interleaved photos from portrait and landscape for better grid layout
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
