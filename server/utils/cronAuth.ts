import { timingSafeEqual } from 'node:crypto'
import { createError, getHeader, type H3Event } from 'h3'

/**
 * Constant-time validation of the `Authorization: Bearer CRON_SECRET` header
 * used by the Vercel cron and the manual Instagram token endpoints.
 */
export const assertCronAuthorized = (event: H3Event): void => {
    const secret = process.env.CRON_SECRET
    const provided = Buffer.from(getHeader(event, 'authorization') || '')
    const expected = Buffer.from(`Bearer ${secret || ''}`)

    const authorized =
        !!secret && provided.length === expected.length && timingSafeEqual(provided, expected)

    if (!authorized) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        })
    }
}
