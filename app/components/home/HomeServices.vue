<script setup lang="ts">
import { computed } from 'vue'

type Service = {
  title: string
  bullets: string[]
  stat?: string
}

const props = defineProps<{
  services: Service[]
  imageSrc?: string
  eyebrow: string
  title: string
  description: string
  imageAlt?: string
}>()

const fallbackImage = '/images/home/homehero.jpg'
const serviceImage = computed(() => props.imageSrc || fallbackImage)
const serviceImageAlt = computed(() => props.imageAlt || 'Documentary highlight')
</script>

<template>
  <section id="services" class="grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
    <div class="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-card">
      <NuxtImg :src="serviceImage" :alt="serviceImageAlt" class="h-full w-full object-cover" width="1200" height="800" />
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <p class="text-sm uppercase tracking-[0.28em] text-stone-500">{{ eyebrow }}</p>
        <h2 class="text-2xl font-semibold text-charcoal sm:text-3xl">
          {{ title }}
        </h2>
        <p class="text-base text-stone-700">
          {{ description }}
        </p>
      </div>

      <div class="divide-y divide-stone-200">
        <div
          v-for="service in services"
          :key="service.title"
          class="grid grid-cols-[1fr,auto] gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0"
        >
          <div class="space-y-1.5">
            <h3 class="text-lg font-semibold text-charcoal">{{ service.title }}</h3>
            <p
              v-for="bullet in service.bullets"
              :key="bullet"
              class="text-sm leading-relaxed text-stone-700"
            >
              {{ bullet }}
            </p>
          </div>
          <p v-if="service.stat" class="text-sm font-semibold text-olive self-start">
            {{ service.stat }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
