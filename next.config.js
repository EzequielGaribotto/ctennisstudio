// The Content Security Policy is set per request in src/middleware.ts (it needs a fresh nonce each time).

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Pages are rendered per request (CSP nonce). By default Next.js then streams <title>/<meta>
  // into <body> for normal browsers, which hides the description and link-preview (WhatsApp,
  // social) tags from some tools. Always put them in <head>.
  htmlLimitedBots: /.*/,
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