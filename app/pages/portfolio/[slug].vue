<script setup lang="ts">
import { createError } from 'h3'

type Gallery = {
  _path?: string
  title?: string
  summary?: string
  cover?: string
  location?: string
  date?: string
  tags?: string[]
}

const route = useRoute()

const { data: doc } = await useAsyncData(`portfolio-${route.params.slug}`, () =>
  queryCollection<Gallery>('portfolio')
    .where('_path', '=', `/portfolio/${route.params.slug}`)
    .first()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Gallery not found' })
}

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('sk-SK', { dateStyle: 'medium' }).format(new Date(value)) : ''

useHead(() => ({
  title: doc.value?.title ? `${doc.value.title} | Portfolio` : 'Portfolio'
}))
</script>

<template>
  <main class="mx-auto max-w-4xl px-6 py-12 lg:px-10">
    <NuxtLink
      to="/portfolio"
      class="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-400/60 hover:text-sky-100"
    >
      <span aria-hidden="true">←</span>
      Spat na portfolio
    </NuxtLink>

    <header class="mt-6 space-y-2">
      <p class="text-xs uppercase tracking-[0.3em] text-sky-300">Portfolio</p>
      <h1 class="text-3xl font-semibold text-white sm:text-4xl">{{ doc.title }}</h1>
      <p class="text-slate-400" v-if="doc.location || doc.date">
        <span v-if="doc.location">{{ doc.location }}</span>
        <span v-if="doc.location && doc.date" aria-hidden="true">•</span>
        <span v-if="doc.date">{{ formatDate(doc.date as string) }}</span>
      </p>
    </header>

    <div v-if="doc.cover" class="mt-8 overflow-hidden rounded-2xl ring-1 ring-white/10">
      <img :src="doc.cover as string" :alt="doc.title as string" class="h-full w-full object-cover" />
    </div>

    <div class="prose prose-invert mt-10 max-w-none">
      <ContentRenderer :value="doc" />
    </div>
  </main>
</template>
