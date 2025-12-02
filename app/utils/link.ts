/**
 * Check if a URL is an internal link (starts with /, #, or /#)
 */
export const isInternalLink = (href: string): boolean => {
    return href.startsWith('/') || href.startsWith('#') || href.startsWith('/#')
}

/**
 * Get appropriate link attributes for external links
 */
export const getLinkAttributes = (href: string) => {
    const isExternal = href.startsWith('http')
    return {
        target: isExternal ? '_blank' : undefined,
        rel: isExternal ? 'noreferrer' : undefined
    }
}
