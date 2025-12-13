<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  leftImage?: string
  rightImage?: string
}

withDefaults(defineProps<Props>(), {
  leftImage: '',
  rightImage: ''
})
</script>

<template>
  <section class="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] min-h-[400px] flex items-center justify-center overflow-hidden">
    <!-- Images - stacked on mobile, side by side on desktop -->
    <div class="absolute inset-0 flex flex-col md:flex-row">
      <!-- Left/Top Image -->
      <div class="w-full md:w-1/2 h-1/2 md:h-full">
        <img
          :src="leftImage"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <!-- Right/Bottom Image -->
      <div class="w-full md:w-1/2 h-1/2 md:h-full">
        <img
          :src="rightImage"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
    
    <!-- Content Overlay -->
    <div class="relative z-10 text-center px-4 md:px-6 w-full max-w-[95%] mx-auto">
      <p 
        class="text-white font-sans uppercase mb-2 md:mb-4 drop-shadow-lg tracking-[0.2em]"
        style="font-size: clamp(0.75rem, 2vw, 1.125rem); letter-spacing: clamp(0.2em, 0.5vw, 0.4em);"
      >
        {{ subtitle }}
      </p>
      <h1 
        class="font-hero text-white lowercase drop-shadow-lg whitespace-nowrap leading-tight"
        style="font-size: clamp(1.8rem, 8vw, 6rem);"
      >
        {{ title }}
      </h1>
    </div>
  </section>
</template>
