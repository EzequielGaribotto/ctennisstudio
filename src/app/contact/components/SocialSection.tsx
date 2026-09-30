"use client"
import type React from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "../page.module.css"
import { SOCIAL_LINKS } from "@/data/contact"

export const SocialSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.infoSection}>
      <h3 className={styles.infoSectionTitle}>{t("contact.info.social")}</h3>
      <div className={styles.socialLinks}>
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Facebook"
        >
          <FaFacebook className={styles.socialIcon} />
          <span className={styles.socialText}>Facebook</span>
        </a>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Instagram"
        >
          <FaInstagram className={styles.socialIcon} />
          <span className={styles.socialText}>Instagram</span>
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          <FaLinkedin className={styles.socialIcon} />
          <span className={styles.socialText}>LinkedIn</span>
        </a>
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="WhatsApp"
        >
          <FaWhatsapp className={styles.socialIcon} />
          <span className={styles.socialText}>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
