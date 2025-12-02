<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/i18n'

interface Props {
  theme?: 'light' | 'dark'
  localeOptions: Locale[]
  currentLocale: Locale
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const emit = defineEmits<{
  'update:locale': [locale: Locale]
}>()

const isDark = computed(() => props.theme === 'dark')

const getLanguageClasses = (code: Locale) => {
  const isActive = props.currentLocale === code
  const baseClasses = 'text-xs font-medium uppercase transition cursor-pointer'
  
  if (isActive) {
    return `${baseClasses} ${isDark.value ? 'text-white' : 'text-charcoal'} underline decoration-2 underline-offset-4`
  }
  
  return `${baseClasses} ${isDark.value ? 'text-white/60 hover:text-white/90' : 'text-charcoal/60 hover:text-charcoal/90'}`
}

const switchLocale = (locale: Locale) => {
  emit('update:locale', locale)
}
</script>

<template>
  <div class="flex items-center gap-2" aria-label="Switch language">
    <template v-for="(code, index) in localeOptions" :key="code">
      <span
        @click="switchLocale(code)"
        :class="getLanguageClasses(code)"
      >
        {{ code.toUpperCase() }}
      </span>
      <span 
        v-if="index < localeOptions.length - 1" 
        :class="isDark ? 'text-white/30' : 'text-charcoal/30'"
        class="text-xs"
      >
        |
      </span>
    </template>
  </div>
</template>
