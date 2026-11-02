"use client"
import type React from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { whatsappUrl } from "@/data/contact"
import styles from "./EncordadoSection.module.css"

const ITEMS = ["item1", "item2", "item3", "item4", "item5", "item6"] as const

const EncordadoSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.section}>
      <div className={styles.photo}>
        <div className={styles.photoInner}>
        <Image
          src="/images/stringer/pablo/pablo_encordando_miami.webp"
          alt={t("common.stringingPhoto")}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 42vw"
          className={styles.photoImage}
        />
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={`${styles.title} cts-display`}>{t("encordado.title")}</h1>
        <p className={styles.description}>{t("encordado.description")}</p>
        <a
          href={whatsappUrl(t("serviceDetail.whatsapp.encordado"))}
          target="_blank"
          rel="noopener noreferrer"
          className="cts-btn"
        >
          <FaWhatsapp aria-hidden="true" /> {t("common.whatsappCta")}
        </a>

        <h2 className={styles.includes}>{t("serviceDetails.whatIncludes")}</h2>
        <ul className={styles.list}>
          {ITEMS.map((item) => (
            <li key={item}>{t(`serviceDetails.encordado.${item}`)}</li>
          ))}
        </ul>

        <video
          className={styles.video}
          controls
          muted
          preload="none"
          poster="/images/stringer/pablo/pablo_garibotto_stringer.webp"
          playsInline
        >
          <source src="/video/stringing/encordado_profesional_video.webm" type="video/webm" />
          <source src="/video/stringing/encordado_profesional_video.mp4" type="video/mp4" />
          {t("common.videoUnsupported")}
        </video>
      </div>
    </section>
  )
}

export default EncordadoSection
