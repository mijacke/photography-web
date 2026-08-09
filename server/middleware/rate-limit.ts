import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const PROTECTED_PATHS = [
    '/api/instagram',
    '/api/consent',
    '/api/contact',
    '/api/analytics',
    '/api/sanity',
]

let limiter: Ratelimit | null = null

// Lazy init so a missing KV config (e.g. local dev) skips limiting instead of crashing
const getLimiter = (): Ratelimit | null => {
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
        return null
    }
    if (!limiter) {
        limiter = new Ratelimit({
            redis: kv,
            limiter: Ratelimit.slidingWindow(60, '1 m'),
            prefix: 'rl:global',
            analytics: false,
        })
    }
    return limiter
}

export default defineEventHandler(async (event) => {
    const path = getRequestURL(event).pathname

    if (!PROTECTED_PATHS.some((p) => path.startsWith(p))) {
        return
    }

    const instance = getLimiter()
    if (!instance) {
        return
    }

    const ip =
        getRequestIP(event, { xForwardedFor: true }) ||
        event.node.req.socket.remoteAddress ||
        'anonymous'

    const { success, limit, remaining, reset } = await instance.limit(ip)

    setHeader(event, 'X-RateLimit-Limit', limit.toString())
    setHeader(event, 'X-RateLimit-Remaining', remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', reset.toString())

    if (!success) {
        throw createError({
            statusCode: 429,
            message: 'Too Many Requests. Please try again later.',
        })
    }
})
