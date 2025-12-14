<script setup lang="ts">
// Get portfolio images from Sanity
const { portfolioImages } = useSanityHomepage()

useSeoMeta({
  title: 'Portfolio | Photography',
  description: 'Prezrite si moje fotografické portfólio - rodinné fotenie, svadby, novorodenci a tehotenské fotografie.',
})

const categories = computed(() => [
  {
    title: 'Rodina',
    description: 'Rodinné portrétové fotenie plné lásky a radosti.',
    href: '/portfolio/rodina',
    image: portfolioImages.value.rodina || ''
  },
  {
    title: 'Svadby',
    description: 'Zachytenie vášho najkrajšieho dňa.',
    href: '/portfolio/svadby',
    image: portfolioImages.value.svadby || ''
  },
  {
    title: 'Novorodenci',
    description: 'Jemné fotografie vašich maličkých.',
    href: '/portfolio/novorodenci',
    image: portfolioImages.value.novorodenci || ''
  },
  {
    title: 'Tehotenstvo',
    description: 'Oslavujeme krásu materstva.',
    href: '/portfolio/tehotenstvo',
    image: portfolioImages.value.tehotenstvo || ''
  },
])
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
      <div class="container-narrow text-center">
        <p class="text-warm-500 font-script text-2xl md:text-3xl mb-3">
          Moja práca
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
          Portfólio
        </h1>
        <p class="text-charcoal-600 max-w-xl mx-auto">
          Zbierka mojich najobľúbenejších momentov zachytených za roky. 
          Každé fotenie rozpráva jedinečný príbeh lásky a spojenia.
        </p>
      </div>
    </section>

    <!-- Portfolio Categories Grid -->
    <section class="section-padding bg-cream-100">
      <div class="container-wide">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NuxtLink
            v-for="category in categories"
            :key="category.href"
            :to="category.href"
            class="group relative overflow-hidden aspect-[4/3]"
          >
            <img
              v-if="category.image"
              :src="category.image"
              :alt="category.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <div class="absolute inset-0 bg-charcoal-900/40 group-hover:bg-charcoal-900/50 transition-colors duration-300"></div>
            
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h2 class="text-3xl md:text-4xl font-display text-white mb-3 transform group-hover:-translate-y-1 transition-transform duration-300">
                {{ category.title }}
              </h2>
              <p class="text-cream-200 text-sm md:text-base max-w-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {{ category.description }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-16 md:py-20 bg-cream-200">
      <div class="container-narrow text-center">
        <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Máte záujem o fotenie?
        </h2>
        <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
          Kontaktujte ma a porozprávajme sa o vašich predstavách.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-charcoal-900 text-white text-sm tracking-wider uppercase hover:bg-charcoal-800 transition-colors"
        >
          Kontaktovať
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
