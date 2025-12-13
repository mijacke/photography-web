<script setup lang="ts">
useSeoMeta({
  title: 'Rodinná Fotografia | Profesionálne Rodinné Fotografie',
  description: 'Zachytávam autentické rodinné momenty plné lásky a radosti. Profesionálna rodinná fotografia v Bratislave a okolí.',
  ogTitle: 'Rodinná Fotografia | Vaše Rodinné Príbehy',
  ogDescription: 'Každá rodina má svoj jedinečný príbeh. Pomôžem vám ho zachytiť v krásnych fotografiách.',
})

// Fetch from Sanity - photos are now part of category
const { heroLeftUrl, heroRightUrl, introImageUrl, photos, pending, error } = useSanityCategory('rodina')
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="rodinné fotografie"
      subtitle="PORTFÓLIO"
      :left-image="heroLeftUrl || ''"
      :right-image="heroRightUrl || ''"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O rodinnom fotení"
      title="Rodinné Fotografie"
      :image="introImageUrl || ''"
      image-alt="Rodinná fotografia"
    >
      <p>Rodinné fotenie je o láske, blízkosti a skutočných emóciách. O chvíľach, ktoré sú na prvý pohľad obyčajné, no s odstupom času sa stanú tými najvzácnejšími spomienkami.</p>
      <p>Spoločne vytvoríme prirodzené a uvoľnené fotografie, ktoré zachytia váš rodinný príbeh taký, aký naozaj je – plný smiechu, objatí, jemných dotykov a autentických momentov. Či už si vyberiete fotenie v prírode, u vás doma alebo v štúdiu, postarám sa o príjemnú atmosféru, v ktorej sa budú dobre cítiť deti aj dospelí.</p>
      <p>Počas fotenia vás budem jemne viesť, no zároveň ponechám priestor spontánnosti, aby vznikli fotografie, ku ktorým sa budete radi vracať aj o mnoho rokov. Spoločne vytvoríme nadčasové spomienky, ktoré sa stanú prirodzenou súčasťou vášho rodinného albumu.</p>
    </SectionsPortfolioIntroSection>

    <!-- Services CTA -->
    <SectionsPortfolioServicesCTA />

    <!-- Photo Gallery -->
    <SectionsPortfolioPhotoGrid :photos="photos" />

    <!-- CTA Section -->
    <section class="py-16 md:py-20 bg-cream-200">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Poďme zachytiť vaše momenty
        </h2>
        <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
          Kontaktujte ma a spoločne naplánujeme vaše rodinné fotenie.
        </p>
        <UiAppButton to="/contact" variant="outline">
          Napíšte mi
        </UiAppButton>
      </div>
    </section>
  </div>
</template>
