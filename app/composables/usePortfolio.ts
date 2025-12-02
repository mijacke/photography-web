import type { Gallery } from '@/types/gallery'

type PortfolioListOptions = {
  limit?: number
  key?: string
}

export const usePortfolioList = (options: PortfolioListOptions = {}) => {
  const { limit, key = 'portfolio-list' } = options

  return useAsyncData<Gallery[]>(key, () => {
    const query = queryCollection('portfolio')
      .select('path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
      .order('date', 'DESC')

    return (limit ? query.limit(limit) : query).all()
  })
}

export const useGalleryBySlug = (slug: string, key?: string) => {
  const asyncKey = key ?? `portfolio-${slug}`

  return useAsyncData<Gallery | null>(asyncKey, () =>
    queryCollection('portfolio')
      .where('path', '=', `/portfolio/${slug}`)
      .first()
  )
}
