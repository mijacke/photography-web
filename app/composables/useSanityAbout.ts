interface PhilosophyItem {
    icon: string
    title: string
    description: string
}

interface SanityAbout {
    // Hero
    heroAccent?: string
    heroLine1?: string
    heroLine2?: string
    heroLine3?: string
    heroCta?: string
    // Main
    mainImage?: {
        asset: {
            _id: string
            url: string
        }
    }
    mainTitle?: string
    paragraphs?: string[]
    // Philosophy
    philosophyAccent?: string
    philosophyTitle?: string
    philosophyItems?: PhilosophyItem[]
    // CTA
    ctaTitle?: string
    ctaText?: string
    ctaButtonText?: string
}

const FALLBACKS = {
    heroAccent: 'Za každým záberom',
    heroLine1: 'je príbeh,',
    heroLine2: 'ktorý čaká',
    heroLine3: 'na zachytenie.',
    heroCta: 'Spoznajte ma',
    mainTitle: 'Ahoj, som Pauli',
    paragraphs: [
        'Vitajte! Som profesionálna fotografka z Bratislavy, špecializujem sa na zachytávanie najvzácnejších momentov života — od očakávania materstva, cez zázrak novorodencov až po radosť z rodinných stretnutí.',
        'Moja cesta k fotografii začala pred viac ako desiatimi rokmi, keď som vzala do rúk svoj prvý fotoaparát a objavila kúzlo zamrazenia okamihov v čase. Odvtedy som mala česť zdokumentovať stovky rodín, svadieb a životných míľnikov.',
        'Môj prístup je uvoľnený a prirodzený. Verím, že najlepšie fotografie vznikajú vtedy, keď zabudnete, že tam fotoaparát vôbec je. Každé fotenie je prispôsobené jedinečnému príbehu vašej rodiny a vytvára obrazy, ktoré budú cenené po generácie.',
        'Keď nie som za objektívom, nájdete ma pri objavovaní nových lokalít na fotenie, pri trávení času s vlastnou rodinou alebo pri úprave fotografií v mojom útulnom domácom štúdiu s šálkou kávy.',
    ],
    philosophyAccent: 'Moja filozofia',
    philosophyTitle: 'Čo robí moju prácu výnimočnou',
    philosophyItems: [
        { icon: 'heart', title: 'Autentické momenty', description: 'Zameriavam sa na zachytenie skutočných emócií a pravých spojení, nie nútených póz.' },
        { icon: 'camera', title: 'Nadčasový štýl', description: 'Čistá, elegantná úprava, ktorá bude vyzerať krásne aj o desaťročia.' },
        { icon: 'clock', title: 'Uvoľnený zážitok', description: 'Fotenia sú navrhnuté tak, aby pôsobili ako zábavný výlet, nie stresujúce natáčanie.' },
    ],
    ctaTitle: 'Poďme spolupracovať',
    ctaText: 'Rada by som počula váš príbeh a vytvorila niečo krásne.',
    ctaButtonText: 'Kontaktujte ma',
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
 * All fields have fallback values for when Sanity data is missing.
 *
 * @returns Object containing all About page content with computed properties
 */
export const useSanityAbout = () => {
    const { data, pending, error } = useFetch<SanityAbout | null>('/api/sanity/about', {
        key: 'about',
    })

    // Hero section
    const heroAccent = computed(() => data.value?.heroAccent || FALLBACKS.heroAccent)
    const heroLine1 = computed(() => data.value?.heroLine1 || FALLBACKS.heroLine1)
    const heroLine2 = computed(() => data.value?.heroLine2 || FALLBACKS.heroLine2)
    const heroLine3 = computed(() => data.value?.heroLine3 || FALLBACKS.heroLine3)
    const heroCta = computed(() => data.value?.heroCta || FALLBACKS.heroCta)

    // Main section
    const mainImage = computed(() =>
        data.value?.mainImage?.asset.url
            ? buildOptimizedUrl(data.value.mainImage.asset.url, 600, 85)
            : null
    )
    const mainTitle = computed(() => data.value?.mainTitle || FALLBACKS.mainTitle)
    const paragraphs = computed(() => data.value?.paragraphs?.length ? data.value.paragraphs : FALLBACKS.paragraphs)

    // Philosophy section
    const philosophyAccent = computed(() => data.value?.philosophyAccent || FALLBACKS.philosophyAccent)
    const philosophyTitle = computed(() => data.value?.philosophyTitle || FALLBACKS.philosophyTitle)
    const philosophyItems = computed(() => data.value?.philosophyItems?.length ? data.value.philosophyItems : FALLBACKS.philosophyItems)

    // CTA section
    const ctaTitle = computed(() => data.value?.ctaTitle || FALLBACKS.ctaTitle)
    const ctaText = computed(() => data.value?.ctaText || FALLBACKS.ctaText)
    const ctaButtonText = computed(() => data.value?.ctaButtonText || FALLBACKS.ctaButtonText)

    return {
        // Hero
        heroAccent,
        heroLine1,
        heroLine2,
        heroLine3,
        heroCta,
        // Main
        mainImage,
        mainTitle,
        paragraphs,
        // Philosophy
        philosophyAccent,
        philosophyTitle,
        philosophyItems,
        // CTA
        ctaTitle,
        ctaText,
        ctaButtonText,
        // Meta
        pending,
        error,
    }
}
