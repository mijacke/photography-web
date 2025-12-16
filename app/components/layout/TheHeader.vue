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

// Check if device is tablet (768px - 1024px) - uses click instead of hover
const isTablet = ref(false)

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

// Check if link is active
const isLinkActive = (href: string) => {
  if (href === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(href)
}

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  
  const checkTablet = () => {
    isTablet.value = window.innerWidth >= 768 && window.innerWidth <= 1024
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', checkTablet)
  handleScroll()
  checkTablet()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', checkTablet)
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

const activeLinkClasses = computed(() => {
  if (props.transparent && !isScrolled.value && !isMobileMenuOpen.value) {
    return 'text-cream-200 font-semibold'
  }
  return 'text-warm-500 font-semibold'
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

const toggleDropdown = () => {
  isPortfolioDropdownOpen.value = !isPortfolioDropdownOpen.value
}

// For tablets: use click, for desktop: use hover
const handleDropdownMouseEnter = () => {
  if (!isTablet.value) {
    isPortfolioDropdownOpen.value = true
  }
}

const handleDropdownMouseLeave = () => {
  if (!isTablet.value) {
    isPortfolioDropdownOpen.value = false
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.portfolio-dropdown')) {
    isPortfolioDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
  <header :class="headerClasses">
    <div class="container-wide">
      <nav class="flex items-center justify-between h-20 md:h-24" role="navigation" aria-label="Hlavná navigácia">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0" aria-label="Domovská stránka">
          <NuxtImg
            src="/images/brand_logo/logo.png"
            alt="Logo"
            width="270"
            height="90"
            :class="['h-20 md:h-24 w-auto mt-1 transition-all duration-300', logoClasses]"
            loading="eager"
          />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8" role="menubar">
          <template v-for="link in navLinks" :key="link.href">
            <!-- Portfolio with dropdown -->
            <div 
              v-if="link.hasDropdown" 
              class="relative portfolio-dropdown"
              @mouseenter="handleDropdownMouseEnter"
              @mouseleave="handleDropdownMouseLeave"
            >
              <button
                :class="[
                  'flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300',
                  isPortfolioDropdownOpen ? 'text-warm-500' : (isLinkActive(link.href) ? activeLinkClasses : linkClasses)
                ]"
                :aria-expanded="isPortfolioDropdownOpen"
                aria-haspopup="true"
                aria-controls="portfolio-menu"
                @click="toggleDropdown"
              >
                {{ link.label }}
                <!-- Chevron icon -->
                <img 
                  :src="isPortfolioDropdownOpen || isLinkActive(link.href) ? '/svg/icons/chevron-down-warm.svg' : '/svg/icons/chevron-down.svg'" 
                  alt="" 
                  aria-hidden="true"
                  :class="['h-4 w-4 transition-transform duration-200', isPortfolioDropdownOpen ? 'rotate-180' : '']"
                />
              </button>
              
              <!-- Dropdown Menu -->
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
                    id="portfolio-menu"
                    class="bg-white shadow-lg"
                    role="menu"
                    aria-label="Portfólio kategórie"
                  >
                    <NuxtLink
                      v-for="category in portfolioCategories"
                      :key="category.href"
                      :to="category.href"
                      role="menuitem"
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
              role="menuitem"
              :class="[
                'text-sm font-medium tracking-wider uppercase transition-colors duration-300',
                isLinkActive(link.href) ? activeLinkClasses : linkClasses
              ]"
              :aria-current="isLinkActive(link.href) ? 'page' : undefined"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button - SVG Hamburger -->
        <label 
          class="hamburger md:hidden" 
          :class="burgerClasses"
          role="button"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Otvoriť menu"
        >
          <input 
            type="checkbox" 
            :checked="isMobileMenuOpen"
            @change="isMobileMenuOpen = !isMobileMenuOpen"
          >
          <svg viewBox="0 0 32 32" aria-hidden="true">
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
        id="mobile-menu"
        class="md:hidden bg-cream-200 border-t border-cream-300"
        role="menu"
        aria-label="Mobilné menu"
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
                  role="menuitem"
                  :class="[
                    'text-sm font-medium tracking-wider uppercase py-1 block transition-colors',
                    route.path === category.href 
                      ? 'text-warm-500 font-semibold' 
                      : 'text-charcoal-600 hover:text-warm-500'
                  ]"
                  :aria-current="route.path === category.href ? 'page' : undefined"
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
              role="menuitem"
              :class="[
                'text-lg font-medium tracking-wide py-2 transition-colors',
                isLinkActive(link.href) 
                  ? 'text-warm-500 font-semibold' 
                  : 'text-charcoal-700 hover:text-warm-500'
              ]"
              :aria-current="isLinkActive(link.href) ? 'page' : undefined"
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

