import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
    template: '%s | Aniket Pandey',
  },
  description: 'Full-stack web developer and cybersecurity analyst with hands-on experience in MERN stack development, penetration testing, and threat intelligence.',
  keywords: ['developer', 'cybersecurity', 'full-stack', 'MERN', 'penetration testing', 'web developer'],
  authors: [{ name: 'Aniket Pandey' }],
  creator: 'Aniket Pandey',
  metadataBase: new URL('https://aniketpandey.website'),
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aniketpandey.website',
    siteName: 'Aniket Pandey Portfolio',
    title: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
    description: 'Full-stack web developer and cybersecurity analyst with hands-on experience in MERN stack development, penetration testing, and threat intelligence.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
    description: 'Full-stack web developer and cybersecurity analyst',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
