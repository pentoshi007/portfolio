import { renderOgImage } from '@/lib/ogImage';

export const dynamic = 'force-static';

// Portfolio social preview: https://aniketpandey.website/og.png
export function GET() {
  return renderOgImage({
    eyebrow: '$ whoami',
    title: 'Aniket Pandey',
    subtitle: 'Full-Stack Developer & Cybersecurity Analyst',
    footer: 'aniketpandey.website',
  });
}
