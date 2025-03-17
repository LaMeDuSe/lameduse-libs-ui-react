/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    images: {
        domains: ['link.lamedusegroup.com', 'blog.lamedusegroup.com', "lamedusegroup.com"],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
    },
}

module.exports = nextConfig
