<script setup lang="ts">
const { heroImages } = useSanityHomepage()

useSeoMeta({
    title: 'Pauli Fotografka | Rodinná, Novorodenecká a Tehotenská Fotografia',
    description:
        'Profesionálna fotografka zachytávajúca najvzácnejšie momenty života. Tehotenské, novorodenecké, rodinné a svadobné fotografie v Galante a okolí.',
    ogTitle: 'Pauli Fotografka | Zachytávam vaše najkrajšie spomienky',
    ogDescription:
        'Profesionálna fotografka zachytávajúca najvzácnejšie momenty života. Pôsobím v Galante, dostupná po celom Slovensku.',
    ogImage: () => heroImages.value[0] || '/images/brand_logo/logo.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Pauli Fotografka | Zachytávam vaše najkrajšie spomienky',
    twitterDescription:
        'Profesionálna fotografka zachytávajúca najvzácnejšie momenty života. Tehotenské, novorodenecké, rodinné a svadobné fotografie.',
    twitterImage: () => heroImages.value[0] || '/images/brand_logo/logo.png',
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
