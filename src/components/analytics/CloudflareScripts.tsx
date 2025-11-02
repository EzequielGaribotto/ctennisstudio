'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function CloudflareScripts() {
  // Handle and suppress Cloudflare script errors
  useEffect(() => {
    // Create a function to intercept and handle network errors for Cloudflare scripts
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
      // Convert input to string if it's a Request object
      const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
      
      // For development environment, handle CORS issues with Cloudflare endpoints
      if (window.location.hostname === 'localhost' && 
          (url.includes('cloudflare') || url.includes('/cdn-cgi/'))) {
        // In development, just silently "succeed" with empty response to avoid console errors
        return new Response('', {
          status: 200,
          headers: { 'Content-Type': 'application/javascript' }
        });
      }
      
      // Handle Cloudflare analytics endpoints and network errors
      if ((url.includes('cloudflareinsights.com') || url.includes('/cdn-cgi/')) && 
          (url.includes('.js') || url.includes('/rum'))) {
        try {
          const response = await originalFetch(input, init);
          return response;
        } catch (error) {
          // Silently handle network errors, CORS issues, or connectivity problems
          if (error instanceof Error) {
            console.debug('Analytics request failed (this is normal if offline):', error.message);
          } else {
            console.debug('Analytics request failed (this is normal if offline):', error);
          }
          return new Response('', {
            status: 200,
            headers: { 'Content-Type': 'application/javascript' }
          });
        }
      }
      
      // Pass through all other requests
      return originalFetch(input, init);
    };

    // Listen for online/offline events to provide user feedback
    const handleOnlineStatus = () => {
      if (!navigator.onLine && process.env.NODE_ENV === 'development') {
        console.log('🔌 Currently offline - analytics will resume when connection is restored');
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // For development only - Check if analytics is likely blocked or network issues
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        // Check network status first
        if (!navigator.onLine) {
          console.log('🔌 Currently offline - analytics disabled');
          return;
        }

        // Check if our Cloudflare analytics is likely blocked
        const cfScript = document.querySelector('script[src*="cloudflareinsights"]');
        const hasAdBlocker = !cfScript || typeof window.__cfBeacon === 'undefined';
        
        if (hasAdBlocker) {
          console.log('ℹ️ Analytics may be blocked by an ad blocker - this is normal and won\'t affect site functionality');
        } else {
          console.log('✅ Analytics script loaded successfully');
        }
      }, 2000);
    }
    
    return () => {
      // Restore original fetch and remove event listeners when component unmounts
      window.fetch = originalFetch;
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Use different configuration for dev vs production - with SSR safety
  const getBeaconConfig = () => {
    const baseConfig = {
      token: "e2f56442b3874b58b8a4d8355050dc2c",
      spa: true,
    };

    // Only add development-specific config on client side
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return {
        ...baseConfig,
        disableRUM: true
      };
    }

    return baseConfig;
  };

  return (
    <>
      {/* Cloudflare Web Analytics with environment-specific settings */}
      <Script 
        id="cloudflare-analytics"
        strategy="afterInteractive"
        src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon={JSON.stringify(getBeaconConfig())}
        onError={(e) => {
          // Silently handle script loading errors
          console.debug('Analytics script failed to load:', e);
        }}
      />
    </>
  );
}

// Add TypeScript declaration for Cloudflare beacon
declare global {
  interface Window {
    __cfBeacon?: unknown;
  }
}
