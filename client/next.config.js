/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/guestbook',
    typescript: {
        ignoreBuildErrors: false,
    },
    output: "export",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
