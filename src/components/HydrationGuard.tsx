"use client";

import { useEffect, useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

interface HydrationGuardProps {
  children: React.ReactNode;
}

export default function HydrationGuard({ children }: HydrationGuardProps) {
  const [mounted, setMounted] = useState(false);
  const { isHydrated } = useTranslation();

  // This useEffect will only run once on the client after initial render
  useEffect(() => {
    setMounted(true);
    
    // Add class to body when mounted to enable transitions
    if (typeof document !== 'undefined') {
      document.body.classList.add('client-mounted');
    }
  }, []);

  // When fully hydrated, add a class to enable smooth transitions
  useEffect(() => {
    if (isHydrated && typeof document !== 'undefined') {
      document.body.classList.add('hydration-complete');
      
      // Add transition theme after a small delay
      const timer = setTimeout(() => {
        document.documentElement.classList.add('transition-theme');
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isHydrated]);

  // Don't block rendering completely - instead render with controlled opacity
  // This preserves DOM structure for ScrollRestorationWrapper
  return (
    <div style={{ 
      opacity: mounted ? (isHydrated ? 1 : 0.98) : 0.95,
      transition: 'opacity 300ms ease-in',
      width: '100%',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}>
      {children}
      
      {/* Show a full-page overlay only during initial load */}
      {!mounted && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0,
          bottom: 0,
          background: 'var(--background)',
          zIndex: 9999
        }}></div>
      )}
    </div>
  );
}
