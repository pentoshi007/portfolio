import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

type OgOptions = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
};

// Shared 1200x630 social preview card matching the site's terminal theme.
export function renderOgImage({ eyebrow, title, subtitle, footer }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0a0a0f',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,255,170,0.12) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          border: '2px solid rgba(0,255,170,0.25)',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#00ffaa' }}>{eyebrow}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#ffffff' }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#9ca3af', marginTop: 16 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#00ffaa' }}>{footer}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  );
}
