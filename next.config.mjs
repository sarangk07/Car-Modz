/** @type {import('next').NextConfig} */
const nextConfig = {
//for adding Next Image scr like eg:{img.url}-----------
    images: {
        domains: [
          '127.0.0.1',  // Add your local backend server hostname
          'localhost',  // Also add localhost for local development
          // Add any other hostnames you might use
        ],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8000',
            pathname: '/media/post_images/**',
          }
        ]
      },
};

export default nextConfig;
