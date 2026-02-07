<script setup lang="ts">
usePageSeo({
    title: 'Svadobné fotenie Galanta | Svadobná fotografia Galanta',
    description:
        'Svadobné fotografovanie v Galante a okolí. Emotívna svadobná fotografia, ktorá zachytí celý váš príbeh od príprav po večernú oslavu.',
    path: '/portfolio/svadby',
    keywords: [
        'svadobne fotenie galanta',
        'svadobna fotografia galanta',
        'svadobny fotograf galanta',
    ],
    structuredData: {
        '@type': 'Service',
        name: 'Svadobné fotenie Galanta',
        serviceType: 'Svadobná fotografia',
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
} = useSanityCategory('svadby')
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
            image-alt="Svadobná fotografia"
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
                    Plánujete svadbu?
                </h2>
                <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
                    Poďme sa porozprávať o vašom svadobnom dni.
                </p>
                <UiAppButton to="/contact" variant="outline"> Rezervovať termín </UiAppButton>
            </div>
        </section>
    </div>
</template>
