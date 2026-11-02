"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { whatsappUrl } from "@/data/contact"
import ThemeToggle from "../theme/ThemeToggle"
import LanguageSwitcher from "../language/LanguageSwitcher"
import styles from "./Header.module.css"

// Menu order (labels in translations "navigation.*")
const NAV_ITEMS = [
  { key: "inicio", href: "/" },
  { key: "experiencia", href: "/#experiencia" },
  { key: "encordado", href: "/encordado/" },
  { key: "equilibrado", href: "/equilibrado/" },
  { key: "cursos", href: "/#cursos" },
  { key: "gestion", href: "/tournament-stringing-management/" },
  { key: "contacto", href: "/contact/" },
] as const

const Header: React.FC = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = NAV_ITEMS.map(({ key, href }) => (
    <li key={key}>
      <Link
        href={href}
        className={`${styles.navLink} ${key === "gestion" ? styles.navLinkLong : ""}`}
        aria-current={href === pathname ? "page" : undefined}
        onClick={() => setMobileMenuOpen(false)}
      >
        {t(`navigation.${key}`)}
      </Link>
    </li>
  ))

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label="Custom Tennis Studio">
          <Image
            src="/images/logo/cts_logo_emblem.webp"
            alt=""
            width={512}
            height={512}
            priority
            className={`${styles.logoImage} cts-logo`}
          />
        </Link>

        <nav className={styles.navigation}>
          <ul className={styles.navList}>{links}</ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={whatsappUrl(t("common.whatsappGeneric"))}
            target="_blank"
            rel="noopener noreferrer"
            className={`cts-btn ${styles.whatsapp}`}
          >
            <FaWhatsapp aria-hidden="true" /> WhatsApp
          </a>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("common.menu")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className={styles.mobileMenu}>
          <ul>{links}</ul>
        </nav>
      )}
    </header>
  )
}

export default Header
