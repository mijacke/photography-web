import type { Gallery } from '@/types/gallery'

type PortfolioListOptions = {
  limit?: number
  key?: string
  category?: string
}

export const usePortfolioList = (options: PortfolioListOptions = {}) => {
  const { limit, key = 'portfolio-list', category } = options

  return useAsyncData<Gallery[]>(key, async () => {
    const query = queryCollection('portfolio')
      .select('path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
      .order('date', 'DESC')

    const items = await (limit ? query.limit(limit) : query).all()

    if (category) {
      return items.filter(item => item.tags?.includes(category))
    }

    return items
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
