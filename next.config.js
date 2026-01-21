/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for subdomain routing
    // Rewrites moved to proxy.ts (middleware) for better control
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
