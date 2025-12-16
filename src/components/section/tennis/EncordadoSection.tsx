"use client"
import type React from "react"
import Link from "next/link"
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

            <Link 
              href="/services/encordado" 
              className={styles.ctaButton}
            >
              {t("encordado.cta")}
            </Link>
          </div>

          <div className={styles.videoContent}>
            <video
              className={styles.stringerVideo}
              controls
              muted
              preload="metadata"
              poster="/images/stringer/pablo/pablo_garibotto_stringer.webp"
              playsInline
            >
              <source src="/video/stringing/encordado_profesional_video.webm" type="video/webm" />
              <source src="/video/stringing/encordado_profesional_video.ogv" type="video/ogg" />
              Tu navegador no soporta el video.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EncordadoSection
