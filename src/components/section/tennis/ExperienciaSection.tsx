"use client"
import type React from "react"
import { useState, useEffect } from "react"
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
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Preload all tournament images immediately
  useEffect(() => {
    const allImages: string[] = []
    
    tournaments.forEach(tournament => {
      const images = getTournamentImages(tournament)
      allImages.push(...images)
    })

    // Preload all images
    allImages.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance stories (Instagram-like)
  useEffect(() => {
    if (!selectedTournament || isPaused) return

    const images = getTournamentImages(selectedTournament)
    const storyDuration = 5000 // 5 seconds per image
    const intervalTime = 50 // Update progress every 50ms

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (intervalTime / storyDuration) * 100
        if (newProgress >= 100) {
          // Move to next image
          setCurrentImageIndex((currentIdx) => {
            const nextIdx = currentIdx + 1
            if (nextIdx >= images.length) {
              // Close carousel when all images are viewed
              handleCloseCarousel()
              return currentIdx
            }
            return nextIdx
          })
          return 0
        }
        return newProgress
      })
    }, intervalTime)

    return () => clearInterval(progressInterval)
  }, [selectedTournament, currentImageIndex, isPaused])  

  // Reset progress when image changes
  useEffect(() => {
    setProgress(0)
  }, [currentImageIndex])

  const tournaments: Tournament[] = [
    // Monte-Carlo
    {
      id: "MONTECARLO",
      city: "Monte-Carlo",
      countryCode: "MC",
      category: "ROLEX MONTE-CARLO MASTERS",
      years: ["2025", "2024", "2023", "2022"],
      tournamentCode: "MONTECARLO",
      // Use Monte-Carlo masters logo and show ATP/WTA 1000 stamps when appropriate
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/montecarlo_masters_logo.webp",
    },

    // Madrid
    {
      id: "MADRID",
      city: "Madrid",
      countryCode: "ES",
      category: "MUTUA MADRID OPEN",
      years: ["2025", "2024", "2023", "2022", "2021", "2019", "2018", "2017", "2016", "2010"],
      tournamentCode: "MADRID",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/mutua_madrid_open_logo.webp",
    },

    // Miami
    {
      id: "MIAMI",
      city: "Miami",
      countryCode: "US",
      category: "MIAMI OPEN",
      years: ["2025"],
      tournamentCode: "MIAMI",
      // Miami is a 1000-level event for both tours — show ATP/WTA 1000 stamps plus the event logo if available
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/miami_open_logo.webp",
    },

    // Godó (Barcelona)
    {
      id: "GODO",
      city: "Barcelona",
      countryCode: "ES",
      category: "GODÓ Barcelona",
      years: ["2025", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012"],
      tournamentCode: "GODO",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/500_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/godo_logo.webp",
    },

    // Mallorca
    {
      id: "MALLORCA",
      city: "Mallorca",
      countryCode: "ES",
      category: "CHAMPIONSHIPS",
      years: ["2025"],
      tournamentCode: "MALLORCA",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/250_atp.webp",
    },

    // Challenger cluster: Girona, Barcelona, Madrid
    {
      id: "CHALLENGERS",
      city: "Girona / Barcelona / Madrid",
      countryCode: "ES",
      category: "ATP CHALLENGER TOUR",
      years: ["2025", "2024", "2023", "2022", "2021", "2020"],
      tournamentCode: "CHALLENGER",
      mensLogo: "/images/stringer/tournament_logos/category_stamps/challenger_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/challenger_tour_logo.webp",
    },

    // WTA 125s and WTA Tour examples (Biarritz, La Bisbal, Barcelona WTA125)
    {
      id: "WTA125S",
      city: "Biarritz / La Bisbal / Barcelona",
      countryCode: "ES",
      category: "WTA 125",
      years: ["2025", "2024"],
      tournamentCode: "WTA125",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/125_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/itf_wtt_logo.webp",
    },

    // ITF Wheelchair
    {
      id: "ITF_WC",
      city: "Olot",
      countryCode: "ES",
      category: "ITF WHEELCHAIR TENNIS",
      years: ["2025", "2024", "2023"],
      tournamentCode: "ITF_WC",
      unifiedLogo: "/images/stringer/tournament_logos/itf_wheelchair_logo.webp",
    },

    // ITF Juniors
    {
      id: "ITF_JR",
      city: "Barcelona",
      countryCode: "ES",
      category: "ITF WORLD TENNIS TOUR JUNIORS",
      years: ["2025", "2024", "2023"],
      tournamentCode: "ITF_JR",
      unifiedLogo: "/images/stringer/tournament_logos/itf_wtt_jr_logo.webp",
    },

    // RFET - Spanish Team Championships
    {
      id: "RFET",
      city: "Sabadell / Tarragona / Barcelona",
      countryCode: "ES",
      category: "RFET - Campeonato de España por Equipos",
      years: ["2025", "2024", "2023", "2022", "2021"],
      tournamentCode: "RFET",
      unifiedLogo: "/images/stringer/tournament_logos/rfet_logo.webp",
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
    
    // If no images found, use fallback
    if (images.length === 0) {
      images.push('/images/stringer/pablo/stringer_spiderman.webp')
    }
    
    return images
  }

  const handleCardClick = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setCurrentImageIndex(0)
    setProgress(0)
    setIsPaused(false)
  }

  const handleCloseCarousel = () => {
    setSelectedTournament(null)
    setCurrentImageIndex(0)
    setProgress(0)
    setIsPaused(false)
  }

  const handleNextImage = () => {
    if (selectedTournament) {
      const images = getTournamentImages(selectedTournament)
      const nextIndex = currentImageIndex + 1
      if (nextIndex >= images.length) {
        handleCloseCarousel()
      } else {
        setCurrentImageIndex(nextIndex)
      }
    }
  }

  const handlePrevImage = () => {
    if (selectedTournament && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  // Handle tap/click on left or right side of image
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const imageWidth = rect.width

    // Left third: previous, Right third: next, Middle: pause/play
    if (clickX < imageWidth * 0.33) {
      handlePrevImage()
    } else if (clickX > imageWidth * 0.67) {
      handleNextImage()
    } else {
      setIsPaused(!isPaused)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!selectedTournament) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextImage()
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (e.key === 'Escape') {
        handleCloseCarousel()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(!isPaused)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTournament, currentImageIndex, isPaused]) // eslint-disable-line react-hooks/exhaustive-deps

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

  // Determine how many tournaments to show
  const getVisibleTournaments = () => {
    if (showAll) {
      return tournaments
    }
    // Show 4 on desktop, 3 on mobile
    const count = isMobile ? 3 : 4
    return tournaments.slice(0, count)
  }

  // Handle show more/less with auto-scroll
  const handleToggleShowAll = () => {
    const section = document.getElementById('experiencia')
    
    if (!showAll) {
      // Expanding - scroll to top of section
      setShowAll(true)
      setTimeout(() => {
        if (section) {
          const headerOffset = 120 // Account for fixed header
          const elementPosition = section.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      // Collapsing - scroll to top of section first, then collapse
      if (section) {
        const headerOffset = 120
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        // Wait for scroll to complete before collapsing
        setTimeout(() => {
          setShowAll(false)
        }, 500)
      } else {
        setShowAll(false)
      }
    }
  }

  const visibleTournaments = getVisibleTournaments()
  const hasMoreTournaments = tournaments.length > (isMobile ? 3 : 4)

  return (
    <section id="experiencia" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("experiencia.title")}</h2>
          <p className={styles.description}>{t("experiencia.description")}</p>
        </div>

        <div className={styles.grid}>
          {visibleTournaments.map((tournament) => (
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
                      width={60}
                      height={60}
                      className={styles.logo}
                      loading="eager"
                      priority
                    />
                  </div>
                )}
                {tournament.unifiedLogo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={tournament.unifiedLogo}
                      alt="Tournament Logo"
                      width={60}
                      height={60}
                      className={styles.logo}
                      loading="eager"
                      priority
                    />
                  </div>
                )}
                {tournament.womensLogo && (
                  <div className={styles.logoContainer}>
                    <Image
                      src={tournament.womensLogo}
                      alt="Women's Tournament"
                      width={60}
                      height={60}
                      className={styles.logo}
                      loading="eager"
                      priority
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

        {/* Show More / Show Less Button */}
        {hasMoreTournaments && (
          <div className={styles.showMoreContainer}>
            <button 
              className={styles.showMoreButton}
              onClick={handleToggleShowAll}
            >
              {showAll ? t("experiencia.showLess") : t("experiencia.showMore")}
            </button>
          </div>
        )}
      </div>

      {/* Carousel Modal - Instagram Stories Style */}
      {selectedTournament && (
        <div className={styles.carouselModal} onClick={handleCloseCarousel}>
          <div className={styles.storiesContainer} onClick={(e) => e.stopPropagation()}>
            {/* Progress bars at top */}
            <div className={styles.progressBarsContainer}>
              {getTournamentImages(selectedTournament).map((_, idx) => (
                <div key={idx} className={styles.progressBarWrapper}>
                  <div 
                    className={styles.progressBar}
                    style={{
                      width: idx < currentImageIndex ? '100%' : 
                             idx === currentImageIndex ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header with tournament info */}
            <div className={styles.storiesHeader}>
              <div className={styles.tournamentInfo}>
                <div className={styles.tournamentLogoSmall}>
                  {selectedTournament.unifiedLogo && (
                    <Image
                      src={selectedTournament.unifiedLogo}
                      alt={selectedTournament.category}
                      width={40}
                      height={40}
                      className={styles.logoSmall}
                    />
                  )}
                </div>
                <div className={styles.tournamentText}>
                  <span className={styles.tournamentName}>{selectedTournament.city}</span>
                  <span className={styles.tournamentYear}>
                    {getCurrentImageInfo()?.year || selectedTournament.years[0]}
                  </span>
                </div>
              </div>
              <button className={styles.closeButton} onClick={handleCloseCarousel}>
                ✕
              </button>
            </div>

            {/* Image with tap zones */}
            <div className={styles.imageWrapper} onClick={handleImageClick}>
              {getCurrentImageInfo() && (
                <Image
                  src={getCurrentImageInfo()!.path}
                  alt={`${selectedTournament.tournamentCode} ${getCurrentImageInfo()!.year}`}
                  fill
                  className={styles.storiesImage}
                  loading="eager"
                  priority
                  style={{ objectFit: 'contain' }}
                  onError={() => {
                    console.error('Image failed to load:', getCurrentImageInfo()!.path)
                  }}
                />
              )}
              
              {/* Tap zones indicators (subtle) */}
              {currentImageIndex > 0 && (
                <div className={styles.tapZoneLeft}>
                  <span className={styles.tapIndicator}>‹</span>
                </div>
              )}
              {currentImageIndex < getTournamentImages(selectedTournament).length - 1 && (
                <div className={styles.tapZoneRight}>
                  <span className={styles.tapIndicator}>›</span>
                </div>
              )}
            </div>

            {/* Pause indicator */}
            {isPaused && (
              <div className={styles.pauseIndicator}>
                <div className={styles.pauseIcon}>❚❚</div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ExperienciaSection
