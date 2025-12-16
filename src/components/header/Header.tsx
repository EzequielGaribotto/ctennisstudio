"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import LanguageSwitcher from "../language/LanguageSwitcher"
import styles from "./Header.module.css"

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
        // For other sections, scroll to the container (white card)
        const container = element.querySelector('[class*="container"]') as HTMLElement
        targetElement = container || element
        
        // Different offset for mobile vs desktop
        const isMobile = window.innerWidth <= 768
        offset = isMobile ? 80 : 120
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
          {/* Mobile: Burger left, LanguageSwitcher right, no logo */}
          <div className={styles.mobileLeft}>
            <button 
              className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <span className={styles.burgerIcon}></span>
            </button>
          </div>

          {/* Logo (visible on desktop / web only) */}
          <div className={styles.logo}>
            <Link href="/" aria-label="CTennisStudio home" className={styles.logoLink}>
              <Image
                src="/images/logo/ctennisstudio_logo.webp"
                alt="CTennisStudio"
                width={140}
                height={40}
                priority
                className={styles.logoImage}
              />
            </Link>
          </div>

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
              <li className={styles.navItem}>
                <Link href="/contact" className={styles.contactLink}>
                  {t("navigation.contacto")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Language switcher for desktop (visible on web) */}
          <div className={styles.desktopRight}>
            <LanguageSwitcher />
          </div>

          <div className={styles.mobileRight}>
            <LanguageSwitcher />
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
              <li className={styles.mobileNavItem}>
                <Link href="/contact" className={styles.contactLink}>
                  {t("navigation.contacto")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
