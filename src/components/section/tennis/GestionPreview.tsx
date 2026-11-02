"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { whatsappUrl } from "@/data/contact"
import styles from "./GestionTorneosSection.module.css"

interface GestionPreviewProps {
  /** "home" is the preview with a button to the services; "page" opens the management page itself */
  variant: "home" | "page"
}

const GestionPreview: React.FC<GestionPreviewProps> = ({ variant }) => {
  const { t } = useTranslation()
  const strapline = t("management.strapline")
  const Title = variant === "page" ? "h1" : "h2"

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <Title className={`${styles.title} cts-display`}>Tournament Stringing Management</Title>
          <p className={styles.subtitle}>{t("management.subtitle")}</p>
          {strapline && <p className={styles.strapline}>{strapline}</p>}
          <a
            href={whatsappUrl(t("management.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className={variant === "page" ? "cts-btn" : "cts-btn cts-btn-outline"}
          >
            <FaWhatsapp aria-hidden="true" /> {t("common.whatsappCta")}
          </a>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src="/images/stringer/tournaments/MUTUA MADRID 2025 3.webp"
            alt={t("management.heroPhoto")}
            fill
            priority={variant === "page"}
            sizes="(max-width: 960px) 100vw, 55vw"
            className={styles.photo}
          />
        </div>
      </section>

      <section className={styles.introBand}>
        <div className={styles.introContainer}>
          <div className={styles.intro}>
            <p className={styles.introLead}>{t("management.intro1")}</p>
            <div className={styles.introRight}>
              <p className={styles.introBody}>{t("management.intro2")}</p>
              {variant === "home" && (
                <Link href="/tournament-stringing-management/#servicios" className="cts-btn">
                  {t("management.ctaServices")} <FaArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GestionPreview
