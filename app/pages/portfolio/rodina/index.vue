<script setup lang="ts">
useSeoMeta({
  title: 'Rodinná Fotografia | Profesionálne Rodinné Fotografie',
  description: 'Zachytávam autentické rodinné momenty plné lásky a radosti. Profesionálna rodinná fotografia v Bratislave a okolí.',
  ogTitle: 'Rodinná Fotografia | Vaše Rodinné Príbehy',
  ogDescription: 'Každá rodina má svoj jedinečný príbeh. Pomôžem vám ho zachytiť v krásnych fotografiách.',
})

// Photos array with real images
// Portrait (even IDs) use hero-section/1.jpg, Landscape (odd IDs) use carousel1.jpg
const photos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: (i + 1) % 2 === 0 ? '/images/hero-section/1.jpg' : '/images/carousel/carousel1.jpg',
  alt: `Rodinná fotografia ${i + 1}`
}))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsPortfolioHero
      title="rodinná fotografia"
      subtitle="PORTFÓLIO"
      left-image="/images/hero-section/1.jpg"
      right-image="/images/hero-section/2.jpg"
    />

    <!-- Intro Section -->
    <SectionsPortfolioIntroSection
      subtitle="O rodinnom fotení"
      title="Rodinná Fotografia"
      image="/images/hero-section/1.jpg"
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
