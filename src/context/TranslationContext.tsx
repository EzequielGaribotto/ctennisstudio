"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import translations from "@/app/translations"
import { useLocalStorage } from "@/hooks/useLocalStorage"

const STORAGE_KEYS = {
  LOCALE: "selected-locale",
} as const

const LOCALE = {
  ES: "es",
  EN: "en",
} as const

interface TranslationContextType {
  t: (key: string) => string
  locale: string
  changeLocale: (newLocale: string) => void
  pageLoadTime: number | null
  isHydrated: boolean
}

interface NestedTranslation {
  [key: string]: string | NestedTranslation | Record<string, unknown>[] | string[]
}

type TranslationsType = {
  [locale: string]: NestedTranslation
}

const TranslationContext = createContext<TranslationContextType | null>(null)

export const TranslationProvider = ({
  children,
  initialLocale = LOCALE.ES,
}: {
  children: React.ReactNode
  initialLocale?: string
}) => {
  const [isHydrated, setIsHydrated] = useState(false)

  const getInitialLocale = (): string => {
    if (typeof document === "undefined") {
      return initialLocale
    }

    const dataLocale = document.documentElement.dataset.locale
    if (dataLocale && (dataLocale === LOCALE.EN || dataLocale === LOCALE.ES)) {
      return dataLocale
    }

    return initialLocale
  }

  const [locale, setLocale] = useLocalStorage(STORAGE_KEYS.LOCALE, getInitialLocale())
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setIsHydrated(true)
        setPageLoadTime(Math.round(performance.now()))
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [])

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale)
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", newLocale)
      document.documentElement.dataset.locale = newLocale
    }
  }

  const t = (key: string) => {
    try {
      const keys = key.split(".")
      let value: NestedTranslation = (translations as TranslationsType)[locale]

      for (const k of keys) {
        if (value === undefined || value === null) {
          console.warn(`Missing translation for key: ${key}`)
          return key
        }
        const nextValue = value[k]

        if (typeof nextValue === "string") {
          return nextValue
        }

        if (nextValue && typeof nextValue === "object") {
          value = nextValue as NestedTranslation
        } else {
          console.warn(`Invalid translation for key: ${key}`)
          return key
        }
      }

      return key
    } catch (error) {
      console.warn(`Error accessing translation for key: ${key}`, error)
      return key
    }
  }

  return (
    <TranslationContext.Provider
      value={{
        t,
        locale,
        changeLocale,
        pageLoadTime,
        isHydrated,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
