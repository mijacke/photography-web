<script setup lang="ts">
import { computed } from 'vue'
import {
  footerPrimaryLinks,
  footerServiceLinks,
  footerSecondaryLinks,
  footerSocialLinks,
  footerEmail,
  footerLocation,
  footerTagline
} from '@/utils/footerContent'

const primaryLinks = footerPrimaryLinks
const serviceLinks = footerServiceLinks
const secondaryLinks = footerSecondaryLinks
const socialLinks = footerSocialLinks
const email = footerEmail
const location = footerLocation
const tagline = footerTagline

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="border-t border-stone-200/70 bg-charcoal text-sand">
    <div class="layout-shell space-y-10 py-12">
      <div class="grid gap-10 sm:grid-cols-[1.1fr,0.9fr] lg:grid-cols-[1.2fr,0.8fr]">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.3em] text-sand/70">Mario Lassu</p>
          <p class="max-w-xl text-sm leading-relaxed text-sand/85">
            {{ tagline }}
          </p>
          <div class="flex flex-wrap gap-3 text-sm text-sand/80">
            <a
              v-if="email"
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-white/30 hover:text-white"
            >
              {{ email }}
              <span aria-hidden="true">↗</span>
            </a>
            <span v-if="location" class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              {{ location }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 text-sm font-medium sm:grid-cols-3">
          <nav aria-label="Primary" class="space-y-3">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">Explore</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in primaryLinks" :key="link.href">
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

          <nav aria-label="Services" class="space-y-3" v-if="serviceLinks?.length">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">Services</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in serviceLinks" :key="link.href">
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

          <nav aria-label="Connect" class="space-y-3">
            <p class="text-xs uppercase tracking-[0.24em] text-sand/60">Connect</p>
            <div class="flex flex-col gap-2">
              <div v-for="link in secondaryLinks" :key="link.href">
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
        <span>© {{ year }} Mario Lassu</span>
        <span>Documentary Photography</span>
      </div>
    </div>
  </footer>
</template>
