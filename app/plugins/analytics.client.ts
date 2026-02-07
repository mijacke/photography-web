/**
 * Google Analytics SPA Pageview Tracking
 *
 * Sends page_view events on Nuxt route changes.
 * Only sends if:
 * 1. User has granted analytics consent
 * 2. gtag is loaded
 *
 * Additionally forwards events to first-party endpoint (/api/analytics),
 * which helps when direct g/collect requests are blocked by client filters.
 */
export default defineNuxtPlugin(() => {
    if (import.meta.server) return

    const router = useRouter()
    const config = useRuntimeConfig()
    const gaMeasurementId = config.public.gaMeasurementId as string

    if (!gaMeasurementId) return

    const CONSENT_KEY = 'cookie-consent'
    const CLIENT_ID_KEY = 'ga-client-id'
    const SESSION_ID_KEY = 'ga-session-id'
    let lastTrackedPath = ''
    let lastTrackedAt = 0

    const hasAnalyticsConsent = (): boolean => {
        try {
            const stored = localStorage.getItem(CONSENT_KEY)
            if (!stored) return false
            const parsed = JSON.parse(stored)
            return Boolean(parsed.analytics)
        } catch {
            return false
        }
    }

    const getClientId = (): string => {
        try {
            const existing = localStorage.getItem(CLIENT_ID_KEY)
            if (existing) return existing

            const generated = `${Date.now()}.${Math.floor(Math.random() * 1_000_000_000)}`
            localStorage.setItem(CLIENT_ID_KEY, generated)
            return generated
        } catch {
            return `${Date.now()}.${Math.floor(Math.random() * 1_000_000_000)}`
        }
    }

    const getSessionId = (): number => {
        try {
            const existing = sessionStorage.getItem(SESSION_ID_KEY)
            if (existing) return Number.parseInt(existing, 10)

            const generated = Date.now()
            sessionStorage.setItem(SESSION_ID_KEY, generated.toString())
            return generated
        } catch {
            return Date.now()
        }
    }

    const trackPageView = async (path: string) => {
        if (!hasAnalyticsConsent()) return

        const now = Date.now()
        if (path === lastTrackedPath && now - lastTrackedAt < 1500) return
        lastTrackedPath = path
        lastTrackedAt = now

        let sentViaFirstParty = false

        try {
            await $fetch('/api/analytics', {
                method: 'POST',
                body: {
                    eventName: 'page_view',
                    clientId: getClientId(),
                    sessionId: getSessionId(),
                    params: {
                        page_location: new URL(path, window.location.origin).toString(),
                        page_path: path,
                        page_title: document.title,
                        page_referrer: document.referrer || '',
                        language: navigator.language || '',
                        debug_mode: import.meta.dev ? 1 : 0,
                    },
                },
            })
            sentViaFirstParty = true
        } catch (error) {
            if (import.meta.dev) {
                console.error('[Analytics] Failed to send first-party page_view:', error)
            }
        }

        if (!sentViaFirstParty && window.gtag) {
            window.gtag?.('event', 'page_view', {
                page_path: path,
                page_title: document.title,
            })
        }
    }

    onNuxtReady(() => {
        if (hasAnalyticsConsent()) {
            void trackPageView(router.currentRoute.value.fullPath)
        }
    })

    router.afterEach((to) => {
        void trackPageView(to.fullPath)
    })

    window.addEventListener('cookie-consent-updated', (event) => {
        const detail = (event as CustomEvent<{ analytics?: boolean }>).detail
        if (!detail?.analytics) return
        void trackPageView(router.currentRoute.value.fullPath)
    })
})
