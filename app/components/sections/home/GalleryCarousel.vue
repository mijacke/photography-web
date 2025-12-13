<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

// Get gallery carousel images from Sanity
const { galleryCarouselImages } = useSanityHomepage()

// Splide configuration - single slide with fade transition
const splideOptions = {
  type: 'fade',
  rewind: true,
  perPage: 1,
  pagination: false,
  arrows: false,
  autoplay: true,
  interval: 5000,
  pauseOnHover: false,
  pauseOnFocus: false,
  speed: 1000,
}
</script>

<template>
  <section v-if="galleryCarouselImages.length > 0" class="bg-white w-full">
    <Splide :options="splideOptions">
      <SplideSlide v-for="(image, index) in galleryCarouselImages" :key="index">
        <div class="w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <img
            :src="image"
            :alt="`Gallery image ${index + 1}`"
            class="w-full h-full object-cover object-center"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

