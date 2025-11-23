"use client"
import type React from "react"
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "../page.module.css"

export const LocationSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Location Info */}
      <div className={styles.infoSection}>
        <h3 className={styles.infoSectionTitle}>{t("contact.info.location")}</h3>
        <a
          href="https://www.google.com/maps/search/?api=1&query=C%2F+Jacint+Verdaguer%2C+31%2C+Matar%C3%B3"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          <FaMapMarkerAlt className={styles.contactIcon} />
          <span>C/ Jacint Verdaguer, 31, Mataró</span>
        </a>
      </div>

      {/* Map debajo de la ubicación */}
      <div className={styles.mapContainer} style={{ marginTop: 24, marginBottom: 40 }}>
        <iframe
          src="https://www.google.com/maps?q=C%2F+Jacint+Verdaguer%2C+31%2C+Matar%C3%B3&output=embed"
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="CTennis Studio Location"
        />
      </div>

      {/* Phone */}
      <div className={styles.infoSection}>
        <h3 className={styles.infoSectionTitle}>{t("contact.info.phone")}</h3>
        <a href="tel:+34630530839" className={styles.contactLink}>
          <FaPhone className={styles.contactIcon} />
          <span>+34 630 530 839</span>
        </a>
      </div>

    </div>
  )
}
