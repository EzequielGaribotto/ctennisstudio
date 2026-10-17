"use client"
import type React from "react"
import { useEffect, useRef } from "react"

// Cloudflare Turnstile: a free, privacy-friendly "are you a person?" check for the contact form.
// Needs NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time; without it nothing is rendered (see route.ts).
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      theme?: "light" | "dark" | "auto"
      language?: string
      callback: (token: string) => void
      "expired-callback": () => void
      "error-callback": () => void
    }
  ) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile unavailable")))
    script.onerror = () => {
      scriptPromise = null // allow a retry on the next mount
      reject(new Error("Turnstile failed to load"))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

interface TurnstileWidgetProps {
  /** Called with a one-time token when the visitor passes, or null when it expires/fails. */
  onToken: (token: string | null) => void
  locale: string
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onToken, locale }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const onTokenRef = useRef(onToken)

  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current) return
    const container = containerRef.current
    let widgetId: string | null = null
    let cancelled = false

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled) return
        widgetId = turnstile.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "light",
          language: locale === "en" ? "en" : "es",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        })
      })
      .catch(() => onTokenRef.current(null))

    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [locale])

  if (!TURNSTILE_SITE_KEY) return null
  return <div ref={containerRef} style={{ minHeight: 65, display: "flex", justifyContent: "center" }} />
}
