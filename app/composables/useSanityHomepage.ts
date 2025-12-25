interface SanityImageAsset {
    _id: string
    url: string
}

interface Testimonial {
    quote: string
    author: string
    occasion: string
}

interface SanityHomepage {
    heroImages?: Array<{ asset: SanityImageAsset }>
    galleryCarouselImages?: Array<{ asset: SanityImageAsset }>
    aboutImage?: { asset: SanityImageAsset }
    portfolioRodinaImage?: { asset: SanityImageAsset }
    portfolioSvadbyImage?: { asset: SanityImageAsset }
    portfolioNovorodenciImage?: { asset: SanityImageAsset }
    portfolioTehotenstvoImage?: { asset: SanityImageAsset }
    servicesParagraphs?: string[]
    testimonialsSubtitle?: string
    testimonialsTitle?: string
    testimonials?: Testimonial[]
}

const FALLBACKS = {
    servicesParagraphs: [
        'Každá etapa rodinného života nesie svoj vlastný príbeh – od tichého očakávania počas tehotenstva až po teplo a blízkosť, ktoré s rokmi ešte viac rastú. Je pre mňa veľkou cťou, keď mi rodiny dovolia vstúpiť do ich sveta a môžem pre nich zachytiť tieto výnimočné momenty.',
        'Fotím tehotenské portréty, ktoré oslavujú krásu a silu materstva, novorodenecké fotografie plné tých najjemnejších prvých detailov, svadobné príbehy nabité emóciami a láskou, aj rodinné fotenia, ktoré zachytávajú vaše skutočné spojenie – prirodzene, úprimne a s dôrazom na emóciu.',
        'Každé fotenie je jednoduché, nadčasové a sústredené na skutočné chvíle. Žiadne ťažké rekvizity ani zbytočné rozptýlenia – len vy, vaše emócie a jemné svetlo. Práve tento premyslený, prirodzený prístup viedol mnohé rodiny k tomu, aby mi dlhodobo zverovali svoje najvzácnejšie spomienky a vracali sa ku mne rok čo rok.',
    ],
    testimonialsSubtitle: 'Milé slová od Vás',
    testimonialsTitle: 'Čo hovoria klienti',
    testimonials: [
        { quote: 'Spolupráca s touto fotografkou bola absolútny sen. Celá naša rodina sa cítila tak pohodlne a fotografie predčili všetky naše očakávania. Tieto spomienky si budeme vážiť navždy!', author: 'Sára a Michal', occasion: 'Rodinné fotenie' },
        { quote: 'Bola som nervózna zo svojho tehotenského fotenia, ale od prvého momentu som sa cítila úplne v pohode. Fotky sú úžasné a krásne zachytávajú toto špeciálne obdobie.', author: 'Emma', occasion: 'Tehotenské fotenie' },
        { quote: 'Novorodenecké fotky nášho malíčka sú absolútne úžasné. Taká trpezlivosť a starostlivosť bola venovaná získaniu dokonalých záberov. Vrelo odporúčame!', author: 'Dávid a Lívia', occasion: 'Novorodenecké fotenie' },
    ],
}

const buildOptimizedUrl = (url: string, width: number = 1200, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching homepage content from Sanity.
 * All text fields have fallback values for when Sanity data is missing.
 * 
 * Uses useAsyncData with getCachedData to prevent duplicate requests
 * when multiple components call this composable simultaneously.
 */
export const useSanityHomepage = () => {
    const nuxtApp = useNuxtApp()

    const { data, pending, error } = useAsyncData<SanityHomepage | null>(
        'homepage',
        () => $fetch('/api/sanity/homepage'),
        {
            // Return cached data immediately if available, preventing duplicate requests
            getCachedData: (key) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
        }
    )

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

    // Services section
    const servicesParagraphs = computed(() =>
        data.value?.servicesParagraphs?.length ? data.value.servicesParagraphs : FALLBACKS.servicesParagraphs
    )

    // Testimonials section
    const testimonialsSubtitle = computed(() => data.value?.testimonialsSubtitle || FALLBACKS.testimonialsSubtitle)
    const testimonialsTitle = computed(() => data.value?.testimonialsTitle || FALLBACKS.testimonialsTitle)
    const testimonials = computed(() =>
        data.value?.testimonials?.length ? data.value.testimonials : FALLBACKS.testimonials
    )

    return {
        heroImages,
        galleryCarouselImages,
        aboutImage,
        portfolioImages,
        servicesParagraphs,
        testimonialsSubtitle,
        testimonialsTitle,
        testimonials,
        pending,
        error,
    }
}
