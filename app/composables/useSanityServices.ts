interface ServiceContent {
    id: string
    title: string
    description: string
    features: string[]
    cta: string
}

interface FaqItem {
    question: string
    answer: string
}

interface SanityServices {
    heroVideo?: {
        asset: {
            _id: string
            url: string
        }
    }
    heroText?: string
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
    servicesContent?: ServiceContent[]
    faqAccent?: string
    faqTitle?: string
    faqItems?: FaqItem[]
}

const FALLBACKS = {
    heroText: 'Každé fotenie je starostlivo pripravené, aby zachytilo váš jedinečný príbeh',
    services: [
        {
            id: 'rodina',
            title: 'Rodinné fotenie',
            description: 'Zachytím lásku a spojenie medzi členmi vašej rodiny v prirodzenom, uvoľnenom prostredí. Ideálne pre každoročné rodinné portréty, oslavu míľnikov alebo jednoducho len tak.',
            features: ['1-2 hodinové fotenie', 'Exteriér alebo u vás doma', '30+ upravených digitálnych fotografií', 'Súbory vo vysokom rozlíšení pripravené na tlač', 'Online galéria pre jednoduché zdieľanie'],
            cta: 'Mám záujem o rodinné fotenie',
        },
        {
            id: 'novorodenci',
            title: 'Novorodenecké fotenie',
            description: 'Jemné portréty vášho nového člena rodiny v prvých vzácnych dňoch života. Najlepšie je naplánovať fotenie do 2 týždňov po narodení, kedy sú bábätká najospalejšie.',
            features: ['2-3 hodinové fotenie', 'U vás doma alebo v ateliéri', '25+ upravených digitálnych fotografií', 'Fotky s rodičmi a súrodencami v cene', 'Rekvizity a zavinovačky zabezpečím'],
            cta: 'Mám záujem o novorodenecké fotenie',
        },
        {
            id: 'tehotenstvo',
            title: 'Tehotenské fotenie',
            description: 'Oslava krásy tehotenstva a očakávania nového života. Ideálne je naplánovať fotenie medzi 28. a 34. týždňom.',
            features: ['1 hodinové fotenie', 'Exteriér alebo ateliér', '20+ upravených digitálnych fotografií', 'Fotky s partnerom v cene', 'Poradenstvo pri výbere oblečenia'],
            cta: 'Mám záujem o tehotenské fotenie',
        },
        {
            id: 'svadby',
            title: 'Svadobné fotenie',
            description: 'Zdokumentujem váš výnimočný deň s nadčasovou eleganciou a autentickými emóciami. Od komorných obradov až po veľkolepé oslavy.',
            features: ['Celodenná dokumentácia', 'Možnosť druhého fotografa', '300+ upravených digitálnych fotografií', 'Zásnubné fotenie v cene', 'Prémiové svadobné albumy'],
            cta: 'Mám záujem o svadobné fotenie',
        },
    ],
    faqAccent: 'Časté otázky',
    faqTitle: 'Čo vás zaujíma?',
    faqItems: [
        { question: 'Ako dlho vopred je potrebné rezervovať termín?', answer: 'Pre rodinné a tehotenské fotenie odporúčam rezervovať 4-6 týždňov vopred, novorodenecké fotenie 2-3 mesiace (ešte pred pôrodom!), svadby ideálne 6-12 mesiacov vopred.' },
        { question: 'Čo si máme obliecť?', answer: 'Po rezervácii vám pošlem podrobného sprievodcu štýlom! Vo všeobecnosti odporúčam zladiť (nie zjednotiť) oblečenie v jemných, neutrálnych farbách, ktoré sa navzájom dopĺňajú.' },
        { question: 'Kde fotenie prebieha?', answer: 'Ponúkam fotenie v exteriéri aj interiéri. Mám krásne tipy na lokality v okolí Bratislavy, ale rada prídem aj k vám domov alebo na miesto, ktoré je pre vás výnimočné.' },
        { question: 'Kedy dostaneme fotky?', answer: 'Online galériu s fotografiami obdržíte do 2-3 týždňov pri portrétnom fotení a do 4-6 týždňov pri svadbách. Prvé ukážky vám pošlem už do 48 hodín!' },
    ],
}

const buildOptimizedUrl = (url: string, width: number = 800, quality: number = 85) => {
    if (!url) return null
    return `${url}?w=${width}&q=${quality}&auto=format&fit=max`
}

/**
 * Composable for fetching Services page content from Sanity.
 * All fields have fallback values for when Sanity data is missing.
 */
export const useSanityServices = () => {
    const { data, pending, error } = useFetch<SanityServices | null>('/api/sanity/services', {
        key: 'services',
        getCachedData: () => undefined as SanityServices | undefined,
    })

    // Hero
    const heroVideoUrl = computed(() => data.value?.heroVideo?.asset.url || null)
    const heroText = computed(() => data.value?.heroText || FALLBACKS.heroText)

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

    // Services content - merge with fallbacks by ID
    const servicesContent = computed(() => {
        const sanityServices = data.value?.servicesContent || []
        return FALLBACKS.services.map(fallback => {
            const sanityService = sanityServices.find(s => s.id === fallback.id)
            if (sanityService) {
                return {
                    id: sanityService.id || fallback.id,
                    title: sanityService.title || fallback.title,
                    description: sanityService.description || fallback.description,
                    features: sanityService.features?.length ? sanityService.features : fallback.features,
                    cta: sanityService.cta || fallback.cta,
                }
            }
            return fallback
        })
    })

    // FAQ
    const faqAccent = computed(() => data.value?.faqAccent || FALLBACKS.faqAccent)
    const faqTitle = computed(() => data.value?.faqTitle || FALLBACKS.faqTitle)
    const faqItems = computed(() => data.value?.faqItems?.length ? data.value.faqItems : FALLBACKS.faqItems)

    return {
        heroVideoUrl,
        heroText,
        serviceImages,
        servicesContent,
        faqAccent,
        faqTitle,
        faqItems,
        pending,
        error,
    }
}
