import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: [
      'https://aniketpandey.website/sitemap.xml',
      'https://blogs.aniketpandey.website/sitemap.xml',
    ],
  };
}
