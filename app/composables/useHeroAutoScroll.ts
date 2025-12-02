import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useHeroAutoScroll() {
  const heroSection = ref<HTMLElement | null>(null)
  const headerAnchor = ref<HTMLElement | null>(null)
  const hasAutoScrolled = ref(false)
  const cleanupFns: Array<() => void> = []
  let lastScrollY = 0

  const removeScrollIntentListeners = () => {
    cleanupFns.forEach((fn) => fn())
    cleanupFns.length = 0
  }

  const handleScrollIntent = () => {
    if (!import.meta.client) return
    
    const heroEl = heroSection.value
    const targetEl = headerAnchor.value
    if (!heroEl || !targetEl) return

    const scrollY = window.scrollY || document.documentElement.scrollTop
    const heroHeight = heroEl.offsetHeight || 0
    const headerTop = targetEl.offsetTop
    const isScrollingDown = scrollY > lastScrollY
    const isScrollingUp = scrollY < lastScrollY
    
    lastScrollY = scrollY

    // Scrolling down: if anywhere in hero section, snap to header
    if (isScrollingDown && scrollY > 0 && scrollY < headerTop) {
      if (!hasAutoScrolled.value) {
        hasAutoScrolled.value = true
        window.scrollTo({ top: headerTop, behavior: 'smooth' })
        setTimeout(() => { hasAutoScrolled.value = false }, 800)
      }
      return
    }

    // Scrolling up: if just below hero (near header), snap to top
    if (isScrollingUp && scrollY > 0 && scrollY <= headerTop + 100) {
      if (!hasAutoScrolled.value) {
        hasAutoScrolled.value = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => { hasAutoScrolled.value = false }, 800)
      }
      return
    }
  }

  onMounted(() => {
    if (!import.meta.client) return
    
    lastScrollY = window.scrollY || 0
    
    const listeners: Array<[string, EventListenerOrEventListenerObject, AddEventListenerOptions?]> = [
      ['wheel', handleScrollIntent, { passive: true }],
      ['touchmove', handleScrollIntent, { passive: true }],
      ['scroll', handleScrollIntent, { passive: true }]
    ]
    
    listeners.forEach(([name, handler, options]) => {
      window.addEventListener(name, handler, options)
      cleanupFns.push(() => window.removeEventListener(name, handler, options))
    })
  })

  onBeforeUnmount(() => {
    removeScrollIntentListeners()
  })

  return {
    heroSection,
    headerAnchor
  }
}
