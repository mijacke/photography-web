import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    // Support both naming conventions
    const accessToken = config.instagramAccessToken || config.instagramToken
    const appId = config.facebookAppId
    const appSecret = config.facebookAppSecret
    const apiVersion = config.instagramApiVersion || 'v19.0'

    if (!accessToken) {
        throw createError({
            statusCode: 501,
            message: 'Missing INSTAGRAM_ACCESS_TOKEN in .env'
        })
    }

    if (!appId || !appSecret) {
        throw createError({
            statusCode: 502,
            message: 'Missing FACEBOOK_APP_ID or FACEBOOK_APP_SECRET in .env'
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
                message: `[${errorCode || 'ERROR'}] ${errorMessage}`
            })
        }

        if (!data.access_token) {
            throw createError({
                statusCode: 422,
                message: 'No access token returned from Facebook API'
            })
        }

        const expiresInDays = Math.round((data.expires_in || 5184000) / 86400)

        return {
            success: true,
            message: 'Token refreshed successfully via Facebook Graph API!',
            newToken: data.access_token,
            expiresIn: data.expires_in,
            expiresInDays: expiresInDays,
            expiresAt: new Date(Date.now() + (data.expires_in || 5184000) * 1000).toISOString(),
            instructions: [
                '1. Copy the newToken value above',
                '2. Replace INSTAGRAM_ACCESS_TOKEN in your .env file',
                '3. Restart npm run dev',
                '4. Set reminder for ~50 days to refresh again'
            ]
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            message: `Unexpected error: ${error.message}`
        })
    }
})