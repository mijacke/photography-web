import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    // Support both naming conventions
    const accessToken = config.instagramAccessToken || config.instagramToken
    const businessAccountId = config.instagramBusinessAccountId
    const apiVersion = config.instagramApiVersion || 'v19.0'

    if (!accessToken) {
        console.error('Instagram token not configured')
        return {
            success: false,
            error: 'Instagram API token not configured',
            posts: []
        }
    }

    try {
        let url: string

        // Check if we have a Business Account ID - use Business API
        // Otherwise use Basic Display API
        if (businessAccountId) {
            // Instagram Business API (via Facebook Graph API)
            url = `https://graph.facebook.com/${apiVersion}/${businessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=5&access_token=${accessToken}`
        } else {
            // Instagram Basic Display API
            url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=5&access_token=${encodeURIComponent(accessToken)}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (data.error) {
            console.error('Instagram API Error:', data.error)
            return {
                success: false,
                error: data.error.message || 'Failed to fetch Instagram posts',
                posts: []
            }
        }

        // Transform the posts data
        const posts = data.data?.map((post: any) => ({
            id: post.id,
            caption: post.caption || '',
            mediaType: post.media_type,
            // For videos, use thumbnail_url if available, otherwise use media_url
            image: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
            link: post.permalink,
            timestamp: post.timestamp
        })) || []

        return {
            success: true,
            apiType: businessAccountId ? 'business' : 'basic_display',
            posts
        }
    } catch (error) {
        console.error('Error fetching Instagram posts:', error)
        return {
            success: false,
            error: 'Failed to fetch Instagram posts',
            posts: []
        }
    }
})
