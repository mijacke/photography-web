<script setup lang="ts">
import type { Gallery } from '@/types/gallery'

const { data: galleries } = await useAsyncData('portfolio-list', () =>
  queryCollection('portfolio')
    .select('path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
    .order('date', 'DESC')
    .all()
) as { data: Ref<Gallery[] | null> }

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('sk-SK', { dateStyle: 'medium' }).format(new Date(value)) : ''
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <main class="layout-shell py-16">
      <header class="mb-10 space-y-3">
        <p class="text-sm uppercase tracking-[0.28em] text-stone-500">Portfolio</p>
        <h1 class="text-3xl font-semibold text-charcoal sm:text-4xl">Galeria z markdownu</h1>
        <p class="max-w-2xl text-stone-700">
          Kazdy subor v <code class="rounded bg-stone-200 px-2 py-1 text-charcoal">content/portfolio</code> sa zobrazi ako samostatna
          route. Pridaj fotky do <code class="rounded bg-stone-200 px-2 py-1 text-charcoal">public/images/portfolio</code> a nasmeruj na ne
          <code class="rounded bg-stone-200 px-2 py-1 text-charcoal">cover</code> alebo galeriu v obsahu.
        </p>
      </header>

      <div v-if="galleries?.length" class="grid gap-8 md:grid-cols-2">
        <article
        v-for="gallery in galleries"
        :key="gallery.path"
        class="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
      >
        <NuxtLink :to="gallery.path" class="flex h-full flex-col">
            <div
              v-if="gallery.cover"
              class="aspect-[4/3] w-full bg-slate-200"
              :style="{ backgroundImage: `linear-gradient(120deg, rgba(31, 29, 23, 0.72), rgba(83, 89, 67, 0.35)), url('${gallery.cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
            />
            <div v-else class="aspect-[4/3] w-full bg-gradient-to-br from-stone-200 to-stone-300" />
            <div class="flex flex-1 flex-col gap-2 px-6 py-5">
              <div class="flex items-center gap-2 text-sm text-stone-600">
                <span v-if="gallery.location">{{ gallery.location }}</span>
                <span v-if="gallery.location && gallery.date" aria-hidden="true">/</span>
                <span v-if="gallery.date">{{ formatDate(gallery.date) }}</span>
              </div>
              <h2 class="text-xl font-semibold text-charcoal">{{ gallery.title }}</h2>
              <p class="text-stone-700" v-if="gallery.summary">{{ gallery.summary }}</p>
              <div class="mt-auto flex flex-wrap gap-2 pt-3 text-xs text-stone-700">
                <span v-for="tag in gallery.tags" :key="tag" class="rounded-full bg-stone-100 px-3 py-1">
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <p v-else class="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-10 text-stone-700 shadow-card">
        Zatial tu nic nie je. Vytvor markdown subor v <code class="rounded bg-stone-200 px-2 py-1 text-charcoal">content/portfolio</code>
        a tato stranka ho automaticky prida do zoznamu.
      </p>
    </main>
  </div>
</template>
