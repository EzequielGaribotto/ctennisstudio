"use client"
import type React from "react"
import { FaWhatsapp } from "react-icons/fa"
import styles from "./WhatsAppButton.module.css"

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const phone = "34630530839"
    const message = encodeURIComponent("Hola, estoy interesado en sus servicios de CTennis Studio")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
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
