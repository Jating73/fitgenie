/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "v2.exercisedb.io" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.supabase.in" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "img-src 'self' data: blob: https:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
