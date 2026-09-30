import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/context/TranslationContext"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
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
}

// Dark browser UI (address bar / overscroll area) on mobile, matching the page background
export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  )
}
