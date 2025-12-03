export type HeroCopy = {
  title: string
  eyebrow: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc?: string
  imageAlt?: string
}

export type HomeService = {
  title: string
  bullets: string[]
  stat: string
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
