"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./ThemeToggle.module.css"

export const THEME_COOKIE = "cts-theme"
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

type Theme = "light" | "dark"

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<Theme>("light")

  // Server and first client render match; the real value is read right after mounting
  useEffect(() => {
    const saved = document.documentElement.dataset.theme
    if (saved === "light" || saved === "dark") {
      setTheme(saved)
      return
    }
    // No choice saved: the icon follows the device, also if it changes while the page is open
    const device = window.matchMedia("(prefers-color-scheme: dark)")
    const follow = () => {
      if (!document.documentElement.dataset.theme) setTheme(device.matches ? "dark" : "light")
    }
    follow()
    device.addEventListener("change", follow)
    return () => device.removeEventListener("change", follow)
  }, [])

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.dataset.theme = next
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`
  }

  const label = theme === "dark" ? t("common.themeToLight") : t("common.themeToDark")

  return (
    <button type="button" onClick={toggle} className={styles.toggle} aria-label={label} title={label}>
      {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
