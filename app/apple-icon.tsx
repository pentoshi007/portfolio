import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// PNG apple-touch-icon (iOS does not support SVG touch icons).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          color: '#00ffaa',
          fontSize: 120,
          fontWeight: 700,
          fontFamily: 'monospace',
          paddingBottom: 12,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
