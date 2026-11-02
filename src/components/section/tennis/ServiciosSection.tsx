"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import RacquetBlueprint from "./RacquetBlueprint"
import styles from "./ServiciosSection.module.css"

// Home page doorways to the Encordado and Equilibrado pages
const ServiciosSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <Link href="/encordado/" className={`${styles.panel} ${styles.photoPanel}`}>
        <Image
          src="/images/stringer/pablo/pablo_garibotto_stringer.webp"
          alt=""
          fill
          sizes="(max-width: 860px) 100vw, 50vw"
          className={styles.photo}
        />
        <div className={styles.shade} />
        <div className={styles.text}>
          <h2 className={`${styles.title} cts-display`}>{t("encordado.title")}</h2>
          <p className={styles.description}>{t("encordado.features.feature2")}</p>
          <span className={styles.more}>
            {t("encordado.cta")} <FaArrowRight aria-hidden="true" />
          </span>
        </div>
      </Link>

      <Link href="/equilibrado/" className={`${styles.panel} ${styles.drawingPanel}`}>
        <div className={styles.drawing}>
          <RacquetBlueprint label="" />
        </div>
        <div className={styles.text}>
          <h2 className={`${styles.title} cts-display`}>{t("equilibrado.title")}</h2>
          <p className={styles.description}>POINT · SET · MATCH</p>
          <span className={styles.more}>
            {t("equilibrado.cta")} <FaArrowRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </section>
  )
}

export default ServiciosSection
