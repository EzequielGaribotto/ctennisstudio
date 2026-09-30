"use client"
import type React from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./ContactModal.module.css"
import { openWhatsApp } from "@/data/contact"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
  serviceKey: string
  whatsappMessage: string
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  serviceKey,
  whatsappMessage,
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappMessage)
    onClose()
  }

  const handleContactFormClick = () => {
    window.location.href = `/contact?service=${serviceKey}`
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label={t("contactModal.close")}>
          <FaTimes />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{t("contactModal.title")}</h2>
          <p className={styles.subtitle}>
            {t("contactModal.subtitle")} <strong>{serviceName}</strong>
          </p>

          <div className={styles.options}>
            <button
              className={styles.whatsappButton}
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp className={styles.icon} />
              <div className={styles.buttonContent}>
                <span className={styles.buttonTitle}>
                  {t("contactModal.whatsappTitle")}
                </span>
                <span className={styles.buttonSubtitle}>
                  {t("contactModal.whatsappSubtitle")}
                </span>
              </div>
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>{t("contactModal.or")}</span>
            </div>

            <button
              className={styles.formButton}
              onClick={handleContactFormClick}
            >
              <div className={styles.buttonContent}>
                <span className={styles.buttonTitle}>
                  {t("contactModal.formTitle")}
                </span>
                <span className={styles.buttonSubtitle}>
                  {t("contactModal.formSubtitle")}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal
