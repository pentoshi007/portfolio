import Link from 'next/link';
import { Calendar, ArrowUpRight, ExternalLink, Clock3, FileText, Radio, Terminal } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Metadata } from 'next';
import ProgressiveImage from '@/components/ProgressiveImage';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Blogs by Aniket Pandey with writeups, tutorials, notes, and practical lessons from things he is learning and building.',
  keywords: [
    'Aniket Pandey',
    'Aniket Pandey blogs',
    'Aniket Pandey website',
    'cybersecurity blog',
    'penetration testing tutorials',
    'web development blog',
    'MERN stack tutorials',
    'security research',
    'ethical hacking',
    'full stack developer blog',
    'programming tutorials',
    'tech blog India',
    'claude opus 4.5 free',
    'claude antigravity',
    'oh-my-opencode',
    'claude antigravity proxy',
  ],
  authors: [{ name: 'Aniket Pandey' }],
  creator: 'Aniket Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogs.aniketpandey.website',
    siteName: 'Aniket Pandey Blogs',
    title: 'Blogs and Notes | Aniket Pandey',
    description: 'Writeups, tutorials, notes, and practical lessons from things Aniket Pandey is learning and building.',
    images: [
      {
        url: 'https://blogs.aniketpandey.website/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Aniket Pandey Blogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs | Aniket Pandey',
    description: 'Writeups, tutorials, notes, and practical lessons from things Aniket Pandey is learning and building.',
    creator: '@thelunatic_ak_',
    images: ['https://blogs.aniketpandey.website/og-default.png'],
  },
  alternates: {
    canonical: 'https://blogs.aniketpandey.website',
  },
};

export const revalidate = 60;

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  body: string;
  coverImage?: string;
  published: boolean;
  createdAt: string;
}

// Strip markdown formatting and get plain text preview
function getPlainTextPreview(markdown: string, maxLength: number = 180): string {
  return markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove extra whitespace
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, maxLength);
}

function getReadingMinutes(markdown: string): number {
  const plainText = getPlainTextPreview(markdown, 10000);
  const words = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogsPage() {
  await dbConnect();
  // Only fetch fields needed for the listing page (not full body)
  const blogs = await Blog.find({ published: true })
    .select('_id title slug body coverImage createdAt')
    .sort({ createdAt: -1 })
    .lean();
  
  // Convert MongoDB documents to plain objects for the component
  const publishedBlogs = blogs.map(b => ({
    ...b,
    _id: (b as any)._id.toString(),
    createdAt: (b as any).createdAt.toISOString(),
    updatedAt: (b as any).updatedAt?.toISOString(),
  })) as unknown as BlogData[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Aniket Pandey Blogs',
    url: 'https://blogs.aniketpandey.website',
    description: 'Blogs by Aniket Pandey with writeups, tutorials, notes, and practical lessons from things he is learning and building.',
    author: {
      '@type': 'Person',
      name: 'Aniket Pandey',
      url: 'https://aniketpandey.website',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: publishedBlogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://blogs.aniketpandey.website/${blog.slug}`,
        name: blog.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
        <header className="sticky top-0 z-50 border-b border-[#0fa]/20 bg-[#0a0a0f]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0f]/85">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl md:text-2xl font-bold text-white tracking-normal">
                  <span className="text-[#0fa]">//</span> blogs
                </h1>
                <p className="text-gray-500 font-mono text-sm md:text-xs mt-1">writeups, tutorials, and notes</p>
              </div>
              <a
                href="https://aniketpandey.website"
                className="flex items-center gap-2 text-gray-500 hover:text-[#0fa] transition-colors font-mono text-sm md:text-xs w-fit"
              >
                portfolio
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        <main className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-10">
          <div className="pointer-events-none absolute inset-x-4 top-0 hidden h-64 border-x border-[#0fa]/5 bg-[linear-gradient(rgba(0,255,170,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.035)_1px,transparent_1px)] bg-[size:48px_48px] lg:block" />

          {publishedBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-mono">$ no posts yet</p>
              <p className="text-gray-600 text-sm mt-2">Check back soon!</p>
            </div>
          ) : (
            <>
              <section className="relative hidden lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-8 lg:pb-8" aria-labelledby="blog-index-title">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 border border-[#0fa]/20 bg-[#0fa]/5 px-3 py-1.5 font-mono text-xs text-[#0fa]">
                    <Radio className="h-3.5 w-3.5" />
                    {publishedBlogs.length.toString().padStart(2, '0')} posts
                  </div>
                  <h2 id="blog-index-title" className="max-w-3xl text-5xl font-bold leading-tight text-white">
                    Blogs, writeups, and notes.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400">
                    A simple collection of tutorials, walkthroughs, opinions, and notes from things I am learning or building. Newer posts stay first so the page is easy to skim.
                  </p>
                </div>

                <aside className="h-full border border-[#0fa]/15 bg-[#0f0f18]/70 p-5">
                  <div className="mb-5 flex items-center justify-between border-b border-[#0fa]/10 pb-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#0fa]">
                      <Terminal className="h-4 w-4" />
                      blog summary
                    </div>
                    <span className="status-dot" aria-hidden="true" />
                  </div>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="font-mono text-[11px] uppercase text-gray-600">posts</dt>
                      <dd className="mt-1 text-3xl font-bold text-white">{publishedBlogs.length}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase text-gray-600">latest</dt>
                      <dd className="mt-2 font-mono text-xs text-gray-400">{formatPostDate(publishedBlogs[0].createdAt)}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-[#0fa]/10 pt-4 font-mono text-xs leading-6 text-gray-500">
                    <p><span className="text-[#0fa]">-</span> newest posts appear first</p>
                    <p><span className="text-[#0fa]">-</span> short previews for quick scanning</p>
                  </div>
                </aside>
              </section>

              <section aria-label="Published blog posts" className="relative space-y-6 lg:grid lg:grid-cols-12 lg:auto-rows-[minmax(215px,auto)] lg:gap-5 lg:space-y-0">
                {publishedBlogs.map((blog: BlogData, index: number) => {
                  const isFeatured = index === 0;
                  const isSecondary = index === 1 || index === 2;
                  const cardLayout = isFeatured
                    ? 'lg:col-span-7 lg:row-span-2 lg:min-h-[520px]'
                    : isSecondary
                      ? 'lg:col-span-5'
                      : 'lg:col-span-4';
                  const cardPadding = isFeatured ? 'lg:p-7' : 'lg:p-5';
                  const imageLayout = isFeatured
                    ? 'h-48 lg:h-72'
                    : isSecondary
                      ? 'h-48 lg:h-32'
                      : 'h-48 lg:h-28';
                  const previewLength = isFeatured ? 260 : 170;

                  return (
                    <article key={blog._id} className={cardLayout}>
                      <Link
                        href={`/${blog.slug}`}
                        className={`block hacker-card p-6 group hover:border-[#0fa]/40 transition-all lg:flex lg:h-full lg:flex-col ${cardPadding}`}
                        aria-label={`Read ${blog.title}`}
                      >
                        <div className="mb-4 flex items-center justify-between gap-3 lg:order-2 lg:mb-0 lg:mt-auto lg:border-t lg:border-[#0fa]/10 lg:pt-4">
                          <time dateTime={blog.createdAt} className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                            <Calendar className="w-3 h-3" />
                            {formatPostDate(blog.createdAt)}
                          </time>
                          <span className="hidden items-center gap-1.5 text-gray-600 font-mono text-[11px] lg:flex">
                            <Clock3 className="h-3 w-3" />
                            {getReadingMinutes(blog.body)} min
                          </span>
                        </div>

                        {blog.coverImage ? (
                          <div className={`mb-4 overflow-hidden relative ${imageLayout} lg:order-1`}>
                            <ProgressiveImage
                              src={blog.coverImage}
                              alt={blog.title}
                              fill
                              sizes={isFeatured ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 33vw'}
                              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                              priority={isFeatured}
                            />
                          </div>
                        ) : (
                          <div className={`mb-4 hidden ${imageLayout} border border-[#0fa]/10 bg-[#0fa]/[0.03] font-mono text-xs text-[#0fa]/50 lg:order-1 lg:flex lg:items-center lg:justify-center`}>
                            <FileText className="mr-2 h-4 w-4" />
                            no_cover_image
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-4 lg:order-1 lg:mb-4">
                          <div>
                            {isFeatured && (
                              <p className="mb-3 hidden font-mono text-xs uppercase tracking-[0.24em] text-[#0fa] lg:block">latest post</p>
                            )}
                            <h2 className={`text-xl font-bold text-white group-hover:text-[#0fa] transition-colors flex items-start gap-2 ${isFeatured ? 'lg:text-3xl lg:leading-tight' : 'lg:text-lg lg:leading-snug'}`}>
                              {blog.title}
                              <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h2>
                            <p className={`text-gray-400 text-sm mt-2 line-clamp-2 ${isFeatured ? 'lg:mt-4 lg:line-clamp-4 lg:text-base lg:leading-7' : 'lg:line-clamp-3 lg:leading-6'}`}>
                              {getPlainTextPreview(blog.body, previewLength)}...
                            </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </section>
            </>
          )}
        </main>

        <footer className="border-t border-[#0fa]/10 py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <p className="text-gray-500 font-mono text-xs">
              <span className="text-[#0fa]">$</span> echo "Built by Aniket Pandey"
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
