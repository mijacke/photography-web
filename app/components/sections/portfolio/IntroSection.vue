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
    imageAlt: 'Portfolio image',
})

const { slideIn, parallax, fadeInUp, cleanup, initializeAnimations } = useGsapAnimations()

const imageWrapper = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const frameRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

onMounted(() => {
    initializeAnimations(() => {
        const { gsap } = useGsapAnimations()

        if (imageWrapper.value) {
            slideIn(imageWrapper.value, { direction: 'left', distance: 50, duration: 1 })
        }
        if (imageRef.value) {
            parallax(imageRef.value, { yPercent: -8 })
        }
        if (frameRef.value) {
            fadeInUp(frameRef.value, { y: 15, duration: 0.7, delay: 0.2 })
        }

        if (contentRef.value) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: contentRef.value,
                    start: 'top 80%',
                    once: true,
                },
            })

            if (subtitleRef.value) {
                tl.from(subtitleRef.value, {
                    y: 20,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                })
            }
            if (titleRef.value) {
                tl.from(
                    titleRef.value,
                    { y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out' },
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
    <section class="section-padding bg-white">
        <div class="container-wide">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div class="relative">
                    <div
                        ref="imageWrapper"
                        class="intro-image-wrapper aspect-[4/5] overflow-hidden"
                        style="will-change: transform"
                    >
                        <img
                            v-if="image"
                            ref="imageRef"
                            :src="image"
                            :alt="imageAlt"
                            class="intro-image w-full h-full object-cover"
                            style="will-change: transform"
                            loading="lazy"
                        />
                    </div>
                    <div
                        ref="frameRef"
                        class="intro-frame absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"
                    />
                </div>

                <div ref="contentRef" class="intro-content lg:pl-8">
                    <p
                        v-if="subtitle"
                        ref="subtitleRef"
                        class="intro-subtitle text-accent text-xl md:text-2xl mb-3"
                    >
                        {{ subtitle }}
                    </p>

                    <h2
                        ref="titleRef"
                        class="intro-title text-3xl md:text-4xl font-display text-charcoal-900 mb-6"
                    >
                        {{ title }}
                    </h2>

                    <div ref="bodyRef" class="intro-body">
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
