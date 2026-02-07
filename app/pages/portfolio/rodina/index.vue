<script setup lang="ts">
usePageSeo({
    title: 'Rodinné fotenie Galanta | Rodinná fotografia Galanta',
    description:
        'Rodinné fotografovanie v Galante plné prirodzených emócií. Rodinná fotografia Galanta a okolie pre páry, deti aj celé rodiny.',
    path: '/portfolio/rodina',
    keywords: [
        'rodinne fotenie galanta',
        'rodinna fotografia galanta',
        'rodinne fotografovanie galanta',
    ],
    structuredData: {
        '@type': 'Service',
        name: 'Rodinné fotenie Galanta',
        serviceType: 'Rodinná fotografia',
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
} = useSanityCategory('rodina')
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
            image-alt="Rodinná fotografia"
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
                    Poďme zachytiť vaše momenty
                </h2>
                <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
                    Kontaktujte ma a spoločne naplánujeme vaše rodinné fotenie.
                </p>
                <UiAppButton to="/contact" variant="outline"> Napíšte mi </UiAppButton>
            </div>
        </section>
    </div>
</template>
