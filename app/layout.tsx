import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
  description: 'Full-stack web developer and cybersecurity analyst with hands-on experience in MERN stack development, penetration testing, and threat intelligence.',
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
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
