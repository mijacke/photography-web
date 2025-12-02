<script setup lang="ts">
type Gallery = {
  _path?: string
  title?: string
  summary?: string
  cover?: string
  location?: string
  date?: string
  tags?: string[]
}

const { data: galleries } = await useAsyncData('portfolio-list', () =>
  queryCollection<Gallery>('portfolio')
    .select('_path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
    .order('date', 'DESC')
    .all()
)

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('sk-SK', { dateStyle: 'medium' }).format(new Date(value)) : ''
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-16 lg:px-10">
    <header class="mb-10 space-y-3">
      <p class="text-sm uppercase tracking-[0.3em] text-sky-300">Portfolio</p>
      <h1 class="text-3xl font-semibold text-white sm:text-4xl">Galeria z markdownu</h1>
      <p class="max-w-2xl text-slate-300">
        Kazdy subor v <code class="rounded bg-slate-900 px-2 py-1 text-slate-200">content/portfolio</code> sa zobrazi ako samostatna
        route. Pridaj fotky do <code class="rounded bg-slate-900 px-2 py-1 text-slate-200">public/images/portfolio</code> a nasmeruj na ne
        <code class="rounded bg-slate-900 px-2 py-1 text-slate-200">cover</code> alebo galeriu v obsahu.
      </p>
    </header>

    <div v-if="galleries?.length" class="grid gap-8 md:grid-cols-2">
      <article
        v-for="gallery in galleries"
        :key="gallery._path"
        class="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-sky-400/50"
      >
        <NuxtLink :to="gallery._path" class="flex h-full flex-col">
          <div
            v-if="gallery.cover"
            class="aspect-[4/3] w-full bg-slate-900"
            :style="{ backgroundImage: `linear-gradient(120deg, rgba(15, 23, 42, 0.82), rgba(8, 47, 73, 0.35)), url('${gallery.cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          />
          <div v-else class="aspect-[4/3] w-full bg-gradient-to-br from-slate-800 to-slate-900" />
          <div class="flex flex-1 flex-col gap-2 px-6 py-5">
            <div class="flex items-center gap-2 text-sm text-slate-400">
              <span v-if="gallery.location">{{ gallery.location }}</span>
              <span v-if="gallery.location && gallery.date" aria-hidden="true">•</span>
              <span v-if="gallery.date">{{ formatDate(gallery.date) }}</span>
            </div>
            <h2 class="text-xl font-semibold text-white">{{ gallery.title }}</h2>
            <p class="text-slate-300" v-if="gallery.summary">{{ gallery.summary }}</p>
            <div class="mt-auto flex flex-wrap gap-2 pt-3 text-xs text-slate-300">
              <span v-for="tag in gallery.tags" :key="tag" class="rounded-full bg-white/5 px-3 py-1">
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <p v-else class="rounded-xl border border-dashed border-white/20 bg-slate-900/50 px-6 py-10 text-slate-300">
      Zatial tu nic nie je. Vytvor markdown subor v <code class="rounded bg-slate-800 px-2 py-1 text-slate-100">content/portfolio</code>
      a tato stranka ho automaticky prida do zoznamu.
    </p>
  </main>
</template>
