import type { HeroCopy, HomeService } from '@/types/home'
import type { NavLink } from '@/types/navigation'

export const homeHeroImage = '/images/home/homehero.jpg'

export const homeNavLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
]

export const homeHeroCopy: HeroCopy = {
  title: 'Mario Lassu',
  eyebrow: 'Documentary Photography',
  description:
    "Don't expect stiff poses or fake smiles on command. The best photos happen when you forget for a moment that the lens is pointed at you. I focus on the atmosphere, the laughter that crinkles your face, and the quiet moments that speak louder than words.",
  ctaLabel: 'Inquiry',
  ctaHref: '#contact',
  imageSrc: homeHeroImage,
  imageAlt: 'Moody portrait in nature'
}

export const homeServices: HomeService[] = [
  {
    title: 'Wedding',
    bullets: ['Full day / Half day coverage', 'Storytelling & candid moments'],
    stat: '250+ Captured'
  },
  {
    title: 'Event coverage',
    bullets: ['Corporate & private events', 'Real-time documentation'],
    stat: '350+ Events'
  },
  {
    title: 'Commercial',
    bullets: ['Brand & campaign shots', 'Social Media & Marketing Assets'],
    stat: '30+ Brands'
  }
]
