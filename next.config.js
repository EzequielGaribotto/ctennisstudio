// Content Security Policy: only allow what the site actually uses.
// - flags (react-country-flag) come from cdn.jsdelivr.net, the map from google.com
// - vercel.live = Vercel's preview toolbar (preview deployments only)
// Not applied in `next dev`, which needs eval for hot reload.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.jsdelivr.net https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "media-src 'self'",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://www.google.com https://vercel.live",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Let phones on the same Wi-Fi load the dev server (npm run celular)
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*'],
  reactStrictMode: true,
  // Add security headers to all responses
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '0'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          ...(process.env.NODE_ENV === 'production'
            ? [{ key: 'Content-Security-Policy', value: csp }]
            : []),
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig