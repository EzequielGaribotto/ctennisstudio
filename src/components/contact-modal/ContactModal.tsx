"use client"
import type React from "react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Close with Escape and move keyboard focus into the dialog while it's open
  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappMessage)
    onClose()
  }

  const handleContactFormClick = () => {
    router.push(`/contact?service=${encodeURIComponent(serviceKey)}`)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button ref={closeButtonRef} className={styles.closeButton} onClick={onClose} aria-label={t("contactModal.close")}>
          <FaTimes />
        </button>

        <div className={styles.content}>
          <h2 id="contact-modal-title" className={styles.title}>{t("contactModal.title")}</h2>
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
