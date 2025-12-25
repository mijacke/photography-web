<script setup lang="ts">
const { heroVideoUrl, serviceImages } = useSanityServices()
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

const services = computed(() => [
    {
        id: 'rodina',
        title: 'Rodinné fotenie',
        description:
            'Zachytím lásku a spojenie medzi členmi vašej rodiny v prirodzenom, uvoľnenom prostredí. Ideálne pre každoročné rodinné portréty, oslavu míľnikov alebo jednoducho len tak.',
        features: [
            '1-2 hodinové fotenie',
            'Exteriér alebo u vás doma',
            '30+ upravených digitálnych fotografií',
            'Súbory vo vysokom rozlíšení pripravené na tlač',
            'Online galéria pre jednoduché zdieľanie',
        ],
        image: serviceImages.value.rodina || '',
        cta: 'Mám záujem o rodinné fotenie',
    },
    {
        id: 'novorodenci',
        title: 'Novorodenecké fotenie',
        description:
            'Jemné portréty vášho nového člena rodiny v prvých vzácnych dňoch života. Najlepšie je naplánovať fotenie do 2 týždňov po narodení, kedy sú bábätká najospalejšie.',
        features: [
            '2-3 hodinové fotenie',
            'U vás doma alebo v ateliéri',
            '25+ upravených digitálnych fotografií',
            'Fotky s rodičmi a súrodencami v cene',
            'Rekvizity a zavinovačky zabezpečím',
        ],
        image: serviceImages.value.novorodenci || '',
        cta: 'Mám záujem o novorodenecké fotenie',
    },
    {
        id: 'tehotenstvo',
        title: 'Tehotenské fotenie',
        description:
            'Oslava krásy tehotenstva a očakávania nového života. Ideálne je naplánovať fotenie medzi 28. a 34. týždňom.',
        features: [
            '1 hodinové fotenie',
            'Exteriér alebo ateliér',
            '20+ upravených digitálnych fotografií',
            'Fotky s partnerom v cene',
            'Poradenstvo pri výbere oblečenia',
        ],
        image: serviceImages.value.tehotenstvo || '',
        cta: 'Mám záujem o tehotenské fotenie',
    },
    {
        id: 'svadby',
        title: 'Svadobné fotenie',
        description:
            'Zdokumentujem váš výnimočný deň s nadčasovou eleganciou a autentickými emóciami. Od komorných obradov až po veľkolepé oslavy.',
        features: [
            'Celodenná dokumentácia',
            'Možnosť druhého fotografa',
            '300+ upravených digitálnych fotografií',
            'Zásnubné fotenie v cene',
            'Prémiové svadobné albumy',
        ],
        image: serviceImages.value.svadby || '',
        cta: 'Mám záujem o svadobné fotenie',
    },
])

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
                    class="header-animate text-xs md:text-sm tracking-[0.25em] uppercase text-charcoal-600"
                >
                    Každé fotenie je starostlivo pripravené, aby zachytilo váš jedinečný príbeh
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
                <div class="text-center mb-12">
                    <p class="faq-header text-accent text-lg md:text-xl mb-3">Časté otázky</p>
                    <h2 class="faq-header text-3xl md:text-4xl font-display text-charcoal-900">
                        Čo vás zaujíma?
                    </h2>
                </div>

                <div class="space-y-6">
                    <details class="faq-item group bg-cream-100 p-6">
                        <summary
                            class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center"
                        >
                            Ako dlho vopred je potrebné rezervovať termín?
                            <span class="text-warm-500 group-open:rotate-45 transition-transform"
                                >+</span
                            >
                        </summary>
                        <p class="mt-4 text-charcoal-600">
                            Pre rodinné a tehotenské fotenie odporúčam rezervovať 4-6 týždňov
                            vopred, novorodenecké fotenie 2-3 mesiace (ešte pred pôrodom!), svadby
                            ideálne 6-12 mesiacov vopred.
                        </p>
                    </details>

                    <details class="faq-item group bg-cream-100 p-6">
                        <summary
                            class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center"
                        >
                            Čo si máme obliecť?
                            <span class="text-warm-500 group-open:rotate-45 transition-transform"
                                >+</span
                            >
                        </summary>
                        <p class="mt-4 text-charcoal-600">
                            Po rezervácii vám pošlem podrobného sprievodcu štýlom! Vo všeobecnosti
                            odporúčam zladiť (nie zjednotiť) oblečenie v jemných, neutrálnych
                            farbách, ktoré sa navzájom dopĺňajú.
                        </p>
                    </details>

                    <details class="faq-item group bg-cream-100 p-6">
                        <summary
                            class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center"
                        >
                            Kde fotenie prebieha?
                            <span class="text-warm-500 group-open:rotate-45 transition-transform"
                                >+</span
                            >
                        </summary>
                        <p class="mt-4 text-charcoal-600">
                            Ponúkam fotenie v exteriéri aj interiéri. Mám krásne tipy na lokality v
                            okolí Bratislavy, ale rada prídem aj k vám domov alebo na miesto, ktoré
                            je pre vás výnimočné.
                        </p>
                    </details>

                    <details class="faq-item group bg-cream-100 p-6">
                        <summary
                            class="font-display text-lg text-charcoal-900 cursor-pointer list-none flex justify-between items-center"
                        >
                            Kedy dostaneme fotky?
                            <span class="text-warm-500 group-open:rotate-45 transition-transform"
                                >+</span
                            >
                        </summary>
                        <p class="mt-4 text-charcoal-600">
                            Online galériu s fotografiami obdržíte do 2-3 týždňov pri portrétnom
                            fotení a do 4-6 týždňov pri svadbách. Prvé ukážky vám pošlem už do 48
                            hodín!
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
