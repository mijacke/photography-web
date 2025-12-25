<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
    error: NuxtError
}

const props = defineProps<Props>()

const errorTitle = computed(() => {
    if (props.error?.statusCode === 404) {
        return 'Stránka nenájdená'
    }
    return 'Niečo sa pokazilo'
})

const errorMessage = computed(() => {
    if (props.error?.statusCode === 404) {
        return 'Ospravedlňujeme sa, ale stránka ktorú hľadáte neexistuje alebo bola presunutá.'
    }
    return 'Nastala neočakávaná chyba. Skúste to prosím znova neskôr.'
})

const goHome = () => {
    clearError()
    window.location.href = '/'
}
</script>

<template>
    <div class="min-h-screen bg-cream-100 flex items-center justify-center px-4">
        <div class="text-center max-w-lg">
            <p class="text-warm-500 text-6xl md:text-8xl font-display mb-4">
                {{ error?.statusCode || '500' }}
            </p>
            <h1 class="text-2xl md:text-3xl font-display text-charcoal-900 mb-4">
                {{ errorTitle }}
            </h1>
            <p class="text-charcoal-600 mb-8">
                {{ errorMessage }}
            </p>
            <button
                class="inline-flex items-center gap-2 px-6 py-3 border border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase"
                @click="goHome"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Späť na úvodnú stránku
            </button>
        </div>
    </div>
</template>
