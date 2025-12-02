<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  theme?: 'light' | 'dark'
  ariaLabel?: string
}>(), {
  theme: 'light',
  ariaLabel: 'Toggle menu'
})

const emit = defineEmits<{
  toggle: []
}>()

const isDark = computed(() => props.theme === 'dark')
const strokeClass = computed(() => (isDark.value ? 'stroke-white' : 'stroke-charcoal'))

const svgClasses = computed(() => [
  'h-10 w-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
  props.open ? '-rotate-45' : 'rotate-0'
])

const lineBaseClasses = computed(() => [
  'fill-none stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]',
  'transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
  strokeClass.value
])

const lineTopBottomClasses = computed(() => [
  ...lineBaseClasses.value,
  props.open ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42]' : '[stroke-dasharray:12_63] [stroke-dashoffset:0]'
])

const lineCenterClasses = computed(() => lineBaseClasses.value)
</script>

<template>
  <label class="inline-flex cursor-pointer items-center justify-center">
    <input
      type="checkbox"
      class="sr-only"
      :checked="open"
      :aria-label="ariaLabel"
      @change="emit('toggle')"
    />
    <svg viewBox="0 0 32 32" :class="svgClasses">
      <path class="line line-top-bottom" :class="lineTopBottomClasses" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
      <path class="line" :class="lineCenterClasses" d="M7 16 27 16" />
    </svg>
  </label>
</template>
