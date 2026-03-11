/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─── Image domains: allow Pexels and any external URLs stored in the DB ───
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: '*.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/**',
            },
        ],
        // Enable modern image formats for faster loads
        formats: ['image/avif', 'image/webp'],
        // Limit image cache to 60 days
        minimumCacheTTL: 60 * 60 * 24 * 60,
    },

    // ─── Compression for faster page loads ────────────────────────────────────
    compress: true,

    // ─── Reduce bundle payload ─────────────────────────────────────────────────
    poweredByHeader: false,

    // ─── Server Actions body limit (for image uploads) ─────────────────────────
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
