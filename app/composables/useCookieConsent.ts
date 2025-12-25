/**
 * Composable for GDPR-compliant conditional content loading.
 *
 * Categories:
 * - Analytics: Google Analytics
 * - External Media: Google Maps
 *
 * @example
 * ```vue
 * <template>
 *   <div v-if="hasExternalMediaConsent">
 *     <GoogleMapsEmbed />
 *   </div>
 *   <div v-else>
 *     <ConsentPlaceholder @request="requestExternalMediaConsent" />
 *   </div>
 * </template>
 *
 * <script setup>
 * const { hasExternalMediaConsent, requestExternalMediaConsent } = useCookieConsent()
 * </script>
 * ```
 */

interface ConsentState {
    analytics: boolean
    externalMedia: boolean
}

const CONSENT_KEY = 'cookie-consent'

export const useCookieConsent = () => {
    const hasAnalyticsConsent = ref(false)
    const hasExternalMediaConsent = ref(false)

    const loadConsentState = () => {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(CONSENT_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                hasAnalyticsConsent.value = Boolean(parsed.analytics)
                hasExternalMediaConsent.value = Boolean(parsed.externalMedia || parsed.marketing)
            } catch {
                hasAnalyticsConsent.value = false
                hasExternalMediaConsent.value = false
            }
        }
    }

    const handleConsentUpdate = (event: CustomEvent<ConsentState>) => {
        hasAnalyticsConsent.value = event.detail.analytics
        hasExternalMediaConsent.value = event.detail.externalMedia
    }

    onMounted(() => {
        loadConsentState()

        window.addEventListener(
            'cookie-consent-updated',
            handleConsentUpdate as EventListener
        )
    })

    onUnmounted(() => {
        window.removeEventListener(
            'cookie-consent-updated',
            handleConsentUpdate as EventListener
        )
    })

    const openCookieSettings = () => {
        window.dispatchEvent(new CustomEvent('open-cookie-settings'))
    }

    return {
        hasAnalyticsConsent: readonly(hasAnalyticsConsent),
        hasExternalMediaConsent: readonly(hasExternalMediaConsent),
        requestExternalMediaConsent: openCookieSettings,
        requestAnalyticsConsent: openCookieSettings,
        openCookieSettings,
    }
}
