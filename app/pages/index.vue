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

const { data: galleries } = await useAsyncData('home-galleries', () =>
  queryCollection<Gallery>('portfolio')
    .select('_path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
    .order('date', 'DESC')
    .limit(4)
    .all()
)

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat('sk-SK', { dateStyle: 'medium' }).format(new Date(value)) : ''

const coverStyle = (cover?: string) => ({
  backgroundImage: cover
    ? `linear-gradient(120deg, rgba(15, 23, 42, 0.85), rgba(8, 47, 73, 0.35)), url('${cover}')`
    : 'linear-gradient(120deg, #0f172a, #0b1732)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
})
</script>

<template>
  <main class="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10">
    <section class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
      <div class="space-y-6">
        <p class="text-sm uppercase tracking-[0.3em] text-sky-300">Photography</p>
        <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Simple, fast portfolio built with Nuxt, markdown content, and Tailwind.
        </h1>
        <p class="max-w-2xl text-lg text-slate-300">
          Filesystem as the database: photos live in <code class="rounded bg-slate-900 px-2 py-1 text-slate-200">/public/images</code>,
          metadata in <code class="rounded bg-slate-900 px-2 py-1 text-slate-200">/content</code>. Deploy as static pages for speed and SEO.
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/portfolio"
            class="rounded-full bg-sky-500 px-5 py-3 text-base font-medium text-slate-950 shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-400"
          >
            Pozriet portfolio
          </NuxtLink>
          <NuxtLink
            to="mailto:hi@mariolassu.com"
            class="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base font-medium text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-400/60 hover:text-sky-100"
          >
            Napis mi
          </NuxtLink>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-3xl bg-slate-900/60 ring-1 ring-white/10">
        <div class="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-fuchsia-500/25 blur-3xl" />
        <div class="relative grid gap-4 p-8">
          <p class="text-sm font-semibold uppercase tracking-wide text-slate-300">Stack pre fotoweb</p>
          <ul class="space-y-3 text-slate-200">
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              <span>Nuxt 3 (Vue 3 + Vite) s automatickym routovanim a SSR/SSG pre SEO.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              <span>@nuxt/content pre markdown frontmatter ako mini databaza.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              <span>Tailwind CSS pre gridy, overlaye a rychle prototypovanie UI.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              <span>Staticky export (npm run generate) a jednoduchy deploy zadarmo.</span>
            </li>
          </ul>
          <div class="rounded-2xl bg-slate-900/60 p-4 text-sm text-slate-200 ring-1 ring-white/10">
            Pridaj dalsi markdown do <code class="rounded bg-slate-800 px-2 py-1 text-slate-100">content/portfolio</code>,
            pushni do gitu a hostuj staticky build.
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold text-white">Posledne galerie</h2>
          <p class="text-slate-400">Nacitane z markdown suborov v /content/portfolio</p>
        </div>
        <NuxtLink
          to="/portfolio"
          class="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-400/60 hover:text-sky-100"
        >
          Vsetky galerie
        </NuxtLink>
      </div>

      <div v-if="galleries?.length" class="grid gap-6 md:grid-cols-2">
        <article
          v-for="gallery in galleries"
          :key="gallery._path"
          class="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-sky-400/50"
        >
          <NuxtLink :to="gallery._path" class="flex h-full flex-col">
            <div class="aspect-video w-full" :style="coverStyle(gallery.cover)" />
            <div class="flex flex-1 flex-col gap-2 px-6 py-5">
              <div class="flex items-center gap-2 text-sm text-slate-400">
                <span v-if="gallery.location">{{ gallery.location }}</span>
                <span v-if="gallery.location && gallery.date" aria-hidden="true">•</span>
                <span v-if="gallery.date">{{ formatDate(gallery.date) }}</span>
              </div>
              <h3 class="text-xl font-semibold text-white">{{ gallery.title }}</h3>
              <p class="text-slate-300" v-if="gallery.summary">{{ gallery.summary }}</p>
              <div class="flex flex-wrap gap-2 pt-2 text-xs text-slate-300">
                <span v-for="tag in gallery.tags" :key="tag" class="rounded-full bg-white/5 px-3 py-1">
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
      <p v-else class="rounded-xl border border-dashed border-white/20 bg-slate-900/50 px-6 py-10 text-slate-300">
        Pridaj aspon jeden markdown subor do <code class="rounded bg-slate-800 px-2 py-1 text-slate-100">content/portfolio</code>
        a zobrazim ho tu ako kartu.
      </p>
    </section>
  </main>
</template>
