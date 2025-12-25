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
    heroSubtitle?: string
    heroTitle?: string
    heroLeftImage?: SanityImage
    heroRightImage?: SanityImage
    introSubtitle?: string
    introTitle?: string
    introParagraphs?: string[]
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

// Fallback content for each category
const CATEGORY_FALLBACKS: Record<string, {
    heroSubtitle: string
    heroTitle: string
    introSubtitle: string
    introTitle: string
    introParagraphs: string[]
}> = {
    rodina: {
        heroSubtitle: 'PORTFÓLIO',
        heroTitle: 'rodinné fotografie',
        introSubtitle: 'O rodinnom fotení',
        introTitle: 'Rodinné Fotografie',
        introParagraphs: [
            'Rodinné fotenie je o láske, blízkosti a skutočných emóciách. O chvíľach, ktoré sú na prvý pohľad obyčajné, no s odstupom času sa stanú tými najvzácnejšími spomienkami.',
            'Spoločne vytvoríme prirodzené a uvoľnené fotografie, ktoré zachytia váš rodinný príbeh taký, aký naozaj je – plný smiechu, objatí, jemných dotykov a autentických momentov. Či už si vyberiete fotenie v prírode, u vás doma alebo v štúdiu, postarám sa o príjemnú atmosféru, v ktorej sa budú dobre cítiť deti aj dospelí.',
            'Počas fotenia vás budem jemne viesť, no zároveň ponechám priestor spontánnosti, aby vznikli fotografie, ku ktorým sa budete radi vracať aj o mnoho rokov. Spoločne vytvoríme nadčasové spomienky, ktoré sa stanú prirodzenou súčasťou vášho rodinného albumu.',
        ],
    },
    novorodenci: {
        heroSubtitle: 'PORTFÓLIO',
        heroTitle: 'novorodenecké fotografie',
        introSubtitle: 'O novorodeneckom fotení',
        introTitle: 'Novorodenecké Fotografie',
        introParagraphs: [
            'Zažite kúzlo prvých dní s vaším bábätkom prostredníctvom jemných a nadčasových novorodeneckých fotografií. Spoločne zachytíme tú najčistejšiu krásu, pokoj a lásku, ktoré sprevádzajú tieto neopakovateľné chvíle.',
            'Počas fotenia vytvoríme prirodzené a nežné zábery, ktoré sa stanú vzácnymi spomienkami pre celú vašu rodinu. Keďže som sama mamou, kladiem mimoriadny dôraz na bezpečnosť, komfort a individuálny prístup – aby ste sa vy aj vaše bábätko cítili pokojne a v dobrých rukách počas celého fotenia.',
            'Zachytíme prvé dotyky, pohľady a emócie, ktoré tvoria základ vášho rodinného príbehu a fotoalbumu plného lásky.',
            'Newborn fotenie je ideálne absolvovať v období od 7. do 21. dňa po narodení bábätka. Ak však toto obdobie nestihnete, nezúfajte – krásne, citlivé a prirodzené fotografie vieme vytvoriť aj so starším bábätkom.',
        ],
    },
    tehotenstvo: {
        heroSubtitle: 'PORTFÓLIO',
        heroTitle: 'tehotenské fotografie',
        introSubtitle: 'O tehotenskom fotení',
        introTitle: 'Tehotenské Fotografie',
        introParagraphs: [
            'Ponúkam jemné, nadčasové a umelecké fotografie, ktoré s citom zachytia krásu, očakávanie a radosť z tohto výnimočného obdobia vášho života. Každý záber je vytvorený tak, aby vyzdvihol prirodzenosť, emócie a jedinečný príbeh budúcej mamy.',
            'Či už uprednostníte intímnu atmosféru štúdia alebo prirodzené svetlo a pokoj prírody, postarám sa o uvoľnenú atmosféru a spoločne navrhneme fotenie presne podľa vašich predstáv. Mojím cieľom je, aby ste sa počas fotenia cítili príjemne, sebavedome a samy sebou.',
            'Tehotenské fotenie je ideálne absolvovať v období medzi 32. až 34. týždňom tehotenstva, kedy je bruško krásne viditeľné a vy sa ešte cítite komfortne.',
        ],
    },
    svadby: {
        heroSubtitle: 'PORTFÓLIO',
        heroTitle: 'svadobné fotografie',
        introSubtitle: 'O svadobnom fotení',
        introTitle: 'Svadobné Fotografie',
        introParagraphs: [
            'Svadobný deň je jedinečný príbeh plný lásky, emócií a neopakovateľných momentov. Mojím cieľom je zachytiť ho autenticky, s citom a dôrazom na detaily, ktoré z tohto dňa robia výnimočnú spomienku na celý život.',
            'Počas svadobného fotenia pracujem nenápadne a prirodzene, aby ste si mohli svoj deň naplno užiť bez stresu a pózovania. Zachytím skutočné emócie – úsmevy, slzy šťastia, dotyky a pohľady, ktoré hovoria viac než slová.',
            'Vytvoríme spolu nadčasové svadobné fotografie, ktoré budú verne rozprávať váš príbeh aj po rokoch. Fotografie, ku ktorým sa budete s radosťou vracať a ktoré sa stanú cennou súčasťou vášho rodinného archívu.',
        ],
    },
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
 * Composable for fetching category data (hero, intro, gallery) from Sanity.
 * All text fields have fallback values for when Sanity data is missing.
 */
export const useSanityCategory = (categorySlug: string) => {
    const config = useRuntimeConfig()
    const projectId = config.public.sanityProjectId as string
    const dataset = config.public.sanityDataset as string

    const fallbacks = CATEGORY_FALLBACKS[categorySlug] ?? CATEGORY_FALLBACKS.rodina!

    const { data, pending, error } = useFetch<SanityCategory | null>(
        `/api/sanity/category/${categorySlug}`,
        { key: `category-${categorySlug}` }
    )

    // Hero text
    const heroSubtitle = computed(() => data.value?.heroSubtitle || fallbacks.heroSubtitle)
    const heroTitle = computed(() => data.value?.heroTitle || fallbacks.heroTitle)

    // Hero images
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

    // Intro text
    const introSubtitle = computed(() => data.value?.introSubtitle || fallbacks.introSubtitle)
    const introTitle = computed(() => data.value?.introTitle || fallbacks.introTitle)
    const introParagraphs = computed(() =>
        data.value?.introParagraphs?.length ? data.value.introParagraphs : fallbacks.introParagraphs
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
        // Hero
        heroSubtitle,
        heroTitle,
        heroLeftUrl,
        heroRightUrl,
        // Intro
        introSubtitle,
        introTitle,
        introParagraphs,
        introImageUrl,
        // Gallery
        photos,
        // Meta
        pending,
        error,
    }
}
