"use client"
import type React from "react"
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
              <li>✓ {t("encordado.features.feature1")}</li>
              <li>✓ {t("encordado.features.feature2")}</li>
              <li>✓ {t("encordado.features.feature3")}</li>
            </ul>

            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              {t("encordado.cta")}
            </a>
          </div>

          <div className={styles.videoContent}>
            <div className={styles.videoPlaceholder}>
              🎥<p>{t("hero.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EncordadoSection
