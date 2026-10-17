"use client"
import type React from "react"
import { useState } from "react"
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "../page.module.css"
import { CONTACT, MAPS } from "@/data/contact"

export const LocationSection: React.FC = () => {
  const { t } = useTranslation()
  // Google Maps sets third-party cookies as soon as it loads, so it only loads when the visitor asks
  const [showMap, setShowMap] = useState(false)

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
        {showMap ? (
          <iframe
            src={MAPS.embed}
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="CTennis Studio Location"
          />
        ) : (
          <div className={styles.mapPlaceholder}>
            <button type="button" className={styles.mapButton} onClick={() => setShowMap(true)}>
              <FaMapMarkerAlt aria-hidden="true" /> {t("contact.info.showMap")}
            </button>
            <p className={styles.mapNotice}>{t("contact.info.mapNotice")}</p>
          </div>
        )}
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
