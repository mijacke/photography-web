<script setup lang="ts">
interface Props {
  subtitle?: string
  title: string
  image?: string
  imageAlt?: string
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  image: '',
  imageAlt: 'Portfolio image'
})

const { slideIn, parallax, fadeInUp, cleanup, refresh } = useGsapAnimations()

onMounted(() => {
  // Wait for DOM to be ready on client-side navigation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const { gsap, ScrollTrigger } = useGsapAnimations()
      
      // Image animations - composable already checks existence
      slideIn('.intro-image-wrapper', { direction: 'left', distance: 50, duration: 1 })
      parallax('.intro-image', { yPercent: -8 })
      fadeInUp('.intro-frame', { y: 15, duration: 0.7, delay: 0.2 })
      
      // Text content as timeline - only if trigger exists
      const introContent = document.querySelector('.intro-content')
      if (introContent) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.intro-content',
            start: 'top 80%',
            once: true,
          }
        })
        
        if (document.querySelector('.intro-subtitle')) {
          tl.from('.intro-subtitle', { y: 20, autoAlpha: 0, duration: 0.6, ease: 'power3.out' })
        }
        if (document.querySelector('.intro-title')) {
          tl.from('.intro-title', { y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        }
        if (document.querySelector('.intro-body')) {
          tl.from('.intro-body', { y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        }
      }
      
      refresh()
    })
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <section class="section-padding bg-white">
    <div class="container-wide">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Side -->
        <div class="relative">
          <div class="intro-image-wrapper aspect-[4/5] overflow-hidden" style="will-change: transform;">
            <img
              v-if="image"
              :src="image"
              :alt="imageAlt"
              class="intro-image w-full h-full object-cover"
              style="will-change: transform;"
              loading="lazy"
            />
          </div>
          <!-- Decorative frame -->
          <div class="intro-frame absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
        </div>

        <!-- Text Side -->
        <div class="intro-content lg:pl-8">
          <p v-if="subtitle" class="intro-subtitle text-accent text-xl md:text-2xl mb-3">
            {{ subtitle }}
          </p>
          
          <h2 class="intro-title text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
            {{ title }}
          </h2>
          
          <div class="intro-body">
            <div class="space-y-4 text-charcoal-600 leading-relaxed">
              <slot />
            </div>
            
            <div class="mt-8">
              <UiAppButton to="/contact" variant="outline">
                Kontaktujte ma
              </UiAppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

