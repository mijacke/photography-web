import { defaultLocale, translations } from '@/i18n'
import type { NavLink } from '@/types/navigation'

const footerCopy = translations[defaultLocale].footer

export const footerPrimaryLinks: NavLink[] = footerCopy.sections.explore.links
export const footerServiceLinks: NavLink[] = footerCopy.sections.services.links
export const footerSecondaryLinks: NavLink[] = footerCopy.sections.connect.links
export const footerSocialLinks: NavLink[] = footerCopy.social

export const footerEmail = footerCopy.email
export const footerLocation = footerCopy.location
export const footerTagline = footerCopy.tagline
