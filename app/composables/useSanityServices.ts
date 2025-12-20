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

// Helper to build optimized Sanity image URL
const buildOptimizedUrl = (url: string, width: number = 800, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

export const useSanityServices = () => {
    const { data, pending, error, refresh } = useFetch<SanityServices | null>(
        '/api/sanity/services',
        {
            key: 'services',
            // Ensure fresh data on each page visit
            getCachedData: () => undefined as any,
        }
    )

    // Hero video URL
    const heroVideoUrl = computed(() => data.value?.heroVideo?.asset.url || null)

    // Service images
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
