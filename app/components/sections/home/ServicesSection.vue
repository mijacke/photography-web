<script setup lang="ts">
const { fadeInUp, cleanup, initializeAnimations } = useGsapAnimations()
const { servicesParagraphs } = useSanityHomepage()

const headerRef = ref<HTMLElement | null>(null)
const paragraphRefs = ref<HTMLElement[]>([])
const ctaRef = ref<HTMLElement | null>(null)

// Styles for each paragraph position
const paragraphStyles = [
    'font-medium text-charcoal-800',
    'text-charcoal-600',
    'font-light italic text-charcoal-700',
]

onMounted(() => {
    initializeAnimations(() => {
        if (headerRef.value) {
            fadeInUp(headerRef.value, { y: 30, duration: 0.8 })
        }

        if (paragraphRefs.value.length > 0) {
            fadeInUp(paragraphRefs.value, { y: 25, stagger: 0.15, duration: 0.7 })
        }

        if (ctaRef.value) {
            fadeInUp(ctaRef.value, { y: 20, duration: 0.6, delay: 0.3 })
        }
    })
})

onUnmounted(() => {
    cleanup()
})
</script>

<template>
    <section class="py-20 md:py-28 3xl:py-36 4xl:py-44 bg-cream-100">
        <div class="container-wide max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto">
            <div class="text-center mb-12 md:mb-16 3xl:mb-20">
                <h2
                    ref="headerRef"
                    class="services-header text-sm md:text-base 3xl:text-lg 4xl:text-xl tracking-[0.3em] uppercase text-charcoal-700"
                >
                    Fotografické služby, ktoré ponúkam
                </h2>
            </div>

            <div class="space-y-8 3xl:space-y-12 4xl:space-y-16 text-center leading-relaxed text-base md:text-lg 3xl:text-xl 4xl:text-2xl">
                <p
                    v-for="(paragraph, index) in servicesParagraphs"
                    :key="index"
                    :ref="(el) => { if (el) paragraphRefs[index] = el as HTMLElement }"
                    :class="['services-text', paragraphStyles[index] || 'text-charcoal-600']"
                >
                    {{ paragraph }}
                </p>
            </div>

            <div ref="ctaRef" class="services-cta text-center mt-14 3xl:mt-20">
                <NuxtLink
                    to="/portfolio"
                    class="group font-script text-xl md:text-2xl 3xl:text-3xl 4xl:text-4xl italic text-charcoal-700 hover:text-warm-500 transition-colors inline-flex items-center gap-2 3xl:gap-3"
                >
                    Prezrieť moje portfólio
                    <span class="relative h-5 w-5 md:h-6 md:w-6 3xl:h-8 3xl:w-8 4xl:h-10 4xl:w-10">
                        <img
                            src="/svg/icons/arrow-right.svg"
                            alt=""
                            class="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0"
                        >
                        <img
                            src="/svg/icons/arrow-right-warm.svg"
                            alt=""
                            class="absolute inset-0 h-full w-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        >
                    </span>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
