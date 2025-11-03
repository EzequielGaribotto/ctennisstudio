"use client"
import type React from "react"
import { useState } from "react"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./ExperienciaSection.module.css"

interface Tournament {
  id: string
  name: string
  country: string
  category: string
  years: number
}

const ExperienciaSection: React.FC = () => {
  const { t } = useTranslation()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const tournaments: Tournament[] = [
    { id: "1", name: "ATP Masters 1000 Montecarlo", country: "🇲🇨", category: "Masters 1000", years: 4 },
    { id: "2", name: "ATP Masters 1000 Madrid", country: "🇪🇸", category: "Masters 1000", years: 10 },
    { id: "3", name: "ATP Masters 1000 Miami", country: "🇺🇸", category: "Masters 1000", years: 1 },
    { id: "4", name: "ATP 500 Barcelona", country: "🇪🇸", category: "ATP 500", years: 9 },
    { id: "5", name: "ATP 250 Mallorca Championships", country: "🇪🇸", category: "ATP 250", years: 1 },
    { id: "6", name: "ATP Challenger Tour Girona", country: "🇪🇸", category: "Challenger", years: 6 },
    { id: "7", name: "World Tennis Tour Biarritz", country: "🇫🇷", category: "World Tennis Tour", years: 3 },
    { id: "8", name: "Wheelchair Tennis", country: "🌍", category: "Adaptive", years: 3 },
    { id: "9", name: "RFET Spanish Circuit", country: "🇪🇸", category: "National", years: 5 },
  ]

  return (
    <section id="experiencia" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("experiencia.title")}</h2>
          <p className={styles.description}>{t("experiencia.description")}</p>
        </div>

        <div className={styles.grid}>
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className={styles.card}
              onMouseEnter={() => setHoveredId(tournament.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.cardContent}>
                <div className={styles.countryFlag}>{tournament.country}</div>
                <h3 className={styles.tournamentName}>{tournament.name}</h3>
                <p className={styles.category}>{tournament.category}</p>
                <p className={styles.years}>{tournament.years}x participación</p>
              </div>
              {hoveredId === tournament.id && (
                <div className={styles.imageCarousel}>
                  <div className={styles.imagePlaceholder}>📸</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienciaSection
