<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import type { Locale } from '@/i18n'
import type { NavLink } from '@/types/navigation'
import { isInternalLink, getLinkAttributes } from '@/utils/link'
import { useThemeClasses } from '@/composables/useThemeClasses'
import LanguageToggle from './LanguageToggle.vue'

interface Props {
  isOpen: boolean
  theme?: 'light' | 'dark'
  links: NavLink[]
  localeOptions: Locale[]
  currentLocale: Locale
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const emit = defineEmits<{
  close: []
  'update:locale': [locale: Locale]
}>()

const isClosing = ref(false)
const shouldRenderMenu = computed(() => props.isOpen || isClosing.value)
const showItems = ref(false)

const isDark = props.theme === 'dark'
const {
  mobileMenuBackgroundClasses,
  navLinkClasses
} = useThemeClasses(isDark, props.currentLocale)

type AnimatedItem =
  | { type: 'link'; link: NavLink; order: number }
  | { type: 'toggle'; order: number }

const animatedItems = computed<AnimatedItem[]>(() => {
  const items: AnimatedItem[] = props.links.map((link, index) => ({
    type: 'link',
    link,
    order: index
  }))

  items.push({ type: 'toggle', order: props.links.length })
  return items
})

const renderedItems = computed<AnimatedItem[]>(() => (props.isOpen ? animatedItems.value : []))

const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const totalLeaveDuration = computed(() => {
  const count = animatedItems.value.length || 1
  const maxDelay = (count - 1) * 130
  // Allow items to finish staggered leave, then start fading the overlay without a long pause
  return maxDelay + 300
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      isClosing.value = false
      showItems.value = false
      if (closeTimer.value) {
        clearTimeout(closeTimer.value)
        closeTimer.value = null
      }
      // Trigger animation on next tick
      nextTick(() => {
        requestAnimationFrame(() => {
          showItems.value = true
        })
      })
      return
    }
    showItems.value = false
    isClosing.value = true
    if (closeTimer.value) clearTimeout(closeTimer.value)
    closeTimer.value = setTimeout(() => {
      isClosing.value = false
      closeTimer.value = null
    }, totalLeaveDuration.value)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (closeTimer.value) clearTimeout(closeTimer.value)
})

const staggerStyle = (order: number) => ({
  '--delay-enter': `${order * 130}ms`,
  '--delay-leave': `${(animatedItems.value.length - order - 1) * 130}ms`
})

const closeMobileMenu = () => {
  emit('close')
}

const handleLocaleUpdate = (locale: Locale) => {
  emit('update:locale', locale)
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-320 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-220 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="shouldRenderMenu"
          class="fixed left-0 top-0 z-30 flex h-screen w-full flex-col pt-24 lg:hidden"
          :class="mobileMenuBackgroundClasses()"
          @click.self="closeMobileMenu"
        >
          <div class="flex flex-1 items-center justify-center px-8 pb-10">
            <nav class="flex w-full max-w-xl flex-col items-center gap-6 text-2xl font-medium leading-snug text-center">
              <template v-for="item in animatedItems" :key="item.type === 'link' ? item.link.href : 'toggle'">
                <NuxtLink
                  v-if="item.type === 'link' && isInternalLink(item.link.href)"
                  :to="item.link.href"
                  @click="closeMobileMenu"
                  class="menu-item w-full rounded-lg px-4 py-4 transition"
                  :class="[navLinkClasses(), { 'menu-visible': showItems }]"
                  :style="staggerStyle(item.order)"
                >
                  {{ item.link.label }}
                </NuxtLink>
                <a
                  v-else-if="item.type === 'link'"
                  :href="item.link.href"
                  @click="closeMobileMenu"
                  class="menu-item w-full rounded-lg px-4 py-4 transition"
                  :class="[navLinkClasses(), { 'menu-visible': showItems }]"
                  :style="staggerStyle(item.order)"
                  v-bind="getLinkAttributes(item.link.href)"
                >
                  {{ item.link.label }}
                </a>
                <div
                  v-else-if="item.type === 'toggle'"
                  class="menu-item mt-2 flex w-full items-center justify-center text-lg"
                  :class="{ 'menu-visible': showItems }"
                  :style="staggerStyle(item.order)"
                >
                  <LanguageToggle
                    :theme="theme"
                    :locale-options="localeOptions"
                    :current-locale="currentLocale"
                    @update:locale="handleLocaleUpdate"
                  />
                </div>
              </template>
            </nav>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.menu-item {
  opacity: 0;
  transition: opacity 300ms ease;
}

.menu-item.menu-visible {
  opacity: 1;
  transition-delay: var(--delay-enter, 0ms);
}

.menu-item:not(.menu-visible) {
  transition-delay: var(--delay-leave, 0ms);
}

.menu-stagger-enter-active {
  transition-delay: var(--delay-enter, 0ms);
}

.menu-stagger-leave-active {
  transition-delay: var(--delay-leave, 0ms);
}

.menu-stagger-enter-from {
  opacity: 0;
}

.menu-stagger-enter-to {
  opacity: 1;
}

.menu-stagger-leave-from {
  opacity: 1;
}

.menu-stagger-leave-to {
  opacity: 0;
}
</style>
