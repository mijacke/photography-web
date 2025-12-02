<script setup lang="ts">
import { computed } from 'vue'
import { useAppCopy } from '@/composables/useAppCopy'

const { copy } = useAppCopy()

const footerCopy = computed(() => copy.value.footer)
const sections = computed(() => footerCopy.value.sections)
const socialLinks = computed(() => footerCopy.value.social)
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="border-t border-stone-200/70 bg-charcoal text-sand">
    <div class="layout-shell space-y-10 py-12">
      <div class="grid gap-10 sm:grid-cols-[1.1fr,0.9fr] lg:grid-cols-[1.2fr,0.8fr]">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.3em] text-sand/70">{{ footerCopy.brand }}</p>
          <p class="max-w-xl text-sm leading-relaxed text-sand/85">
            {{ footerCopy.tagline }}
          </p>
          <div class="flex flex-wrap gap-3 text-sm text-sand/80">
            <a
              v-if="footerCopy.email"
              :href="`mailto:${footerCopy.email}`"
              class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-white/30 hover:text-white"
            >
              {{ footerCopy.email }}
              <span aria-hidden="true">↗</span>
            </a>
            <span v-if="footerCopy.location" class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              {{ footerCopy.location }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 text-sm font-medium sm:grid-cols-3">
          <nav :aria-label="sections.explore.title" class="space-y-3">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">{{ sections.explore.title }}</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in sections.explore.links" :key="link.href">
                <NuxtLink
                  v-if="link.href.startsWith('/')"
                  :to="link.href"
                  class="text-sand/90 transition hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.href"
                  class="text-sand/90 transition hover:text-white"
                  :target="link.href.startsWith('http') ? '_blank' : undefined"
                  :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </nav>

          <nav :aria-label="sections.services.title" class="space-y-3" v-if="sections.services?.links?.length">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">{{ sections.services.title }}</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in sections.services.links" :key="link.href">
                <NuxtLink
                  v-if="link.href.startsWith('/') || link.href.startsWith('#') || link.href.startsWith('/#')"
                  :to="link.href"
                  class="text-sand/90 transition hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.href"
                  class="text-sand/90 transition hover:text-white"
                  :target="link.href.startsWith('http') ? '_blank' : undefined"
                  :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </nav>

          <nav :aria-label="sections.connect.title" class="space-y-3">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">{{ sections.connect.title }}</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in sections.connect.links" :key="link.href">
                <NuxtLink
                  v-if="link.href.startsWith('/') || link.href.startsWith('#') || link.href.startsWith('/#')"
                  :to="link.href"
                  class="text-sand/90 transition hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.href"
                  class="text-sand/90 transition hover:text-white"
                  :target="link.href.startsWith('http') ? '_blank' : undefined"
                  :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
                >
                  {{ link.label }}
                </a>
              </div>
              <a
                v-for="link in socialLinks"
                :key="link.href"
                :href="link.href"
                class="text-sand/90 transition hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {{ link.label }}
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-sand/60">
        <span>© {{ year }} {{ footerCopy.brand }}</span>
        <span>{{ footerCopy.bottomTagline }}</span>
      </div>
    </div>
  </footer>
</template>
