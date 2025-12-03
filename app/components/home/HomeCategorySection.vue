<script setup lang="ts">
import type { HomeCategory } from '@/i18n/types'

defineProps<{
  category: HomeCategory
  reversed?: boolean
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20" :class="{ 'lg:flex-row-reverse': reversed }">
        <!-- Image -->
        <div class="w-full lg:w-1/2">
          <div class="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
            <NuxtImg
              :src="category.imageSrc"
              :alt="category.imageAlt"
              class="h-full w-full object-cover transition duration-500 hover:scale-105"
              width="600"
              height="750"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Content -->
        <div class="w-full lg:w-1/2">
          <div class="max-w-lg space-y-6">
            <h2 class="text-3xl font-serif text-charcoal sm:text-4xl">{{ category.title }}</h2>
            <p class="text-lg leading-relaxed text-charcoal/80">
              {{ category.description }}
            </p>
            <div>
              <NuxtLink
                :to="category.ctaHref"
                class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-charcoal transition hover:text-charcoal/70"
              >
                {{ category.ctaLabel }}
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
