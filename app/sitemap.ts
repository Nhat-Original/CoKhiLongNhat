import { MetadataRoute } from 'next'
import prisma from '@/prisma'

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}>

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const products = await prisma.product.findMany({
    select: {
      simplifiedName: true,
    },
  })

  const productRoutes = products.map((product) => {
    return {
      url: `https://cokhilongnhat.vercel.app/san-pham/${product.simplifiedName}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  }) as Sitemap

  return [
    ...productRoutes,
    {
      url: 'https://cokhilongnhat.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/san-pham',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/lien-he',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/ho-tro',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/dang-nhap',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/quan-ly',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/quan-ly/san-pham',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    {
      url: 'https://cokhilongnhat.vercel.app/quan-ly/phan-loai',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ]
}

export default sitemap
