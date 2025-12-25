<script setup lang="ts">
const { hasExternalMediaConsent, requestExternalMediaConsent } = useCookieConsent()

useSeoMeta({
    title: 'Kontakt | Fotografka',
    description:
        'Napíšte mi a poďme spolu vytvoriť niečo krásne. Profesionálna fotografka rodín, novorodencov, tehotných a svadieb v Bratislave.',
})
</script>

<template>
    <div>
        <section class="pt-32 pb-16 md:pt-40 md:pb-20 3xl:pt-48 3xl:pb-28 4xl:pt-56 4xl:pb-32 bg-cream-100">
            <div class="container-narrow text-center">
                <p class="text-accent text-lg md:text-xl 3xl:text-2xl 4xl:text-3xl mb-3">Kontakt</p>
                <h1 class="text-4xl md:text-5xl 3xl:text-6xl 4xl:text-7xl font-display text-charcoal-900 mb-6 3xl:mb-8">Napíšte mi</h1>
                <p class="text-charcoal-600 max-w-xl mx-auto">Rada si vypočujem váš príbeh</p>
            </div>
        </section>

        <section class="section-padding bg-cream-100">
            <div class="container-wide">
                <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 3xl:gap-24 4xl:gap-32">
                    <div>
                        <p class="font-script italic text-warm-500 text-lg 3xl:text-xl 4xl:text-2xl mb-6 3xl:mb-8">
                            Každý príbeh začína správou.
                        </p>
                        <SectionsContactForm />
                    </div>

                    <div class="bg-cream-200/40 p-6 md:p-8 border border-cream-200">
                        <h2 class="font-display text-xl 3xl:text-2xl 4xl:text-3xl text-charcoal-900 mb-8 3xl:mb-10">Kontaktné údaje</h2>

                        <div class="space-y-6">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-cream-300/50 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/svg/icons/mail.svg"
                                        alt="Email"
                                        class="h-4 w-4 opacity-40"
                                    >
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:mitchie369@gmail.com"
                                        class="text-charcoal-500 hover:text-warm-500 transition-colors text-sm"
                                    >
                                        mitchie369@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-cream-300/50 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/svg/icons/phone.svg"
                                        alt="Telefón"
                                        class="h-4 w-4 opacity-40"
                                    >
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Telefón
                                    </h3>
                                    <a
                                        href="tel:+421903830347"
                                        class="text-charcoal-500 hover:text-warm-500 transition-colors text-sm"
                                    >
                                        +421 903 830 347
                                    </a>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-cream-300/50 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/svg/icons/location.svg"
                                        alt="Lokácia"
                                        class="h-4 w-4 opacity-40"
                                    >
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Lokácia
                                    </h3>
                                    <p class="text-charcoal-500 text-sm">Galanta a okolie, Slovensko</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-cream-300/50 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src="/svg/icons/clock.svg"
                                        alt="Čas odpovede"
                                        class="h-4 w-4 opacity-40"
                                    >
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Odpoveď
                                    </h3>
                                    <p class="text-charcoal-500 text-sm">Do 24 hodín</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10 pt-8 border-t border-cream-200">
                            <h3
                                class="font-medium text-charcoal-600 mb-4 text-xs tracking-wide uppercase"
                            >
                                Nájdete ma
                            </h3>
                            <div class="aspect-[4/3] w-full overflow-hidden bg-cream-200">
                                <!-- Google Maps - loads only after external media consent -->
                                <ClientOnly>
                                    <template v-if="hasExternalMediaConsent">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42567.15!2d17.7!3d48.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8d3e5f28f6d7%3A0x400f7d1c69672e0!2sGalanta!5e0!3m2!1ssk!2ssk!4v1703388000000"
                                            width="100%"
                                            height="100%"
                                            style="border: 0; filter: grayscale(30%) contrast(1.05)"
                                            allowfullscreen
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
                                            class="w-full h-full"
                                        />
                                    </template>
                                    <template v-else>
                                        <!-- Consent placeholder -->
                                        <div
                                            class="w-full h-full flex flex-col items-center justify-center text-center p-6"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-10 w-10 text-charcoal-400 mb-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="1.5"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="1.5"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <p class="text-charcoal-600 text-sm mb-3">
                                                Mapa vyžaduje súhlas s cookies
                                            </p>
                                            <button
                                                class="text-sm text-warm-500 hover:text-warm-600 underline"
                                                @click="requestExternalMediaConsent"
                                            >
                                                Nastaviť cookies
                                            </button>
                                        </div>
                                    </template>
                                </ClientOnly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
