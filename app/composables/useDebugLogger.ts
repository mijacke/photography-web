/**
 * Composable for conditional debug logging with color-coded categories.
 *
 * @remarks
 * Each category has its own enable flag (e.g., `isHeroDebugEnabled`).
 * Set flags to `true` during development to see logs for specific areas.
 * All flags should be `false` in production.
 *
 * @returns Object containing the `log` function for category-based debug output
 *
 * @example
 * ```ts
 * const { log } = useDebugLogger()
 * log('SANITY', 'Fetched data', data)
 * ```
 */
export const useDebugLogger = () => {
    const isDebugEnabled = false
    const isHeroDebugEnabled = false
    const isServicesDebugEnabled = false
    const isAboutDebugEnabled = false
    const isRouterDebugEnabled = false

    const log = (
        category: 'SANITY' | 'ROUTER' | 'GSAP' | 'APP' | 'HERO' | 'SERVICES' | 'ABOUT',
        message: string,
        data?: any
    ) => {
        if (category === 'HERO' && !isHeroDebugEnabled) return
        if (category === 'SERVICES' && !isServicesDebugEnabled) return
        if (category === 'ABOUT' && !isAboutDebugEnabled) return
        if (category === 'ROUTER' && !isRouterDebugEnabled) return
        if (
            category !== 'HERO' &&
            category !== 'SERVICES' &&
            category !== 'ABOUT' &&
            category !== 'ROUTER' &&
            !isDebugEnabled
        )
            return

        const timestamp = new Date().toISOString().split('T')[1]?.slice(0, -1) ?? ''
        const styles = {
            SANITY: 'background: #F03E3E; color: white; border-radius: 3px; padding: 2px 6px;',
            ROUTER: 'background: #1C7ED6; color: white; border-radius: 3px; padding: 2px 6px;',
            GSAP: 'background: #37B24D; color: white; border-radius: 3px; padding: 2px 6px;',
            APP: 'background: #F59F00; color: white; border-radius: 3px; padding: 2px 6px;',
            HERO: 'background: #9C36B5; color: white; border-radius: 3px; padding: 2px 6px;',
            SERVICES: 'background: #0CA678; color: white; border-radius: 3px; padding: 2px 6px;',
            ABOUT: 'background: #E64980; color: white; border-radius: 3px; padding: 2px 6px;',
        }

        console.log(
            `%c${category}%c [${timestamp}] ${message}`,
            styles[category] || styles.APP,
            'color: inherit; font-weight: normal;',
            data ? data : ''
        )
    }

    return {
        log,
    }
}
