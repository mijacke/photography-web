import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    analytics: true,
})

const PROTECTED_PATHS = ['/api/instagram', '/api/consent', '/api/contact']

export default defineEventHandler(async (event) => {
    const path = getRequestURL(event).pathname

    if (!PROTECTED_PATHS.some((p) => path.startsWith(p))) {
        return
    }

    const ip =
        getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ||
        getHeader(event, 'x-real-ip') ||
        'anonymous'

    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

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
