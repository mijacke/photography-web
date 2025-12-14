import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        // For back/forward navigation, use saved position
        if (savedPosition) {
            return savedPosition
        }

        // For hash links
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'instant'
            }
        }

        // For new navigation, scroll to top
        return { top: 0, left: 0, behavior: 'instant' }
    }
}
