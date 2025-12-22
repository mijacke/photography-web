<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import type { SplideInstance } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

const { heroImages } = useSanityHomepage()
const { cleanup, initializeAnimations } = useGsapAnimations()

const splideRef = ref<SplideInstance | null>(null)
const currentIndex = ref(0)
const subtitleRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '8px',
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
    speed: 700,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    breakpoints: {
        640: {
            perPage: 1,
            gap: '0px',
        },
        1024: {
            perPage: 2,
            gap: '6px',
        },
    },
}

const onMove = (splide: any, newIndex: number) => {
    currentIndex.value = newIndex
}

const goToSlide = (index: number) => {
    splideRef.value?.splide?.go(index)
}

onMounted(() => {
    initializeAnimations(() => {
        const { gsap } = useGsapAnimations()
        if (subtitleRef.value) {
            gsap.from(subtitleRef.value, {
                y: 20,
                autoAlpha: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'power3.out',
            })
        }
        if (titleRef.value) {
            gsap.from(titleRef.value, {
                y: 25,
                autoAlpha: 0,
                duration: 0.9,
                delay: 0.5,
                ease: 'power3.out',
            })
        }
    })
})

onUnmounted(() => {
    cleanup()
})
</script>

<template>
    <section class="relative bg-cream-100">
        <div class="h-2 bg-cream-100"></div>

        <div v-if="heroImages.length > 0" class="relative w-full">
            <Splide ref="splideRef" :options="splideOptions" @splide:move="onMove">
                <SplideSlide v-for="(image, index) in heroImages" :key="index">
                    <div class="h-[calc(100vh-320px)] md:h-[calc(100vh-290px)]">
                        <img
                            :src="image"
                            :alt="`Galéria obrázok ${index + 1}`"
                            class="w-full h-full object-cover"
                            :loading="index < 3 ? 'eager' : 'lazy'"
                        />
                    </div>
                </SplideSlide>
            </Splide>

            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button
                    v-for="(_, index) in heroImages"
                    :key="index"
                    @click="goToSlide(index)"
                    :class="[
                        'w-2 h-2 rounded-full transition-all duration-300',
                        index === currentIndex ? 'bg-warm-500 w-6' : 'bg-white/80 hover:bg-white',
                    ]"
                    :aria-label="`Prejsť na snímku ${index + 1}`"
                />
            </div>
        </div>

        <div v-else class="relative w-full">
            <div
                class="h-[calc(100vh-320px)] md:h-[calc(100vh-290px)] bg-cream-200 animate-pulse flex items-center justify-center"
            >
                <span class="text-charcoal-400">Načítavam...</span>
            </div>
        </div>

        <div class="py-10 md:py-14 text-center bg-cream-100">
            <p
                ref="subtitleRef"
                class="hero-subtitle text-xs md:text-sm tracking-[0.25em] uppercase text-charcoal-600 mb-3"
            >
                Tehotenské, novorodencké a rodinné fotografie v Bratislave
            </p>
            <h1
                ref="titleRef"
                class="hero-title font-script text-2xl md:text-3xl lg:text-4xl italic text-charcoal-900"
            >
                Zachytávam vaše najkrajšie spomienky
            </h1>
        </div>
    </section>
</template>
