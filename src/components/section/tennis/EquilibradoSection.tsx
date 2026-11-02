"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { whatsappUrl } from "@/data/contact"
import RacquetBlueprint from "./RacquetBlueprint"
import styles from "./EquilibradoSection.module.css"

const equilibradoImages = [
  "/images/stringer/services/racquets/equilibrado_1.webp",
  "/images/stringer/services/racquets/equilibrado_2.webp",
  "/images/stringer/services/racquets/equilibrado_3.webp",
  "/images/stringer/services/racquets/equilibrado_4.webp",
]

// `letter` is the marker on the racquet drawing; `spot` places the label next to it on large screens
const SERVICES = [
  { key: "set", letter: "S", spot: styles.spotSet },
  { key: "point", letter: "P", spot: styles.spotPoint },
  { key: "match", letter: "M", spot: styles.spotMatch },
] as const

const EquilibradoSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={`${styles.title} cts-display`}>{t("equilibrado.title")}</h1>
          <div className={styles.intro}>
            <p className={styles.description}>{t("equilibrado.description")}</p>
            <a
              href={whatsappUrl(t("common.whatsappGeneric"))}
              target="_blank"
              rel="noopener noreferrer"
              className="cts-btn"
            >
              <FaWhatsapp aria-hidden="true" /> {t("common.whatsappCta")}
            </a>
          </div>
        </div>

        <div className={styles.blueprint}>
          <RacquetBlueprint label={t("common.blueprint")} markers />
          <ul className={styles.services}>
            {SERVICES.map(({ key, letter, spot }) => (
              <li key={key} className={spot}>
                <Link href={`/services/${key}/`} className={styles.service}>
                  <span className={styles.letter} aria-hidden="true">{letter}</span>
                  <span className={styles.serviceText}>
                    <span className={`${styles.serviceTitle} cts-display`}>
                      {t(`equilibrado.services.${key}.title`)}
                      <FaArrowRight className={styles.arrow} aria-hidden="true" />
                    </span>
                    <span className={styles.serviceDescription}>{t(`equilibrado.services.${key}.description`)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.gallery}>
          {equilibradoImages.map((src, index) => (
            <div key={src} className={styles.galleryItem}>
              <Image
                src={src}
                alt={t("common.workshopPhoto").replace("{n}", String(index + 1))}
                fill
                sizes="(max-width: 700px) 70vw, 25vw"
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EquilibradoSection
