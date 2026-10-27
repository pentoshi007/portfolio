import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/portfolioData';

// Main-domain sitemap. Blog posts live on blogs.aniketpandey.website and are
// listed in that host's own sitemap (see app/blog-sitemap.xml and robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${siteUrl}/og.png`],
    },
  ];
}
