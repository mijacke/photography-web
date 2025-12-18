export const useDebugLogger = () => {
    const isDebugEnabled = false // Set to false to disable general logs
    const isHeroDebugEnabled = false // Hero-specific debugging - DISABLED
    const isServicesDebugEnabled = false // Services page debugging - DISABLED
    const isAboutDebugEnabled = false // About page debugging - DISABLED
    const isRouterDebugEnabled = false // Router/navigation debugging - DISABLED

    const log = (category: 'SANITY' | 'ROUTER' | 'GSAP' | 'APP' | 'HERO' | 'SERVICES' | 'ABOUT', message: string, data?: any) => {
        // Only show enabled categories
        if (category === 'HERO' && !isHeroDebugEnabled) return
        if (category === 'SERVICES' && !isServicesDebugEnabled) return
        if (category === 'ABOUT' && !isAboutDebugEnabled) return
        if (category === 'ROUTER' && !isRouterDebugEnabled) return
        if (category !== 'HERO' && category !== 'SERVICES' && category !== 'ABOUT' && category !== 'ROUTER' && !isDebugEnabled) return

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
        log
    }
}
