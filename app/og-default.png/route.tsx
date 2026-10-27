import { renderOgImage } from '@/lib/ogImage';

export const dynamic = 'force-static';

// Default blog social preview: https://blogs.aniketpandey.website/og-default.png
export function GET() {
  return renderOgImage({
    eyebrow: '$ cat ~/blogs',
    title: 'Aniket Pandey Blogs',
    subtitle: 'Write-ups, tutorials and notes on security and development',
    footer: 'blogs.aniketpandey.website',
  });
}
