<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  leftImage?: string
  rightImage?: string
}

withDefaults(defineProps<Props>(), {
  leftImage: '/images/home/homehero.jpg',
  rightImage: '/images/home/homehero.jpg'
})
</script>

<template>
  <section class="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] min-h-[400px] flex items-center justify-center overflow-hidden">
    <!-- Images - stacked on mobile, side by side on desktop -->
    <div class="absolute inset-0 flex flex-col md:flex-row">
      <!-- Left/Top Image -->
      <div class="w-full md:w-1/2 h-1/2 md:h-full">
        <NuxtImg
          :src="leftImage"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <!-- Right/Bottom Image -->
      <div class="w-full md:w-1/2 h-1/2 md:h-full">
        <NuxtImg
          :src="rightImage"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
    
    <!-- Content Overlay -->
    <div class="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
      <p class="text-white text-xs md:text-base lg:text-hero-subtitle font-sans uppercase mb-3 md:mb-6 drop-shadow-lg tracking-[0.2em] md:tracking-[17px]">
        {{ subtitle }}
      </p>
      <h1 class="text-3xl md:text-5xl lg:text-hero-title font-hero text-white lowercase drop-shadow-lg">
        {{ title }}
      </h1>
    </div>
  </section>
</template>
