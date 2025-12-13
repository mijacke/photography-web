<script setup lang="ts">
useSeoMeta({
  title: 'Novorodenecká Fotografia | Profesionálne Fotografie Bábätiek',
  description: 'Nežné fotografie vašich najmenších. Novorodenecké fotenie v pohodlí domova alebo ateliéri.',
  ogTitle: 'Novorodenecká Fotografia | Prvé Chvíle Nového Života',
  ogDescription: 'Zachytávam krehkú krásu prvých dní života.',
})

// Photos array with real images
const photos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: (i + 1) % 2 === 0 ? '/images/hero-section/1.jpg' : '/images/carousel/carousel1.jpg',
  alt: `Novorodenecká fotografia ${i + 1}`
}))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="novorodenecká fotografia"
      subtitle="PORTFÓLIO"
      left-image="/images/hero-section/1.jpg"
      right-image="/images/hero-section/2.jpg"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O novorodeneckom fotení"
      title="Novorodenecká Fotografia"
      image="/images/hero-section/2.jpg"
      image-alt="Novorodenecká fotografia"
    >
      <p>Zažite kúzlo prvých dní s vaším bábätkom prostredníctvom jemných a nadčasových novorodeneckých fotografií. Spoločne zachytíme tú najčistejšiu krásu, pokoj a lásku, ktoré sprevádzajú tieto neopakovateľné chvíle.</p>
      <p>Počas fotenia vytvoríme prirodzené a nežné zábery, ktoré sa stanú vzácnymi spomienkami pre celú vašu rodinu. Keďže som sama mamou, kladiem mimoriadny dôraz na bezpečnosť, komfort a individuálny prístup – aby ste sa vy aj vaše bábätko cítili pokojne a v dobrých rukách počas celého fotenia.</p>
      <p>Zachytíme prvé dotyky, pohľady a emócie, ktoré tvoria základ vášho rodinného príbehu a fotoalbumu plného lásky.</p>
      <p>Newborn fotenie je ideálne absolvovať v období od 7. do 21. dňa po narodení bábätka. Ak však toto obdobie nestihnete, nezúfajte – krásne, citlivé a prirodzené fotografie vieme vytvoriť aj so starším bábätkom.</p>
    </SectionsPortfolioIntroSection>

    <!-- Services CTA -->
    <SectionsPortfolioServicesCTA />

    <!-- Photo Gallery -->
    <SectionsPortfolioPhotoGrid :photos="photos" />

    <!-- CTA Section -->
    <section class="py-16 md:py-20 bg-cream-200">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Očakávate prírastok?
        </h2>
        <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
          Neváhajte ma kontaktovať už počas tehotenstva.
        </p>
        <UiAppButton to="/contact" variant="outline">
          Rezervovať termín
        </UiAppButton>
      </div>
    </section>
  </div>
</template>
