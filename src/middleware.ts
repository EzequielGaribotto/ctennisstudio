import { NextResponse, type NextRequest } from "next/server"

// Content Security Policy with a fresh nonce per request.
//
// Scripts may only run if they carry this request's nonce (Next.js adds it to its own scripts
// automatically) or were loaded by such a script ('strict-dynamic'). An attacker who manages to
// inject markup into a page therefore can't run their own script.
//
// style-src keeps 'unsafe-inline' because React `style={{...}}` attributes can't carry a nonce;
// that's low risk (styles can't execute code) and a nonce there would make browsers ignore it.
//
// When you add a new external service (analytics, chat widget, captcha...) it must be allowed
// here, and only after Ezequiel/Pablo agreed to it (see "Security rules" in CLAUDE.md).
export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next() // dev server needs eval

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  // "Upgrade to https" would break testing a production build on http://localhost
  const isLocal = ["localhost", "127.0.0.1"].includes(request.nextUrl.hostname)
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com https://vercel.live`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.jsdelivr.net https://vercel.live https://vercel.com",
    "font-src 'self' data: https://vercel.live",
    "media-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com https://vercel.live wss://ws-us3.pusher.com",
    "frame-src https://www.google.com https://challenges.cloudflare.com https://vercel.live",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    ...(isLocal ? [] : ["upgrade-insecure-requests"]),
  ].join("; ")

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set("Content-Security-Policy", csp)
  return response
}

export const config = {
  matcher: [
    // Pages only: skip API routes, build assets, images/video and link prefetches
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|images|video).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
