import type { HeroCopy, HomeService } from '@/types/home'
import type { NavLink } from '@/types/navigation'

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

export type HomePortfolioEmptyState = {
  before: string
  path: string
  after: string
}

export type HomePortfolioPreviewCopy = {
  eyebrow: string
  title: string
  description: string
  viewAllLabel: string
  emptyState: HomePortfolioEmptyState
}

export type PackageCard = {
  name: string
  price: string
  summary: string
  includes: string[]
  badge?: string
}

export type ContactCard = {
  label: string
  value: string
  href?: string
  type?: 'phone' | 'email' | 'address' | 'location' | 'response'
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
  }
  contactPage: {
    hero: {
      eyebrow: string
      title: string
      description: string
      introText: string
    }
    contactCards: ContactCard[]
    map: {
      eyebrow: string
      title: string
      description: string
      addressLabel: string
      directionsLabel: string
    }
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
