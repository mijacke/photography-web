<script setup lang="ts">
const {
    heroVideoUrl,
    heroText,
    serviceImages,
    servicesContent,
    faqAccent,
    faqTitle,
    faqItems,
} = useSanityServices()
const {
    fadeInUp,
    slideIn,
    staggerReveal,
    scaleIn3D,
    cleanup,
    refresh,
    initializeAnimations,
    gsap,
} = useGsapAnimations()

const videoSrc = computed(() => heroVideoUrl.value || '')

useSeoMeta({
    title: 'Služby | Fotografka',
    description:
        'Profesionálne fotografické služby pre rodiny, novorodencov, tehotné a svadby. Pôsobím v Bratislave a okolí.',
})

const services = computed(() => servicesContent.value.map(service => ({
    ...service,
    image: serviceImages.value[service.id as keyof typeof serviceImages.value] || '',
})))

const headerTextRef = ref<HTMLElement | null>(null)
const serviceCardRefs = ref<(ComponentPublicInstance | Element | null)[]>([])
const faqHeaderRef1 = ref<HTMLElement | null>(null)
const faqHeaderRef2 = ref<HTMLElement | null>(null)
const faqContainerRef = ref<HTMLElement | null>(null)
const ctaSectionRef = ref<HTMLElement | null>(null)
const ctaContentRef1 = ref<HTMLElement | null>(null)
const ctaContentRef2 = ref<HTMLElement | null>(null)
const ctaContentRef3 = ref<HTMLElement | null>(null)
const parallaxInitialized = ref(false)

watch(
    serviceImages,
    (newImages) => {
        if (!parallaxInitialized.value && Object.values(newImages).some(Boolean)) {
            nextTick(() => {
                setTimeout(() => setupFrameAnimations(), 100)
            })
        }
    },
    { deep: true }
)

function setupFrameAnimations() {
    if (parallaxInitialized.value) return
    if (serviceCardRefs.value.length === 0) return

    if (serviceCardRefs.value.length > 0) {
        let foundFrames = 0
        serviceCardRefs.value.forEach((cardInstance, _index) => {
            const card =
                cardInstance instanceof Element
                    ? cardInstance
                    : (cardInstance as ComponentPublicInstance)?.$el
            if (!card || !(card instanceof Element)) return

            const imageWrapper = card.querySelector('.service-image-wrapper')
            const frame = card.querySelector('.service-frame')

            if (frame && imageWrapper) {
                foundFrames++
                gsap.to(frame, {
                    y: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: imageWrapper,
                        start: 'top 30%',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                })
            }
        })

        if (foundFrames > 0) {
            parallaxInitialized.value = true
            refresh()
        }
    }
}

onMounted(() => {
    initializeAnimations(() => {
        const { gsap } = useGsapAnimations()

        if (headerTextRef.value) {
            gsap.from(headerTextRef.value, {
                y: 20,
                autoAlpha: 0,
                duration: 0.8,
                delay: 0.3,
                stagger: 0.15,
                ease: 'power3.out',
            })
        }

        if (serviceCardRefs.value.length > 0) {
            serviceCardRefs.value.forEach((cardInstance, index) => {
                const card =
                    cardInstance instanceof Element
                        ? cardInstance
                        : (cardInstance as ComponentPublicInstance)?.$el

                if (!card || !(card instanceof Element)) {
                    return
                }

                const imageWrapper = card.querySelector('.service-image-wrapper')
                const _image = card.querySelector('.service-image')
                const content = card.querySelector('.service-content')
                const features = card.querySelectorAll('.feature-item')

                if (imageWrapper) {
                    slideIn(imageWrapper, {
                        direction: index % 2 === 0 ? 'left' : 'right',
                        distance: 80,
                        duration: 1,
                    })
                }

                const frame = card.querySelector('.service-frame')
                if (frame && imageWrapper) {
                    gsap.to(frame, {
                        y: 30,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: imageWrapper,
                            start: 'top 30%',
                            end: 'bottom top',
                            scrub: 1.5,
                        },
                    })
                }

                if (content) {
                    fadeInUp(content, { y: 40, duration: 0.9, delay: 0.2 })
                }

                if (features.length > 0) {
                    staggerReveal(content || card, features, { stagger: 0.08, y: 20 })
                }
            })
        }

        if (faqHeaderRef1.value) fadeInUp(faqHeaderRef1.value, { y: 40 })
        if (faqHeaderRef2.value) fadeInUp(faqHeaderRef2.value, { y: 40, delay: 0.1 })

        if (faqContainerRef.value) {
            const items = faqContainerRef.value.querySelectorAll('.faq-item')
            if (items.length > 0) {
                staggerReveal(faqContainerRef.value, items, { stagger: 0.12, y: 25 })
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
        <section class="h-[calc(100vh-80px)] flex flex-col bg-cream-100">
            <div class="flex-[80] relative overflow-hidden">
                <video
                    v-if="videoSrc"
                    :key="videoSrc"
                    autoplay
                    muted
                    loop
                    playsinline
                    class="absolute inset-0 w-full h-full object-cover"
                >
                    <source :src="videoSrc" type="video/mp4" >
                </video>
                <div
                    class="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/10 pointer-events-none"
                />
            </div>

            <div class="flex-[20] flex items-center justify-center text-center bg-cream-100 px-4">
                <p
                    ref="headerTextRef"
                    class="header-animate text-xs md:text-sm 3xl:text-base 4xl:text-lg tracking-[0.25em] uppercase text-charcoal-600"
                >
                    {{ heroText }}
                </p>
            </div>
        </section>

        <section class="bg-cream-100">
            <SectionsServicesServiceCard
                v-for="(service, index) in services"
                ref="serviceCardRefs"
                :key="service.id"
                :service="service"
                :index="index"
                :is-reversed="index % 2 === 1"
            />
        </section>

        <section class="section-padding bg-cream-200">
            <div class="container-narrow faq-container">
                <div class="text-center mb-12 3xl:mb-16">
                    <p class="faq-header text-accent text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl mb-3">{{ faqAccent }}</p>
                    <h2 class="faq-header text-3xl md:text-4xl 3xl:text-5xl 4xl:text-6xl font-display text-charcoal-900">
                        {{ faqTitle }}
                    </h2>
                </div>

                <div class="space-y-6 3xl:space-y-8 4xl:space-y-10">
                    <details
                        v-for="(item, index) in faqItems"
                        :key="index"
                        class="faq-item group bg-cream-100 p-6 3xl:p-8 4xl:p-10"
                    >
                        <summary
                            class="font-display text-lg 3xl:text-xl 4xl:text-2xl text-charcoal-900 cursor-pointer list-none flex justify-between items-center"
                        >
                            {{ item.question }}
                            <span class="text-warm-500 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p class="mt-4 text-charcoal-600">
                            {{ item.answer }}
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
    height: calc(100vh - 80px);
    height: calc(100dvh - 80px);
    overflow: hidden;
}

.services-hero__video {
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
