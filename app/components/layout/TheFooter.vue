<script setup lang="ts">
const currentYear = new Date().getFullYear()

const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
}

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/paulifotografka/',
        icon: '/svg/icons/instagram.svg',
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/paulifotografka',
        icon: '/svg/icons/facebook.svg',
    },
]

const contactInfo = {
    email: 'mitchie369@gmail.com',
    phone: '+421 903 830 347',
}
</script>

<template>
    <footer class="bg-cream-200 border-t border-cream-300">
        <div class="container-wide py-12 md:py-16">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-center md:text-left"
            >
                <div class="flex flex-col items-center md:items-start">
                    <NuxtLink to="/" class="mb-4">
                        <NuxtImg
                            src="/images/brand_logo/logo.png"
                            alt="Logo"
                            width="225"
                            height="75"
                            class="h-20 w-auto"
                        />
                    </NuxtLink>
                    <p class="text-charcoal-600 text-sm mb-4">Zachytávam vaše najkrajšie momenty</p>
                    <div class="flex gap-4">
                        <a
                            v-for="social in socialLinks"
                            :key="social.label"
                            :href="social.href"
                            :aria-label="social.label"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:opacity-70 transition-opacity"
                        >
                            <img :src="social.icon" :alt="social.label" class="h-6 w-6" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 class="font-display text-lg text-charcoal-900 mb-4">Kontakt</h4>
                    <div class="space-y-3">
                        <div class="flex items-center gap-3 justify-center md:justify-start">
                            <img
                                src="/svg/icons/mail.svg"
                                alt=""
                                class="h-5 w-5 opacity-60 flex-shrink-0"
                            />
                            <a
                                :href="`mailto:${contactInfo.email}`"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                {{ contactInfo.email }}
                            </a>
                        </div>
                        <div class="flex items-center gap-3 justify-center md:justify-start">
                            <img
                                src="/svg/icons/phone.svg"
                                alt=""
                                class="h-5 w-5 opacity-60 flex-shrink-0"
                            />
                            <a
                                :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                {{ contactInfo.phone }}
                            </a>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-display text-lg text-charcoal-900 mb-4">Rýchle odkazy</h4>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/services"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                Služby
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/about"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                O mne
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/contact"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                Kontakt
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-display text-lg text-charcoal-900 mb-4">Dokumenty</h4>
                    <ul class="space-y-3">
                        <li>
                            <button
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                                @click="openCookieSettings"
                            >
                                Nastaviť cookies
                            </button>
                        </li>
                        <li>
                            <NuxtLink
                                to="/cookies"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                Zásady cookies
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/privacy"
                                class="text-charcoal-600 hover:text-warm-500 transition-colors"
                            >
                                Ochrana súkromia
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-8 pt-4 border-t border-cream-300 text-center">
                <p class="text-charcoal-500 text-sm">
                    © {{ currentYear }} Pauli Fotografka. Všetky práva vyhradené.
                </p>
            </div>
        </div>
    </footer>
</template>
