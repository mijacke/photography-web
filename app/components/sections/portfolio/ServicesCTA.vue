<script setup lang="ts">
interface Props {
    title?: string
    text?: string
}

withDefaults(defineProps<Props>(), {
    title: 'Máte záujem o fotenie?',
    text: 'Pozrite si môj cenník a služby, ktoré ponúkam.',
})
</script>

<template>
    <section class="py-12 md:py-16 bg-cream-200">
        <div class="container-narrow text-center">
            <h2 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
                {{ title }}
            </h2>
            <p class="text-charcoal-600 mb-8 max-w-xl mx-auto">
                {{ text }}
            </p>
            <UiAppButton to="/services" variant="outline"> Pozrieť cenník </UiAppButton>
        </div>
    </section>
</template>
