"use client"
import type React from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { whatsappUrl } from "@/data/contact"
import GestionPreview from "./GestionPreview"
import styles from "./GestionTorneosSection.module.css"

// In working order, from the first meeting to the last racquet
const SERVICES = [
  { key: "planning", image: "/images/stringer/tournaments/ENGIE BIARRITZ 2025 0.webp", position: "center" },
  { key: "team", image: "/images/stringer/tournaments/CHAMPIONSHIPS MALLORCA 2025 0.webp", position: "center 85%" },
  { key: "equipment", image: "/images/stringer/machines/babolat_machines.webp", position: "center" },
  { key: "workspace", image: "/images/stringer/tournaments/GODO BARCELONA 2025 0.webp", position: "center 65%" },
  { key: "orders", image: "/images/stringer/tournaments/GODO BARCELONA 2019 0.webp", position: "center 70%" },
  { key: "supervision", image: "/images/stringer/tournaments/WTA125 LA BISBAL 2025 0.webp", position: "center 60%" },
] as const

// Tournaments Pablo has managed, as he listed them
const MANAGER_EXPERIENCE = [
  { name: "Mutua Madrid Open", years: "2022", logo: "/images/stringer/tournament_logos/silhouettes/mutua.webp" },
  { name: "Girona Challenger 100", years: "2022 · 2023", logo: "/images/stringer/tournament_logos/silhouettes/challenger.webp" },
  { name: "La Bisbal WTA 125", years: "2025", logo: "/images/stringer/tournament_logos/silhouettes/labisbal.webp" },
] as const

const TOOLS = ["prostring", "planner"] as const

const GestionTorneosSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <GestionPreview variant="page" />

      <section id="servicios" className={styles.services}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cts-display`}>{t("management.servicesTitle")}</h2>
          <div className={styles.grid}>
            {SERVICES.map(({ key, image, position }) => (
              <article key={key} className={styles.card}>
                <div className={styles.cardPhoto}>
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 33vw"
                    className={styles.photo}
                    style={{ objectPosition: position }}
                  />
                </div>
                <div className={styles.cardText}>
                  <h3 className={`${styles.cardTitle} cts-display`}>{t(`management.services.${key}.title`)}</h3>
                  <p className={styles.cardDescription}>{t(`management.services.${key}.description`)}</p>
                </div>
              </article>
            ))}
          </div>

          <h2 className={`${styles.managerTitle} cts-display`}>{t("management.managerTitle")}</h2>
          <ul className={styles.managerList}>
            {MANAGER_EXPERIENCE.map(({ name, years, logo }) => (
              <li key={name} className={styles.managerItem}>
                <div className={styles.managerLogo}>
                  <Image src={logo} alt="" fill sizes="160px" className={`${styles.managerLogoImage} cts-logo`} />
                </div>
                <div>
                  <p className={styles.managerName}>{name}</p>
                  <p className={styles.managerYears}>{years}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.trademarkNote}>{t("experiencia.trademarks")}</p>
        </div>
      </section>

      <section className={styles.tools}>
        <div className={`${styles.container} ${styles.toolsLayout}`}>
          <div className={styles.toolsIntro}>
            <h2 className={`${styles.sectionTitle} cts-display`}>{t("management.techTitle")}</h2>
            <p className={styles.introBody}>{t("management.techIntro")}</p>
          </div>
          <div className={styles.toolsList}>
            {TOOLS.map((tool) => (
              <div key={tool} className={styles.tool}>
                <h3 className={`${styles.toolName} cts-display`}>{t(`management.tools.${tool}.name`)}</h3>
                <p>{t(`management.tools.${tool}.description`)}</p>
              </div>
            ))}
            <p className={styles.toolsNote}>{t("management.techNote")}</p>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`${styles.container} ${styles.closingLayout}`}>
          <p className={`${styles.closingText} cts-display`}>{t("management.closing")}</p>
          <a
            href={whatsappUrl(t("management.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className={`cts-btn ${styles.closingButton}`}
          >
            <FaWhatsapp aria-hidden="true" /> {t("common.whatsappCta")}
          </a>
        </div>
      </section>
    </>
  )
}

export default GestionTorneosSection
