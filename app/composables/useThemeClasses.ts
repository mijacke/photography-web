import type { Locale } from '@/i18n'

/**
 * Composable for generating theme-based CSS classes
 */
export const useThemeClasses = (isDark: boolean, currentLocale: Locale) => {
    const headerClasses = () =>
        isDark
            ? 'border-b border-transparent bg-transparent text-white'
            : 'border-b border-stone-200/80 bg-sand/90 text-charcoal'

    const brandLinkClasses = () =>
        isDark ? 'text-white/80 hover:text-white' : 'text-charcoal/80 hover:text-charcoal'

    const navLinkClasses = () =>
        isDark ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-stone-200/80 hover:text-charcoal'

    const ctaButtonClasses = () =>
        isDark
            ? 'border-white/40 bg-white/10 text-white hover:bg-white/15'
            : 'border-stone-300 bg-white text-charcoal'

    const languageToggleWrapperClasses = () =>
        isDark ? 'border-white/30 bg-white/10 text-white/80' : 'border-stone-300 bg-white text-charcoal/80'

    const languageButtonClasses = (code: Locale) => [
        'rounded-full px-2.5 py-1 transition',
        currentLocale === code
            ? isDark
                ? 'bg-white text-charcoal shadow-sm'
                : 'bg-charcoal text-white shadow-sm'
            : isDark
                ? 'text-white/80 hover:bg-white/10'
                : 'text-charcoal/70 hover:bg-stone-200/80'
    ]

    const mobileMenuBackgroundClasses = () =>
        isDark ? 'bg-charcoal text-white' : 'bg-sand text-charcoal'

    const hoverClasses = () => (isDark ? 'hover:bg-white/10' : 'hover:bg-stone-200/80')

    const hamburgerLineClasses = () => (isDark ? 'bg-white' : 'bg-charcoal')

    return {
        headerClasses,
        brandLinkClasses,
        navLinkClasses,
        ctaButtonClasses,
        languageToggleWrapperClasses,
        languageButtonClasses,
        mobileMenuBackgroundClasses,
        hoverClasses,
        hamburgerLineClasses
    }
}
