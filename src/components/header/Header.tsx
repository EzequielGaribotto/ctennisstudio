"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "@/context/TranslationContext"
import LanguageSwitcher from "../language/LanguageSwitcher"
import ThemeToggleButton from "../button/ThemeToggleButton"
import styles from "./Header.module.css"
import Tooltip from "../tooltip/Tooltip"

const Header: React.FC = () => {
  const { t, theme, isHydrated } = useTranslation()
  const [activeSection, setActiveSection] = useState<string>("inicio")
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Define styles directly in the component
  const headerContentStyle = {
    backgroundColor: theme === "dark" ? "rgba(45, 55, 72, 0.5)" : "rgba(226, 232, 240, 0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)", // For Safari
    border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
  }

  // Handle smooth scrolling without updating URL hash
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      // Smooth scroll to element without updating URL
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header height
        behavior: "smooth",
      })
    }
  }

  // Update active section based on scroll position only
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "experiencia", "encordado", "equilibrado", "cursos"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render until client-side hydration is complete
  if (!isClient || !isHydrated) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <header className={styles.header}>
        <div className={styles.headerContent} style={{ visibility: "hidden" }}></div>
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent} style={headerContentStyle}>
        <Tooltip text={t("tooltips.logo")} position="bottom" forcePosition={true}>
          <a
            href="#inicio"
            onClick={scrollToSection("inicio")}
            className={styles.logoLink}
            aria-label={t("tooltips.logo")}
          >
            <div className={styles.logo}>CTS</div>
          </a>
        </Tooltip>

        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a
                href="#inicio"
                onClick={scrollToSection("inicio")}
                className={activeSection === "inicio" ? styles.active : ""}
              >
                {t("navigation.inicio")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#experiencia"
                onClick={scrollToSection("experiencia")}
                className={activeSection === "experiencia" ? styles.active : ""}
              >
                {t("navigation.experiencia")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#encordado"
                onClick={scrollToSection("encordado")}
                className={activeSection === "encordado" ? styles.active : ""}
              >
                {t("navigation.encordado")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#equilibrado"
                onClick={scrollToSection("equilibrado")}
                className={activeSection === "equilibrado" ? styles.active : ""}
              >
                {t("navigation.equilibrado")}
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#cursos"
                onClick={scrollToSection("cursos")}
                className={activeSection === "cursos" ? styles.active : ""}
              >
                {t("navigation.cursos")}
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.controls}>
          <LanguageSwitcher />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  )
}

export default Header
