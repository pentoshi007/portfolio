/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for subdomain routing
    async rewrites() {
        return {
            beforeFiles: [
                // Admin subdomain routing
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: 'admin.aniketpandey.website',
                        },
                    ],
                    destination: '/admin/:path*',
                },
                // Blogs subdomain routing
                {
                    source: '/:path*',
                    has: [
                        {
                            type: 'host',
                            value: 'blogs.aniketpandey.website',
                        },
                    ],
                    destination: '/blogs/:path*',
                },
            ],
        };
    },
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
