"use client"

import { useTranslation } from "@/context/TranslationContext"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import styles from "./Footer.module.css"
import { SOCIAL_LINKS } from "@/data/contact"
import { LEGAL_READY } from "@/data/legal"
import { getLegalDoc, getLegalPath, type LegalDocKey } from "@/data/legal-content"

const LEGAL_LINKS: LegalDocKey[] = ["notice", "privacy", "cookies"]

export default function Footer() {
  const { t, locale } = useTranslation()
  const lang = locale === "en" ? "en" : "es"

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Image
          src="/images/logo/cts_logo_full.webp"
          alt="CTS Custom Tennis Studio, powered by Pablo Garibotto"
          width={1200}
          height={456}
          className={`${styles.logo} cts-logo`}
        />

        <div className={styles.footerInfo}>
          <Link href="/contact/" className={styles.contactButton}>
            {t("navigation.contacto")}
          </Link>
          {LEGAL_READY && (
            <nav className={styles.legalLinks} aria-label={t("legal.navLabel")}>
              {LEGAL_LINKS.map((key) => (
                <Link key={key} href={getLegalPath(key)}>
                  {getLegalDoc(key, lang).title}
                </Link>
              ))}
            </nav>
          )}
          <p className={styles.copyright}>{t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}</p>
        </div>

        <div className={styles.socialLinks}>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook aria-hidden="true" />
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram aria-hidden="true" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin aria-hidden="true" />
          </a>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
