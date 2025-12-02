<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/i18n'
import { useThemeClasses } from '@/composables/useThemeClasses'

const props = withDefaults(defineProps<{
  theme?: 'light' | 'dark'
  locale: Locale
  brandLabel?: string
  brandLogoSrc?: string
  brandLogoAlt?: string
}>(), {
  theme: 'light',
  brandLabel: 'ML PHOTO',
  brandLogoSrc: '/images/brand_logo/logo.png',
  brandLogoAlt: 'Mario Lassu logo'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDark = computed(() => props.theme === 'dark')
const { brandLinkClasses } = useThemeClasses(isDark.value, props.locale)
</script>

<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-3 rounded-md px-1 transition"
    :class="brandLinkClasses()"
    @click="(event) => emit('click', event)"
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
</template>
