<script setup lang="ts">
useSeoMeta({
  title: 'Svadobná Fotografia | Profesionálne Svadobné Fotografie',
  description: 'Zachytávam najkrajší deň vášho života. Romantické svadobné fotografie plné emócií a lásky.',
  ogTitle: 'Svadobná Fotografia | Váš Svadobný Príbeh',
  ogDescription: 'Váš svadobný deň si zaslúži byť zachytený v celej svojej kráse.',
})

// Fetch from Sanity - photos are now part of category
const { heroLeftUrl, heroRightUrl, introImageUrl, photos, pending, error } = useSanityCategory('svadby')
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <p class="text-charcoal-600">Načítavam...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <p class="text-red-600">Chyba pri načítaní: {{ error.message }}</p>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hero Section -->
      <SectionsPortfolioHero
        title="svadobné fotografie"
        subtitle="PORTFÓLIO"
        :left-image="heroLeftUrl || ''"
        :right-image="heroRightUrl || ''"
      />

      <!-- Intro Section -->
      <SectionsPortfolioIntroSection
        subtitle="O svadobnom fotení"
        title="Svadobné Fotografie"
        :image="introImageUrl || ''"
        image-alt="Svadobná fotografia"
      >
        <p>Svadobný deň je jedinečný príbeh plný lásky, emócií a neopakovateľných momentov. Mojím cieľom je zachytiť ho autenticky, s citom a dôrazom na detaily, ktoré z tohto dňa robia výnimočnú spomienku na celý život.</p>
        <p>Počas svadobného fotenia pracujem nenápadne a prirodzene, aby ste si mohli svoj deň naplno užiť bez stresu a pózovania. Zachytím skutočné emócie – úsmevy, slzy šťastia, dotyky a pohľady, ktoré hovoria viac než slová.</p>
        <p>Vytvoríme spolu nadčasové svadobné fotografie, ktoré budú verne rozprávať váš príbeh aj po rokoch. Fotografie, ku ktorým sa budete s radosťou vracať a ktoré sa stanú cennou súčasťou vášho rodinného archívu.</p>
      </SectionsPortfolioIntroSection>

      <!-- Services CTA -->
      <SectionsPortfolioServicesCTA />

      <!-- Photo Gallery -->
      <SectionsPortfolioPhotoGrid v-if="photos.length > 0" :photos="photos" />
      <div v-else class="py-16 text-center">
        <p class="text-charcoal-500">Zatiaľ žiadne fotografie v galérii. Pridajte ich cez Sanity Studio.</p>
      </div>

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
    </template>
  </div>
</template>
