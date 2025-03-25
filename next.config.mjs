/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**", // Allows all external images (not recommended for security)
          },
        ],
      },
}

export default nextConfig
