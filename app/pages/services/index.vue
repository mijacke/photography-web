<script setup lang="ts">
import { computed } from 'vue'
import Footer from '~/components/footer/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { useAppCopy } from '@/composables/useAppCopy'

const { copy } = useAppCopy()

const navLinks = computed(() => copy.value.navigation.links)
const servicesCopy = computed(() => copy.value.services)
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header
      :links="navLinks"
      :brand-label="copy.navigation.brand"
      theme="light"
    />

    <main class="layout-shell space-y-12 py-14">
      <section class="grid gap-10 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-sand/70 p-8 shadow-card lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">{{ servicesCopy.hero.eyebrow }}</p>
          <h1 class="text-4xl font-semibold sm:text-5xl">{{ servicesCopy.hero.title }}</h1>
          <p class="text-lg leading-8 text-stone-700">
            {{ servicesCopy.hero.description }}
          </p>
          <div class="inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 shadow-sm">
            <span class="h-2 w-2 rounded-full bg-olive" />
            {{ servicesCopy.hero.badge }}
          </div>
        </div>
        <div class="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-charcoal">{{ servicesCopy.alwaysIncluded.title }}</h3>
          <ul class="mt-4 space-y-2 text-sm leading-relaxed text-stone-700">
            <li v-for="item in servicesCopy.alwaysIncluded.bullets" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-3">
        <article
          v-for="pkg in servicesCopy.packages"
          :key="pkg.name"
          class="flex h-full flex-col gap-4 rounded-3xl border border-stone-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="space-y-2 px-6 pt-6">
            <p class="text-xs uppercase tracking-[0.28em] text-stone-500">{{ pkg.badge }}</p>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-semibold text-charcoal">{{ pkg.name }}</h2>
              <span class="text-lg font-semibold text-olive">{{ pkg.price }}</span>
            </div>
            <p class="text-sm leading-relaxed text-stone-700">{{ pkg.summary }}</p>
          </div>
          <ul class="flex flex-1 flex-col gap-2 px-6 pb-6 text-sm leading-relaxed text-stone-700">
            <li v-for="item in pkg.includes" :key="item" class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-olive/80" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="px-6 pb-6">
            <a
              href="/contact"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-sand px-4 py-3 text-sm font-semibold text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              {{ servicesCopy.packageCtaLabel }} {{ pkg.name }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>

      <section class="grid gap-8 rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-card md:grid-cols-[1fr,1fr] lg:p-10">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">{{ servicesCopy.addOns.eyebrow }}</p>
          <h2 class="text-2xl font-semibold">{{ servicesCopy.addOns.title }}</h2>
          <p class="text-base text-stone-700">
            {{ servicesCopy.addOns.description }}
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in servicesCopy.addOns.items"
            :key="item"
            class="flex items-center justify-between rounded-2xl border border-stone-200 bg-sand/70 px-4 py-3 text-sm font-medium text-charcoal"
          >
            <span>{{ item }}</span>
            <span aria-hidden="true">+</span>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
