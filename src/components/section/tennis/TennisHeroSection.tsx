"use client"
import type React from "react"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./TennisHeroSection.module.css"

const TennisHeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id="inicio" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.tournamentRow}>
          {/* Placeholder tournament icons */}
          <div className={styles.tournamentIcon}>🏆</div>
          <div className={styles.tournamentIcon}>🎾</div>
          <div className={styles.tournamentIcon}>🏆</div>
          <div className={styles.tournamentIcon}>🎾</div>
        </div>

        <div className={styles.centerContent}>
          <h1 className={styles.title}>{t("hero.title")}</h1>
          <p className={styles.subtitle}>{t("hero.subtitle")}</p>
          <p className={styles.description}>{t("hero.description")}</p>

          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className={styles.icon}>f</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className={styles.icon}>📷</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <span className={styles.icon}>in</span>
            </a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <span className={styles.icon}>🌐</span>
            </a>
          </div>
        </div>

        <div className={styles.tournamentRow}>
          {/* Mirrored bottom row */}
          <div className={styles.tournamentIcon}>🎾</div>
          <div className={styles.tournamentIcon}>🏆</div>
          <div className={styles.tournamentIcon}>🎾</div>
          <div className={styles.tournamentIcon}>🏆</div>
        </div>
      </div>
    </section>
  )
}

export default TennisHeroSection
