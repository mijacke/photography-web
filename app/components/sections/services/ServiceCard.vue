<script setup lang="ts">
interface Service {
    id: string
    title: string
    description: string
    features: string[]
    image: string
    cta: string
}

defineProps<{
    service: Service
    index: number
    isReversed: boolean
}>()
</script>

<template>
    <div
        :id="service.id"
        :class="[
            'service-card section-padding border-b border-cream-200 last:border-b-0',
            index % 2 === 0 ? 'bg-cream-200' : 'bg-cream-100',
        ]"
    >
        <div class="container-wide">
            <div
                :class="[
                    'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                    isReversed ? 'lg:flex-row-reverse' : '',
                ]"
            >
                <div
                    :class="['relative service-image-wrapper', isReversed ? 'lg:order-2' : '']"
                    style="will-change: transform"
                >
                    <div class="aspect-[4/3] overflow-hidden relative z-10">
                        <img
                            v-if="service.image"
                            :src="service.image"
                            :alt="service.title"
                            class="service-image w-full h-full object-cover"
                            style="will-change: transform"
                            loading="lazy"
                        >
                    </div>
                    <div
                        class="service-frame absolute -bottom-6 -right-6 w-full h-full border-2 border-warm-400 z-0 hidden lg:block"
                    />
                </div>

                <div :class="['service-content', isReversed ? 'lg:order-1' : '']">
                    <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-4">
                        {{ service.title }}
                    </h2>

                    <p class="text-charcoal-600 leading-relaxed mb-6">
                        {{ service.description }}
                    </p>

                    <h3
                        class="font-sans text-sm font-semibold uppercase tracking-wider text-charcoal-800 mb-4"
                    >
                        Čo je v cene
                    </h3>

                    <ul class="space-y-2 mb-8">
                        <li
                            v-for="feature in service.features"
                            :key="feature"
                            class="feature-item flex items-start gap-3 text-charcoal-600"
                        >
                            <img
                                src="/svg/icons/check.svg"
                                alt=""
                                class="h-5 w-5 flex-shrink-0 mt-0.5"
                            >
                            {{ feature }}
                        </li>
                    </ul>

                    <UiAppButton to="/contact" variant="outline">
                        {{ service.cta || 'Mám záujem' }}
                    </UiAppButton>
                </div>
            </div>
        </div>
    </div>
</template>
