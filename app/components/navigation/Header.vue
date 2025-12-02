<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import type { NavLink } from '@/types/navigation'

const props = defineProps<{
  links: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  theme?: 'light' | 'dark'
  brandLabel?: string
  brandLogoSrc?: string
  brandLogoAlt?: string
}>()

const isDark = computed(() => props.theme === 'dark')
const isInternalLink = (href: string) => href.startsWith('/') || href.startsWith('#') || href.startsWith('/#')
const brandLabel = computed(() => props.brandLabel || 'ML PHOTO')
const brandLogoSrc = computed(() => props.brandLogoSrc || '/images/brand_logo/logo.png')
const brandLogoAlt = computed(() => props.brandLogoAlt || 'Mario Lassu logo')

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

watch(
  mobileMenuOpen,
  (open) => {
    if (!import.meta.client) return
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-40 backdrop-blur"
    :class="isDark ? 'border-b border-transparent bg-transparent text-white' : 'border-b border-stone-200/80 bg-sand/90 text-charcoal'"
  >
    <div class="layout-shell grid grid-cols-[1fr,auto,1fr] items-center gap-4 py-3 lg:grid-cols-[auto,1fr,auto]">
      <NuxtLink
        to="/"
        class="col-start-2 inline-flex items-center justify-self-center gap-3 rounded-md px-1 transition lg:col-start-1 lg:justify-self-start"
        :class="isDark ? 'text-white/80 hover:text-white' : 'text-charcoal/80 hover:text-charcoal'"
      >
        <NuxtImg
          v-if="brandLogoSrc"
          :src="brandLogoSrc"
          :alt="brandLogoAlt"
          class="h-18 w-auto object-contain md:h-20"
          width="180"
          height="72"
          loading="eager"
        />
        <span v-else class="text-xs font-semibold tracking-[0.28em]">
          {{ brandLabel }}
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center justify-center gap-10 text-base font-medium lg:flex lg:col-start-2">
        <template v-for="link in links" :key="link.href">
          <NuxtLink
            v-if="isInternalLink(link.href)"
            :to="link.href"
            class="rounded-md px-3 py-1.5 transition whitespace-nowrap"
            :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="rounded-md px-3 py-1.5 transition whitespace-nowrap"
            :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <!-- Desktop CTA -->
      <div class="hidden justify-end lg:flex lg:col-start-3">
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

      <!-- Mobile Hamburger Button -->
      <button
        @click="toggleMobileMenu"
        class="col-start-3 flex flex-col gap-1.5 justify-self-end rounded-md p-2 transition lg:hidden"
        :class="isDark ? 'hover:bg-white/10' : 'hover:bg-stone-200/80'"
        aria-label="Toggle menu"
      >
        <span class="h-0.5 w-6 rounded-full transition-all" :class="[isDark ? 'bg-white' : 'bg-charcoal', mobileMenuOpen ? 'translate-y-2 rotate-45' : '']" />
        <span class="h-0.5 w-6 rounded-full transition-all" :class="[isDark ? 'bg-white' : 'bg-charcoal', mobileMenuOpen ? 'opacity-0' : '']" />
        <span class="h-0.5 w-6 rounded-full transition-all" :class="[isDark ? 'bg-white' : 'bg-charcoal', mobileMenuOpen ? '-translate-y-2 -rotate-45' : '']" />
      </button>
    </div>
  </header>

  <!-- Mobile Menu (outside header for proper fixed positioning) -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-5 px-8 text-center lg:hidden"
        :class="isDark ? 'bg-charcoal text-white' : 'bg-sand text-charcoal'"
        @click.self="closeMobileMenu"
      >
        <!-- Close Button -->
        <button
          @click="closeMobileMenu"
          class="absolute right-4 top-4 flex flex-col gap-1.5 rounded-md p-2 transition"
          :class="isDark ? 'hover:bg-white/10' : 'hover:bg-stone-200/80'"
          aria-label="Close menu"
        >
          <span class="h-0.5 w-6 rotate-45 rounded-full transition-all" :class="isDark ? 'bg-white' : 'bg-charcoal'" />
          <span class="h-0.5 w-6 -rotate-45 -translate-y-2 rounded-full transition-all" :class="isDark ? 'bg-white' : 'bg-charcoal'" />
        </button>

        <nav class="flex w-full max-w-xl flex-col items-center gap-3 text-lg font-medium">
          <template v-for="link in links" :key="link.href">
            <NuxtLink
              v-if="isInternalLink(link.href)"
              :to="link.href"
              @click="closeMobileMenu"
              class="w-full rounded-lg px-4 py-3 transition"
              :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              @click="closeMobileMenu"
              class="w-full rounded-lg px-4 py-3 transition"
              :class="isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
            >
              {{ link.label }}
            </a>
          </template>
          
          <!-- Mobile CTA -->
          <NuxtLink
            v-if="ctaLabel && ctaHref && isInternalLink(ctaHref)"
            :to="ctaHref"
            @click="closeMobileMenu"
            class="mt-2 w-full rounded-full border px-4 py-3 text-center text-base font-semibold shadow-sm transition"
            :class="isDark ? 'border-white/40 bg-white/10 text-white hover:bg-white/15' : 'border-stone-300 bg-white text-charcoal hover:shadow'"
          >
            {{ ctaLabel }}
          </NuxtLink>
          <a
            v-else-if="ctaLabel && ctaHref"
            :href="ctaHref"
            @click="closeMobileMenu"
            class="mt-2 w-full rounded-full border px-4 py-3 text-center text-base font-semibold shadow-sm transition"
            :class="isDark ? 'border-white/40 bg-white/10 text-white hover:bg-white/15' : 'border-stone-300 bg-white text-charcoal hover:shadow'"
            :target="ctaHref.startsWith('http') ? '_blank' : undefined"
            :rel="ctaHref.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ ctaLabel }}
          </a>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>
