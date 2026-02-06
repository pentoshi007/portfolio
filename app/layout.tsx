import type { Metadata, Viewport } from 'next';
import { Fira_Code, Space_Grotesk } from 'next/font/google';
import './globals.css';

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
  weight: ['400', '500', '600'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

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
    <html lang="en" className={`${firaCode.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
        <link rel="dns-prefetch" href="https://tryhackme.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
