<script setup lang="ts">
useSeoMeta({
  title: 'Svadobná Fotografia | Profesionálne Svadobné Fotografie',
  description: 'Zachytávam najkrajší deň vášho života. Romantické svadobné fotografie plné emócií a lásky.',
  ogTitle: 'Svadobná Fotografia | Váš Svadobný Príbeh',
  ogDescription: 'Váš svadobný deň si zaslúži byť zachytený v celej svojej kráse.',
})

// Photos array with real images
const photos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: (i + 1) % 2 === 0 ? '/images/portfolio/svadobne/hero/svadobne-hero2.jpg' : '/images/portfolio/svadobne/hero/svadobne-hero1.jpg',
  alt: `Svadobná fotografia ${i + 1}`
}))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="svadobná fotografia"
      subtitle="PORTFÓLIO"
      left-image="/images/portfolio/svadobne/hero/svadobne-hero2.jpg"
      right-image="/images/portfolio/svadobne/hero/svadobne-hero1.jpg"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O svadobnom fotení"
      title="Svadobná Fotografia"
      image="/images/portfolio/svadobne/intro/svadobne-intro.jpg"
      image-alt="Svadobná fotografia"
    >
      <p>Svadobný deň je jedinečný príbeh plný lásky, emócií a neopakovateľných momentov. Mojím cieľom je zachytiť ho autenticky, s citom a dôrazom na detaily, ktoré z tohto dňa robia výnimočnú spomienku na celý život.</p>
      <p>Počas svadobného fotenia pracujem nenápadne a prirodzene, aby ste si mohli svoj deň naplno užiť bez stresu a pózovania. Zachytím skutočné emócie – úsmevy, slzy šťastia, dotyky a pohľady, ktoré hovoria viac než slová.</p>
      <p>Vytvoríme spolu nadčasové svadobné fotografie, ktoré budú verne rozprávať váš príbeh aj po rokoch. Fotografie, ku ktorým sa budete s radosťou vracať a ktoré sa stanú cennou súčasťou vášho rodinného archívu.</p>
    </SectionsPortfolioIntroSection>

    <!-- Services CTA -->
    <SectionsPortfolioServicesCTA />

    <!-- Photo Gallery -->
    <SectionsPortfolioPhotoGrid :photos="photos" />

    <!-- CTA Section -->
    <section class="py-16 md:py-20 bg-cream-200">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Plánujete svadbu?
        </h2>
        <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
          Poďme sa porozprávať o vašom svadobnom dni.
        </p>
        <UiAppButton to="/contact" variant="outline">
          Rezervovať termín
        </UiAppButton>
      </div>
    </section>
  </div>
</template>
