import type React from "react"
import { connection } from "next/server"
import { cookies } from "next/headers"
import type { Metadata, Viewport } from "next"
import { Archivo } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/context/TranslationContext"

// Served from our own domain by Next.js. The width axis gives the wide headline voice.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

const SITE_TITLE = "CTS - Custom Tennis Studio | Pablo Garibotto"
const SITE_DESCRIPTION =
  "Encordado y equilibrado profesional de raquetas de tenis por Pablo Garibotto, encordador oficial en torneos ATP y WTA como Montecarlo, Madrid y Miami."

export const metadata: Metadata = {
  metadataBase: new URL("https://ctenisstudio.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Custom Tennis Studio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "es_ES",
    alternateLocale: ["en_GB"],
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Pablo Garibotto encordando una raqueta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  // Lets the publish step confirm which commit is live without needing GitHub access (the repo is private)
  other: { 'build-commit': process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local' },
}

// Browser UI (address bar / overscroll area) on mobile, matching the page background
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1a36" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Render every page per request: the Content Security Policy nonce (src/middleware.ts) is
  // different for each visit, so pages can't be pre-built at deploy time.
  await connection()

  // The visitor's light/dark choice, read on the server so the page never flashes the wrong colors.
  // No choice saved: the CSS follows the device setting.
  const savedTheme = (await cookies()).get("cts-theme")?.value
  const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : undefined

  return (
    <html lang="es" data-theme={theme} suppressHydrationWarning>
      <body className={`${archivo.variable} font-sans antialiased`}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  )
}
