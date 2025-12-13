<script setup lang="ts">
// Get hero images from Sanity for OG image
const { heroImages } = useSanityHomepage()

useSeoMeta({
  title: 'Photography | Maternity, Newborn & Family Photography',
  description: 'Professional photography capturing life\'s most precious moments. Maternity, newborn, family, and wedding photography in Bratislava and beyond.',
  ogTitle: 'Photography | Capturing Your New Favourite Memories',
  ogDescription: 'Professional photography capturing life\'s most precious moments. Based in Bratislava, available worldwide.',
  ogImage: () => heroImages.value[0] || '',
})
</script>

<template>
  <div>
    <SectionsHomeHeroSection />
    <SectionsHomeAboutSection />
    <SectionsHomePortfolioPreview />
    <SectionsHomeGalleryCarousel />
    <SectionsHomeServicesSection />
    <SectionsHomeTestimonialsSection />
  </div>
</template>
