import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://blogs.aniketpandey.website';

  await dbConnect();
  const blogs = await Blog.find({ published: true })
    .select('slug updatedAt')
    .lean();

  const blogEntries = blogs.map((blog: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogEntries,
  ];
}
