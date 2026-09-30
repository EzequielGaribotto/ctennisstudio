"use client"
import type React from "react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import styles from "./TennisHeroSection.module.css"
import { SOCIAL_LINKS } from "@/data/contact"

const TennisHeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id="inicio" className={styles.heroSection}>
      <div className={styles.heroCard}>
        <div className={styles.heroContent}>
          <div className={styles.profileImageContainer}>
            <Image 
              src="/images/stringer/pablo/portada_cts.webp"
              alt="Pablo Garibotto - Professional Stringer"
              width={280}
              height={380}
              className={styles.profileImage}
              priority
            />
          </div>
          <div className={styles.centerContent}>
            <div className={styles.bannerContainer}>
              <Image 
                src="/images/logo/cts studio banner_new.webp"
                alt="CTS Studio by Pablo Garibotto"
                width={600}
                height={200}
                className={styles.bannerImage}
                priority
              />
            </div>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            <p className={styles.description}>{t("hero.description")}</p>

            <div className={styles.socialIcons}>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className={styles.icon} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className={styles.icon} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className={styles.icon} />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className={styles.icon} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TennisHeroSection
