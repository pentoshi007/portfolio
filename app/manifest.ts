import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aniket Pandey | Full-Stack Developer & Cybersecurity Analyst',
    short_name: 'Aniket Pandey',
    description:
      'Portfolio of Aniket Pandey: full-stack development (MERN, Next.js, TypeScript) and cybersecurity (SOC, threat detection, penetration testing).',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
