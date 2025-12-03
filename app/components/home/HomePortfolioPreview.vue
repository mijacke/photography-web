<script setup lang="ts">
import { computed } from 'vue'
import type { Gallery } from '@/types/gallery'
import type { HomePortfolioEmptyState } from '@/types/home'
import { formatDate } from '@/utils/date'

const props = defineProps<{
  galleries: Gallery[]
  eyebrow: string
  title: string
  description: string
  viewAllLabel: string
  emptyState: HomePortfolioEmptyState
  dateLocale?: string
}>()

const dateLocale = computed(() => props.dateLocale || 'en-US')

const formatDateForLocale = (value?: string) => formatDate(value, dateLocale.value)

const coverStyle = (cover?: string) => ({
  backgroundImage: cover
    ? `linear-gradient(135deg, rgba(31, 29, 23, 0.68), rgba(83, 89, 67, 0.35)), url('${cover}')`
    : 'linear-gradient(135deg, #1f1d17, #525943)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})
</script>

<template>
  <section id="portfolio" class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="space-y-1">
        <p class="text-sm uppercase tracking-[0.28em] text-stone-500">{{ eyebrow }}</p>
        <h2 class="text-2xl font-semibold text-charcoal">{{ title }}</h2>
        <p class="text-sm text-stone-700">{{ description }}</p>
      </div>
      <NuxtLink
        to="/portfolio"
        class="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      >
        {{ viewAllLabel }}
      </NuxtLink>
    </div>

    <div v-if="galleries.length" class="grid gap-6 md:grid-cols-2">
      <article
        v-for="gallery in galleries"
        :key="gallery.path"
        class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
      >
        <NuxtLink :to="gallery.path || '/portfolio'" class="flex h-full flex-col">
          <div class="aspect-[4/3] w-full" :style="coverStyle(gallery.cover)" />
          <div class="flex flex-1 flex-col gap-2 px-5 py-4">
            <div class="flex items-center gap-2 text-xs text-stone-600">
              <span v-if="gallery.location">{{ gallery.location }}</span>
              <span v-if="gallery.location && gallery.date" aria-hidden="true">/</span>
              <span v-if="gallery.date">{{ formatDateForLocale(gallery.date) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-charcoal">{{ gallery.title }}</h3>
            <p v-if="gallery.summary" class="text-sm leading-relaxed text-stone-700">
              {{ gallery.summary }}
            </p>
            <div class="mt-auto flex flex-wrap gap-2 pt-3 text-xs text-stone-600">
              <span v-for="tag in gallery.tags || []" :key="tag" class="rounded-full bg-stone-100 px-3 py-1">
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <p v-else class="rounded-xl border border-dashed border-stone-300/80 bg-white px-6 py-10 text-stone-700">
      {{ emptyState.before }}
      <code class="rounded bg-stone-100 px-2 py-1">{{ emptyState.path }}</code>
      {{ emptyState.after }}
    </p>
  </section>
</template>
