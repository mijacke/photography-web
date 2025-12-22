interface SanityServices {
    heroVideo?: {
        asset: {
            _id: string
            url: string
        }
    }
    rodinaImage?: {
        asset: {
            _id: string
            url: string
        }
    }
    novorodenciImage?: {
        asset: {
            _id: string
            url: string
        }
    }
    tehotenstvoImage?: {
        asset: {
            _id: string
            url: string
        }
    }
    svadbyImage?: {
        asset: {
            _id: string
            url: string
        }
    }
}

const buildOptimizedUrl = (url: string, width: number = 800, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching Services page content from Sanity.
 *
 * @remarks
 * **SSR-compatible**: Uses `useFetch` but with cache bypass
 * (`getCachedData: () => undefined`) to ensure fresh data on each navigation.
 * This prevents stale video URLs after CMS updates.
 *
 * @returns Object containing:
 * - `heroVideoUrl`: Direct URL to the hero video asset
 * - `serviceImages`: Optimized URLs for service card images (800px)
 * - `pending`, `error`: Loading and error states
 */
export const useSanityServices = () => {
    const { data, pending, error, refresh } = useFetch<SanityServices | null>(
        '/api/sanity/services',
        {
            key: 'services',
            // Bypass cache to ensure fresh data on each navigation
            getCachedData: () => undefined as any,
        }
    )

    const heroVideoUrl = computed(() => data.value?.heroVideo?.asset.url || null)

    const serviceImages = computed(() => ({
        rodina: data.value?.rodinaImage?.asset.url
            ? buildOptimizedUrl(data.value.rodinaImage.asset.url, 800, 85)
            : null,
        novorodenci: data.value?.novorodenciImage?.asset.url
            ? buildOptimizedUrl(data.value.novorodenciImage.asset.url, 800, 85)
            : null,
        tehotenstvo: data.value?.tehotenstvoImage?.asset.url
            ? buildOptimizedUrl(data.value.tehotenstvoImage.asset.url, 800, 85)
            : null,
        svadby: data.value?.svadbyImage?.asset.url
            ? buildOptimizedUrl(data.value.svadbyImage.asset.url, 800, 85)
            : null,
    }))

    return {
        heroVideoUrl,
        serviceImages,
        pending,
        error,
    }
}
