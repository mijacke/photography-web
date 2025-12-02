import { ref, watch, onBeforeUnmount } from 'vue'

/**
 * Composable for managing mobile menu state and scroll lock
 */
export const useMobileMenu = () => {
    const mobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
        mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
        mobileMenuOpen.value = false
    }

    // Lock body scroll when mobile menu is open
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

    // Cleanup on unmount
    onBeforeUnmount(() => {
        if (!import.meta.client) return
        document.body.style.overflow = ''
    })

    return {
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    }
}
