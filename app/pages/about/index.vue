<script setup lang="ts">
const {
    mainImage: aboutImage,
    heroAccent,
    heroLine1,
    heroLine2,
    heroLine3,
    heroCta,
    mainTitle,
    paragraphs,
    philosophyAccent,
    philosophyTitle,
    philosophyItems,
    ctaTitle,
    ctaText,
    ctaButtonText,
} = useSanityAbout()
const {
    fadeInUp,
    slideIn,
    staggerReveal,
    scaleIn3D,
    cleanup,
    refresh,
    gsap,
    initializeAnimations,
} = useGsapAnimations()

useSeoMeta({
    title: 'O mne | Fotografka',
    description:
        'Spoznajte ma bližšie - môj príbeh, prístup a vášeň pre zachytávanie vzácnych momentov života.',
})

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

const aboutImageAnimationsInitialized = ref(false)

watch(
    aboutImage,
    (newImage) => {
        if (!aboutImageAnimationsInitialized.value && newImage) {
            nextTick(() => {
                setTimeout(() => {
                    setupAboutImageAnimations()
                }, 100)
            })
        }
    },
    { immediate: true }
)

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
        refresh()
    }
}

onMounted(() => {
    initializeAnimations(() => {
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        })

        if (heroAccentRef.value) {
            heroTimeline.to(heroAccentRef.value, {
                opacity: 1,
                y: 0,
                duration: 0.5,
            })
        }

        const lines = [
            heroMainLine1Ref.value,
            heroMainLine2Ref.value,
            heroMainLine3Ref.value,
        ].filter((el) => el !== null)
        if (lines.length > 0) {
            heroTimeline.to(
                lines,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                },
                '-=0.3'
            )
        }

        heroTimeline.to({}, { duration: 0.2 })

        if (heroLineTopRef.value) {
            heroTimeline.to(heroLineTopRef.value, {
                height: '32px',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
        }

        if (heroCtaTextRef.value) {
            heroTimeline.to(
                heroCtaTextRef.value,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                },
                '+=0.15'
            )
        }

        const isMobile = window.innerWidth < 768
        if (heroLineBottomRef.value) {
            heroTimeline.to(
                heroLineBottomRef.value,
                {
                    height: isMobile ? '12px' : '16px',
                    opacity: isMobile ? 0.7 : 1,
                    duration: 0.2,
                    ease: 'power2.out',
                },
                '+=0.15'
            )
        }

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

        if (philosophyHeaderRef1.value) fadeInUp(philosophyHeaderRef1.value, { y: 40 })
        if (philosophyHeaderRef2.value) fadeInUp(philosophyHeaderRef2.value, { y: 40, delay: 0.12 })

        if (philosophyContainerRef.value) {
            const items = philosophyContainerRef.value.querySelectorAll('.philosophy-item')
            if (items.length > 0) {
                staggerReveal(philosophyContainerRef.value, items, { stagger: 0.15, y: 30 })
            }
        }

        if (ctaSectionRef.value) {
            scaleIn3D(ctaSectionRef.value, { scale: 0.95, rotateX: 3, duration: 1.1 })
        }

        const ctaContents = [
            ctaContentRef1.value,
            ctaContentRef2.value,
            ctaContentRef3.value,
        ].filter((el) => el !== null)
        if (ctaContents.length > 0) {
            fadeInUp(ctaContents, { y: 30, stagger: 0.15, delay: 0.1 })
        }
    })
})

onUnmounted(() => {
    cleanup()
})
</script>

<template>
    <div>
        <section
            class="editorial-hero min-h-[100svh] flex flex-col justify-center items-center relative bg-white overflow-hidden"
        >
            <div
                class="absolute inset-0 opacity-[0.018] pointer-events-none"
                style="
                    background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
                "
            />

            <div class="container-wide relative z-10 text-center px-4">
                <div class="editorial-text-wrapper mt-[-22vh] md:mt-[-15vh]">
                    <p
                        ref="heroAccentRef"
                        class="hero-line hero-line-accent font-script italic text-warm-400 text-base md:text-lg lg:text-xl 3xl:text-2xl 4xl:text-3xl tracking-[0.18em] mb-6 md:mb-10 lg:mb-12 3xl:mb-16 opacity-0"
                    >
                        {{ heroAccent }}
                    </p>

                    <h1 class="hero-headline">
                        <span
                            ref="heroMainLine1Ref"
                            class="hero-line hero-line-main block font-hero font-light text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0"
                            style="color: #1a1718"
                        >
                            {{ heroLine1 }}
                        </span>
                        <span
                            ref="heroMainLine2Ref"
                            class="hero-line hero-line-main block font-hero font-light text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0"
                            style="color: #1a1718"
                        >
                            {{ heroLine2 }}
                        </span>
                        <span
                            ref="heroMainLine3Ref"
                            class="hero-line hero-line-main block font-hero font-medium text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] tracking-[-0.02em] opacity-0"
                            style="color: #1a1718"
                        >
                            <em style="color: #b8944d">{{ heroLine3 }}</em>
                        </span>
                    </h1>

                    <div
                        ref="heroLineTopRef"
                        class="hero-line-top w-[1px] h-0 opacity-0 mx-auto mt-6 md:mt-10 lg:mt-12 origin-top"
                        style="background-color: #b8944d"
                    />

                    <div class="flex flex-col items-center mt-3 md:mt-4 lg:mt-5">
                        <span
                            ref="heroCtaTextRef"
                            class="hero-cta-text font-script italic text-[1.0625rem] tracking-wide cursor-pointer opacity-0 translate-y-[6px] transition-all duration-200 lg:hover:text-warm-500 relative lg:after:absolute lg:after:bottom-0 lg:after:left-1/2 lg:after:-translate-x-1/2 lg:after:h-[1px] lg:after:bg-warm-400 lg:after:transition-all lg:after:duration-200 lg:after:w-0 lg:hover:after:w-full"
                            style="color: #7a756f"
                            >{{ heroCta }}</span
                        >
                    </div>

                    <div
                        ref="heroLineBottomRef"
                        class="hero-line-bottom w-[1px] h-0 mx-auto mt-2 md:mt-3 origin-top animate-scroll-hint opacity-0 md:opacity-0"
                        style="background-color: #b8944d"
                        data-mobile-opacity="0.7"
                    />
                </div>
            </div>
        </section>

        <section class="section-padding bg-cream-200">
            <div class="container-wide">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 3xl:gap-24 4xl:gap-32 items-center">
                    <div
                        v-if="aboutImage"
                        ref="aboutImageWrapperRef"
                        class="relative about-image-wrapper"
                        style="will-change: transform"
                    >
                        <div class="aspect-[4/5] overflow-hidden">
                            <img
                                :src="aboutImage"
                                alt="Fotografka portrét"
                                class="about-image w-full h-full object-cover"
                                style="will-change: transform"
                            >
                        </div>
                        <div
                            ref="aboutFrameRef"
                            class="about-frame absolute -bottom-6 -right-6 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"
                        />
                    </div>

                    <div ref="aboutTextWrapperRef" class="about-text-wrapper lg:pl-8">
                        <h2
                            class="about-content text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-display text-charcoal-900 mb-6 3xl:mb-8"
                        >
                            {{ mainTitle }}
                        </h2>

                        <div class="space-y-4 text-charcoal-600 leading-relaxed">
                            <p
                                v-for="(paragraph, index) in paragraphs"
                                :key="index"
                                class="about-content"
                            >
                                {{ paragraph }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-padding bg-white">
            <div
                ref="philosophyContainerRef"
                class="container-narrow text-center philosophy-container"
            >
                <p
                    ref="philosophyHeaderRef1"
                    class="philosophy-header text-accent text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl mb-3"
                >
                    {{ philosophyAccent }}
                </p>
                <h2
                    ref="philosophyHeaderRef2"
                    class="philosophy-header text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-display text-charcoal-900 mb-8 3xl:mb-12"
                >
                    {{ philosophyTitle }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 3xl:gap-12 4xl:gap-16 mt-12 3xl:mt-16">
                    <div
                        v-for="(item, index) in philosophyItems"
                        :key="index"
                        class="philosophy-item text-center"
                    >
                        <div
                            class="w-16 h-16 mx-auto mb-4 bg-warm-400 bg-opacity-10 flex items-center justify-center rounded-full"
                        >
                            <img
                                :src="`/svg/icons/${item.icon}.svg`"
                                :alt="item.title"
                                class="h-8 w-8"
                            >
                        </div>
                        <h3 class="font-display text-xl 3xl:text-2xl 4xl:text-3xl text-charcoal-900 mb-2 3xl:mb-3">
                            {{ item.title }}
                        </h3>
                        <p class="text-charcoal-600 text-sm 3xl:text-base 4xl:text-lg">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section
            ref="ctaSectionRef"
            class="cta-section py-16 md:py-20 3xl:py-28 4xl:py-32 bg-cream-200"
            style="perspective: 1000px"
        >
            <div class="container-narrow text-center">
                <h2
                    ref="ctaContentRef1"
                    class="cta-content text-2xl md:text-3xl 3xl:text-4xl 4xl:text-5xl font-display text-charcoal-900 mb-4 3xl:mb-6"
                >
                    {{ ctaTitle }}
                </h2>
                <p ref="ctaContentRef2" class="cta-content text-charcoal-600 mb-8 max-w-xl mx-auto">
                    {{ ctaText }}
                </p>
                <div ref="ctaContentRef3" class="cta-content">
                    <UiAppButton to="/contact" variant="outline" size="lg">
                        {{ ctaButtonText }}
                    </UiAppButton>
                </div>
            </div>
        </section>
    </div>
</template>
