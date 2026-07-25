/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'postimg.cc' },
            { protocol: 'https', hostname: 'i.postimg.cc' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'aniketpandey.website' },
            { protocol: 'https', hostname: 'blogs.aniketpandey.website' },
            { protocol: 'https', hostname: 'admin.aniketpandey.website' },
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

        return [
            {
                source: '/:path*',
                headers: [
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
                    { key: 'Access-Control-Allow-Origin', value: allowedOrigins },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
