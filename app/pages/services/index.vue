<script setup lang="ts">
// Get portfolio images from Sanity to use for services
const { portfolioImages } = useSanityHomepage()
const { fadeInUp, slideIn, parallax, staggerReveal, scaleIn3D, cleanup, refresh } = useGsapAnimations()

useSeoMeta({
  title: 'Služby | Fotografka',
  description: 'Profesionálne fotografické služby pre rodiny, novorodencov, tehotné a svadby. Pôsobím v Bratislave a okolí.',
})

const services = computed(() => [
  {
    id: 'rodina',
    title: 'Rodinné fotenie',
    description: 'Zachytím lásku a spojenie medzi členmi vašej rodiny v prirodzenom, uvoľnenom prostredí. Ideálne pre každoročné rodinné portréty, oslavu míľnikov alebo jednoducho len tak.',
    features: [
      '1-2 hodinové fotenie',
      'Exteriér alebo u vás doma',
      '30+ upravených digitálnych fotografií',
      'Súbory vo vysokom rozlíšení pripravené na tlač',
      'Online galéria pre jednoduché zdieľanie',
    ],
    image: portfolioImages.value.rodina || '',
    cta: 'Mám záujem o rodinné fotenie',
  },
  {
    id: 'novorodenci',
    title: 'Novorodenecké fotenie',
    description: 'Jemné portréty vášho nového člena rodiny v prvých vzácnych dňoch života. Najlepšie je naplánovať fotenie do 2 týždňov po narodení, kedy sú bábätká najospalejšie.',
    features: [
      '2-3 hodinové fotenie',
      'U vás doma alebo v ateliéri',
      '25+ upravených digitálnych fotografií',
      'Fotky s rodičmi a súrodencami v cene',
      'Rekvizity a zavinovačky zabezpečím',
    ],
    image: portfolioImages.value.novorodenci || '',
    cta: 'Mám záujem o novorodenecké fotenie',
  },
  {
    id: 'tehotenstvo',
    title: 'Tehotenské fotenie',
    description: 'Oslava krásy tehotenstva a očakávania nového života. Ideálne je naplánovať fotenie medzi 28. a 34. týždňom.',
    features: [
      '1 hodinové fotenie',
      'Exteriér alebo ateliér',
      '20+ upravených digitálnych fotografií',
      'Fotky s partnerom v cene',
      'Poradenstvo pri výbere oblečenia',
    ],
    image: portfolioImages.value.tehotenstvo || '',
    cta: 'Mám záujem o tehotenské fotenie',
  },
  {
    id: 'svadby',
    title: 'Svadobné fotenie',
    description: 'Zdokumentujem váš výnimočný deň s nadčasovou eleganciou a autentickými emóciami. Od komorných obradov až po veľkolepé oslavy.',
    features: [
      'Celodenná dokumentácia',
      'Možnosť druhého fotografa',
      '300+ upravených digitálnych fotografií',
      'Zásnubné fotenie v cene',
      'Prémiové svadobné albumy',
    ],
    image: portfolioImages.value.svadby || '',
    cta: 'Mám záujem o svadobné fotenie',
  },
])

// Initialize GSAP animations on mount
onMounted(() => {
  // Wait for images to potentially load
  nextTick(() => {
    // Hero text animations - run immediately (no scroll trigger), like home page
    const { gsap } = useGsapAnimations()
    gsap.from('.header-animate', { 
      y: 20, 
      autoAlpha: 0, 
      duration: 0.8, 
      delay: 0.3, 
      stagger: 0.15,
      ease: 'power3.out' 
    })

    // Service cards - alternating slide-in with parallax
    document.querySelectorAll('.service-card').forEach((card, index) => {
      const imageWrapper = card.querySelector('.service-image-wrapper')
      const image = card.querySelector('.service-image')
      const content = card.querySelector('.service-content')
      const features = card.querySelectorAll('.feature-item')

      // Image slide in from opposite side
      if (imageWrapper) {
        slideIn(imageWrapper, {
          direction: index % 2 === 0 ? 'left' : 'right',
          distance: 80,
          duration: 1,
        })
      }

      // Parallax on image
      if (image) {
        parallax(image, { yPercent: -15 })
      }

      // Content fade in
      if (content) {
        fadeInUp(content, { y: 40, duration: 0.9, delay: 0.2 })
      }

      // Stagger features - pass the actual elements, not a global selector
      if (features.length > 0) {
        staggerReveal(content || card, features, { stagger: 0.08, y: 20 })
      }
    })

    // FAQ section
    fadeInUp('.faq-header', { y: 40, stagger: 0.1 })
    staggerReveal('.faq-container', '.faq-item', { stagger: 0.12, y: 25 })

    // CTA with 3D effect
    scaleIn3D('.cta-section', { scale: 0.95, rotateX: 3, duration: 1.1 })
    fadeInUp('.cta-content', { y: 30, stagger: 0.15, delay: 0.1 })

    // Refresh ScrollTrigger after all animations are set up
    refresh()
  })
})

// Cleanup on unmount
onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div>
    <!-- Full Viewport Hero: Video 80% + Text 20% -->
    <section class="h-[calc(100vh-80px)] flex flex-col bg-cream-100">
      <!-- Video Container - 80% -->
      <div class="flex-[80] relative overflow-hidden">
        <video
          autoplay
          muted
          loop
          playsinline
          class="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/sluzby.mp4?v=2" type="video/mp4" />
        </video>
        <div class="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/10 pointer-events-none" />
      </div>

      <!-- Text Content - 20% -->
      <div class="flex-[20] flex items-center justify-center text-center bg-cream-100 px-4">
        <p class="header-animate text-xs md:text-sm tracking-[0.25em] uppercase text-charcoal-600">
          Každé fotenie je starostlivo pripravené, aby zachytilo váš jedinečný príbeh
        </p>
      </div>
    </section>

    <!-- Services List -->
    <section class="bg-cream-100">
      <div 
        v-for="(service, index) in services" 
        :key="service.id"
        :id="service.id"
        :class="[
          'service-card section-padding border-b border-cream-200 last:border-b-0',
          index % 2 === 0 ? 'bg-cream-200' : 'bg-cream-100'
        ]"
      >
        <div class="container-wide">
          <div 
            :class="[
              'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            ]"
          >
            <!-- Image -->
            <div 
              :class="['service-image-wrapper overflow-hidden', index % 2 === 1 ? 'lg:order-2' : '']"
              style="will-change: transform;"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  v-if="service.image"
                  :src="service.image"
                  :alt="service.title"
                  class="service-image w-full h-full object-cover"
                  style="will-change: transform;"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Content -->
            <div :class="['service-content', index % 2 === 1 ? 'lg:order-1' : '']">
              <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-4">
                {{ service.title }}
              </h2>
              
              <p class="text-charcoal-600 leading-relaxed mb-6">
                {{ service.description }}
              </p>
              
              <h3 class="font-sans text-sm font-semibold uppercase tracking-wider text-charcoal-800 mb-4">
                Čo je v cene
              </h3>
              
              <ul class="space-y-2 mb-8">
                <li 
                  v-for="feature in service.features" 
                  :key="feature"
                  class="feature-item flex items-start gap-3 text-charcoal-600"
                >
                  <img src="/svg/icons/check.svg" alt="" class="h-5 w-5 flex-shrink-0 mt-0.5" />
                  {{ feature }}
                </li>
              </ul>
              
              <UiAppButton to="/contact" variant="outline">
                {{ service.cta || 'Mám záujem' }}
              </UiAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-cream-200">
      <div class="container-narrow faq-container">
        <div class="text-center mb-12">
          <p class="faq-header text-accent text-lg md:text-xl mb-3">
            Časté otázky
          </p>
          <h2 class="faq-header text-3xl md:text-4xl font-display text-charcoal-900">
            Čo vás zaujíma?
          </h2>
        </div>

        <div class="space-y-6">
          <details class="faq-item group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              Ako dlho vopred je potrebné rezervovať termín?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              Pre rodinné a tehotenské fotenie odporúčam rezervovať 4-6 týždňov vopred, 
              novorodenecké fotenie 2-3 mesiace (ešte pred pôrodom!), svadby ideálne 6-12 mesiacov vopred.
            </p>
          </details>

          <details class="faq-item group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              Čo si máme obliecť?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              Po rezervácii vám pošlem podrobného sprievodcu štýlom! Vo všeobecnosti odporúčam 
              zladiť (nie zjednotiť) oblečenie v jemných, neutrálnych farbách, ktoré sa navzájom dopĺňajú.
            </p>
          </details>

          <details class="faq-item group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              Kde fotenie prebieha?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              Ponúkam fotenie v exteriéri aj interiéri. Mám krásne tipy na lokality v okolí Bratislavy, 
              ale rada prídem aj k vám domov alebo na miesto, ktoré je pre vás výnimočné.
            </p>
          </details>

          <details class="faq-item group bg-cream-100 p-6">
            <summary class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center">
              Kedy dostaneme fotky?
              <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p class="mt-4 text-charcoal-600">
              Online galériu s fotografiami obdržíte do 2-3 týždňov pri portrétnom fotení a 
              do 4-6 týždňov pri svadbách. Prvé ukážky vám pošlem už do 48 hodín!
            </p>
          </details>
        </div>
      </div>
    </section>


  </div>
</template>

<style scoped>
.services-hero {
  display: flex;
  flex-direction: column;
  /* Exactly fill viewport minus navbar (80px) */
  height: calc(100vh - 80px);
  height: calc(100dvh - 80px);
  overflow: hidden;
}

.services-hero__video {
  /* Video takes everything except content height (180px) */
  height: calc(100vh - 80px - 180px);
  height: calc(100dvh - 80px - 180px);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.services-hero__video-element {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.services-hero__video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.02) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
}

/* Content - fixed 180px height */
.services-hero__content {
  height: 180px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: var(--cream-100, #f7f5f0);
}
</style>



