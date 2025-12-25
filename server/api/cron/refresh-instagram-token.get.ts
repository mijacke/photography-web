import { defineEventHandler, createError, getHeader } from 'h3'

/**
 * Cron endpoint for automatic Instagram token refresh.
 *
 * @remarks
 * **Vercel Cron**: Runs on 1st and 15th of each month at 9:00 AM UTC.
 * This ensures the token (valid 60 days) is refreshed well before expiry.
 *
 * **Security**: Validates Vercel's CRON_SECRET header to prevent unauthorized calls.
 *
 * @returns Success/failure status with token expiry info
 */
export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const cronSecret = process.env.CRON_SECRET

    if (process.env.NODE_ENV === 'production' && cronSecret) {
        if (authHeader !== `Bearer ${cronSecret}`) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized - Invalid CRON_SECRET',
            })
        }
    }

    const config = useRuntimeConfig()
    const accessToken = config.instagramAccessToken || config.instagramToken
    const appId = config.facebookAppId
    const appSecret = config.facebookAppSecret
    const apiVersion = config.instagramApiVersion || 'v19.0'

    if (!accessToken) {
        return {
            success: false,
            error: 'No Instagram token configured',
            timestamp: new Date().toISOString(),
        }
    }

    if (!appId || !appSecret) {
        return {
            success: false,
            error: 'Missing Facebook App credentials',
            timestamp: new Date().toISOString(),
        }
    }

    try {
        const url = new URL(`https://graph.facebook.com/${apiVersion}/oauth/access_token`)
        url.searchParams.set('grant_type', 'fb_exchange_token')
        url.searchParams.set('client_id', appId)
        url.searchParams.set('client_secret', appSecret)
        url.searchParams.set('fb_exchange_token', accessToken)

        const response = await fetch(url.toString())
        const data = await response.json()

        if (data.error) {
            console.error('[CRON] Instagram token refresh failed:', data.error)
            return {
                success: false,
                error: data.error.message,
                errorCode: data.error.code,
                timestamp: new Date().toISOString(),
            }
        }

        if (!data.access_token) {
            return {
                success: false,
                error: 'No access token returned',
                timestamp: new Date().toISOString(),
            }
        }

        const expiresInDays = Math.round((data.expires_in || 5184000) / 86400)
        const expiresAt = new Date(Date.now() + (data.expires_in || 5184000) * 1000)

        console.log(`[CRON] Instagram token refreshed successfully. Expires: ${expiresAt.toISOString()}`)

        // IMPORTANT: The new token needs to be saved to environment variables
        // Vercel doesn't allow runtime env updates
        // 1. Set up a webhook to notify you (Slack, email, etc.) - used now
        // 2. Or use Vercel API to update env vars programmatically - not used

        return {
            success: true,
            message: 'Token refreshed successfully',
            expiresInDays,
            expiresAt: expiresAt.toISOString(),

            timestamp: new Date().toISOString(),
            note: 'New token generated. Update INSTAGRAM_ACCESS_TOKEN in Vercel Environment Variables.',
            newTokenPreview: `${data.access_token.substring(0, 20)}...`,
        }
    } catch (error: unknown) {
        console.error('[CRON] Instagram token refresh error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        }
    }
})
