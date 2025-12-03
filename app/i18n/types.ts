import type { ContactCard, ContactMapCopy } from '@/types/contact'
import type { HeroCopy, HomePortfolioPreviewCopy, HomeService } from '@/types/home'
import type { NavLink } from '@/types/navigation'

export type { ContactCard, ContactMapCopy } from '@/types/contact'
export type { HomePortfolioEmptyState, HomePortfolioPreviewCopy } from '@/types/home'

export type CTA = { label: string; href: string }

export type FooterSection = {
  title: string
  links: NavLink[]
}

export type PortfolioInstructions = {
  first: {
    before: string
    code: string
    after: string
  }
  second: {
    before: string
    code: string
    middle: string
    field: string
    after: string
  }
}

export type PortfolioListCopy = {
  eyebrow: string
  title: string
  description: string
  instructions: PortfolioInstructions
  emptyMessage: string
}

export type PortfolioDetailCopy = {
  backLabel: string
  eyebrow: string
}

export type PortfolioCopy = {
  list: PortfolioListCopy
  detail: PortfolioDetailCopy
}

export type HomeCategory = {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
}

export type PackageCard = {
  name: string
  price: string
  summary: string
  includes: string[]
  badge?: string
}

export type ServicesCopy = {
  hero: {
    eyebrow: string
    title: string
    description: string
    badge: string
  }
  packageCtaLabel: string
  alwaysIncluded: {
    title: string
    bullets: string[]
  }
  packages: PackageCard[]
  addOns: {
    eyebrow: string
    title: string
    description: string
    items: string[]
  }
}

export type AppMessages = {
  meta: {
    locale: string
    dateLocale: string
  }
  navigation: {
    brand: string
    links: NavLink[]
  }
  home: {
    masthead: {
      eyebrow: string
      title: string
      description: string
      cta: CTA
      imageAlt: string
    }
    profile: HeroCopy
    services: {
      eyebrow: string
      title: string
      description: string
      imageSrc: string
      imageAlt: string
      items: HomeService[]
    }
    portfolioPreview: HomePortfolioPreviewCopy
    contact: {
      eyebrow: string
      title: string
      subtitle: string
      cta: CTA
    }
    intro: {
      title: string
      subtitle: string
    }
    categories: {
      family: HomeCategory
      maternity: HomeCategory
      wedding: HomeCategory
      newborn: HomeCategory
    }
  }
  contactPage: {
    hero: {
      eyebrow: string
      title: string
      description: string
      introText: string
    }
    contactCards: ContactCard[]
    map: ContactMapCopy
    form: {
      title: string
      namePlaceholder: string
      emailPlaceholder: string
      datePlaceholder: string
      photoTypePlaceholder: string
      messagePlaceholder: string
      consentLabel: string
      submitLabel: string
      note: string
    }
  }
  services: ServicesCopy
  portfolio: PortfolioCopy
  footer: {
    brand: string
    tagline: string
    location: string
    email: string
    sections: {
      explore: FooterSection
      services: FooterSection
      connect: FooterSection
    }
    social: NavLink[]
    bottomTagline: string
  }
}
