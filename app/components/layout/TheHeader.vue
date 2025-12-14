<script setup lang="ts">
interface Props {
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  transparent: false
})

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isPortfolioDropdownOpen = ref(false)

// Check if current route is a portfolio page
const isOnPortfolioPage = computed(() => {
  return route.path.startsWith('/portfolio')
})

const portfolioCategories = [
  { label: 'Rodina', href: '/portfolio/rodina' },
  { label: 'Svadby', href: '/portfolio/svadby' },
  { label: 'Novorodenci', href: '/portfolio/novorodenci' },
  { label: 'Tehotenstvo', href: '/portfolio/tehotenstvo' },
]

const navLinks = [
  { label: 'Domov', href: '/' },
  { label: 'Portfólio', href: '/portfolio', hasDropdown: true },
  { label: 'Služby', href: '/services' },
  { label: 'O mne', href: '/about' },
  { label: 'Kontakt', href: '/contact' },
]

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

const headerClasses = computed(() => {
  const base = 'fixed top-0 left-0 right-0 z-50 transition-all duration-400'
  
  if (props.transparent && !isScrolled.value && !isMobileMenuOpen.value) {
    return `${base} bg-transparent`
  }
  
  return `${base} bg-cream-200 shadow-sm`
})

const linkClasses = computed(() => {
  if (props.transparent && !isScrolled.value && !isMobileMenuOpen.value) {
    return 'text-white hover:text-cream-200'
  }
  return 'text-charcoal-700 hover:text-warm-500'
})

const logoClasses = computed(() => {
  if (props.transparent && !isScrolled.value && !isMobileMenuOpen.value) {
    return 'brightness-0 invert'
  }
  return ''
})

const burgerClasses = computed(() => {
  if (props.transparent && !isScrolled.value && !isMobileMenuOpen.value) {
    return 'text-white'
  }
  return 'text-charcoal-700'
})

const closeDropdown = () => {
  isPortfolioDropdownOpen.value = false
}
</script>

<template>
  <header :class="headerClasses">
    <div class="container-wide">
      <nav class="flex items-center justify-between h-20 md:h-24">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0">
          <NuxtImg
            src="/images/brand_logo/logo2.png"
            alt="Photography Logo"
            width="160"
            height="60"
            :class="['h-10 md:h-12 w-auto transition-all duration-300', logoClasses]"
            loading="eager"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <template v-for="link in navLinks" :key="link.href">
            <!-- Portfolio with dropdown -->
            <div 
              v-if="link.hasDropdown" 
              class="relative group"
              @mouseenter="isPortfolioDropdownOpen = true"
              @mouseleave="isPortfolioDropdownOpen = false"
            >
              <button
                :class="[
                  'flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300',
                  isPortfolioDropdownOpen ? 'text-warm-500' : linkClasses
                ]"
              >
                {{ link.label }}
                <!-- Black chevron, warm on hover -->
                <img 
                  :src="isPortfolioDropdownOpen ? '/svg/icons/chevron-down-warm.svg' : '/svg/icons/chevron-down.svg'" 
                  alt="" 
                  class="h-4 w-4"
                />
              </button>
              
              <!-- Dropdown Menu - invisible bridge to prevent gap -->
              <div class="absolute top-full left-0 w-48 pt-2">
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-150 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <div 
                    v-if="isPortfolioDropdownOpen"
                    class="bg-white shadow-lg"
                  >
                    <NuxtLink
                      v-for="category in portfolioCategories"
                      :key="category.href"
                      :to="category.href"
                      :class="[
                        'block px-4 py-3 text-sm font-medium tracking-wider uppercase transition-colors',
                        route.path === category.href 
                          ? 'text-warm-500 bg-cream-100' 
                          : 'text-charcoal-700 hover:text-warm-500 hover:bg-cream-100'
                      ]"
                      @click="closeDropdown"
                    >
                      {{ category.label }}
                    </NuxtLink>
                  </div>
                </Transition>
              </div>
            </div>
            <!-- Regular links -->
            <NuxtLink
              v-else
              :to="link.href"
              class="text-sm font-medium tracking-wider uppercase transition-colors duration-300"
              :class="linkClasses"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button - SVG Hamburger -->
        <label class="hamburger md:hidden" :class="burgerClasses">
          <input 
            type="checkbox" 
            :checked="isMobileMenuOpen"
            @change="isMobileMenuOpen = !isMobileMenuOpen"
          >
          <svg viewBox="0 0 32 32">
            <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </nav>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-cream-200 border-t border-cream-300"
      >
        <div class="container-wide py-6 flex flex-col gap-4">
          <template v-for="link in navLinks" :key="link.href">
            <!-- Portfolio with sub-items -->
            <div v-if="link.hasDropdown">
              <span class="text-charcoal-700 text-lg font-medium tracking-wide py-2 block">
                {{ link.label }}
              </span>
              <div class="pl-4 mt-2 space-y-2 border-l-2 border-warm-400">
                <NuxtLink
                  v-for="category in portfolioCategories"
                  :key="category.href"
                  :to="category.href"
                  class="text-charcoal-600 hover:text-warm-500 text-sm font-medium tracking-wider uppercase py-1 block"
                  @click="isMobileMenuOpen = false"
                >
                  {{ category.label }}
                </NuxtLink>
              </div>
            </div>
            
            <!-- Regular links -->
            <NuxtLink
              v-else
              :to="link.href"
              class="text-charcoal-700 hover:text-warm-500 text-lg font-medium tracking-wide py-2"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </div>
      </div>
    </Transition>
  </header>
</template>
