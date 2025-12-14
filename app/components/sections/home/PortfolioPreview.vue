<script setup lang="ts">
// Get portfolio images from Sanity
const { portfolioImages } = useSanityHomepage()

const categories = computed(() => [
  {
    title: 'Rodina',
    href: '/portfolio/rodina',
    image: portfolioImages.value.rodina || '',
  },
  {
    title: 'Svadby',
    href: '/portfolio/svadby',
    image: portfolioImages.value.svadby || '',
  },
  {
    title: 'Novorodenci',
    href: '/portfolio/novorodenci',
    image: portfolioImages.value.novorodenci || '',
  },
  {
    title: 'Tehotenstvo',
    href: '/portfolio/tehotenstvo',
    image: portfolioImages.value.tehotenstvo || '',
  },
])
</script>

<template>
  <section class="bg-cream-200">
    <!-- Section Header with sigmoid - centered between sections -->
    <div class="py-2.5 text-center">
      <h2 class="text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase text-charcoal-700">
        Krásne okamihy
      </h2>
      
      <!-- Decorative swirl/flourish image -->
      <div class="flex justify-center mb-12">
        <img 
          src="/images/sigmoid/sigmoid.png"
          alt="Decorative swirl"
          class="w-auto h-24 md:h-30 lg:h-36"
        />
      </div>

      <NuxtLink 
        to="/portfolio" 
        class="group font-script text-2xl md:text-3xl lg:text-4xl italic text-charcoal-700 hover:text-warm-500 transition-colors inline-flex items-center gap-3"
      >
        Prezrite si moje portfólio
        <span class="relative h-6 w-6 md:h-8 md:w-8">
          <img src="/svg/icons/arrow-right.svg" alt="" class="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0" />
          <img src="/svg/icons/arrow-right-warm.svg" alt="" class="absolute inset-0 h-full w-full transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        </span>
      </NuxtLink>
    </div>

    <!-- Category Grid -->
    <div class="px-8 md:px-16 lg:px-24 pt-32 pb-32">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.href"
          :to="category.href"
          class="group block"
        >
          <!-- Image Card -->
          <div 
            class="relative aspect-[3/4] overflow-hidden bg-cream-200"
            style="box-shadow: #00000090 0px 0px 10px 0px;"
          >
            <NuxtImg
              v-if="category.image"
              :src="category.image"
              :alt="category.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width="400"
              height="533"
              format="webp"
              quality="85"
              loading="lazy"
            />
          </div>
          
          <!-- Title below image -->
          <p class="mt-5 text-center text-xs md:text-sm tracking-[0.2em] uppercase text-charcoal-600 group-hover:text-warm-500 transition-colors">
            {{ category.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
