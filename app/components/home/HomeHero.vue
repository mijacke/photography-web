<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  eyebrow: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc?: string
  imageAlt?: string
}>()

const fallbackImage = '/images/home/homehero.jpg'
const photoSource = computed(() => props.imageSrc || fallbackImage)
const photoAlt = computed(() => props.imageAlt || 'Featured portrait')
</script>

<template>
  <section id="about" class="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
    <div class="space-y-8">
      <p class="text-sm uppercase tracking-[0.32em] text-stone-500">{{ eyebrow }}</p>
      <div class="space-y-4">
        <h1 class="text-4xl font-semibold text-charcoal sm:text-5xl">{{ title }}</h1>
        <p class="text-lg leading-8 text-stone-700">
          {{ description }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <a
          :href="ctaHref"
          class="rounded-md bg-olive px-6 py-3 text-base font-semibold text-sand shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </div>

    <div class="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-card">
      <NuxtImg :src="photoSource" :alt="photoAlt" class="h-full w-full object-cover" width="1200" height="800" />
    </div>
  </section>
</template>
