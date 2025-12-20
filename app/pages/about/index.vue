<script setup lang="ts">

const { mainImage: aboutImage } = useSanityAbout()
const { fadeInUp, slideIn, parallax, staggerReveal, scaleIn3D, cleanup, refresh, gsap, ScrollTrigger, initializeAnimations } = useGsapAnimations()

useSeoMeta({
  title: 'O mne | Fotografka',
  description: 'Spoznajte ma bližšie - môj príbeh, prístup a vášeň pre zachytávanie vzácnych momentov života.',
})

// Refs
const heroAccentRef = ref<HTMLElement | null>(null)
const heroMainLine1Ref = ref<HTMLElement | null>(null)
const heroMainLine2Ref = ref<HTMLElement | null>(null)
const heroMainLine3Ref = ref<HTMLElement | null>(null)
const heroLineTopRef = ref<HTMLElement | null>(null)
const heroCtaTextRef = ref<HTMLElement | null>(null)
const heroLineBottomRef = ref<HTMLElement | null>(null)
const aboutImageWrapperRef = ref<HTMLElement | null>(null)
const aboutFrameRef = ref<HTMLElement | null>(null)
const aboutTextWrapperRef = ref<HTMLElement | null>(null)
const philosophyHeaderRef1 = ref<HTMLElement | null>(null)
const philosophyHeaderRef2 = ref<HTMLElement | null>(null)
const philosophyContainerRef = ref<HTMLElement | null>(null)
const ctaSectionRef = ref<HTMLElement | null>(null)
const ctaContentRef1 = ref<HTMLElement | null>(null)
const ctaContentRef2 = ref<HTMLElement | null>(null)
const ctaContentRef3 = ref<HTMLElement | null>(null)

// Track if about image animations have been initialized
const aboutImageAnimationsInitialized = ref(false)

// Watch for aboutImage to become available and setup animations
watch(aboutImage, (newImage) => {
  if (!aboutImageAnimationsInitialized.value && newImage) {
    // Wait for DOM to update with new image
    nextTick(() => {
      setTimeout(() => {
        setupAboutImageAnimations()
      }, 100) // Small delay to ensure image is rendered
    })
  }
}, { immediate: true })

// Separate function to set up about image animations
function setupAboutImageAnimations() {
  if (aboutImageAnimationsInitialized.value) return
  
  if (aboutImageWrapperRef.value) {
    slideIn(aboutImageWrapperRef.value, { direction: 'left', distance: 80, duration: 1 })
    
    if (aboutFrameRef.value) {
      gsap.to(aboutFrameRef.value, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutImageWrapperRef.value,
          start: 'top 30%',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }
    
    aboutImageAnimationsInitialized.value = true
    refresh() // Refresh ScrollTriggers
  }
}

onMounted(() => {
  initializeAnimations(() => {    
    const heroTimeline = gsap.timeline({
      defaults: { 
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)' // smooth editorial easing
      }
    })
    
    if (heroAccentRef.value) {
        heroTimeline.to(heroAccentRef.value, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        })
    }
    
    const lines = [heroMainLine1Ref.value, heroMainLine2Ref.value, heroMainLine3Ref.value].filter(el => el !== null)
    if (lines.length > 0) {
        heroTimeline.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1, // rýchly stagger pre plynulosť
        }, '-=0.3') // overlap pre flow
    }
    
    heroTimeline.to({}, { duration: 0.2 }) // intentional pause
    
    if (heroLineTopRef.value) {
        heroTimeline.to(heroLineTopRef.value, {
          height: '32px',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
    }
    
    if (heroCtaTextRef.value) {
        heroTimeline.to(heroCtaTextRef.value, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, '+=0.15')
    }
    
    const isMobile = window.innerWidth < 768
    if (heroLineBottomRef.value) {
        heroTimeline.to(heroLineBottomRef.value, {
          height: isMobile ? '12px' : '16px',
          opacity: isMobile ? 0.7 : 1,
          duration: 0.2,
          ease: 'power2.out',
        }, '+=0.15')
    }

    // About image section - only run if not already initialized by watcher
    if (!aboutImageAnimationsInitialized.value && aboutImageWrapperRef.value) {
      slideIn(aboutImageWrapperRef.value, { direction: 'left', distance: 80, duration: 1 })
      
      if (aboutFrameRef.value) {
        gsap.to(aboutFrameRef.value, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: aboutImageWrapperRef.value,
            start: 'top 30%',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
      aboutImageAnimationsInitialized.value = true
    }

    // About text content - slide in from right with ScrollTrigger
    if (aboutTextWrapperRef.value) {
      const contents = aboutTextWrapperRef.value.querySelectorAll('.about-content')
      if (contents.length > 0) {
          gsap.from(contents, {
            x: 40,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutTextWrapperRef.value,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          })
      }
    }

    // Philosophy section
    if (philosophyHeaderRef1.value) fadeInUp(philosophyHeaderRef1.value, { y: 40 })
    if (philosophyHeaderRef2.value) fadeInUp(philosophyHeaderRef2.value, { y: 40, delay: 0.12 })
    
    if (philosophyContainerRef.value) {
        const items = philosophyContainerRef.value.querySelectorAll('.philosophy-item')
        if (items.length > 0) {
             staggerReveal(philosophyContainerRef.value, items, { stagger: 0.15, y: 30 })
        }
    }

    // CTA with 3D effect
    if (ctaSectionRef.value) {
        scaleIn3D(ctaSectionRef.value, { scale: 0.95, rotateX: 3, duration: 1.1 })
    }
    
    const ctaContents = [ctaContentRef1.value, ctaContentRef2.value, ctaContentRef3.value].filter(el => el !== null)
    if (ctaContents.length > 0) {
        fadeInUp(ctaContents, { y: 30, stagger: 0.15, delay: 0.1 })
    }
  })
})

// Cleanup on unmount
onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div>
    <!-- Editorial Hero -->
    <section class="editorial-hero min-h-[100svh] flex flex-col justify-center items-center relative bg-white overflow-hidden">
      <!-- Paper grain texture for high-end feel -->
      <div class="absolute inset-0 opacity-[0.018] pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
      
      <div class="container-wide relative z-10 text-center px-4">
        <!-- Editorial headline - split into dramatic lines -->
        <div class="editorial-text-wrapper mt-[-22vh] md:mt-[-15vh]">
          <!-- Small accent intro - tighter on mobile -->
          <p ref="heroAccentRef" class="hero-line hero-line-accent font-script italic text-warm-400 text-base md:text-lg lg:text-xl tracking-[0.18em] mb-6 md:mb-10 lg:mb-12 opacity-0">
            Za každým záberom
          </p>
          
          <!-- Main headline - oversized, split -->
          <h1 class="hero-headline">
            <span ref="heroMainLine1Ref" class="hero-line hero-line-main block font-hero font-light text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0" style="color: #1a1718;">
              je príbeh,
            </span>
            <span ref="heroMainLine2Ref" class="hero-line hero-line-main block font-hero font-light text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0" style="color: #1a1718;">
              ktorý čaká
            </span>
            <span ref="heroMainLine3Ref" class="hero-line hero-line-main block font-hero font-medium text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0" style="color: #1a1718;">
              <em style="color: #b8944d;">na zachytenie.</em>
            </span>
          </h1>
          
          <!-- Top vertical line (nádych) - tighter on mobile -->
          <div ref="heroLineTopRef" class="hero-line-top w-[1px] h-0 opacity-0 mx-auto mt-6 md:mt-10 lg:mt-12 origin-top" style="background-color: #b8944d;"></div>
          
          <!-- CTA "Spoznajte ma" - underline only on desktop hover (lg+) -->
          <div class="flex flex-col items-center mt-3 md:mt-4 lg:mt-5">
            <span ref="heroCtaTextRef" class="hero-cta-text font-script italic text-[1.0625rem] tracking-wide cursor-pointer opacity-0 translate-y-[6px] transition-all duration-200 lg:hover:text-warm-500 relative lg:after:absolute lg:after:bottom-0 lg:after:left-1/2 lg:after:-translate-x-1/2 lg:after:h-[1px] lg:after:bg-warm-400 lg:after:transition-all lg:after:duration-200 lg:after:w-0 lg:hover:after:w-full" style="color: #7a756f;">Spoznajte ma</span>
          </div>
          
          <!-- Bottom vertical line (uzavretie) - shorter/lighter on mobile -->
          <div ref="heroLineBottomRef" class="hero-line-bottom w-[1px] h-0 mx-auto mt-2 md:mt-3 origin-top animate-scroll-hint opacity-0 md:opacity-0" style="background-color: #b8944d;" data-mobile-opacity="0.7"></div>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="section-padding bg-cream-200">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <!-- Image -->
          <div v-if="aboutImage" ref="aboutImageWrapperRef" class="relative about-image-wrapper" style="will-change: transform;">
            <div class="aspect-[4/5] overflow-hidden">
              <img
                :src="aboutImage"
                alt="Fotografka portrét"
                class="about-image w-full h-full object-cover"
                style="will-change: transform;"
              />
            </div>
            <div ref="aboutFrameRef" class="about-frame absolute -bottom-6 -right-6 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
          </div>

          <!-- Text -->
          <div ref="aboutTextWrapperRef" class="about-text-wrapper lg:pl-8">
            <h2 class="about-content text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
              Ahoj, som Pauli
            </h2>
            
            <div class="space-y-4 text-charcoal-600 leading-relaxed">
              <p class="about-content">
                Vitajte! Som profesionálna fotografka z Bratislavy, špecializujem sa na 
                zachytávanie najvzácnejších momentov života — od očakávania materstva, 
                cez zázrak novorodencov až po radosť z rodinných stretnutí.
              </p>
              <p class="about-content">
                Moja cesta k fotografii začala pred viac ako desiatimi rokmi, keď som 
                vzala do rúk svoj prvý fotoaparát a objavila kúzlo zamrazenia okamihov 
                v čase. Odvtedy som mala česť zdokumentovať stovky rodín, svadieb 
                a životných míľnikov.
              </p>
              <p class="about-content">
                Môj prístup je uvoľnený a prirodzený. Verím, že najlepšie fotografie 
                vznikajú vtedy, keď zabudnete, že tam fotoaparát vôbec je. Každé 
                fotenie je prispôsobené jedinečnému príbehu vašej rodiny a vytvára 
                obrazy, ktoré budú cenené po generácie.
              </p>
              <p class="about-content">
                Keď nie som za objektívom, nájdete ma pri objavovaní nových lokalít 
                na fotenie, pri trávení času s vlastnou rodinou alebo pri úprave 
                fotografií v mojom útulnom domácom štúdiu s šálkou kávy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Approach / Philosophy -->
    <section class="section-padding bg-white">
      <div ref="philosophyContainerRef" class="container-narrow text-center philosophy-container">
        <p ref="philosophyHeaderRef1" class="philosophy-header text-accent text-lg md:text-xl mb-3">
          Moja filozofia
        </p>
        <h2 ref="philosophyHeaderRef2" class="philosophy-header text-3xl md:text-4xl font-display text-charcoal-900 mb-8">
          Čo robí moju prácu výnimočnou
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="philosophy-item text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/heart.svg" alt="Autentické momenty" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Autentické momenty</h3>
            <p class="text-charcoal-600 text-sm">
              Zameriavam sa na zachytenie skutočných emócií a pravých spojení, nie nútených póz.
            </p>
          </div>
          
          <div class="philosophy-item text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/camera.svg" alt="Nadčasový štýl" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Nadčasový štýl</h3>
            <p class="text-charcoal-600 text-sm">
              Čistá, elegantná úprava, ktorá bude vyzerať krásne aj o desaťročia.
            </p>
          </div>
          
          <div class="philosophy-item text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full">
              <img src="/svg/icons/clock.svg" alt="Uvoľnený zážitok" class="h-8 w-8" />
            </div>
            <h3 class="font-display text-xl text-charcoal-900 mb-2">Uvoľnený zážitok</h3>
            <p class="text-charcoal-600 text-sm">
              Fotenia sú navrhnuté tak, aby pôsobili ako zábavný výlet, nie stresujúce natáčanie.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section ref="ctaSectionRef" class="cta-section py-16 md:py-20 bg-cream-200" style="perspective: 1000px;">
      <div class="container-narrow text-center">
        <h2 ref="ctaContentRef1" class="cta-content text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
          Poďme spolupracovať
        </h2>
        <p ref="ctaContentRef2" class="cta-content text-charcoal-600 mb-8 max-w-xl mx-auto">
          Rada by som počula váš príbeh a vytvorila niečo krásne.
        </p>
        <div ref="ctaContentRef3" class="cta-content">
          <UiAppButton 
            to="/contact" 
            variant="outline"
            size="lg"
          >
            Kontaktujte ma
          </UiAppButton>
        </div>
      </div>
    </section>
  </div>
</template>
