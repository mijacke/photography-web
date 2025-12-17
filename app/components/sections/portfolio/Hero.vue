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

const { cleanup } = useGsapAnimations()

// Animate hero on mount - wait for DOM to be ready on client-side navigation
onMounted(() => {
  // Use double requestAnimationFrame for reliable DOM readiness after navigation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const { gsap } = useGsapAnimations()
      
      // Check if elements exist before animating
      const leftImage = document.querySelector('.hero-left-image')
      const rightImage = document.querySelector('.hero-right-image')
      const subtitle = document.querySelector('.hero-subtitle')
      const title = document.querySelector('.hero-title')
      
      // Images reveal with clip-path
      if (leftImage) {
        gsap.from(leftImage, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.2,
          ease: 'power3.out'
        })
      }
      if (rightImage) {
        gsap.from(rightImage, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.15
        })
      }
      
      // Text content fade in
      if (subtitle) {
        gsap.from(subtitle, {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5
        })
      }
      if (title) {
        gsap.from(title, {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.7
        })
      }
    })
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <section class="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] min-h-[400px] flex items-center justify-center overflow-hidden">
    <!-- Images - stacked on mobile, side by side on desktop -->
    <div class="absolute inset-0 flex flex-col md:flex-row">
      <!-- Left/Top Image -->
      <div class="hero-left-image w-full md:w-1/2 h-1/2 md:h-full" style="clip-path: inset(0);">
        <img
          :src="leftImage"
          alt=""
          class="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <!-- Right/Bottom Image -->
      <div class="hero-right-image w-full md:w-1/2 h-1/2 md:h-full" style="clip-path: inset(0);">
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
        class="hero-subtitle text-white font-sans uppercase mb-2 md:mb-4 drop-shadow-lg tracking-[0.2em]"
        style="font-size: clamp(0.75rem, 2vw, 1.125rem); letter-spacing: clamp(0.2em, 0.5vw, 0.4em);"
      >
        {{ subtitle }}
      </p>
      <h1 
        class="hero-title font-hero text-white lowercase drop-shadow-lg whitespace-nowrap leading-tight"
        style="font-size: clamp(1.8rem, 8vw, 6rem);"
      >
        {{ title }}
      </h1>
    </div>
  </section>
</template>

