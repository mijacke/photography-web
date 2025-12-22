interface SanityImageAsset {
    _id: string
    url: string
}

interface SanityHomepage {
    heroImages?: Array<{ asset: SanityImageAsset }>
    galleryCarouselImages?: Array<{ asset: SanityImageAsset }>
    aboutImage?: { asset: SanityImageAsset }
    portfolioRodinaImage?: { asset: SanityImageAsset }
    portfolioSvadbyImage?: { asset: SanityImageAsset }
    portfolioNovorodenciImage?: { asset: SanityImageAsset }
    portfolioTehotenstvoImage?: { asset: SanityImageAsset }
}

const buildOptimizedUrl = (url: string, width: number = 1200, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching homepage content from Sanity.
 *
 * @remarks
 * **SSR-compatible**: Uses `useFetch` with caching (key: 'homepage').
 *
 * @returns Object containing:
 * - `heroImages`: Array of hero carousel images (1200px)
 * - `galleryCarouselImages`: Gallery section images (1920px)
 * - `aboutImage`: About section portrait (600px)
 * - `portfolioImages`: Category preview thumbnails (400px)
 * - `pending`, `error`: Loading and error states
 */
export const useSanityHomepage = () => {
    const { data, pending, error } = useFetch<SanityHomepage | null>('/api/sanity/homepage', {
        key: 'homepage',
    })

    const heroImages = computed(() => {
        if (!data.value?.heroImages) return []
        return data.value.heroImages
            .map((img) => buildOptimizedUrl(img.asset.url, 1200, 85))
            .filter(Boolean) as string[]
    })

    const galleryCarouselImages = computed(() => {
        if (!data.value?.galleryCarouselImages) return []
        return data.value.galleryCarouselImages
            .map((img) => buildOptimizedUrl(img.asset.url, 1920, 85))
            .filter(Boolean) as string[]
    })

    const aboutImage = computed(() =>
        data.value?.aboutImage?.asset.url
            ? buildOptimizedUrl(data.value.aboutImage.asset.url, 600, 85)
            : null
    )

    const portfolioImages = computed(() => ({
        rodina: data.value?.portfolioRodinaImage?.asset.url
            ? buildOptimizedUrl(data.value.portfolioRodinaImage.asset.url, 400, 85)
            : null,
        svadby: data.value?.portfolioSvadbyImage?.asset.url
            ? buildOptimizedUrl(data.value.portfolioSvadbyImage.asset.url, 400, 85)
            : null,
        novorodenci: data.value?.portfolioNovorodenciImage?.asset.url
            ? buildOptimizedUrl(data.value.portfolioNovorodenciImage.asset.url, 400, 85)
            : null,
        tehotenstvo: data.value?.portfolioTehotenstvoImage?.asset.url
            ? buildOptimizedUrl(data.value.portfolioTehotenstvoImage.asset.url, 400, 85)
            : null,
    }))

    return {
        heroImages,
        galleryCarouselImages,
        aboutImage,
        portfolioImages,
        pending,
        error,
    }
}
