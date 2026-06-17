import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.aarqotech.com',
      lastModified: new Date(),
    },
  ]
}