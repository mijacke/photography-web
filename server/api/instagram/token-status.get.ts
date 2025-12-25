import { defineEventHandler, getHeader, createError } from 'h3'

interface TokenDebugData {
    is_valid: boolean
    expires_at?: number
    data_access_expires_at?: number
    scopes?: string[]
    app_id?: string
    type?: string
    error?: {
        message: string
        code: number
    }
}

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

    const accessToken = config.instagramAccessToken || config.instagramToken

    if (!accessToken) {
        return {
            valid: false,
            error: 'No access token configured',
            expiresAt: null,
            daysUntilExpiry: null,
            needsRefresh: true,
        }
    }

    try {
        const debugUrl = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`

        const response = await fetch(debugUrl)
        const data = await response.json()

        if (data.error) {
            return {
                valid: false,
                error: data.error.message,
                expiresAt: null,
                daysUntilExpiry: null,
                needsRefresh: true,
            }
        }

        const tokenData: TokenDebugData = data.data

        if (!tokenData.is_valid) {
            return {
                valid: false,
                error: 'Token is invalid or expired',
                expiresAt: null,
                daysUntilExpiry: null,
                needsRefresh: true,
            }
        }

        const expiresAtTimestamp = tokenData.expires_at || tokenData.data_access_expires_at || 0

        let expiresAt: Date | null = null
        let daysUntilExpiry: number | null = null
        let needsRefresh = false
        let message = ''

        if (expiresAtTimestamp === 0) {
            message = 'Token does not expire (long-lived token)'
            needsRefresh = false
        } else {
            expiresAt = new Date(expiresAtTimestamp * 1000)
            const now = new Date()
            daysUntilExpiry = Math.floor(
                (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            )

            needsRefresh = daysUntilExpiry < 7

            message = needsRefresh
                ? `Token expires in ${daysUntilExpiry} days. Please refresh soon!`
                : `Token is valid for ${daysUntilExpiry} more days`
        }

        return {
            valid: true,
            tokenType: tokenData.type || 'unknown',
            expiresAt: expiresAt?.toISOString() || 'never',
            dataAccessExpiresAt: tokenData.data_access_expires_at
                ? new Date(tokenData.data_access_expires_at * 1000).toISOString()
                : null,
            daysUntilExpiry: daysUntilExpiry ?? 'never',
            needsRefresh,
            scopes: tokenData.scopes || [],
            appId: tokenData.app_id,
            message,
        }
    } catch (error: unknown) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Failed to check token',
            expiresAt: null,
            daysUntilExpiry: null,
            needsRefresh: true,
        }
    }
})
