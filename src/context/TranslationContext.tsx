"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "../app/translations";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS, LOCALE, THEME, ThemeType } from "../constants";

interface TranslationContextType {
  t: (key: string) => string;
  locale: string;
  changeLocale: (newLocale: string) => void;
  theme: ThemeType;
  changeTheme: (newTheme: ThemeType) => void;
  pageLoadTime: number | null;
  isHydrated: boolean;
}

interface NestedTranslation {
  [key: string]: string | NestedTranslation | Record<string, unknown>[] | string[];
}

type TranslationsType = {
  [locale: string]: NestedTranslation;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({
  children,
  initialLocale = LOCALE.ES,
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) => {
  // Add a state to track hydration completion
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Check if theme/locale was set by the script before React hydration
  const getInitialTheme = (): ThemeType => {
    if (typeof document !== 'undefined') {
      const dataTheme = document.documentElement.dataset.theme as ThemeType;
      if (dataTheme && (dataTheme === THEME.DARK || dataTheme === THEME.LIGHT)) {
        return dataTheme;
      }
    }
    return THEME.LIGHT;
  };

  // IMPORTANT: Always start with initialLocale during SSR to avoid hydration mismatch
  const getInitialLocale = (): string => {
    // During SSR, return initialLocale
    if (typeof document === 'undefined') {
      return initialLocale;
    }
    
    // On client, we can use stored value
    const dataLocale = document.documentElement.dataset.locale;
    if (dataLocale && (dataLocale === LOCALE.EN || dataLocale === LOCALE.ES)) {
      return dataLocale;
    }
    
    return initialLocale;
  };

  const [locale, setLocale] = useLocalStorage(STORAGE_KEYS.LOCALE, getInitialLocale());
  const [theme, setTheme] = useLocalStorage<ThemeType>(STORAGE_KEYS.THEME, getInitialTheme());
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);

  // Mark hydration as complete after the initial render with a delay to ensure stability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Longer delay to ensure everything is stable
      const timer = setTimeout(() => {
        setIsHydrated(true);
        setPageLoadTime(Math.round(performance.now()));
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', newLocale);
      document.documentElement.dataset.locale = newLocale;
    }
  };

  const t = (key: string) => {
    try {
      const keys = key.split(".");
      let value: NestedTranslation = (translations as TranslationsType)[locale];

      for (const k of keys) {
        if (value === undefined || value === null) {
          console.warn(`Missing translation for key: ${key}`);
          return key;
        }
        const nextValue = value[k];

        if (typeof nextValue === "string") {
          return nextValue;
        }

        if (nextValue && typeof nextValue === "object") {
          value = nextValue as NestedTranslation;
        } else {
          console.warn(`Invalid translation for key: ${key}`);
          return key;
        }
      }

      return key;
    } catch (error) {
      console.warn(`Error accessing translation for key: ${key}`, error);
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ 
      t, 
      locale, 
      changeLocale, 
      theme, 
      changeTheme, 
      pageLoadTime, 
      isHydrated 
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};