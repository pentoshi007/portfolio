import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  const isBlogsDomain = host.startsWith('blogs.');
  
  const baseUrl = isBlogsDomain 
    ? 'https://blogs.aniketpandey.website'
    : 'https://aniketpandey.website';
  
  const sitemapPath = isBlogsDomain ? '/blogs/sitemap.xml' : '/sitemap.xml';
  
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${baseUrl}${sitemapPath}
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
