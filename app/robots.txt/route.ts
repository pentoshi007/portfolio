import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  const isBlogsDomain = host.startsWith('blogs.');

  const baseUrl = isBlogsDomain
    ? 'https://blogs.aniketpandey.website'
    : 'https://aniketpandey.website';

  const sitemapLines = isBlogsDomain
    ? [`Sitemap: ${baseUrl}/sitemap.xml`]
    : [
        'Sitemap: https://aniketpandey.website/sitemap.xml',
        'Sitemap: https://blogs.aniketpandey.website/sitemap.xml',
      ];

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

${sitemapLines.join('\n')}
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
