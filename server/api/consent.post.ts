import { kv } from '@vercel/kv'
import { createHmac } from 'crypto'
import { enforceRateLimit } from '../utils/rateLimit'

interface ConsentBody {
    consentId: string
    timestamp: string
    choices: {
        necessary: boolean
        analytics: boolean
        externalMedia: boolean
    }
    policyVersion: string
    action: 'grant' | 'update' | 'withdraw'
    method: 'banner' | 'settings'
}

interface ConsentRecord extends ConsentBody {
    createdAt: string
    source: string
    signature: string
}

const ALLOWED_ACTIONS = new Set(['grant', 'update', 'withdraw'])
const ALLOWED_METHODS = new Set(['banner', 'settings'])

const MAX_CONSENT_ID = 128
const MAX_POLICY_VERSION = 32
const MAX_TIMESTAMP = 40
const GLOBAL_LIST_CAP = 10_000

const isBool = (v: unknown): v is boolean => typeof v === 'boolean'

// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]/

const isSafeString = (v: unknown, maxLen: number): v is string =>
    typeof v === 'string' &&
    v.length > 0 &&
    v.length <= maxLen &&
    !CONTROL_RE.test(v)

const createSignature = (data: Omit<ConsentRecord, 'signature'>): string => {
    const secret = process.env.CONSENT_HMAC_SECRET
    if (!secret) {
        console.error('[CONSENT] CRITICAL: Missing CONSENT_HMAC_SECRET - signatures disabled')
        return 'hmac-secret-not-configured'
    }
    return createHmac('sha256', secret).update(JSON.stringify(data)).digest('hex')
}

export default defineEventHandler(async (event) => {
    await enforceRateLimit(event, 'consent', 20, '10 m')

    const body = await readBody<ConsentBody>(event)

    if (
        !body ||
        !isSafeString(body.consentId, MAX_CONSENT_ID) ||
        !isSafeString(body.timestamp, MAX_TIMESTAMP) ||
        !isSafeString(body.policyVersion, MAX_POLICY_VERSION) ||
        !ALLOWED_ACTIONS.has(body.action) ||
        !ALLOWED_METHODS.has(body.method) ||
        !body.choices ||
        !isBool(body.choices.necessary) ||
        !isBool(body.choices.analytics) ||
        !isBool(body.choices.externalMedia)
    ) {
        throw createError({
            statusCode: 400,
            message: 'Invalid consent payload',
        })
    }

    const createdAt = new Date().toISOString()

    const recordData: Omit<ConsentRecord, 'signature'> = {
        consentId: body.consentId,
        timestamp: body.timestamp,
        choices: {
            necessary: body.choices.necessary,
            analytics: body.choices.analytics,
            externalMedia: body.choices.externalMedia,
        },
        policyVersion: body.policyVersion,
        action: body.action,
        method: body.method,
        createdAt,
        source: 'web',
    }

    const signature = createSignature(recordData)

    const record: ConsentRecord = {
        ...recordData,
        signature,
    }

    try {
        const perIdKey = `consent:${body.consentId}`
        await kv.lpush(perIdKey, JSON.stringify(record))
        await kv.expire(perIdKey, 3 * 365 * 24 * 60 * 60)

        await kv.lpush('consent:all', JSON.stringify(record))
        await kv.ltrim('consent:all', 0, GLOBAL_LIST_CAP - 1)

        console.log('[CONSENT]', record.consentId, record.action, record.createdAt)
    } catch (error) {
        console.error('[CONSENT] KV error:', error)
        console.log('[CONSENT FALLBACK]', JSON.stringify(record))
    }

    return {
        success: true,
        consentId: record.consentId,
        recorded: record.createdAt,
        signature: signature.substring(0, 16) + '...',
    }
})
