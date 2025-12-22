interface SanityPhoto {
    _id: string
    title?: string
    alt?: string
    image: {
        asset: { _ref: string }
    }
    orientation: 'portrait' | 'landscape'
    order: number
}

interface Photo {
    id: number
    src: string
    alt: string
}

const buildImageUrl = (
    projectId: string,
    dataset: string,
    imageRef: string,
    params?: { w?: number; q?: number }
) => {
    const refParts = imageRef.replace('image-', '').split('-')
    const id = refParts[0]
    const dimensions = refParts[1] || ''
    const format = refParts[2] || 'jpg'

    const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`

    const queryParams: string[] = []
    if (params?.w) queryParams.push(`w=${params.w}`)
    queryParams.push(`q=${params?.q || 85}`)
    queryParams.push('auto=format')
    queryParams.push('fit=max')

    return `${baseUrl}?${queryParams.join('&')}`
}

/**
 * Composable for fetching individual photos for a category from Sanity.
 *
 * @param categorySlug - URL slug identifying the category
 *
 * @remarks
 * **SSR-compatible**: Uses `useFetch` with category-specific cache key.
 *
 * Uses the legacy `photo` document type. For new implementations,
 * prefer `useSanityCategory` which includes gallery photos directly.
 *
 * @returns Object containing:
 * - `photos`: Array of optimized photo URLs with alt text
 * - `pending`, `error`: Loading and error states
 */
export const useSanityPhotos = (categorySlug: string) => {
    const config = useRuntimeConfig()
    const projectId = config.public.sanityProjectId as string
    const dataset = config.public.sanityDataset as string

    const { data, pending, error } = useFetch<SanityPhoto[]>(`/api/sanity/photos/${categorySlug}`, {
        key: `photos-${categorySlug}`,
        default: () => [],
    })

    const photos = computed<Photo[]>(() => {
        if (!data.value || data.value.length === 0) return []

        return data.value.map((photo, index) => ({
            id: index + 1,
            src: buildImageUrl(projectId, dataset, photo.image.asset._ref, { w: 1200 }),
            alt: photo.alt || photo.title || `Fotografia ${index + 1}`,
        }))
    })

    return {
        photos,
        pending,
        error,
    }
}
