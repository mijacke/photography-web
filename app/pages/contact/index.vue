<script setup lang="ts">
useSeoMeta({
    title: 'Kontakt | Fotografka',
    description:
        'Napíšte mi a poďme spolu vytvoriť niečo krásne. Profesionálna fotografka rodín, novorodencov, tehotných a svadieb v Bratislave.',
})
</script>

<template>
    <div>
        <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
            <div class="container-narrow text-center">
                <p class="text-accent text-lg md:text-xl mb-3">Kontakt</p>
                <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">Napíšte mi</h1>
                <p class="text-charcoal-600 max-w-xl mx-auto">Rada si vypočujem váš príbeh</p>
            </div>
        </section>

        <section class="section-padding bg-cream-100">
            <div class="container-wide">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div class="pr-0 lg:pr-12">
                        <p class="font-script italic text-warm-500 text-lg mb-6">
                            Každý príbeh začína správou.
                        </p>
                        <SectionsContactForm />
                    </div>

                    <div class="bg-cream-200/60 p-8 lg:p-12 mt-12 lg:mt-0">
                        <h2 class="font-display text-xl text-charcoal-700 mb-8">Kontaktné údaje</h2>

                        <div class="space-y-8">
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                                    <img
                                        src="/svg/icons/mail.svg"
                                        alt="Email"
                                        class="h-4 w-4 opacity-40"
                                    />
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

                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                                    <img
                                        src="/svg/icons/phone.svg"
                                        alt="Telefón"
                                        class="h-4 w-4 opacity-40"
                                    />
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Telefón
                                    </h3>
                                    <a
                                        href="tel:+421904123456"
                                        class="text-charcoal-500 hover:text-warm-500 transition-colors text-sm"
                                    >
                                        +421 904 123 456
                                    </a>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                                    <img
                                        src="/svg/icons/location.svg"
                                        alt="Lokácia"
                                        class="h-4 w-4 opacity-40"
                                    />
                                </div>
                                <div>
                                    <h3
                                        class="font-medium text-charcoal-600 mb-1 text-xs tracking-wide uppercase"
                                    >
                                        Lokácia
                                    </h3>
                                    <p class="text-charcoal-500 text-sm">Galanta, Slovensko</p>
                                </div>
                            </div>

                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                                    <img
                                        src="/svg/icons/clock.svg"
                                        alt="Čas odpovede"
                                        class="h-4 w-4 opacity-40"
                                    />
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
                            <div class="aspect-[4/3] w-full overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42567.15!2d17.7!3d48.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8d3e5f28f6d7%3A0x400f7d1c69672e0!2sGalanta!5e0!3m2!1ssk!2ssk!4v1703388000000"
                                    width="100%"
                                    height="100%"
                                    style="border: 0; filter: grayscale(30%) contrast(1.05)"
                                    allowfullscreen
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade"
                                    class="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
