<script setup lang="ts">
import { computed } from 'vue'
import { createError } from 'h3'
import Footer from '@/components/navigation/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { useGalleryBySlug } from '@/composables/usePortfolio'
import { useAppCopy } from '@/composables/useAppCopy'
import { formatDate } from '@/utils/date'

const route = useRoute()
const { copy } = useAppCopy()

const { data: galleryData } = await useGalleryBySlug(route.params.slug as string)

if (!galleryData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Gallery not found' })
}

// Po kontrole vieme, že galleryData.value nie je null
const gallery = galleryData.value

const navLinks = computed(() => copy.value.navigation.links)
const headerCta = computed(() => copy.value.navigation.ctas.default)
const detailCopy = computed(() => copy.value.portfolio.detail)
const dateLocale = computed(() => copy.value.meta.dateLocale)

const formatDateForLocale = (value?: string) => formatDate(value, dateLocale.value)

useHead(() => ({
  title: gallery.title ? `${gallery.title} | ${detailCopy.value.eyebrow}` : detailCopy.value.eyebrow
}))

</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header
      :links="navLinks"
      :brand-label="copy.navigation.brand"
      :cta-label="headerCta.label"
      :cta-href="headerCta.href"
      theme="light"
    />
    <main class="layout-shell max-w-4xl py-12">
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      >
        <span aria-hidden="true"><-</span>
        {{ detailCopy.backLabel }}
      </NuxtLink>

      <header class="mt-6 space-y-2">
        <p class="text-xs uppercase tracking-[0.3em] text-stone-500">{{ detailCopy.eyebrow }}</p>
        <h1 class="text-3xl font-semibold text-charcoal sm:text-4xl">{{ gallery.title }}</h1>
        <p class="text-stone-600" v-if="gallery.location || gallery.date">
          <span v-if="gallery.location">{{ gallery.location }}</span>
          <span v-if="gallery.location && gallery.date" aria-hidden="true">/</span>
          <span v-if="gallery.date">{{ formatDateForLocale(gallery.date) }}</span>
        </p>
      </header>

      <div v-if="gallery.cover" class="mt-8 overflow-hidden rounded-2xl ring-1 ring-stone-200">
        <NuxtImg :src="gallery.cover" :alt="gallery.title || 'Gallery'" class="h-full w-full object-cover" width="800" height="600" />
      </div>

      <div class="prose mt-10 max-w-none">
        <ContentRenderer :value="gallery as any" />
      </div>
    </main>

    <Footer />
  </div>
</template>
