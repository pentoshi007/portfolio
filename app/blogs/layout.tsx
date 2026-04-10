import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blogs.aniketpandey.website'),
  title: {
    default: 'Aniket Pandey Blogs',
    template: '%s | Aniket Pandey Blogs',
  },
  description: 'Technical blogs by Aniket Pandey covering cybersecurity, penetration testing, web development, and security research.',
  authors: [{ name: 'Aniket Pandey' }],
  creator: 'Aniket Pandey',
  alternates: {
    canonical: 'https://blogs.aniketpandey.website',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogs.aniketpandey.website',
    siteName: 'Aniket Pandey Blogs',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@thelunatic_ak_',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
