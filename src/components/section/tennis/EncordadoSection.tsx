"use client"
import type React from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./EncordadoSection.module.css"

const EncordadoSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id="encordado" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{t("encordado.title")}</h2>
            <p className={styles.description}>{t("encordado.description")}</p>

            <ul className={styles.featuresList}>
              <li>{t("encordado.features.feature1")}</li>
              <li>{t("encordado.features.feature2")}</li>
              <li>{t("encordado.features.feature3")}</li>
            </ul>

            <a href="https://wa.me/34630530839" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <FaWhatsapp className={styles.whatsappIcon} />
              {t("encordado.cta")}
            </a>
          </div>

          <div className={styles.videoContent}>
            <Image
              src="/images/stringer/pablo/pablo_garibotto_stringer.webp"
              alt="Pablo Garibotto - Professional Tennis Stringer"
              width={600}
              height={400}
              className={styles.stringerImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EncordadoSection
