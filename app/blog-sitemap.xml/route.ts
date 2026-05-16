import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatLastmod(value?: Date): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function GET() {
  const baseUrl = 'https://blogs.aniketpandey.website';

  await dbConnect();
  const blogs = await Blog.find({ published: true })
    .select('slug createdAt updatedAt')
    .sort({ updatedAt: -1 })
    .lean();

  const blogEntries = blogs as Array<{ slug: string; createdAt?: Date; updatedAt?: Date }>;
  const latestModified = blogEntries.reduce<Date | null>((latest, blog) => {
    const modified = blog.updatedAt || blog.createdAt;
    const lastmod = formatLastmod(modified);
    if (!lastmod) return latest;
    const modifiedDate = new Date(lastmod);
    return !latest || modifiedDate > latest ? modifiedDate : latest;
  }, null);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    ${latestModified ? `<lastmod>${latestModified.toISOString()}</lastmod>` : ''}
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${blogEntries
  .map((blog) => {
    const url = `${baseUrl}/${blog.slug}`;
    const modified = blog.updatedAt || blog.createdAt;
    const formattedLastmod = formatLastmod(modified);
    const lastmod = formattedLastmod ? `\n    <lastmod>${formattedLastmod}</lastmod>` : '';
    return `  <url>
    <loc>${escapeXml(url)}</loc>${lastmod}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
