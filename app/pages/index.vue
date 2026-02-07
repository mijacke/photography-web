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
            { '@type': 'ListItem', position: 1, name: 'Rodinné fotenie', url: 'https://paulifotografka.sk/portfolio/rodina' },
            { '@type': 'ListItem', position: 2, name: 'Novorodenecké fotenie', url: 'https://paulifotografka.sk/portfolio/novorodenci' },
            { '@type': 'ListItem', position: 3, name: 'Tehotenské fotenie', url: 'https://paulifotografka.sk/portfolio/tehotenstvo' },
            { '@type': 'ListItem', position: 4, name: 'Svadobné fotenie', url: 'https://paulifotografka.sk/portfolio/svadby' },
        ],
    },
})
</script>

<template>
    <div>
        <SectionsHomeHeroSection />
        <SectionsHomeAboutSection />
        <SectionsHomePortfolioPreview />
        <SectionsHomeGalleryCarousel />
        <SectionsHomeServicesSection />
        <SectionsHomeTestimonialsSection />
    </div>
</template>
