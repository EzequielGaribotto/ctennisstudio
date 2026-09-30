"use client"

import { useTranslation } from "@/context/TranslationContext"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import styles from "./Footer.module.css"
import { useEffect, useState } from "react"
import { SOCIAL_LINKS } from "@/data/contact"

export default function Footer() {
  const { t, isHydrated } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !isHydrated) {
    return (
      <footer className="w-full py-3 flex justify-center">
        <div className={styles.footerContent} style={{ visibility: "hidden" }}></div>
      </footer>
    )
  }

  return (
    <footer className="w-full py-3 flex justify-center">
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <p className={styles.copyright}>{t("footer.copyright").replace("{year}", String(new Date().getFullYear()))}</p>
          <Link href="/contact" className={styles.contactButton}>
            {t("navigation.contacto")}
          </Link>
        </div>

        <div className={styles.socialLinks}>
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  )
}
