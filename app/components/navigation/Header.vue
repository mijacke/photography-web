<script setup lang="ts">
import { computed } from 'vue'
import { useAppCopy } from '@/composables/useAppCopy'
import { useMobileMenu } from '@/composables/useMobileMenu'
import { useThemeClasses } from '@/composables/useThemeClasses'
import { isInternalLink, getLinkAttributes } from '@/utils/link'
import type { Locale } from '@/i18n'
import type { NavLink } from '@/types/navigation'
import LanguageToggle from './LanguageToggle.vue'
import MobileMenu from './MobileMenu.vue'
import BrandLink from './BrandLink.vue'
import HamburgerButton from './HamburgerButton.vue'

const props = defineProps<{
  links: NavLink[]
  theme?: 'light' | 'dark'
  brandLabel?: string
  brandLogoSrc?: string
  brandLogoAlt?: string
}>()

const { locale, setLocale } = useAppCopy()
const localeOptions: Locale[] = ['sk', 'en']
const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()

const isDark = computed(() => props.theme === 'dark')
const brandLabel = computed(() => props.brandLabel || 'ML PHOTO')
const brandLogoSrc = computed(() => props.brandLogoSrc || '/images/brand_logo/logo.png')
const brandLogoAlt = computed(() => props.brandLogoAlt || 'Mario Lassu logo')

const {
  headerClasses,
  navLinkClasses
} = useThemeClasses(isDark.value, locale.value)

const switchLocale = (nextLocale: Locale) => {
  if (locale.value !== nextLocale) {
    setLocale(nextLocale)
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-40 backdrop-blur"
    :class="headerClasses()"
  >
    <div class="layout-shell flex items-center justify-between gap-4 py-3">
      <!-- Logo (Left) -->
      <BrandLink
        :theme="theme"
        :locale="locale"
        :brand-label="brandLabel"
        :brand-logo-src="brandLogoSrc"
        :brand-logo-alt="brandLogoAlt"
      />

      <!-- Desktop Navigation + Language Toggle (Right) -->
      <div class="hidden items-center gap-6 lg:flex">
        <!-- Navigation Links -->
        <nav class="flex items-center gap-8 text-base font-medium">
          <template v-for="link in links" :key="link.href">
            <NuxtLink
              v-if="isInternalLink(link.href)"
              :to="link.href"
              class="rounded-md px-3 py-1.5 transition whitespace-nowrap"
              :class="navLinkClasses()"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="rounded-md px-3 py-1.5 transition whitespace-nowrap"
              :class="navLinkClasses()"
              v-bind="getLinkAttributes(link.href)"
            >
              {{ link.label }}
            </a>
          </template>
        </nav>

        <!-- Separator -->
        <div 
          class="h-6 w-px" 
          :class="isDark ? 'bg-white/20' : 'bg-charcoal/20'"
        />

        <!-- Language Toggle -->
        <LanguageToggle
          :theme="theme"
          :locale-options="localeOptions"
          :current-locale="locale"
          @update:locale="switchLocale"
        />
      </div>

      <!-- Mobile Controls (Right) -->
      <div class="flex items-center gap-3 lg:hidden">
        <HamburgerButton
          :open="mobileMenuOpen"
          :theme="theme"
          aria-label="Toggle menu"
          @toggle="toggleMobileMenu"
        />
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <MobileMenu
    :is-open="mobileMenuOpen"
    :theme="theme"
    :links="links"
    :locale-options="localeOptions"
    :current-locale="locale"
    @close="closeMobileMenu"
    @update:locale="switchLocale"
  />
</template>
