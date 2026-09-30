"use client"
import type React from "react"
import { FaWhatsapp } from "react-icons/fa"
import styles from "./WhatsAppButton.module.css"
import { openWhatsApp } from "@/data/contact"

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    openWhatsApp("Hola, estoy interesado en sus servicios de CTennis Studio")
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
