"use client"

import { useTranslation } from "@/context/TranslationContext"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import styles from "./Footer.module.css"
import { useEffect, useState } from "react"

export default function Footer() {
  const { t, isHydrated } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !isHydrated) {
    return (
      <footer className="w-full py-3 px-4 flex justify-center">
        <div className={styles.footerContent} style={{ visibility: "hidden" }}></div>
      </footer>
    )
  }

  return (
    <footer className="w-full py-3 px-4 flex justify-center">
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <p className={styles.copyright}>{t("footer.copyright")}</p>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/ctennisstudio"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/pablogaribottogarcia/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://wa.me/34630530839"
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
