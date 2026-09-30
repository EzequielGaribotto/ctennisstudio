"use client"
import type React from "react"
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "../page.module.css"
import { CONTACT, MAPS } from "@/data/contact"

export const LocationSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Location Info */}
      <div className={styles.infoSection}>
        <h3 className={styles.infoSectionTitle}>{t("contact.info.location")}</h3>
        <a
          href={MAPS.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          <FaMapMarkerAlt className={styles.contactIcon} />
          <span>{CONTACT.address}</span>
        </a>
      </div>

      {/* Map debajo de la ubicación */}
      <div className={styles.mapContainer} style={{ marginTop: 24, marginBottom: 40 }}>
        <iframe
          src={MAPS.embed}
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
        <a href={`tel:+${CONTACT.phoneE164}`} className={styles.contactLink}>
          <FaPhone className={styles.contactIcon} />
          <span>{CONTACT.phoneDisplay}</span>
        </a>
      </div>

    </div>
  )
}
