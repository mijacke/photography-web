import { defaultLocale, translations } from '@/i18n'
import type { HeroCopy, HomeService } from '@/types/home'
import type { NavLink } from '@/types/navigation'

const homeCopy = translations[defaultLocale]

export const homeHeroImage = homeCopy.home.profile.imageSrc || '/images/home/homehero.jpg'

export const homeNavLinks: NavLink[] = homeCopy.navigation.links

export const homeHeroCopy: HeroCopy = homeCopy.home.profile

export const homeServices: HomeService[] = homeCopy.home.services.items
