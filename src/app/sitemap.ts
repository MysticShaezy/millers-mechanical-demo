import { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'
import { getAllServiceSlugs } from '@/data/services'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const services: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${siteConfig.url}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...services,
  ]
}
