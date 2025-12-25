import { kv } from '@vercel/kv'
import { createHmac } from 'crypto'

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

interface ConsentRecord {
    consentId: string
    timestamp: string
    choices: {
        necessary: boolean
        analytics: boolean
        externalMedia: boolean
    }
    policyVersion: string
    action: string
    method: string
    createdAt: string
    source: string
    signature: string
}

const createSignature = (data: Omit<ConsentRecord, 'signature'>): string => {
    const secret = process.env.CONSENT_HMAC_SECRET || 'default-dev-secret'
    return createHmac('sha256', secret).update(JSON.stringify(data)).digest('hex')
}

export default defineEventHandler(async (event) => {
    const body = await readBody<ConsentBody>(event)

    if (!body.consentId || !body.timestamp || !body.choices || !body.policyVersion) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields',
        })
    }

    const createdAt = new Date().toISOString()

    const recordData: Omit<ConsentRecord, 'signature'> = {
        consentId: body.consentId,
        timestamp: body.timestamp,
        choices: body.choices,
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
        await kv.lpush(`consent:${body.consentId}`, JSON.stringify(record))
        await kv.lpush('consent:all', JSON.stringify(record))
        await kv.expire(`consent:${body.consentId}`, 3 * 365 * 24 * 60 * 60)

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
