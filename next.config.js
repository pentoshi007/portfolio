/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24,
        formats: ['image/avif', 'image/webp'],
    },

    compress: true,
    productionBrowserSourceMaps: false,
    turbopack: {},

    async headers() {
        const allowedOrigins = [
            'https://aniketpandey.website',
            'https://blogs.aniketpandey.website',
        ].join(' ');

        const csp = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https:",
            "frame-src https://tryhackme.com",
            "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
            "worker-src 'self' blob:",
            "media-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests",
        ].join('; ');

        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Content-Security-Policy', value: csp },
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                    { key: 'Access-Control-Allow-Origin', value: allowedOrigins },
                ],
            },
            {
                source: '/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
                    { key: 'Access-Control-Allow-Origin', value: allowedOrigins },
                ],
            },
            {
                source: '/api/og-image',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
