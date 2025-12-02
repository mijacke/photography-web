<script setup lang="ts">
import { createError } from 'h3'
import { useGalleryBySlug } from '@/composables/usePortfolio'
import { formatDate } from '@/utils/date'

const route = useRoute()

const { data: galleryData } = await useGalleryBySlug(route.params.slug as string)

if (!galleryData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Gallery not found' })
}

// Po kontrole vieme, že galleryData.value nie je null
const gallery = galleryData.value

useHead(() => ({
  title: gallery.title ? `${gallery.title} | Portfolio` : 'Portfolio'
}))
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <main class="layout-shell max-w-4xl py-12">
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      >
        <span aria-hidden="true"><-</span>
        Spat na portfolio
      </NuxtLink>

      <header class="mt-6 space-y-2">
        <p class="text-xs uppercase tracking-[0.3em] text-stone-500">Portfolio</p>
        <h1 class="text-3xl font-semibold text-charcoal sm:text-4xl">{{ gallery.title }}</h1>
        <p class="text-stone-600" v-if="gallery.location || gallery.date">
          <span v-if="gallery.location">{{ gallery.location }}</span>
          <span v-if="gallery.location && gallery.date" aria-hidden="true">/</span>
          <span v-if="gallery.date">{{ formatDate(gallery.date) }}</span>
        </p>
      </header>

      <div v-if="gallery.cover" class="mt-8 overflow-hidden rounded-2xl ring-1 ring-stone-200">
        <img :src="gallery.cover" :alt="gallery.title || 'Gallery'" class="h-full w-full object-cover" />
      </div>

      <div class="prose mt-10 max-w-none">
        <ContentRenderer :value="gallery as any" />
      </div>
    </main>
  </div>
</template>
