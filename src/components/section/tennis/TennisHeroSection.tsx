"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { SOCIAL_LINKS, whatsappUrl } from "@/data/contact"
import styles from "./TennisHeroSection.module.css"

const HERO_SERVICES = [
  { key: "stringing", href: "/encordado/" },
  { key: "balancing", href: "/equilibrado/" },
  { key: "management", href: "/tournament-stringing-management/" },
  { key: "courses", href: "/#cursos" },
] as const

const TennisHeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.logoHeading}>
          <Image
            src="/images/logo/cts_logo_full.webp"
            alt="CTS Custom Tennis Studio, powered by Pablo Garibotto"
            width={1200}
            height={456}
            priority
            className={`${styles.logo} cts-logo`}
          />
        </h1>
        <ul className={styles.services}>
          {HERO_SERVICES.map(({ key, href }) => (
            <li key={key}>
              <Link href={href} className={styles.service}>
                {t(`hero.${key}`)}
                <FaArrowRight className={styles.arrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.experience}>{t("hero.experience")}</p>

        <div className={styles.actions}>
          <a
            href={whatsappUrl(t("common.whatsappGeneric"))}
            target="_blank"
            rel="noopener noreferrer"
            className="cts-btn"
          >
            <FaWhatsapp aria-hidden="true" /> {t("common.whatsappCta")}
          </a>
          <div className={styles.socialIcons}>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook aria-hidden="true" />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.photo}>
        <Image
          src="/images/stringer/pablo/portada_cts.webp"
          alt={t("common.heroPhoto")}
          fill
          priority
          sizes="(max-width: 860px) 100vw, 50vw"
          className={styles.photoImage}
        />
      </div>
    </section>
  )
}

export default TennisHeroSection
