interface SanityAbout {
    mainImage?: {
        asset: {
            _id: string
            url: string
        }
    }
}

const buildOptimizedUrl = (url: string, width: number = 600, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching About page data from Sanity.
 *
 * @remarks
 * **SSR-compatible**: Uses `useFetch` with caching (key: 'about').
 * Data is fetched on first render and cached for subsequent navigations.
 *
 * @returns Object containing:
 * - `mainImage`: Optimized URL for the photographer portrait (600px width)
 * - `pending`: Loading state
 * - `error`: Fetch error if any
 */
export const useSanityAbout = () => {
    const { data, pending, error } = useFetch<SanityAbout | null>('/api/sanity/about', {
        key: 'about',
    })

    const mainImage = computed(() =>
        data.value?.mainImage?.asset.url
            ? buildOptimizedUrl(data.value.mainImage.asset.url, 600, 85)
            : null
    )

    return {
        mainImage,
        pending,
        error,
    }
}
