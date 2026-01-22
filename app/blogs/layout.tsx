import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://blogs.aniketpandey.website'),
  title: {
    default: 'Blog | Aniket Pandey',
    template: '%s | Aniket Pandey Blog',
  },
  description: 'Technical blog by Aniket Pandey covering cybersecurity, penetration testing, web development, and security research.',
  authors: [{ name: 'Aniket Pandey' }],
  creator: 'Aniket Pandey',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogs.aniketpandey.website',
    siteName: 'Aniket Pandey Blog',
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
