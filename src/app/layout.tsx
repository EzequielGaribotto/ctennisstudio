import "./globals.css";
import { TranslationProvider } from "../context/TranslationContext";
import Header from "../components/header/Header";
import Footer from "../components/section/footer/Footer";
import { Metadata, Viewport } from 'next';
import translations from '../app/translations';
import Script from 'next/script';
import ScrollRestorationWrapper from '../components/ScrollRestorationWrapper';
import HydrationGuard from '../components/HydrationGuard';
import CloudflareScripts from '../components/analytics/CloudflareScripts';

// Generate metadata with translations
export function generateMetadata(): Metadata {
  // Use Spanish as default language for static metadata generation
  const locale = 'es';
  const meta = translations[locale].meta;
  const root = '/images/logo'

  return {
    title: meta.title,
    description: meta.description,
    manifest: `${root}/site.webmanifest`,
    icons: {
      icon: [
        { url: `${root}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
        { url: `${root}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
        { url: `/favicon.ico` },
      ],
      apple: `${root}/apple-touch-icon.png`,
      other: [
        { url: `${root}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
        { url: `${root}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
      ],
    },
    // Update Content Security Policy to include cloudflareinsights.com
    other: {
      'Content-Security-Policy': 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflareinsights.com https://static.cloudflareinsights.com https://*.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: blob: https:; " +
        "font-src 'self'; " +
        "connect-src 'self' https://*.cloudflareinsights.com https://cloudflareinsights.com https://cloudflareinsights.com/cdn-cgi/* https://*.cloudflare.com; " +
        "frame-src 'self' blob: data:; " +
        "object-src 'self'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-ancestors 'self';"
    }
  };
}

// Add a new generateViewport function
export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    // Move themeColor here
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#f3f4f8' },
      { media: '(prefers-color-scheme: dark)', color: '#13151a' }
    ],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialLocale = "es"; // Default language

  return (
    <html lang={initialLocale} suppressHydrationWarning={true}>
      <head>
        {/* Add color-scheme meta tag to help browsers */}
        <meta name="color-scheme" content="dark light" />
        
        {/* Critical script to set theme and locale ASAP */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                // Prevent any flash by setting a class immediately
                document.documentElement.classList.add('initializing');
                
                // Handle theme
                const savedTheme = localStorage.getItem('theme');
                let resolvedTheme;
                
                if (savedTheme && (savedTheme.includes('light') || savedTheme.includes('dark'))) {
                  resolvedTheme = JSON.parse(savedTheme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  resolvedTheme = 'dark';
                } else {
                  resolvedTheme = 'light';
                }
                
                // Apply theme to document
                document.documentElement.dataset.theme = resolvedTheme;
                
                // Handle locale - IMPORTANT: Don't change the default here to match server rendering
                // We only apply saved locale if explicitly present
                let resolvedLocale = 'es'; // Default - MUST match initialLocale above
                const savedLocale = localStorage.getItem('locale');
                
                if (savedLocale && (savedLocale.includes('es') || savedLocale.includes('en'))) {
                  resolvedLocale = JSON.parse(savedLocale);
                }
                
                // Apply locale to document
                document.documentElement.setAttribute('lang', resolvedLocale);
                document.documentElement.dataset.locale = resolvedLocale;
                
              } catch (e) {
                // Fallback to defaults if any error occurs
                document.documentElement.dataset.theme = 'light';
                console.error('Failed to apply theme/locale:', e);
              }
            })();
          `}
        </Script>
        
        {/* Replace direct Cloudflare script with CloudflareScripts component */}
        <CloudflareScripts />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <TranslationProvider initialLocale={initialLocale}>
          {/* Make ScrollRestorationWrapper the outermost wrapper */}
          <ScrollRestorationWrapper>
            {/* Apply HydrationGuard within ScrollRestorationWrapper */}
            <HydrationGuard>
              <Header />
              <main style={{ 
                paddingTop: "100px",
                width: "100%",
                flex: "1 0 auto"
              }}>
                {children}
              </main>
              <Footer />
            </HydrationGuard>
          </ScrollRestorationWrapper>
        </TranslationProvider>
      </body>
    </html>
  );
}