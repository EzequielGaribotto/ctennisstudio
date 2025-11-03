"use client"

import { useTranslation } from "@/context/TranslationContext"
import styles from "./Footer.module.css"
import { useEffect, useState } from "react"

export default function Footer() {
  const { t, theme, isHydrated } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const footerContentStyle = {
    backgroundColor: theme === "dark" ? "rgba(45, 55, 72, 0.5)" : "rgba(226, 232, 240, 0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
  }

  if (!isClient || !isHydrated) {
    return (
      <footer className="w-full py-3 px-4 flex justify-center">
        <div className={styles.footerContent} style={{ visibility: "hidden" }}></div>
      </footer>
    )
  }

  return (
    <footer className="w-full py-3 px-4 flex justify-center">
      <div className={styles.footerContent} style={footerContentStyle}>
        <div className={styles.footerInfo}>
          <p className={styles.copyright}>{t("footer.copyright")}</p>
          <div className={styles.links}>
            <a href="#privacy" className={styles.link}>
              {t("footer.privacy")}
            </a>
            <span className={styles.separator}>•</span>
            <a href="#cookies" className={styles.link}>
              {t("footer.cookies")}
            </a>
            <span className={styles.separator}>•</span>
            <a href="#contact" className={styles.link}>
              {t("footer.contact")}
            </a>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="WhatsApp"
          >
            💬
          </a>
        </div>
      </div>
    </footer>
  )
}
