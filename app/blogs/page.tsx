import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowUpRight } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  body: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
}

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
  
  // Convert MongoDB documents to plain objects for the component
  const publishedBlogs = blogs.map(b => ({
    ...b,
    _id: (b as any)._id.toString(),
    createdAt: (b as any).createdAt.toISOString(),
    updatedAt: (b as any).updatedAt?.toISOString(),
  })) as unknown as BlogData[];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-[#0fa]/20 bg-[#0a0a0f]/95">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <a href="https://aniketpandey.website" className="flex items-center gap-2 text-gray-500 hover:text-[#0fa] transition-colors font-mono text-sm mb-2">
                <ArrowLeft className="w-4 h-4" />
                back to portfolio
              </a>
              <h1 className="text-3xl font-bold text-white">
                <span className="text-[#0fa]">//</span> blog
              </h1>
              <p className="text-gray-500 font-mono text-sm mt-1">thoughts, tutorials, and security findings</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {publishedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-mono">$ no posts yet</p>
            <p className="text-gray-600 text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {publishedBlogs.map((blog: any) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog.slug}`}
                className="block hacker-card p-6 group hover:border-[#0fa]/40 transition-all"
              >
                {blog.coverImage && (
                  <div className="mb-4 overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-[#0fa] transition-colors flex items-center gap-2">
                      {blog.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {blog.body.substring(0, 200)}...
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-gray-500 font-mono text-xs">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-[#0fa]/10 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 font-mono text-xs">
            <span className="text-[#0fa]">$</span> echo "Built by Aniket Pandey"
          </p>
        </div>
      </footer>
    </div>
  );
}
