<script setup lang="ts">
interface PortfolioItem {
    path: string
    title: string
    cover?: string
    summary?: string
    tags?: string[]
    location?: string
}

interface Props {
    item: PortfolioItem
}

defineProps<Props>()
</script>

<template>
    <NuxtLink :to="item.path" class="group block overflow-hidden bg-cream-100">
        <div class="aspect-[4/5] overflow-hidden relative">
            <img
                v-if="item.cover"
                :src="item.cover"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div v-else class="w-full h-full bg-cream-300 flex items-center justify-center">
                <span class="text-charcoal-500">No image</span>
            </div>

            <div
                class="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300"
            ></div>
        </div>

        <div class="p-4 md:p-5">
            <h3
                class="font-display text-lg md:text-xl text-charcoal-900 group-hover:text-warm-500 transition-colors mb-1"
            >
                {{ item.title }}
            </h3>

            <p v-if="item.location" class="text-charcoal-500 text-sm">
                {{ item.location }}
            </p>

            <div v-if="item.tags && item.tags.length > 0" class="mt-3 flex flex-wrap gap-2">
                <span
                    v-for="tag in item.tags.slice(0, 2)"
                    :key="tag"
                    class="text-xs uppercase tracking-wider text-warm-600 bg-warm-400/10 px-2 py-1"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>
