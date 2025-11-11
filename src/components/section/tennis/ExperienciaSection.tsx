"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import ReactCountryFlag from "react-country-flag"
import styles from "./ExperienciaSection.module.css"

interface Tournament {
  id: string
  city: string
  countryCode: string
  category: string
  years: string[]
  tournamentCode: string // e.g., "GODO", "MADRID", "MONTECARLO", "SASCO"
  mensLogo?: string
  womensLogo?: string
  unifiedLogo?: string
}

const ExperienciaSection: React.FC = () => {
  const { t } = useTranslation()
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const tournaments: Tournament[] = [
    {
      id: "1",
      city: "Monte-Carlo",
      countryCode: "MC",
      category: "Masters 1000",
      years: ["2025"],
      tournamentCode: "MONTECARLO",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/challenger_tour_logo.webp", // Placeholder until we get Monte-Carlo logo
    },
    {
      id: "2",
      city: "Madrid",
      countryCode: "ES",
      category: "Masters 1000",
      years: ["2025", "2024", "2023", "2022", "2021", "2017"],
      tournamentCode: "MADRID",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/mutua_madrid_open_logo.webp",
    },
    {
      id: "3",
      city: "Barcelona",
      countryCode: "ES",
      category: "ATP 500",
      years: ["2018", "2017", "2016"],
      tournamentCode: "GODO",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/500_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/godo_logo.webp",
    },
    {
      id: "4",
      city: "San Sebastián",
      countryCode: "ES",
      category: "Challenger",
      years: ["2017"],
      tournamentCode: "SASCO",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/challenger_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/challenger_tour_logo.webp",
    },
  ]

  // Get all images for a tournament (in descending chronological order)
  const getTournamentImages = (tournament: Tournament): string[] => {
    const images: string[] = []
    // Sort years in descending order
    const sortedYears = [...tournament.years].sort((a, b) => parseInt(b) - parseInt(a))
    
    // Available images mapping based on actual files
    const availableImages: Record<string, Record<string, string[]>> = {
      MADRID: {
        "2025": [
          "/images/stringer/tournaments/MADRID 2025.webp",
          "/images/stringer/tournaments/MADRID 2025 2.webp",
        ],
        "2024": [
          "/images/stringer/tournaments/MADRID 2024.webp",
          "/images/stringer/tournaments/MADRID 2024 1.webp",
          "/images/stringer/tournaments/MADRID 2024 2.webp",
        ],
        "2023": [
          "/images/stringer/tournaments/MADRID 23 1.webp",
          "/images/stringer/tournaments/MADRID 23 2.webp",
        ],
        "2022": [
          "/images/stringer/tournaments/MADRID 2022.webp",
          "/images/stringer/tournaments/MADRID 2022 2.webp",
          "/images/stringer/tournaments/MADRID 2022 3.webp",
        ],
        "2021": [
          "/images/stringer/tournaments/MADRID 2021.webp",
          "/images/stringer/tournaments/MADRID 2021 1.webp",
        ],
        "2017": [
          "/images/stringer/tournaments/MADRID 2017.webp",
        ],
      },
      GODO: {
        "2018": [
          "/images/stringer/tournaments/GODO 2018.webp",
          "/images/stringer/tournaments/GODO 2018 1.webp",
          "/images/stringer/tournaments/GOGO 2018 3.webp", // Note: typo in original filename
        ],
        "2017": [
          "/images/stringer/tournaments/GODO 2017.webp",
          "/images/stringer/tournaments/GODO 2017 4.webp",
          "/images/stringer/tournaments/GODO 2017 5.webp",
        ],
        "2016": [
          "/images/stringer/tournaments/GODO 2016 1.webp",
          "/images/stringer/tournaments/GODO 2016 2.webp",
          "/images/stringer/tournaments/GODO 2016 3.webp",
          "/images/stringer/tournaments/GODO 2016 4.webp",
          "/images/stringer/tournaments/GODO 2016 5.webp",
        ],
      },
      MONTECARLO: {
        "2025": [
          "/images/stringer/tournaments/MONTECARLO 2025.webp",
        ],
      },
      SASCO: {
        "2017": [
          "/images/stringer/tournaments/SASCO 2017.webp",
        ],
      },
    }
    
    const tournamentImages = availableImages[tournament.tournamentCode] || {}
    
    sortedYears.forEach((year) => {
      const yearImages = tournamentImages[year]
      
      if (yearImages) {
        images.push(...yearImages)
      }
    })
    
    return images
  }

  const handleCardClick = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setCurrentImageIndex(0)
  }

  const handleCloseCarousel = () => {
    setSelectedTournament(null)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedTournament) {
      const images = getTournamentImages(selectedTournament)
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const handlePrevImage = () => {
    if (selectedTournament) {
      const images = getTournamentImages(selectedTournament)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  const getCurrentImageInfo = () => {
    if (!selectedTournament) return null
    const images = getTournamentImages(selectedTournament)
    const imagePath = images[currentImageIndex]
    
    if (!imagePath) return null
    
    // Extract year from path - handle different formats
    // Examples: "MADRID 2025.webp", "MADRID 2025 2.webp", "MADRID 23 1.webp"
    const match = imagePath.match(/(\w+)\s(20\d{2}|\d{2})(?:\s\d+)?\.webp$/)
    if (match) {
      const [, code, yearStr] = match
      // Convert 2-digit year to 4-digit if needed
      const year = yearStr.length === 2 ? `20${yearStr}` : yearStr
      return { code, year, path: imagePath }
    }
    return { code: selectedTournament.tournamentCode, year: "Unknown", path: imagePath }
  }

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
              onClick={() => handleCardClick(tournament)}
            >
              {/* Row 1: Tournament Logos */}
              <div className={styles.logosRow}>
                {tournament.mensLogo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={tournament.mensLogo}
                      alt="Men's Tournament"
                      width={80}
                      height={80}
                      className={styles.logo}
                    />
                  </div>
                )}
                {tournament.unifiedLogo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={tournament.unifiedLogo}
                      alt="Tournament Logo"
                      width={80}
                      height={80}
                      className={styles.logo}
                    />
                  </div>
                )}
                {tournament.womensLogo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={tournament.womensLogo}
                      alt="Women's Tournament"
                      width={80}
                      height={80}
                      className={styles.logo}
                    />
                  </div>
                )}
              </div>

              {/* Row 2: City and Country Flag */}
              <div className={styles.locationRow}>
                <span className={styles.city}>{tournament.city}</span>
                <ReactCountryFlag
                  countryCode={tournament.countryCode}
                  svg
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                />
              </div>

              {/* Row 3: Category */}
              <div className={styles.categoryRow}>
                <span className={styles.category}>{tournament.category}</span>
              </div>

              {/* Row 4: Years */}
              <div className={styles.yearsRow}>
                <span className={styles.years}>{tournament.years.join(" - ")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Modal */}
      {selectedTournament && (
        <div className={styles.carouselModal} onClick={handleCloseCarousel}>
          <div className={styles.carouselContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseCarousel}>
              ✕
            </button>
            
            <button className={styles.navButton} onClick={handlePrevImage}>
              ‹
            </button>
            
            <div className={styles.imageContainer}>
              {getCurrentImageInfo() && (
                <>
                  <Image
                    src={getCurrentImageInfo()!.path}
                    alt={`${selectedTournament.tournamentCode} ${getCurrentImageInfo()!.year}`}
                    width={800}
                    height={600}
                    className={styles.carouselImage}
                    onError={() => {
                      // Fallback if image doesn't exist
                      console.error('Image failed to load:', getCurrentImageInfo()!.path)
                    }}
                  />
                  <div className={styles.imageCaption}>
                    {selectedTournament.city} - {getCurrentImageInfo()!.year}
                  </div>
                </>
              )}
            </div>
            
            <button className={styles.navButton} onClick={handleNextImage}>
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ExperienciaSection
