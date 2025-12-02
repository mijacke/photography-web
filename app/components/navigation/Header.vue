<script setup lang="ts">
import { computed } from 'vue'
import type { NavLink } from '@/types/navigation'

const props = defineProps<{
  links: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  theme?: 'light' | 'dark'
}>()

const isDark = computed(() => props.theme === 'dark')
const isInternalLink = (href: string) => href.startsWith('/') || href.startsWith('#') || href.startsWith('/#')
</script>

<template>
  <header
    class="sticky top-0 z-40 backdrop-blur"
    :class="isDark ? 'border-b border-transparent bg-transparent text-white' : 'border-b border-stone-200/80 bg-sand/90 text-charcoal'"
  >
    <div class="layout-shell flex items-center justify-between gap-4 py-4">
      <NuxtLink
        to="/"
        class="text-xs font-semibold tracking-[0.28em] transition"
        :class="isDark ? 'text-white/80 hover:text-white' : 'text-charcoal/80 hover:text-charcoal'"
      >
        ML PHOTO
      </NuxtLink>

      <nav class="flex flex-1 flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <template v-for="link in links" :key="link.href">
          <NuxtLink
            v-if="isInternalLink(link.href)"
            :to="link.href"
            class="rounded-md px-2 py-1 transition"
            :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="rounded-md px-2 py-1 transition"
            :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <div class="hidden sm:block">
        <NuxtLink
          v-if="ctaLabel && ctaHref && isInternalLink(ctaHref)"
          :to="ctaHref"
          class="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          :class="isDark ? 'border-white/40 bg-white/10 text-white hover:bg-white/15' : 'border-stone-300 bg-white text-charcoal'"
        >
          {{ ctaLabel }}
        </NuxtLink>
        <a
          v-else-if="ctaLabel && ctaHref"
          :href="ctaHref"
          class="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          :class="isDark ? 'border-white/40 bg-white/10 text-white hover:bg-white/15' : 'border-stone-300 bg-white text-charcoal'"
          :target="ctaHref.startsWith('http') ? '_blank' : undefined"
          :rel="ctaHref.startsWith('http') ? 'noreferrer' : undefined"
        >
          {{ ctaLabel }}
        </a>
        <div v-else class="h-9 w-24" aria-hidden="true" />
      </div>
    </div>
  </header>
</template>
