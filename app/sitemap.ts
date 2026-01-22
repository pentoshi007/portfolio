import { MetadataRoute } from 'next';

// Main portfolio sitemap - for aniketpandey.website
// Blog sitemap is at /blogs/sitemap.xml for blogs.aniketpandey.website
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aniketpandey.website';

  // Main portfolio sections
  const sections = [
    { path: '', priority: 1.0 },
    { path: '#about', priority: 0.8 },
    { path: '#skills', priority: 0.7 },
    { path: '#experience', priority: 0.8 },
    { path: '#projects', priority: 0.8 },
    { path: '#certifications', priority: 0.7 },
    { path: '#stats', priority: 0.6 },
    { path: '#contact', priority: 0.7 },
  ];

  return sections.map((section) => ({
    url: `${baseUrl}/${section.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: section.priority,
  }));
}
