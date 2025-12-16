<script setup lang="ts">
const { aboutImage } = useSanityHomepage()
const { fadeInUp, slideIn, parallax, cleanup, refresh } = useGsapAnimations()

onMounted(() => {
  nextTick(() => {
    const { gsap, ScrollTrigger } = useGsapAnimations()
    
    slideIn('.about-image-wrapper', { direction: 'left', distance: 60, duration: 1.1 })
    parallax('.about-image', { yPercent: -10 })
    
    fadeInUp('.about-frame', { y: 20, duration: 0.8, delay: 0.2 })
     const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-content-group',
        start: 'top 80%',
        once: true,
      }
    })
    
    tl.from('.about-subtitle', { y: 25, autoAlpha: 0, duration: 0.6, ease: 'power3.out' })
    tl.from('.about-title', { y: 25, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    tl.from('.about-body', { y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    
    refresh()
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <section class="section-padding bg-cream-200">
    <div class="container-wide">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Side -->
        <div class="relative">
          <div class="about-image-wrapper aspect-[4/5] overflow-hidden" style="will-change: transform;">
            <!-- Show Sanity image if available -->
            <img
              v-if="aboutImage"
              :src="aboutImage"
              alt="Fotografka portrét"
              class="about-image w-full h-full object-cover"
              style="will-change: transform;"
              loading="lazy"
            />
            <!-- Loading skeleton -->
            <div v-else class="w-full h-full bg-cream-300 animate-pulse"></div>
          </div>
          <!-- Decorative frame -->
          <div class="about-frame absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
        </div>

        <!-- Text Side -->
        <div class="about-content-group lg:pl-8">
          <p class="about-subtitle text-accent text-xl md:text-2xl mb-3">
            Ahoj, som
          </p>
          
          <h2 class="about-title text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
            Pauli Drahošová
          </h2>
          
          <div class="about-body">
            <div class="space-y-4 text-charcoal-600 leading-relaxed">
              <p>
                Vitajte! Som profesionálna fotografka so sídlom v Galante, špecializujem sa na 
                zachytávanie najcennejších okamihov života — od očakávania materstva cez 
                zázrak novorodencov až po radosť z rodinných stretnutí.
              </p>
              <p>
                Môj prístup je uvoľnený a prirodzený. Verím, že najlepšie fotografie vznikajú vtedy, 
                keď zabudnete, že je tam fotoaparát. Každé fotenie je prispôsobené jedinečnému 
                príbehu vašej rodiny a vytvára obrazy, ktoré budete uchovávať po generácie.
              </p>
              <p>
                Keď nie som za objektívom, nájdete ma pri objavovaní nových lokácií na fotenie, 
                trávení času s vlastnou rodinou alebo pri úpravách fotiek za počítačom s kávou v ruke.
              </p>
            </div>
            
            <div class="mt-8">
              <UiAppButton to="/about" variant="outline">
                Viac o mne
              </UiAppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

