<script setup lang="ts">
useSeoMeta({
    title: 'Novorodenecká Fotografia | Profesionálne Fotografie Bábätiek',
    description:
        'Nežné fotografie vašich najmenších. Novorodenecké fotenie v pohodlí domova alebo ateliéri.',
    ogTitle: 'Novorodenecká Fotografia | Prvé Chvíle Nového Života',
    ogDescription: 'Zachytávam krehkú krásu prvých dní života.',
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
} = useSanityCategory('novorodenci')
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
            image-alt="Novorodenecká fotografia"
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
                    Očakávate prírastok?
                </h2>
                <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
                    Neváhajte ma kontaktovať už počas tehotenstva.
                </p>
                <UiAppButton to="/contact" variant="outline"> Rezervovať termín </UiAppButton>
            </div>
        </section>
    </div>
</template>
