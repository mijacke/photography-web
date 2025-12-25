<script setup lang="ts">
import {
    OPERATOR,
    POLICY_VERSION,
    CONSENT_CATEGORIES,
    COOKIE_ITEMS,
    RETENTION,
} from '~/config/legal'

useSeoMeta({
    title: 'Cookies | Pauli Fotografka',
    description: 'Informácie o používaní cookies na stránke paulifotografka.sk',
})

const cookieCategories = [
    {
        ...CONSENT_CATEGORIES.necessary,
        legalBasis: 'Výnimka podľa §109 ods. 8 zákona 452/2021 (technicky nevyhnutné)',
        storage: COOKIE_ITEMS.necessary,
    },
    {
        ...CONSENT_CATEGORIES.analytics,
        legalBasis: 'Súhlas (GDPR čl. 6 ods. 1 písm. a)',
        storage: COOKIE_ITEMS.analytics,
    },
    {
        ...CONSENT_CATEGORIES.externalMedia,
        legalBasis: 'Súhlas (GDPR čl. 6 ods. 1 písm. a)',
        storage: COOKIE_ITEMS.externalMedia,
    },
]

const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-settings'))
}
</script>

<template>
    <div>
        <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
            <div class="container-narrow text-center">
                <p class="text-accent text-lg md:text-xl mb-3">Právne informácie</p>
                <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
                    Zásady používania cookies
                </h1>
                <p class="text-charcoal-600 max-w-xl mx-auto">
                    Informácie o cookies a iných údajoch ukladaných vo vašom zariadení.
                </p>
            </div>
        </section>

        <section class="section-padding bg-white">
            <div class="container-narrow">
                <!-- Prevádzkovateľ -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        1. Prevádzkovateľ
                    </h2>
                    <div class="bg-cream-100 p-6 text-charcoal-600">
                        <p><strong>Meno:</strong> {{ OPERATOR.name }} ({{ OPERATOR.fullName }})</p>
                        <p><strong>Sídlo:</strong> {{ OPERATOR.address }}</p>
                        <p>
                            <strong>Email:</strong>
                            <a :href="`mailto:${OPERATOR.email}`" class="text-warm-500 hover:underline">
                                {{ OPERATOR.email }}
                            </a>
                        </p>
                        <p><strong>Telefón:</strong> {{ OPERATOR.phone }}</p>
                    </div>
                </div>

                <!-- Čo sú cookies -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        2. Čo sú cookies a localStorage?
                    </h2>
                    <p class="text-charcoal-600 leading-relaxed mb-4">
                        <strong>Cookies</strong> sú malé textové súbory ukladané vo vašom prehliadači.
                        <strong>LocalStorage</strong> je podobná technológia pre ukladanie údajov.
                    </p>
                    <p class="text-charcoal-600 leading-relaxed">
                        Obe spadajú pod §109 zákona 452/2021 Z. z. o elektronických komunikáciách.
                    </p>
                </div>

                <!-- OPT-IN princíp -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        3. Právny základ
                    </h2>
                    <div class="bg-amber-50 border-l-4 border-amber-400 p-4">
                        <p class="text-charcoal-700 text-sm">
                            <strong>OPT-IN princíp:</strong> Analytické cookies a externé médiá sa aktivujú
                            <strong>až po vašom výslovnom súhlase</strong>. Pred kliknutím na "Prijať"
                            nie sú tieto skripty načítané.
                        </p>
                    </div>
                </div>

                <!-- Platnosť súhlasu -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        4. Platnosť súhlasu
                    </h2>
                    <p class="text-charcoal-600 leading-relaxed mb-4">
                        Súhlas je platný <strong>{{ RETENTION.consentExpiry }}</strong>.
                        Po uplynutí vás požiadame o opätovný súhlas.
                    </p>
                    <p class="text-charcoal-600 leading-relaxed">
                        Pri expirácii automaticky vymažeme analytické cookies a zablokujeme externé médiá.
                    </p>
                </div>

                <!-- Kategórie cookies -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-6">
                        5. Kategórie cookies
                    </h2>
                    <div class="space-y-8">
                        <div
                            v-for="category in cookieCategories"
                            :key="category.id"
                            class="border border-cream-200"
                        >
                            <div class="bg-cream-100 p-4">
                                <h3 class="font-display text-lg text-charcoal-900">
                                    {{ category.name }}
                                </h3>
                                <p class="text-charcoal-600 text-sm mt-1">
                                    {{ category.description }}
                                </p>
                                <p class="text-charcoal-500 text-xs mt-2">
                                    <strong>Právny základ:</strong> {{ category.legalBasis }}
                                </p>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm">
                                    <thead class="bg-cream-50">
                                        <tr>
                                            <th class="text-left p-3 font-medium text-charcoal-700">Názov</th>
                                            <th class="text-left p-3 font-medium text-charcoal-700">Typ</th>
                                            <th class="text-left p-3 font-medium text-charcoal-700">Poskytovateľ</th>
                                            <th class="text-left p-3 font-medium text-charcoal-700">Účel</th>
                                            <th class="text-left p-3 font-medium text-charcoal-700">Expirácia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="item in category.storage"
                                            :key="item.name"
                                            class="border-t border-cream-200"
                                        >
                                            <td class="p-3 text-charcoal-600 font-mono text-xs">{{ item.name }}</td>
                                            <td class="p-3 text-charcoal-600 text-xs">{{ item.type }}</td>
                                            <td class="p-3 text-charcoal-600">{{ item.provider }}</td>
                                            <td class="p-3 text-charcoal-600">{{ item.purpose }}</td>
                                            <td class="p-3 text-charcoal-600">{{ item.expiry }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cookies tretích strán -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        6. Cookies tretích strán
                    </h2>
                    <div class="bg-cream-100 border-l-4 border-cream-400 p-4">
                        <p class="text-charcoal-600 text-sm">
                            Po povolení externých médií môže Google ukladať cookies priamo z ich domén.
                            Tieto cookies nemôžeme vymazať z tejto stránky – ich odstránenie sa riadi
                            nastaveniami vášho prehliadača.
                        </p>
                    </div>
                </div>

                <!-- Vaše práva -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        7. Zmena nastavení
                    </h2>
                    <p class="text-charcoal-600 mb-6">
                        Svoje preferencie môžete kedykoľvek zmeniť:
                    </p>
                    <button
                        class="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-800 text-white hover:bg-charcoal-900 transition-colors text-sm"
                        @click="openCookieSettings"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Zmeniť nastavenia cookies
                    </button>
                </div>

                <!-- Správa v prehliadači -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        8. Správa v prehliadači
                    </h2>
                    <p class="text-charcoal-600 mb-4">
                        Cookies môžete spravovať aj v nastaveniach prehliadača:
                    </p>
                    <ul class="list-disc list-inside text-charcoal-600 space-y-2">
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" class="text-warm-500 hover:underline">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/sk/kb/povolenie-zakazanie-cookies" target="_blank" rel="noopener" class="text-warm-500 hover:underline">Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/sk-sk/guide/safari/sfri11471/mac" target="_blank" rel="noopener" class="text-warm-500 hover:underline">Safari</a></li>
                        <li><a href="https://support.microsoft.com/sk-sk/microsoft-edge" target="_blank" rel="noopener" class="text-warm-500 hover:underline">Microsoft Edge</a></li>
                    </ul>
                </div>

                <!-- Súvisiace dokumenty -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">
                        9. Súvisiace dokumenty
                    </h2>
                    <p class="text-charcoal-600">
                        Kompletné informácie o spracúvaní osobných údajov nájdete v
                        <NuxtLink to="/privacy" class="text-warm-500 hover:underline">
                            Zásadách ochrany osobných údajov
                        </NuxtLink>.
                    </p>
                </div>

                <!-- Verzia -->
                <div class="pt-6 border-t border-cream-200">
                    <p class="text-charcoal-500 text-sm">
                        <strong>Verzia:</strong> {{ POLICY_VERSION }} |
                        <strong>Posledná aktualizácia:</strong> December 2025
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
