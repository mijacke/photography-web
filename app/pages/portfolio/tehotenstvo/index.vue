<script setup lang="ts">
useSeoMeta({
  title: 'Tehotenská Fotografia | Profesionálne Tehotenské Fotografie',
  description: 'Oslavujem krásu materstva. Tehotenské fotenie v Bratislave a okolí.',
  ogTitle: 'Tehotenská Fotografia | Krása Materstva',
  ogDescription: 'Zachytávam magické obdobie očakávania nového života.',
})

// Photos array with real images
const photos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: (i + 1) % 2 === 0 ? '/images/hero-section/1.jpg' : '/images/carousel/carousel1.jpg',
  alt: `Tehotenská fotografia ${i + 1}`
}))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="tehotenská fotografia"
      subtitle="PORTFÓLIO"
      left-image="/images/hero-section/1.jpg"
      right-image="/images/hero-section/2.jpg"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O tehotenskom fotení"
      title="Tehotenská Fotografia"
      image="/images/hero-section/1.jpg"
      image-alt="Tehotenská fotografia"
    >
      <p>Ponúkam jemné, nadčasové a umelecké fotografie, ktoré s citom zachytia krásu, očakávanie a radosť z tohto výnimočného obdobia vášho života. Každý záber je vytvorený tak, aby vyzdvihol prirodzenosť, emócie a jedinečný príbeh budúcej mamy.</p>
      <p>Či už uprednostníte intímnu atmosféru štúdia alebo prirodzené svetlo a pokoj prírody, postarám sa o uvoľnenú atmosféru a spoločne navrhneme fotenie presne podľa vašich predstáv. Mojím cieľom je, aby ste sa počas fotenia cítili príjemne, sebavedomo a samy sebou.</p>
      <p>Tehotenské fotenie je ideálne absolvovať v období medzi 32. až 34. týždňom tehotenstva, kedy je bruško krásne viditeľné a vy sa ešte cítite komfortne.</p>
    </SectionsPortfolioIntroSection>

    <!-- Services CTA -->
    <SectionsPortfolioServicesCTA />

    <!-- Photo Gallery -->
    <SectionsPortfolioPhotoGrid :photos="photos" />

    <!-- CTA Section -->
    <section class="py-16 md:py-20 bg-cream-200">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Čakáte bábätko?
        </h2>
        <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
          Ideálny čas pre tehotenské fotenie je medzi 28. a 34. týždňom.
        </p>
        <UiAppButton to="/contact" variant="outline">
          Rezervovať termín
        </UiAppButton>
      </div>
    </section>
  </div>
</template>
