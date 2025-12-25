import { defineEventHandler, createError, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, 'authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized',
        })
    }

    const config = useRuntimeConfig()

    // Support both naming conventions
    const accessToken = config.instagramAccessToken || config.instagramToken
    const appId = config.facebookAppId
    const appSecret = config.facebookAppSecret
    const apiVersion = config.instagramApiVersion || 'v19.0'

    if (!accessToken) {
        throw createError({
            statusCode: 501,
            message: 'Missing INSTAGRAM_ACCESS_TOKEN in .env',
        })
    }

    if (!appId || !appSecret) {
        throw createError({
            statusCode: 502,
            message: 'Missing FACEBOOK_APP_ID or FACEBOOK_APP_SECRET in .env',
        })
    }

    try {
        // Facebook Business Graph API - exchange for new long-lived token
        // This works for tokens that are still valid (not expired)
        const url = new URL(`https://graph.facebook.com/${apiVersion}/oauth/access_token`)
        url.searchParams.set('grant_type', 'fb_exchange_token')
        url.searchParams.set('client_id', appId)
        url.searchParams.set('client_secret', appSecret)
        url.searchParams.set('fb_exchange_token', accessToken)

        const response = await fetch(url.toString())
        const data = await response.json()

        if (data.error) {
            let statusCode = 400
            const errorCode = data.error.code
            const errorMessage = data.error.message || 'Unknown error'

            if (errorCode === 190) {
                statusCode = 401 // Token expired
            } else if (errorMessage.includes('system error')) {
                statusCode = 503 // Facebook system error
            }

            throw createError({
                statusCode,
                message: `[${errorCode || 'ERROR'}] ${errorMessage}`,
            })
        }

        if (!data.access_token) {
            throw createError({
                statusCode: 422,
                message: 'No access token returned from Facebook API',
            })
        }

        const expiresInDays = Math.round((data.expires_in || 5184000) / 86400)

        // Log full token server-side only for manual retrieval
        console.log('[INSTAGRAM] New token (copy to env):', data.access_token)

        return {
            success: true,
            message: 'Token refreshed successfully via Facebook Graph API!',
            newTokenPreview: `${data.access_token.substring(0, 20)}...`,
            expiresIn: data.expires_in,
            expiresInDays: expiresInDays,
            expiresAt: new Date(Date.now() + (data.expires_in || 5184000) * 1000).toISOString(),
            note: 'Full token logged to server console. Update INSTAGRAM_ACCESS_TOKEN in Vercel.',
        }
    } catch (error: unknown) {
        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }

        throw createError({
            statusCode: 500,
            message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        })
    }
})
