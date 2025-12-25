/**
 * Google Analytics SPA Pageview Tracking
 *
 * Sends page_view events on Nuxt route changes.
 * Only sends if:
 * 1. User has granted analytics consent
 * 2. gtag is loaded
 */
export default defineNuxtPlugin(() => {
    if (import.meta.server) return

    const router = useRouter()
    const config = useRuntimeConfig()
    const gaMeasurementId = config.public.gaMeasurementId as string

    if (!gaMeasurementId) return

    const hasAnalyticsConsent = (): boolean => {
        try {
            const stored = localStorage.getItem('cookie-consent')
            if (!stored) return false
            const parsed = JSON.parse(stored)
            return Boolean(parsed.analytics)
        } catch {
            return false
        }
    }

    router.afterEach((to) => {
        if (!hasAnalyticsConsent()) return
        if (!window.gtag) return

        setTimeout(() => {
            window.gtag?.('event', 'page_view', {
                page_path: to.fullPath,
                page_title: document.title,
            })
        }, 100)
    })
})
