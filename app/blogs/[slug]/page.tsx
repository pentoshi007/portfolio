import Link from 'next/link';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// Disable caching - always fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  body: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug, published: true }).lean();

  if (!blog) {
    notFound();
  }

  // Convert to plain object
  const blogData = {
    ...blog,
    _id: (blog as any)._id.toString(),
    createdAt: (blog as any).createdAt.toISOString(),
    updatedAt: (blog as any).updatedAt.toISOString(),
  } as unknown as BlogData;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-[#0fa]/20 bg-[#0a0a0f]/95">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/blogs" className="flex items-center gap-2 text-gray-500 hover:text-[#0fa] transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            back to blogs
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {blogData.coverImage && (
          <div className="mb-8 overflow-hidden border border-[#0fa]/20">
            <img
              src={blogData.coverImage}
              alt={blogData.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{blogData.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 font-mono text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(blogData.createdAt).toLocaleDateString()}
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-green max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
            {blogData.body}
          </div>
        </div>
      </article>

      <footer className="border-t border-[#0fa]/10 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/blogs" className="text-gray-500 hover:text-[#0fa] font-mono text-sm transition-colors">
              ← more posts
            </Link>
            <a href="https://aniketpandey.website" className="text-gray-500 hover:text-[#0fa] font-mono text-sm transition-colors">
              portfolio →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
