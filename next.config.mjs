/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allow images from this domain
        port: '',
        pathname: '/**', // Allow all paths under images.unsplash.com
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com', // Allow other assets or resources from unsplash.com
        port: '',
        pathname: '/**', // Allow all paths under unsplash.com
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Allow images from this domain
        port: '',
        pathname: '/**', // Allow all paths under images.unsplash.com
      },
    ]
  }
};

export default nextConfig;
