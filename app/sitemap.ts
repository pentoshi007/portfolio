import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://aniketpandey.website/',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
