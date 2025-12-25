<script setup lang="ts">
useSeoMeta({
    title: 'Rodinná Fotografia | Profesionálne Rodinné Fotografie',
    description:
        'Zachytávam autentické rodinné momenty plné lásky a radosti. Profesionálna rodinná fotografia v Bratislave a okolí.',
    ogTitle: 'Rodinná Fotografia | Vaše Rodinné Príbehy',
    ogDescription:
        'Každá rodina má svoj jedinečný príbeh. Pomôžem vám ho zachytiť v krásnych fotografiách.',
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
