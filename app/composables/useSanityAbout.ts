interface SanityAbout {
    mainImage?: {
        asset: {
            _id: string
            url: string
        }
    }
}

// Helper to build optimized Sanity image URL
const buildOptimizedUrl = (url: string, width: number = 600, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

export const useSanityAbout = () => {
    const { data, pending, error } = useFetch<SanityAbout | null>(
        '/api/sanity/about',
        { key: 'about' }
    )

    // Main image for about page - portrait format
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
