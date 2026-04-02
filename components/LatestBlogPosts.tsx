import { ArrowUpRight, Calendar } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

function getPlainTextPreview(markdown: string, maxLength: number = 140): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export default async function LatestBlogPosts() {
  try {
    await dbConnect();

    const blogs = await Blog.find({ published: true })
      .select('title slug body createdAt')
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    if (!blogs.length) {
      return null;
    }

    return (
      <section id="writing" className="py-16 px-4 md:px-8 bg-[#0c0c14]/95">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="section-title text-2xl md:text-3xl font-bold text-white mb-2">writing</h2>
              <p className="text-gray-400 font-mono text-sm mt-4">
                /* direct links to the latest posts on blogs.aniketpandey.website */
              </p>
            </div>
            <a
              href="https://blogs.aniketpandey.website"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#0fa] hover:text-white transition-colors"
            >
              open all posts
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              const createdAt = (blog as any).createdAt instanceof Date
                ? (blog as any).createdAt.toISOString()
                : String((blog as any).createdAt);

              return (
                <a
                  key={String((blog as any)._id)}
                  href={`https://blogs.aniketpandey.website/${(blog as any).slug}`}
                  className="hacker-card group flex h-full flex-col p-6"
                >
                  <div className="mb-4 flex items-center gap-2 text-gray-500 font-mono text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#0fa] transition-colors">
                    {(blog as any).title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400 flex-grow">
                    {getPlainTextPreview((blog as any).body)}...
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#0fa]">
                    read on blog
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading latest blog posts:', error);
    return null;
  }
}
