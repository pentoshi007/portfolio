import type { Metadata, Viewport } from 'next';
import { Fira_Code, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

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

const siteTitle = 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst';
const siteDescription =
  'Aniket Pandey is a full-stack developer (MERN, Next.js, TypeScript) and cybersecurity analyst (SOC, Microsoft Sentinel, threat detection, penetration testing). Creator of clai, an open-source AI coding CLI with 100k+ npm downloads.';
const ogImage = {
  url: 'https://aniketpandey.website/og.png',
  width: 1200,
  height: 630,
  alt: 'Aniket Pandey - Full-Stack Developer & Cybersecurity Analyst',
};

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Aniket Pandey',
  },
  description: siteDescription,
  applicationName: 'Aniket Pandey Portfolio',
  keywords: [
    'Aniket Pandey',
    'pentoshi',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'Cybersecurity Analyst',
    'SOC Analyst',
    'Penetration Tester',
    'Microsoft Sentinel',
    'Threat Intelligence',
    'AI Security',
    'clai',
    'JNU',
  ],
  authors: [{ name: 'Aniket Pandey', url: 'https://aniketpandey.website' }],
  creator: 'Aniket Pandey',
  publisher: 'Aniket Pandey',
  category: 'technology',
  metadataBase: new URL('https://aniketpandey.website'),
  alternates: {
    canonical: 'https://aniketpandey.website',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_IN',
    url: 'https://aniketpandey.website',
    siteName: 'Aniket Pandey',
    title: siteTitle,
    description: siteDescription,
    firstName: 'Aniket',
    lastName: 'Pandey',
    username: 'pentoshi007',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: '@thelunatic_ak_',
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
    <html lang="en-IN" className={`${firaCode.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://ghchart.rshah.org" />
        <link rel="dns-prefetch" href="https://tryhackme.com" />
      </head>
      <body className="antialiased">{children}<Analytics /></body>
    </html>
  );
}
