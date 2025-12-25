<script setup lang="ts">
const { aboutImage } = useSanityHomepage()
const { fadeInUp, slideIn, parallax, cleanup, initializeAnimations } = useGsapAnimations()

const imageWrapper = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const frameRef = ref<HTMLElement | null>(null)
const contentGroup = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

onMounted(() => {
    initializeAnimations(() => {
        const { gsap } = useGsapAnimations()

        if (imageWrapper.value) {
            slideIn(imageWrapper.value, { direction: 'left', distance: 60, duration: 1.1 })
        }
        if (imageRef.value) {
            parallax(imageRef.value, { yPercent: -10 })
        }
        if (frameRef.value) {
            fadeInUp(frameRef.value, { y: 20, duration: 0.8, delay: 0.2 })
        }

        if (contentGroup.value) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contentGroup.value,
                    start: 'top 80%',
                    once: true,
                },
            })

            if (subtitleRef.value) {
                tl.from(subtitleRef.value, {
                    y: 25,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                })
            }
            if (titleRef.value) {
                tl.from(
                    titleRef.value,
                    { y: 25, autoAlpha: 0, duration: 0.7, ease: 'power3.out' },
                    '-=0.3'
                )
            }
            if (bodyRef.value) {
                tl.from(
                    bodyRef.value,
                    { y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out' },
                    '-=0.3'
                )
            }
        }
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
                <div class="relative">
                    <div
                        ref="imageWrapper"
                        class="about-image-wrapper aspect-[4/5] overflow-hidden"
                        style="will-change: transform"
                    >
                        <img
                            v-if="aboutImage"
                            ref="imageRef"
                            :src="aboutImage"
                            alt="Fotografka portrét"
                            class="about-image w-full h-full object-cover"
                            style="will-change: transform"
                            loading="lazy"
                        >
                        <div v-else class="w-full h-full bg-cream-300 animate-pulse" />
                    </div>
                    <div
                        ref="frameRef"
                        class="about-frame absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"
                    />
                </div>

                <div ref="contentGroup" class="about-content-group lg:pl-8">
                    <p
                        ref="subtitleRef"
                        class="about-subtitle text-accent text-xl md:text-2xl mb-3"
                    >
                        Ahoj, som
                    </p>

                    <h2
                        ref="titleRef"
                        class="about-title text-3xl md:text-4xl font-display text-charcoal-900 mb-6"
                    >
                        Pauli Drahošová
                    </h2>

                    <div ref="bodyRef" class="about-body">
                        <div class="space-y-4 text-charcoal-600 leading-relaxed">
                            <slot />
                        </div>

                        <div class="mt-8">
                            <UiAppButton to="/about" variant="outline"> Viac o mne </UiAppButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
