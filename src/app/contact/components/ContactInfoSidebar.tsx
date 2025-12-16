"use client"
import type React from "react"
import { useTranslation } from "@/context/TranslationContext"
import { SocialSection } from "./SocialSection"
import { LocationSection } from "./LocationSection"
import styles from "../page.module.css"

export const ContactInfoSidebar: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.contactInfo}>
      <h2 className={styles.contactInfoTitle}>{t("contact.info.title")}</h2>

      <SocialSection />
      <LocationSection />
    </div>
  )
}
