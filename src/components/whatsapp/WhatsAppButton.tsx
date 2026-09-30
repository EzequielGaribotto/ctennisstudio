"use client"
import type React from "react"
import { FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./WhatsAppButton.module.css"
import { openWhatsApp } from "@/data/contact"

const WhatsAppButton: React.FC = () => {
  const { t } = useTranslation()

  const handleClick = () => {
    openWhatsApp(t("common.whatsappGeneric"))
  }

  return (
    <button
      onClick={handleClick}
      className={styles.whatsappButton}
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp className={styles.icon} />
    </button>
  )
}

export default WhatsAppButton
