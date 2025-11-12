"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import LanguageSwitcher from "../language/LanguageSwitcher"
import styles from "./Header.module.css"
import Tooltip from "../tooltip/Tooltip"

const Header: React.FC = () => {
  const { t, isHydrated } = useTranslation()
  const [activeSection, setActiveSection] = useState<string>("inicio")
  const [isClient, setIsClient] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle smooth scrolling without updating URL hash
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      let targetElement: HTMLElement = element
      let offset = 120
      
      if (sectionId === "inicio") {
        // For home section, target the profile image
        const profileImage = element.querySelector('[alt*="Pablo Garibotto"]')?.parentElement as HTMLElement
        targetElement = profileImage || element
        offset = 100 // Offset for header
      } else {
        // For other sections, get the title element for precise alignment
        const titleElement = element.querySelector('h2, h1, [class*="title"]') as HTMLElement
        targetElement = titleElement || element
      }
      
      // Smooth scroll to element without updating URL
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: "smooth",
      })
      // Close mobile menu if open
      setMobileMenuOpen(false)
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
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Tooltip text={"Custom Tennis Studio"} position="bottom" forcePosition={true}>
            <a
              href="#inicio"
              onClick={scrollToSection("inicio")}
              className={styles.logoLink}
              aria-label={"Custom Tennis Studio"}
            >
              <Image 
                src="/images/logo/ctennisstudio_logo.webp" 
                alt="CTS Logo" 
                width={60}
                height={60}
                className={styles.logo}
                priority
              />
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
            <button 
              className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <span className={styles.burgerIcon}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
          <nav>
            <ul className={styles.mobileNavList}>
              <li className={styles.mobileNavItem}>
                <a
                  href="#inicio"
                  onClick={scrollToSection("inicio")}
                  className={activeSection === "inicio" ? styles.active : ""}
                >
                  {t("navigation.inicio")}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a
                  href="#experiencia"
                  onClick={scrollToSection("experiencia")}
                  className={activeSection === "experiencia" ? styles.active : ""}
                >
                  {t("navigation.experiencia")}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a
                  href="#encordado"
                  onClick={scrollToSection("encordado")}
                  className={activeSection === "encordado" ? styles.active : ""}
                >
                  {t("navigation.encordado")}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a
                  href="#equilibrado"
                  onClick={scrollToSection("equilibrado")}
                  className={activeSection === "equilibrado" ? styles.active : ""}
                >
                  {t("navigation.equilibrado")}
                </a>
              </li>
              <li className={styles.mobileNavItem}>
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
        </div>
      </div>
    </>
  )
}

export default Header
