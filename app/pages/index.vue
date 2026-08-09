<script setup lang="ts">
const { heroImages } = useSanityHomepage()

usePageSeo({
    title: 'Fotografka Galanta | Tehotenské, rodinné, svadobné a novorodenecké fotenie',
    description:
        'Pauli Fotografka v Galante: profesionálne fotografovanie tehotenstva, rodiny, svadby aj novorodencov. Fotografia Galanta a okolie, prirodzené emócie a nadčasový štýl.',
    path: '/',
    image: () => heroImages.value[0] || '/images/brand_logo/logo.png',
    keywords: [
        'profesionalna fotografka galanta',
        'rodinna fotografia galanta',
        'tehotenska fotografia galanta',
        'novorodenecka fotografia galanta',
        'svadobna fotografia galanta',
    ],
    structuredData: {
        '@type': 'ItemList',
        name: 'Fotografické služby v Galante',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Rodinné fotenie', url: 'https://www.paulifotografka.sk/portfolio/rodina' },
            { '@type': 'ListItem', position: 2, name: 'Novorodenecké fotenie', url: 'https://www.paulifotografka.sk/portfolio/novorodenci' },
            { '@type': 'ListItem', position: 3, name: 'Tehotenské fotenie', url: 'https://www.paulifotografka.sk/portfolio/tehotenstvo' },
            { '@type': 'ListItem', position: 4, name: 'Svadobné fotenie', url: 'https://www.paulifotografka.sk/portfolio/svadby' },
        ],
    },
})
</script>

<template>
    <div>
        <SectionsHomeHeroSection />
        <SectionsHomeAboutSection>
            <p>
                Som fotografka z Galanty a fotografiu vnímam ako spôsob, ako zastaviť čas.
                Špecializujem sa na rodinné, tehotenské, novorodenecké a svadobné fotenie —
                prirodzene, s citom a bez zbytočného pózovania.
            </p>
            <p>
                Fotím v Galante a širokom okolí — Sereď, Šaľa, Trnava, Nitra či Dunajská Streda.
                Každé stretnutie je pre mňa nový príbeh a mojou úlohou je zachytiť ho tak, aby ste
                sa k nemu radi vracali aj o mnoho rokov.
            </p>
        </SectionsHomeAboutSection>
        <SectionsHomePortfolioPreview />
        <SectionsHomeGalleryCarousel />
        <SectionsHomeServicesSection />
        <SectionsHomeTestimonialsSection />
    </div>
</template>
