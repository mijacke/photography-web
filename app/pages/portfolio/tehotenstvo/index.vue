<script setup lang="ts">
useSeoMeta({
  title: 'Tehotenská Fotografia | Profesionálne Tehotenské Fotografie',
  description: 'Oslavujem krásu materstva. Tehotenské fotenie v Bratislave a okolí.',
  ogTitle: 'Tehotenská Fotografia | Krása Materstva',
  ogDescription: 'Zachytávam magické obdobie očakávania nového života.',
})

// Fetch from Sanity - photos are now part of category
const { heroLeftUrl, heroRightUrl, introImageUrl, photos, pending, error } = useSanityCategory('tehotenstvo')
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="tehotenské fotografie"
      subtitle="PORTFÓLIO"
      :left-image="heroLeftUrl || ''"
      :right-image="heroRightUrl || ''"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O tehotenskom fotení"
      title="Tehotenské Fotografie"
      :image="introImageUrl || ''"
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
