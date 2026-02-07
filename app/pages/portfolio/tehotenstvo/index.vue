<script setup lang="ts">
usePageSeo({
    title: 'Tehotenské fotenie Galanta | Tehotenská fotografia Galanta',
    description:
        'Tehotenské fotografovanie v Galante s citlivým vedením a prirodzeným štýlom. Zachytenie krásy materstva pre Galantu a okolie.',
    path: '/portfolio/tehotenstvo',
    keywords: [
        'tehotenske fotenie galanta',
        'tehotenska fotografia galanta',
        'fotenie tehotenstva galanta',
    ],
    structuredData: {
        '@type': 'Service',
        name: 'Tehotenské fotenie Galanta',
        serviceType: 'Tehotenská fotografia',
        areaServed: 'Galanta',
    },
})

const {
    heroSubtitle,
    heroTitle,
    heroLeftUrl,
    heroRightUrl,
    introSubtitle,
    introTitle,
    introParagraphs,
    introImageUrl,
    photos,
} = useSanityCategory('tehotenstvo')
</script>

<template>
    <div>
        <SectionsPortfolioHero
            :title="heroTitle"
            :subtitle="heroSubtitle"
            :left-image="heroLeftUrl || ''"
            :right-image="heroRightUrl || ''"
        />

        <SectionsPortfolioIntroSection
            :subtitle="introSubtitle"
            :title="introTitle"
            :image="introImageUrl || ''"
            image-alt="Tehotenská fotografia"
        >
            <p v-for="(paragraph, index) in introParagraphs" :key="index">
                {{ paragraph }}
            </p>
        </SectionsPortfolioIntroSection>

        <SectionsPortfolioServicesCTA />

        <SectionsPortfolioPhotoGrid :photos="photos" />

        <section class="py-16 md:py-20 bg-cream-200">
            <div class="container-narrow text-center">
                <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
                    Čakáte bábätko?
                </h2>
                <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
                    Ideálny čas pre tehotenské fotenie je medzi 28. a 34. týždňom.
                </p>
                <UiAppButton to="/contact" variant="outline"> Rezervovať termín </UiAppButton>
            </div>
        </section>
    </div>
</template>
