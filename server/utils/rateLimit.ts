import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { createError, getRequestIP, type H3Event } from 'h3'

type Window = `${number} ${'s' | 'ms' | 'm' | 'h' | 'd'}`

const limiters = new Map<string, Ratelimit>()

const getLimiter = (name: string, limit: number, window: Window): Ratelimit | null => {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        return null
    }
    let limiter = limiters.get(name)
    if (!limiter) {
        limiter = new Ratelimit({
            redis: kv,
            limiter: Ratelimit.slidingWindow(limit, window),
            prefix: `rl:${name}`,
            analytics: false,
        })
        limiters.set(name, limiter)
    }
    return limiter
}

export const enforceRateLimit = async (
    event: H3Event,
    name: string,
    limit: number,
    window: Window,
): Promise<void> => {
    const limiter = getLimiter(name, limit, window)
    if (!limiter) return

    const ip =
        getRequestIP(event, { xForwardedFor: true }) ||
        event.node.req.socket.remoteAddress ||
        'unknown'

    const { success, reset } = await limiter.limit(`${name}:${ip}`)
    if (!success) {
        const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
        throw createError({
            statusCode: 429,
            statusMessage: 'Too Many Requests',
            message: 'Príliš veľa požiadaviek. Skúste to prosím neskôr.',
            data: { retryAfter },
        })
    }
}
