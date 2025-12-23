import { defineEventHandler } from 'h3'

/**
 * Instagram Graph API proxy endpoint.
 *
 * @remarks
 * **Why proxy?** Instagram tokens must not be exposed to the client.
 * This endpoint keeps tokens server-side and handles both Business API
 * and Basic Display API depending on configuration.
 *
 * **Configuration** (via `runtimeConfig`):
 * - `instagramAccessToken` / `instagramToken`: Required access token
 * - `instagramBusinessAccountId`: Optional, enables Business API
 * - `instagramApiVersion`: API version (default: 'v19.0')
 *
 * @returns `{ success: boolean, posts: InstagramPost[], apiType?: string, error?: string }`
 *
 * @example Response shape:
 * ```json
 * {
 *   "success": true,
 *   "apiType": "business",
 *   "posts": [{ "id": "...", "image": "...", "link": "..." }]
 * }
 * ```
 */
export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const accessToken = config.instagramAccessToken || config.instagramToken
    const businessAccountId = config.instagramBusinessAccountId
    const apiVersion = config.instagramApiVersion || 'v19.0'

    if (!accessToken) {
        console.error('Instagram token not configured')
        return {
            success: false,
            error: 'Instagram API token not configured',
            posts: [],
        }
    }

    try {
        let url: string

        if (businessAccountId) {
            url = `https://graph.facebook.com/${apiVersion}/${businessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=5&access_token=${accessToken}`
        } else {
            url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=5&access_token=${encodeURIComponent(accessToken)}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (data.error) {
            console.error('Instagram API Error:', data.error)
            return {
                success: false,
                error: data.error.message || 'Failed to fetch Instagram posts',
                posts: [],
            }
        }

        const posts =
            data.data?.map((post: any) => ({
                id: post.id,
                caption: post.caption || '',
                mediaType: post.media_type,
                image:
                    post.media_type === 'VIDEO'
                        ? post.thumbnail_url || post.media_url
                        : post.media_url,
                link: post.permalink,
                timestamp: post.timestamp,
            })) || []

        return {
            success: true,
            apiType: businessAccountId ? 'business' : 'basic_display',
            posts,
        }
    } catch (error) {
        console.error('Error fetching Instagram posts:', error)
        return {
            success: false,
            error: 'Failed to fetch Instagram posts',
            posts: [],
        }
    }
})
