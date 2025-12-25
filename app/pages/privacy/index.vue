<script setup lang="ts">
import {
    OPERATOR,
    RECIPIENTS,
    RETENTION,
    DATA_PROCESSING,
    SUPERVISORY_AUTHORITY,
} from '~/config/legal'

useSeoMeta({
    title: 'Ochrana osobných údajov | Pauli Fotografka',
    description: 'Zásady ochrany osobných údajov na stránke paulifotografka.sk',
})
</script>

<template>
    <div>
        <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
            <div class="container-narrow text-center">
                <p class="text-accent text-lg md:text-xl mb-3">Právne informácie</p>
                <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
                    Ochrana osobných údajov
                </h1>
                <p class="text-charcoal-600 max-w-xl mx-auto">
                    Informácie o spracúvaní osobných údajov v súlade s GDPR.
                </p>
            </div>
        </section>

        <section class="section-padding bg-white">
            <div class="container-narrow">
                <!-- Prevádzkovateľ -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">1. Prevádzkovateľ</h2>
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

                <!-- Aké údaje zbierame -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">2. Aké údaje zbierame</h2>
                    <div class="space-y-4">
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-2">Kontaktný formulár</h3>
                            <p class="text-charcoal-600 text-sm">Meno, e-mail, telefón (voliteľné), obsah správy</p>
                        </div>
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-2">Analytické údaje (po súhlase)</h3>
                            <p class="text-charcoal-600 text-sm">
                                Anonymizovaná IP adresa, typ prehliadača, navštívené stránky.
                                <strong>{{ RETENTION.analytics.note }}</strong>
                            </p>
                        </div>
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-2">Záznamy o súhlase</h3>
                            <p class="text-charcoal-600 text-sm">Anonymné ID, časová pečiatka, vaše voľby</p>
                        </div>
                    </div>
                </div>

                <!-- Účely spracovania -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">3. Účely spracovania</h2>
                    <div class="space-y-6">
                        <!-- Kontaktný formulár -->
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-3">Kontaktný formulár</h3>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p class="text-charcoal-500 mb-1">Právny základ</p>
                                    <p class="text-charcoal-600">{{ DATA_PROCESSING.contactForm.legalBasis }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Doba uchovávania</p>
                                    <p class="text-charcoal-600">{{ RETENTION.contactForm.period }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Po uplynutí</p>
                                    <p class="text-charcoal-600">{{ RETENTION.contactForm.afterExpiry }}</p>
                                </div>
                            </div>
                            <p class="text-charcoal-500 text-sm mt-3 italic">
                                {{ DATA_PROCESSING.contactForm.legalBasisNote }}
                            </p>
                            <p class="text-charcoal-500 text-sm mt-1">
                                Dôvod: {{ RETENTION.contactForm.reason }}
                            </p>
                        </div>

                        <!-- Analytika -->
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-3">Analytika návštevnosti</h3>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p class="text-charcoal-500 mb-1">Právny základ</p>
                                    <p class="text-charcoal-600">{{ DATA_PROCESSING.analytics.legalBasis }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Doba uchovávania</p>
                                    <p class="text-charcoal-600">{{ RETENTION.analytics.period }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Po uplynutí</p>
                                    <p class="text-charcoal-600">{{ RETENTION.analytics.afterExpiry }}</p>
                                </div>
                            </div>
                            <p class="text-charcoal-500 text-sm mt-3">
                                Dôvod: {{ RETENTION.analytics.reason }}
                            </p>
                        </div>

                        <!-- Záznamy o súhlase -->
                        <div class="border border-cream-200 p-4">
                            <h3 class="font-medium text-charcoal-900 mb-3">Preukázanie súhlasu</h3>
                            <div class="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p class="text-charcoal-500 mb-1">Právny základ</p>
                                    <p class="text-charcoal-600">{{ DATA_PROCESSING.consentLogs.legalBasis }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Doba uchovávania</p>
                                    <p class="text-charcoal-600">{{ RETENTION.consentLogs.period }}</p>
                                </div>
                                <div>
                                    <p class="text-charcoal-500 mb-1">Po uplynutí</p>
                                    <p class="text-charcoal-600">{{ RETENTION.consentLogs.afterExpiry }}</p>
                                </div>
                            </div>
                            <p class="text-charcoal-500 text-sm mt-3">
                                Dôvod: {{ RETENTION.consentLogs.reason }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Príjemcovia -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">4. Príjemcovia údajov</h2>
                    <div class="space-y-4">
                        <div
                            v-for="recipient in RECIPIENTS"
                            :key="recipient.name"
                            class="border border-cream-200 p-4"
                        >
                            <h3 class="font-medium text-charcoal-900 mb-2">
                                {{ recipient.name }} ({{ recipient.country }})
                            </h3>
                            <p class="text-charcoal-600 text-sm mb-2">
                                {{ recipient.services.join(', ') }}
                            </p>
                            <div v-if="recipient.dpfCertified" class="bg-cream-100 p-3 text-sm">
                                <strong>Prenos do USA:</strong> Certifikovaný v EU-US Data Privacy Framework (k decembru 2025).
                                <a :href="recipient.dpfLink" target="_blank" rel="noopener" class="text-warm-500 hover:underline">Overiť</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cookies -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">5. Cookies a externé médiá</h2>
                    <p class="text-charcoal-600 mb-4">
                        Používame analytické cookies (Google Analytics) a externé médiá (Google Maps)
                        len po vašom výslovnom súhlase.
                    </p>
                    <p class="text-charcoal-600">
                        Podrobnosti nájdete v
                        <NuxtLink to="/cookies" class="text-warm-500 hover:underline">
                            Zásadách používania cookies
                        </NuxtLink>.
                    </p>
                </div>

                <!-- Práva -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">6. Vaše práva</h2>
                    <ul class="space-y-3 text-charcoal-600">
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Prístup</strong> – kópia údajov, ktoré o vás máme</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Oprava</strong> – oprava nesprávnych údajov</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Vymazanie</strong> – vymazanie vašich údajov</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Obmedzenie</strong> – obmedzenie spracovania</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Prenosnosť</strong> – export údajov</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Námietka</strong> – námietka proti spracovaniu</span>
                        </li>
                        <li class="flex gap-3">
                            <span class="text-warm-500 font-bold">▸</span>
                            <span><strong>Odvolanie súhlasu</strong> – kedykoľvek, bez vplyvu na predchádzajúce spracovanie</span>
                        </li>
                    </ul>
                </div>

                <!-- Ako uplatniť -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">7. Ako uplatniť práva</h2>
                    <div class="bg-cream-100 p-6">
                        <p class="text-charcoal-600 mb-2">Kontaktujte nás na:</p>
                        <p class="text-charcoal-600">
                            <a :href="`mailto:${OPERATOR.email}`" class="text-warm-500 hover:underline">
                                {{ OPERATOR.email }}
                            </a>
                        </p>
                        <p class="text-charcoal-600 mt-4 text-sm">
                            Odpovieme do 30 dní. Môžeme požiadať o overenie totožnosti.
                        </p>
                    </div>
                </div>

                <!-- Sťažnosť -->
                <div class="mb-12">
                    <h2 class="text-2xl font-display text-charcoal-900 mb-4">8. Právo na sťažnosť</h2>
                    <div class="bg-cream-100 p-6">
                        <p class="font-medium text-charcoal-900">{{ SUPERVISORY_AUTHORITY.name }}</p>
                        <p class="text-charcoal-600">{{ SUPERVISORY_AUTHORITY.address }}</p>
                        <p class="text-charcoal-600">
                            <a :href="SUPERVISORY_AUTHORITY.website" target="_blank" rel="noopener" class="text-warm-500 hover:underline">
                                {{ SUPERVISORY_AUTHORITY.website.replace('https://', '') }}
                            </a>
                        </p>
                    </div>
                </div>

                <!-- Verzia -->
                <div class="pt-6 border-t border-cream-200">
                    <p class="text-charcoal-500 text-sm">
                        <strong>Posledná aktualizácia:</strong> December 2025
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>
