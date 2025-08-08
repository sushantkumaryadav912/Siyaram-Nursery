const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
      },
    ],
  },
  images: {
    domains: ['<your-project>.supabase.co'],
    formats: ['image/avif','image/webp'],
  },
  experimental: { appDir: true }
};

export default nextConfig;