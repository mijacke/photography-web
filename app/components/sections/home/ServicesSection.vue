<script setup lang="ts">
const { fadeInUp, cleanup, initializeAnimations } = useGsapAnimations()

const headerRef = ref<HTMLElement | null>(null)
const textRef1 = ref<HTMLElement | null>(null)
const textRef2 = ref<HTMLElement | null>(null)
const textRef3 = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

onMounted(() => {
    initializeAnimations(() => {
        if (headerRef.value) {
            fadeInUp(headerRef.value, { y: 30, duration: 0.8 })
        }

        const texts = [textRef1.value, textRef2.value, textRef3.value].filter((el) => el !== null)
        if (texts.length > 0) {
            fadeInUp(texts, { y: 25, stagger: 0.15, duration: 0.7 })
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
    <section class="py-20 md:py-28 bg-cream-100">
        <div class="container-wide max-w-5xl mx-auto">
            <div class="text-center mb-12 md:mb-16">
                <h2
                    ref="headerRef"
                    class="services-header text-sm md:text-base tracking-[0.3em] uppercase text-charcoal-700"
                >
                    Fotografické služby, ktoré ponúkam
                </h2>
            </div>

            <div class="space-y-8 text-center leading-relaxed">
                <p ref="textRef1" class="services-text font-medium text-charcoal-800">
                    Každá etapa rodinného života nesie svoj vlastný príbeh – od tichého očakávania
                    počas tehotenstva až po teplo a blízkosť, ktoré s rokmi ešte viac rastú. Je pre
                    mňa veľkou cťou, keď mi rodiny dovolia vstúpiť do ich sveta a môžem pre nich
                    zachytiť tieto výnimočné momenty.
                </p>

                <p ref="textRef2" class="services-text text-charcoal-600">
                    Fotím tehotenské portréty, ktoré oslavujú krásu a silu materstva, novorodenecké
                    fotografie plné tých najjemnejších prvých detailov, svadobné príbehy nabité
                    emóciami a láskou, aj rodinné fotenia, ktoré zachytávajú vaše skutočné spojenie
                    – prirodzene, úprimne a s dôrazom na emóciu.
                </p>

                <p ref="textRef3" class="services-text font-light italic text-charcoal-700">
                    Každé fotenie je jednoduché, nadčasové a sústredené na skutočné chvíle. Žiadne
                    ťažké rekvizity ani zbytočné rozptýlenia – len vy, vaše emócie a jemné svetlo.
                    Práve tento premyslený, prirodzený prístup viedol mnohé rodiny k tomu, aby mi
                    dlhodobo zverovali svoje najvzácnejšie spomienky a vracali sa ku mne rok čo rok.
                </p>
            </div>

            <div ref="ctaRef" class="services-cta text-center mt-14">
                <NuxtLink
                    to="/portfolio"
                    class="group font-script text-xl md:text-2xl italic text-charcoal-700 hover:text-warm-500 transition-colors inline-flex items-center gap-2"
                >
                    Prezrieť moje portfólio
                    <span class="relative h-5 w-5 md:h-6 md:w-6">
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
