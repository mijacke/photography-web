interface AnalyticsRequestBody {
    eventName: string
    clientId: string
    sessionId: number
    params?: Record<string, unknown>
}

const ALLOWED_EVENT_NAMES = new Set(['page_view'])
const ALLOWED_PARAM_KEYS = new Set([
    'page_location',
    'page_path',
    'page_title',
    'page_referrer',
    'language',
    'debug_mode',
])

const MAX_PARAM_LENGTH = 1024

const sanitizeParamValue = (value: unknown): string | number | undefined => {
    if (typeof value === 'string') {
        return value.slice(0, MAX_PARAM_LENGTH)
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value
    }
    if (typeof value === 'boolean') {
        return value ? 1 : 0
    }
    return undefined
}

export default defineEventHandler(async (event) => {
    setHeader(event, 'Cache-Control', 'no-store')

    const body = await readBody<AnalyticsRequestBody>(event)
    const runtimeConfig = useRuntimeConfig(event)

    const measurementId = runtimeConfig.public.gaMeasurementId
    const apiSecret = runtimeConfig.gaApiSecret as string

    if (!measurementId || !apiSecret) {
        return {
            success: false,
            skipped: 'missing-ga-config',
        }
    }

    if (!body || !ALLOWED_EVENT_NAMES.has(body.eventName)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid event name',
        })
    }

    if (typeof body.clientId !== 'string' || body.clientId.length < 8 || body.clientId.length > 128) {
        throw createError({
            statusCode: 400,
            message: 'Invalid client ID',
        })
    }

    if (!Number.isInteger(body.sessionId) || body.sessionId <= 0) {
        throw createError({
            statusCode: 400,
            message: 'Invalid session ID',
        })
    }

    const sanitizedParams: Record<string, string | number> = {
        session_id: body.sessionId,
        engagement_time_msec: 100,
    }

    if (body.params && typeof body.params === 'object') {
        for (const [key, value] of Object.entries(body.params)) {
            if (!ALLOWED_PARAM_KEYS.has(key)) continue
            const sanitizedValue = sanitizeParamValue(value)
            if (sanitizedValue === undefined) continue
            sanitizedParams[key] = sanitizedValue
        }
    }

    const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`

    try {
        await $fetch(endpoint, {
            method: 'POST',
            body: {
                client_id: body.clientId,
                non_personalized_ads: true,
                events: [
                    {
                        name: body.eventName,
                        params: sanitizedParams,
                    },
                ],
            },
        })
    } catch (error) {
        console.error('[Analytics] Failed to forward event to GA4:', error)
        throw createError({
            statusCode: 502,
            message: 'Analytics forwarding failed',
        })
    }

    return {
        success: true,
    }
})
