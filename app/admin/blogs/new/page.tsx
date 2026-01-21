'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function NewBlogPage() {
  const [blog, setBlog] = useState({
    title: '',
    body: '',
    coverImage: '',
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      if (res.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Failed to create blog:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-[#0fa]/20 bg-[#0a0a0f]/95">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            back
          </button>
          <h1 className="text-white font-mono">new_blog</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-mono text-[10px] text-gray-500 block mb-2">TITLE</label>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-lg focus:border-[#0fa] focus:outline-none"
              placeholder="Blog post title"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-gray-500 block mb-2">COVER IMAGE URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="url"
                value={blog.coverImage}
                onChange={(e) => setBlog({ ...blog, coverImage: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm focus:border-[#0fa] focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] text-gray-500 block mb-2">CONTENT (Markdown supported)</label>
            <textarea
              value={blog.body}
              onChange={(e) => setBlog({ ...blog, body: e.target.value })}
              required
              rows={20}
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#0fa]/20 text-white text-sm font-mono focus:border-[#0fa] focus:outline-none resize-none"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={blog.published}
              onChange={(e) => setBlog({ ...blog, published: e.target.checked })}
              className="w-4 h-4 accent-[#0fa]"
            />
            <label htmlFor="published" className="text-gray-400 text-sm font-mono">
              Publish immediately
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#0fa] text-[#0a0a0f] font-mono text-sm font-medium hover:bg-[#0fa]/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'saving...' : 'save blog'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-[#0fa]/20 text-gray-400 font-mono text-sm hover:text-white hover:border-[#0fa]/40 transition-colors"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
