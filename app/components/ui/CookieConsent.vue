<script setup lang="ts">
import { POLICY_VERSION, CONSENT_CATEGORIES } from '~/config/legal'

/**
 * GDPR-compliant Cookie Consent Banner
 * Compliant with Slovak law 452/2021 Z. z. §109 and GDPR Art. 7
 */

interface CookieConsent {
    consentId: string
    necessary: boolean
    analytics: boolean
    externalMedia: boolean
    timestamp: string
    policyVersion: string
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_EXPIRY_DAYS = 365

const runtimeConfig = useRuntimeConfig()
const GA_MEASUREMENT_ID = runtimeConfig.public.gaMeasurementId as string

const isVisible = ref(false)
const showSettings = ref(false)
const isLoading = ref(false)

const consent = reactive<CookieConsent>({
    consentId: '',
    necessary: true,
    analytics: false,
    externalMedia: false,
    timestamp: '',
    policyVersion: POLICY_VERSION,
})

const generateConsentId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

const isConsentExpired = (timestamp: string): boolean => {
    if (!timestamp) return true
    const consentDate = new Date(timestamp)
    if (isNaN(consentDate.getTime())) return true

    const expiryDate = new Date(consentDate.getTime() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    return new Date() > expiryDate
}

const isPolicyChanged = (storedVersion: string): boolean => {
    return storedVersion !== POLICY_VERSION
}

/**
 * Load Google Analytics script dynamically ONLY after consent.
 * This is the cleanest ePrivacy approach - no tags before consent means no pings at all.
 */
const loadGoogleAnalytics = (gaId: string) => {
    console.log('[GA DEBUG] loadGoogleAnalytics called with gaId:', gaId)
    console.log('[GA DEBUG] consent state:', JSON.stringify(consent))
    
    if (typeof window === 'undefined') {
        console.log('[GA DEBUG] window is undefined, aborting')
        return
    }
    
    if (!gaId) {
        console.log('[GA DEBUG] gaId is empty/falsy, aborting')
        return
    }

    console.log('[GA DEBUG] Setting ga-disable flag to false')
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = false

    console.log('[GA DEBUG] Initializing dataLayer')
    window.dataLayer = window.dataLayer || []
    console.log('[GA DEBUG] dataLayer exists:', !!window.dataLayer, 'length:', window.dataLayer.length)
    
    if (!window.gtag) {
        console.log('[GA DEBUG] Creating gtag function')
        // CRITICAL: Must use function() syntax and push `arguments` object, not an array
        // This is how gtag.js expects data to be formatted in dataLayer
        window.gtag = function () {
            console.log('[GA DEBUG] gtag push:', JSON.stringify(Array.prototype.slice.call(arguments)))
            window.dataLayer.push(arguments)
        }
    } else {
        console.log('[GA DEBUG] gtag function already exists')
    }

    console.log('[GA DEBUG] Sending consent update: analytics_storage=granted')
    window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: consent.externalMedia ? 'granted' : 'denied',
        ad_user_data: consent.externalMedia ? 'granted' : 'denied',
        ad_personalization: consent.externalMedia ? 'granted' : 'denied',
    })

    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag"]`)
    console.log('[GA DEBUG] Existing gtag script found:', !!existingScript)
    
    if (existingScript) {
        console.log('[GA DEBUG] Script already loaded, sending page_view event')
        window.gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
        })
        console.log('[GA DEBUG] dataLayer after page_view:', JSON.stringify(window.dataLayer))
        return
    }

    console.log('[GA DEBUG] Setting up gtag js and config BEFORE loading script')
    window.gtag('js', new Date())
    window.gtag('config', gaId, {
        send_page_view: true,
    })
    
    console.log('[GA DEBUG] Creating and appending script tag')
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.onload = () => {
        console.log('[GA DEBUG] Script loaded successfully!')
        console.log('[GA DEBUG] dataLayer after script load:', JSON.stringify(window.dataLayer))
        console.log('[GA DEBUG] window.gtag exists:', typeof window.gtag)
    }
    script.onerror = (e) => {
        console.error('[GA DEBUG] Script failed to load!', e)
    }
    document.head.appendChild(script)
    console.log('[GA DEBUG] Script tag appended to head')
    console.log('[GA DEBUG] dataLayer state:', JSON.stringify(window.dataLayer))
}


/**
 * Disable GA tracking - used when user withdraws consent after GA was loaded.
 * Sets the kill-switch and updates consent mode to denied.
 */
const disableGoogleAnalytics = (gaId: string) => {
    if (typeof window === 'undefined') return

    if (gaId) {
        ;(window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true
    }
    window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
    })
}

const deleteTrackingCookies = () => {
    const cookiesToDelete = ['_ga', '_gid', '_gat', '_gcl_au', '_gac_']

    const cookies = document.cookie.split(';')
    cookies.forEach((cookie) => {
        const eqIndex = cookie.indexOf('=')
        const name = eqIndex > -1 ? cookie.substring(0, eqIndex).trim() : cookie.trim()
        if (!name) return

        if (cookiesToDelete.some((c) => name === c || name.startsWith(c))) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`
        }
    })
}

const logConsentToBackend = async (action: 'grant' | 'update' | 'withdraw', method: 'banner' | 'settings') => {
    try {
        await $fetch('/api/consent', {
            method: 'POST',
            body: {
                consentId: consent.consentId,
                timestamp: consent.timestamp,
                choices: {
                    necessary: consent.necessary,
                    analytics: consent.analytics,
                    externalMedia: consent.externalMedia,
                },
                policyVersion: consent.policyVersion,
                action,
                method,
            },
        })
    } catch (error) {
        console.error('[Cookie Consent] Failed to log consent:', error)
    }
}

const emitConsentEvent = () => {
    window.dispatchEvent(
        new CustomEvent('cookie-consent-updated', {
            detail: {
                analytics: consent.analytics,
                externalMedia: consent.externalMedia,
            },
        })
    )
}

onMounted(() => {
    console.log('[GA DEBUG] onMounted triggered')
    console.log('[GA DEBUG] GA_MEASUREMENT_ID:', GA_MEASUREMENT_ID)
    
    const stored = localStorage.getItem(CONSENT_KEY)
    console.log('[GA DEBUG] Stored consent:', stored)

    if (stored) {
        try {
            const parsed = JSON.parse(stored) as CookieConsent
            console.log('[GA DEBUG] Parsed consent:', JSON.stringify(parsed))

            if ('marketing' in parsed && !('externalMedia' in parsed)) {
                (parsed as CookieConsent & { marketing?: boolean }).externalMedia =
                    (parsed as CookieConsent & { marketing?: boolean }).marketing || false
            }
            if (isConsentExpired(parsed.timestamp) || isPolicyChanged(parsed.policyVersion)) {
                console.log('[GA DEBUG] Consent expired or policy changed, showing banner')
                deleteTrackingCookies()
                disableGoogleAnalytics(GA_MEASUREMENT_ID)

                consent.consentId = parsed.consentId || generateConsentId()
                consent.analytics = false
                consent.externalMedia = false

                emitConsentEvent()
                isVisible.value = true
            } else {
                console.log('[GA DEBUG] Consent valid, applying stored consent')
                Object.assign(consent, parsed)
                console.log('[GA DEBUG] consent.analytics:', consent.analytics)
                console.log('[GA DEBUG] GA_MEASUREMENT_ID truthy:', !!GA_MEASUREMENT_ID)
                if (consent.analytics && GA_MEASUREMENT_ID) {
                    console.log('[GA DEBUG] Calling loadGoogleAnalytics from onMounted')
                    loadGoogleAnalytics(GA_MEASUREMENT_ID)
                } else {
                    console.log('[GA DEBUG] NOT loading GA - analytics:', consent.analytics, 'gaId:', GA_MEASUREMENT_ID)
                }
                emitConsentEvent()
            }
        } catch (e) {
            console.error('[GA DEBUG] Error parsing stored consent:', e)
            consent.consentId = generateConsentId()
            isVisible.value = true
        }
    } else {
        console.log('[GA DEBUG] No stored consent found, showing banner')
        consent.consentId = generateConsentId()
        isVisible.value = true
    }
})

const saveConsent = async (action: 'grant' | 'update' | 'withdraw', method: 'banner' | 'settings') => {
    console.log('[GA DEBUG] saveConsent called - action:', action, 'method:', method)
    console.log('[GA DEBUG] consent.analytics:', consent.analytics)
    console.log('[GA DEBUG] GA_MEASUREMENT_ID:', GA_MEASUREMENT_ID)
    
    isLoading.value = true

    consent.timestamp = new Date().toISOString()
    consent.policyVersion = POLICY_VERSION

    if (action === 'withdraw' || !consent.analytics) {
        console.log('[GA DEBUG] Disabling GA (withdraw or analytics=false)')
        disableGoogleAnalytics(GA_MEASUREMENT_ID)
        deleteTrackingCookies()
    } else if (consent.analytics && GA_MEASUREMENT_ID) {
        console.log('[GA DEBUG] Calling loadGoogleAnalytics from saveConsent')
        loadGoogleAnalytics(GA_MEASUREMENT_ID)
    } else {
        console.log('[GA DEBUG] NOT loading GA in saveConsent - analytics:', consent.analytics, 'gaId:', GA_MEASUREMENT_ID)
    }

    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    console.log('[GA DEBUG] Consent saved to localStorage')
    
    await logConsentToBackend(action, method)
    emitConsentEvent()

    isLoading.value = false
    isVisible.value = false
    showSettings.value = false
    console.log('[GA DEBUG] saveConsent completed')
}

const acceptAll = () => {
    consent.analytics = true
    consent.externalMedia = true
    saveConsent('grant', 'banner')
}

const rejectAll = () => {
    consent.analytics = false
    consent.externalMedia = false
    saveConsent('withdraw', 'banner')
}

const saveSettings = () => {
    const action = consent.analytics || consent.externalMedia ? 'update' : 'withdraw'
    saveConsent(action, 'settings')
}

const openSettings = () => {
    showSettings.value = true
    isVisible.value = true
}

defineExpose({ openSettings })
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="translate-y-full opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-full opacity-0"
        >
            <div
                v-if="isVisible"
                class="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-cream-300 shadow-lg"
            >
                <div class="container-wide py-6">
                    <div v-if="!showSettings">
                        <div class="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div class="flex-1">
                                <h3 class="font-display text-lg text-charcoal-900 mb-2">
                                    Používame cookies 🍪
                                </h3>
                                <p class="text-charcoal-600 text-sm leading-relaxed">
                                    Analytické cookies a externé médiá sa aktivujú až po súhlase.
                                    <NuxtLink
                                        to="/cookies"
                                        class="text-warm-500 hover:text-warm-600 underline"
                                    >
                                        Viac informácií
                                    </NuxtLink>
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                                <button
                                    :disabled="isLoading"
                                    class="px-6 py-3 bg-charcoal-800 text-white hover:bg-charcoal-900 transition-colors text-sm font-medium tracking-wide disabled:opacity-50"
                                    @click="rejectAll"
                                >
                                    Odmietnuť všetko
                                </button>
                                <button
                                    :disabled="isLoading"
                                    class="px-6 py-3 border-2 border-charcoal-800 text-charcoal-800 hover:bg-charcoal-100 transition-colors text-sm font-medium tracking-wide disabled:opacity-50"
                                    @click="showSettings = true"
                                >
                                    Nastavenia
                                </button>
                                <button
                                    :disabled="isLoading"
                                    class="px-6 py-3 bg-charcoal-800 text-white hover:bg-charcoal-900 transition-colors text-sm font-medium tracking-wide disabled:opacity-50"
                                    @click="acceptAll"
                                >
                                    Prijať všetko
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="mb-6">
                            <h3 class="font-display text-lg text-charcoal-900 mb-2">
                                Nastavenia cookies
                            </h3>
                            <p class="text-charcoal-600 text-sm">
                                Vyberte, čo chcete povoliť. Nevyhnutné cookies sú vždy aktívne.
                            </p>
                        </div>

                        <div class="space-y-4 mb-6">
                            <label class="flex items-start gap-4 p-4 bg-cream-100 border border-cream-200">
                                <input type="checkbox" :checked="true" disabled class="mt-1 w-5 h-5 accent-warm-500">
                                <div class="flex-1">
                                    <span class="font-medium text-charcoal-900">{{ CONSENT_CATEGORIES.necessary.name }}</span>
                                    <span class="ml-2 text-xs bg-charcoal-200 text-charcoal-600 px-2 py-0.5 rounded">Vždy aktívne</span>
                                    <p class="text-charcoal-600 text-sm mt-1">{{ CONSENT_CATEGORIES.necessary.description }}</p>
                                </div>
                            </label>

                            <label class="flex items-start gap-4 p-4 bg-cream-100 border border-cream-200 cursor-pointer hover:bg-cream-200/50 transition-colors">
                                <input v-model="consent.analytics" type="checkbox" class="mt-1 w-5 h-5 accent-warm-500">
                                <div class="flex-1">
                                    <span class="font-medium text-charcoal-900">{{ CONSENT_CATEGORIES.analytics.name }}</span>
                                    <p class="text-charcoal-600 text-sm mt-1">{{ CONSENT_CATEGORIES.analytics.description }}</p>
                                </div>
                            </label>

                            <label class="flex items-start gap-4 p-4 bg-cream-100 border border-cream-200 cursor-pointer hover:bg-cream-200/50 transition-colors">
                                <input v-model="consent.externalMedia" type="checkbox" class="mt-1 w-5 h-5 accent-warm-500">
                                <div class="flex-1">
                                    <span class="font-medium text-charcoal-900">{{ CONSENT_CATEGORIES.externalMedia.name }}</span>
                                    <p class="text-charcoal-600 text-sm mt-1">{{ CONSENT_CATEGORIES.externalMedia.description }}</p>
                                </div>
                            </label>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3">
                            <button
                                :disabled="isLoading"
                                class="px-6 py-3 border-2 border-charcoal-800 text-charcoal-800 hover:bg-charcoal-100 transition-colors text-sm font-medium disabled:opacity-50"
                                @click="showSettings = false"
                            >
                                Späť
                            </button>
                            <button
                                :disabled="isLoading"
                                class="px-6 py-3 bg-charcoal-800 text-white hover:bg-charcoal-900 transition-colors text-sm font-medium disabled:opacity-50"
                                @click="saveSettings"
                            >
                                {{ isLoading ? 'Ukladám...' : 'Uložiť nastavenia' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
