<script setup lang="ts">
const instagramUrl = 'https://www.instagram.com/paulifotografka/'
</script>

<template>
    <section class="py-16 px-4 bg-cream-100">
        <div class="max-w-2xl mx-auto text-center">
            <div class="mb-6">
                <img 
                    src="/svg/icons/instagram.svg" 
                    alt="" 
                    class="w-10 h-10 mx-auto opacity-40"
                >
            </div>
            <p class="text-charcoal-500 text-lg font-display mb-4">
                Instagram feed sa čoskoro objaví...
            </p>
            <a
                :href="instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-warm-500 hover:text-warm-600 transition-colors"
            >
                <span>Sledujte @paulifotografka</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    </section>
</template>
