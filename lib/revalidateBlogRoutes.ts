import { revalidatePath } from 'next/cache';

export function revalidateBlogRoutes(slugs: string[] = []) {
  const paths = new Set<string>([
    '/',
    '/blogs',
    '/sitemap.xml',
    '/blogs/sitemap.xml',
  ]);

  for (const slug of slugs) {
    const normalizedSlug = slug.trim().replace(/^\/+|\/+$/g, '');
    if (normalizedSlug) {
      paths.add(`/${normalizedSlug}`);
      paths.add(`/blogs/${normalizedSlug}`);
    }
  }

  for (const path of paths) {
    revalidatePath(path);
  }
}
