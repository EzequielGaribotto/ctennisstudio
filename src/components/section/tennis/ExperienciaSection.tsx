"use client"
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaPause, FaTimes } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { Flag } from "@/components/Flag"
import { BEHIND_THE_GAME_READY } from "@/data/behind-the-game"
import styles from "./ExperienciaSection.module.css"
import tournamentImagesManifest from "@/data/tournament-images.json"
import tournamentsData from "@/data/tournaments.json"

// Tournament importance levels for sorting
enum TournamentLevel {
  ATP_WTA_1000 = 1,
  ATP_500 = 2,
  ATP_250 = 3,
  CHALLENGER = 4,
  ATP_WTA_125 = 5,
  UNCLASSIFIED = 6,
}

interface Tournament {
  id: string
  city: string
  countryCode: string
  category: string
  years: string[]
  tournamentCode: string // Matches image filename prefix
  places?: string[] // Different places for the tournament (e.g., Valencia, Girona, Barcelona for Challenger)
  mensLogo?: string
  womensLogo?: string
  unifiedLogo?: string
  level?: TournamentLevel // Tournament importance level
}

// Tournament data lives in src/data/tournaments.json (edit that file to add/change tournaments)
const SORTED_TOURNAMENTS: Tournament[] = (tournamentsData as Array<Omit<Tournament, "level"> & { level?: string }>)
  .map((t) => ({ ...t, level: TournamentLevel[(t.level ?? "UNCLASSIFIED") as keyof typeof TournamentLevel] }))
  .sort((a, b) => {
    // Sort by tournament level first
    const levelA = a.level ?? TournamentLevel.UNCLASSIFIED
    const levelB = b.level ?? TournamentLevel.UNCLASSIFIED

    if (levelA !== levelB) {
      return levelA - levelB
    }

    // Within same level, sort by most recent year (descending)
    const maxYearA = Math.max(...a.years.map(y => parseInt(y)))
    const maxYearB = Math.max(...b.years.map(y => parseInt(y)))

    return maxYearB - maxYearA
  })

const ExperienciaSection: React.FC = () => {
  const { t, locale } = useTranslation()
  // "ES" -> "España" / "Spain" (flag images need a text alternative)
  const countryName = (code: string) => new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code
  
  // Configurable timelapse speed (ms per image when hovering year navigation)
  const TIMELAPSE_SPEED_MS = 500 // Change this value to adjust speed (e.g., 100, 250, 500, 1000)
  
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [isCarouselLocked, setIsCarouselLocked] = useState(false)
  const [hoveredCardRect, setHoveredCardRect] = useState<DOMRect | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const timelapseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Dragging and resizing state
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [carouselPosition, setCarouselPosition] = useState({ x: 0, y: 0 })
  const [carouselSize, setCarouselSize] = useState({ width: 400, height: 700 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Detect if we're on mobile or tablet (<=1024px means 3 or fewer columns)
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsTabletOrSmaller(window.innerWidth <= 1024)
    }
    
    checkViewport()
    window.addEventListener('resize', checkViewport)
    
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (selectedTournament) {
        event.preventDefault()
        setSelectedTournament(null)
        setCurrentImageIndex(0)
        setProgress(0)
        setIsPaused(false)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [selectedTournament])

  

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (timelapseIntervalRef.current) {
        clearInterval(timelapseIntervalRef.current)
      }
    }
  }, [])

  // Preload only the opened tournament's photos (not the whole gallery on page load)
  useEffect(() => {
    if (!selectedTournament) return
    const manifest = tournamentImagesManifest as Record<string, string[]>
    ;(manifest[selectedTournament.tournamentCode] || []).forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, [selectedTournament])

  // Auto-advance stories (Instagram-like)
  useEffect(() => {
    if (!selectedTournament || isPaused) return
    // Photos don't change on their own for visitors who asked their device for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const storyDuration = 5000 // 5 seconds per image
    const intervalTime = 50 // Update progress every 50ms

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + (intervalTime / storyDuration) * 100))
    }, intervalTime)

    return () => clearInterval(progressInterval)
  }, [selectedTournament, currentImageIndex, isPaused])

  // Bar full: move to the next photo exactly once, looping back to the first after the last
  useEffect(() => {
    if (!selectedTournament || progress < 100) return
    const total = getTournamentImages(selectedTournament).length
    setCurrentImageIndex((current) => (current + 1) % total)
    setProgress(0)
  }, [progress, selectedTournament])

  // Keyboard users land on the close button when the photos open, and return to where they were
  useEffect(() => {
    if (!isCarouselLocked) return
    const previous = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => previous?.focus?.()
  }, [isCarouselLocked])

  // Reset progress when image changes
  useEffect(() => {
    setProgress(0)
  }, [currentImageIndex])

  const tournaments = SORTED_TOURNAMENTS

  // Get all images for a tournament from manifest
  const getTournamentImages = (tournament: Tournament): string[] => {
    const manifest = tournamentImagesManifest as Record<string, string[]>
    const images = manifest[tournament.tournamentCode] || []
    
    // Return images if found, otherwise fallback
    return images.length > 0 ? images : ['/images/stringer/pablo/stringer_spiderman.webp']
  }

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTabletOrSmaller) return // Disable on tablet and mobile
    
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStart({ x: clientX - carouselPosition.x, y: clientY - carouselPosition.y })
  }

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    setCarouselPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    })
  }, [dragStart.x, dragStart.y])

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isTabletOrSmaller) return // Disable on tablet and mobile
    
    e.stopPropagation()
    setIsResizing(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setResizeStart({ 
      x: clientX, 
      y: clientY, 
      width: carouselSize.width, 
      height: carouselSize.height 
    })
  }

  const handleResize = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    
    const deltaX = clientX - resizeStart.x
    
    // Use the larger delta to maintain aspect ratio (9:16 for stories)
    const aspectRatio = 9 / 16
    let newWidth = resizeStart.width + deltaX
    let newHeight = newWidth / aspectRatio
    
    // Clamp to reasonable sizes
    newWidth = Math.max(300, Math.min(800, newWidth))
    newHeight = newWidth / aspectRatio
    
    setCarouselSize({ width: newWidth, height: newHeight })
  }, [resizeStart.x, resizeStart.width])

  const handleResizeEnd = () => {
    setIsResizing(false)
  }

  // Add drag and resize listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('mouseup', handleDragEnd)
      window.addEventListener('touchmove', handleDrag)
      window.addEventListener('touchend', handleDragEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleDrag)
        window.removeEventListener('mouseup', handleDragEnd)
        window.removeEventListener('touchmove', handleDrag)
        window.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [isDragging, handleDrag])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize)
      window.addEventListener('mouseup', handleResizeEnd)
      window.addEventListener('touchmove', handleResize)
      window.addEventListener('touchend', handleResizeEnd)
      
      return () => {
        window.removeEventListener('mousemove', handleResize)
        window.removeEventListener('mouseup', handleResizeEnd)
        window.removeEventListener('touchmove', handleResize)
        window.removeEventListener('touchend', handleResizeEnd)
      }
    }
  }, [isResizing, handleResize])

  const handleCardClick = (tournament: Tournament, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    
    // Clear any pending hide timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredCardRect(rect)
    setSelectedTournament(tournament)
    setIsCarouselLocked(true)
    setCurrentImageIndex(0)
    setProgress(0)
    setIsPaused(false)
  }

  const handleYearHover = (tournament: Tournament, year: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (isTabletOrSmaller) return // Phones and tablets open the photos on tap
    if (isCarouselLocked) return

    // Clear any pending hide timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    // Clear any ongoing timelapse
    if (timelapseIntervalRef.current) {
      clearInterval(timelapseIntervalRef.current)
      timelapseIntervalRef.current = null
    }
    
    // Find the first image for this year
    const images = getTournamentImages(tournament)
    const targetYearImageIndex = images.findIndex(img => img.includes(` ${year} `))
    
    if (targetYearImageIndex !== -1) {
      const rect = (event.target as HTMLElement).closest(`.${styles.card}`)?.getBoundingClientRect()
      if (rect) {
        setHoveredCardRect(rect)
        
        // If already showing this tournament
        if (selectedTournament?.id === tournament.id) {
          const currentIdx = currentImageIndex
          const difference = Math.abs(targetYearImageIndex - currentIdx)
          
          // If there are images in between, do a timelapse
          if (difference > 1) {
            setIsPaused(true) // Pause auto-advance during timelapse
            const direction = targetYearImageIndex > currentIdx ? 1 : -1
            let step = currentIdx + direction
            
            // Timelapse with configurable speed
            timelapseIntervalRef.current = setInterval(() => {
              if ((direction === 1 && step >= targetYearImageIndex) || 
                  (direction === -1 && step <= targetYearImageIndex)) {
                // Reached target
                if (timelapseIntervalRef.current) {
                  clearInterval(timelapseIntervalRef.current)
                  timelapseIntervalRef.current = null
                }
                setCurrentImageIndex(targetYearImageIndex)
                setProgress(0)
                setIsPaused(false)
              } else {
                setCurrentImageIndex(step)
                setProgress(0)
                step += direction
              }
            }, TIMELAPSE_SPEED_MS)
          } else {
            // Jump directly if adjacent or same
            setCurrentImageIndex(targetYearImageIndex)
            setProgress(0)
          }
        } else {
          // First time showing this tournament, jump directly
          setSelectedTournament(tournament)
          setIsCarouselLocked(false)
          setCurrentImageIndex(targetYearImageIndex)
          setProgress(0)
          setIsPaused(false)
        }
      }
    }
  }

  const handleYearClick = (tournament: Tournament, year: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    
    // Clear any pending hide timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    // Find the first image for this year
    const images = getTournamentImages(tournament)
    const yearImageIndex = images.findIndex(img => img.includes(` ${year} `))
    
    if (yearImageIndex !== -1) {
      const rect = (event.target as HTMLElement).closest(`.${styles.card}`)?.getBoundingClientRect()
      if (rect) {
        setHoveredCardRect(rect)
        setSelectedTournament(tournament)
        setIsCarouselLocked(true)
        setCurrentImageIndex(yearImageIndex)
        setProgress(0)
        setIsPaused(false)
      }
    }
  }

  const handleCardLeave = () => {
    if (isTabletOrSmaller) return // Disable hover on tablet and mobile
    if (isCarouselLocked) return
    
    // Immediately hide carousel when leaving card (no delay for smooth horizontal scanning)
    setSelectedTournament(null)
    setHoveredCardRect(null)
  }

  const handleCarouselHover = () => {
    if (isTabletOrSmaller) return // Disable hover on tablet and mobile
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handleCarouselLeave = () => {
    if (isTabletOrSmaller) return // Disable hover on tablet and mobile
    if (isCarouselLocked) return
    
    // Immediately hide when leaving carousel too
    setSelectedTournament(null)
    setHoveredCardRect(null)
  }

  const handleCloseCarousel = () => {
    // Clear any pending timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    // Clear any ongoing timelapse
    if (timelapseIntervalRef.current) {
      clearInterval(timelapseIntervalRef.current)
      timelapseIntervalRef.current = null
    }
    
    setSelectedTournament(null)
    setIsCarouselLocked(false)
    setHoveredCardRect(null)
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
    const imagePath = images.at(currentImageIndex)
    
    if (!imagePath) return null
    
    // Check if this is the fallback image
    if (imagePath.includes('stringer_spiderman.webp')) {
      return {
        tournamentName: selectedTournament.category,
        place: 'Unknown',
        year: 'Unknown',
        path: imagePath
      }
    }
    
    // Extract tournament name, place, and year from path
    // Format: "TOURNAMENT PLACE YEAR INDEX.webp"
    // Place can be one or more words (e.g., "LA BISBAL", "VALENCIA", "MONTECARLO")
    const match = imagePath.match(/\/(\w+)\s([A-Z\s]+?)\s(\d{4})\s\d+\.webp$/)
    if (match) {
      const [, , place, year] = match
      // Normalize place: capitalize each word properly
      const normalizedPlace = place.trim().split(' ').map(word => 
        word.charAt(0) + word.slice(1).toLowerCase()
      ).join(' ')
      const tournamentName = selectedTournament.category
      
      return { 
        tournamentName, 
        place: normalizedPlace, 
        year, 
        path: imagePath 
      }
    }
    return { 
      tournamentName: selectedTournament.category, 
      place: selectedTournament.city, 
      year: selectedTournament.years[0] || "Unknown", 
      path: imagePath 
    }
  }

  // Determine how many tournaments to show
  const getVisibleTournaments = () => {
    // Always render all tournaments, but use CSS to hide extras
    return tournaments
  }

  // Handle show more/less; when closing, go back to the first card so the visitor is not left further down
  const handleToggleShowAll = () => {
    if (showAll) {
      document.getElementById("experiencia")?.scrollIntoView({ behavior: "smooth" })
    }
    setShowAll(!showAll)
  }

  const visibleTournaments = getVisibleTournaments()
  const currentImageInfo = selectedTournament ? getCurrentImageInfo() : null
  const selectedImages = selectedTournament ? getTournamentImages(selectedTournament) : []
  const hasMoreTournaments = tournaments.length > 4


  return (
    <section id="experiencia" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h2 className={`${styles.title} cts-display`}>{t("experiencia.title")}</h2>
            {BEHIND_THE_GAME_READY && (
              <Link href="/behind-the-game/" className={`${styles.behindLink} cts-display`}>
                BEHIND THE GAME <FaArrowRight className={styles.behindArrow} aria-hidden="true" />
              </Link>
            )}
          </div>
          <p className={styles.description}>{t("experiencia.description")}</p>
        </div>

        <div className={`${styles.grid} ${showAll ? styles.expanded : ""}`}>
          {visibleTournaments.map((tournament) => {
            const photos = (tournamentImagesManifest as Record<string, string[]>)[tournament.tournamentCode] ?? []
            const logos = (
              <>
                {tournament.mensLogo && (
                  <Image src={tournament.mensLogo} alt={`${tournament.category} ATP`} width={60} height={60} className={styles.logo} />
                )}
                {tournament.unifiedLogo && (
                  <Image src={tournament.unifiedLogo} alt={tournament.category} width={60} height={60} className={styles.logo} />
                )}
                {tournament.womensLogo && (
                  <Image src={tournament.womensLogo} alt={`${tournament.category} WTA`} width={60} height={60} className={styles.logo} />
                )}
              </>
            )

            return (
              <article key={tournament.id} className={styles.card}>
                {photos.length > 0 ? (
                  <button
                    type="button"
                    className={styles.cover}
                    onClick={(e) => handleCardClick(tournament, e)}
                    aria-label={t("common.viewPhotos").replace("{name}", tournament.category)}
                  >
                    <Image src={photos[0]} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 25vw" className={styles.coverImage} />
                    <span className={styles.logoPlate}>{logos}</span>
                  </button>
                ) : (
                  <div className={`${styles.cover} ${styles.coverEmpty}`}>
                    <span className={`${styles.logoPlate} ${styles.logoPlateLarge}`}>{logos}</span>
                  </div>
                )}

                <div className={styles.info}>
                  <div className={styles.cityRow}>
                    <h3 className={`${styles.city} cts-display`}>{tournament.city}</h3>
                    <Flag
                      code={tournament.countryCode}
                      label={countryName(tournament.countryCode)}
                      style={{ width: "1.75em", height: "1.75em", flexShrink: 0 }}
                    />
                  </div>
                  <p className={styles.category}>{tournament.category}</p>

                  <div className={styles.yearsRow} onMouseLeave={handleCardLeave}>
                    {tournament.years.map((year) =>
                      photos.some((photo) => photo.includes(` ${year} `)) ? (
                        <button
                          type="button"
                          key={year}
                          className={styles.year}
                          onMouseEnter={(e) => handleYearHover(tournament, year, e)}
                          onClick={(e) => handleYearClick(tournament, year, e)}
                          aria-label={t("common.viewPhotosYear").replace("{year}", year)}
                        >
                          {year}
                        </button>
                      ) : (
                        <span key={year} className={styles.yearPlain}>{year}</span>
                      )
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Show More / Show Less Button */}
        {hasMoreTournaments && (
          <div className={styles.showMoreContainer}>
            <button className="cts-btn cts-btn-outline" onClick={handleToggleShowAll}>
              {showAll ? t("experiencia.showLess") : t("experiencia.showMore")}
            </button>
          </div>
        )}
        <p className={styles.trademarkNote}>{t("experiencia.trademarks")}</p>
      </div>

      {/* Carousel Modal - Instagram Stories Style */}
      {selectedTournament && (
        <div 
          className={`${styles.carouselModal} ${isCarouselLocked ? styles.locked : styles.hover}`}
          onClick={handleCloseCarousel}
          onMouseEnter={handleCarouselHover}
          onMouseLeave={handleCarouselLeave}
          style={hoveredCardRect && !isCarouselLocked ? (() => {
            const windowWidth = window.innerWidth
            const cardCenterX = hoveredCardRect.left + (hoveredCardRect.width / 2)
            const isRightSide = cardCenterX > windowWidth / 2
            
            // Calculate position to show carousel next to card
            const top = Math.max(8, Math.min(hoveredCardRect.top, window.innerHeight - carouselSize.height - 8)) + window.scrollY
            const wantedLeft = isRightSide
              ? hoveredCardRect.left - carouselSize.width - 20
              : hoveredCardRect.right + 20
            // Keep the whole photo on screen, also with wide cards and small windows
            const left = Math.max(8, Math.min(wantedLeft, windowWidth - carouselSize.width - 8))
            
            return {
              position: 'fixed',
              top: `${top - window.scrollY}px`,
              left: `${left}px`,
              right: 'auto',
              bottom: 'auto',
              width: 'auto',
              height: 'auto',
              transform: 'none',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 0
            }
          })() : {}}
        >
          <div
            ref={carouselRef}
            role="dialog"
            aria-modal={isCarouselLocked}
            aria-label={selectedTournament.category}
            className={styles.storiesContainer} 
            onClick={(e) => e.stopPropagation()}
            onMouseDown={isCarouselLocked ? handleDragStart : undefined}
            onTouchStart={isCarouselLocked ? handleDragStart : undefined}
            style={{
              width: `${carouselSize.width}px`,
              height: `${carouselSize.height}px`,
              transform: isCarouselLocked && !isMobile ? `translate(${carouselPosition.x}px, ${carouselPosition.y}px)` : 'none',
              cursor: isCarouselLocked && isDragging ? 'grabbing' : isCarouselLocked ? 'grab' : 'default',
              position: 'relative'
            }}
          >
            {/* Resize handle (desktop only, when locked) */}
            {!isMobile && isCarouselLocked && (
              <div 
                className={styles.resizeHandle}
                onMouseDown={handleResizeStart}
                onTouchStart={handleResizeStart}
              />
            )}
            {/* Progress bars at top */}
            <div className={styles.progressBarsContainer}>
              {selectedImages.map((_, idx) => (
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
                  <span className={styles.tournamentName}>
                    {currentImageInfo?.tournamentName || selectedTournament.category}
                  </span>
                  <span className={styles.tournamentYear}>
                    {currentImageInfo?.year || selectedTournament.years[0]}, {currentImageInfo?.place || selectedTournament.city}
                  </span>
                </div>
              </div>
              <button ref={closeButtonRef} className={styles.closeButton} onClick={handleCloseCarousel} aria-label={t("contactModal.close")}>
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            {/* Image with tap zones */}
            <div className={styles.imageWrapper} onClick={handleImageClick}>
              {currentImageInfo && (
                <Image
                  src={currentImageInfo.path}
                  alt={`${selectedTournament.tournamentCode} ${currentImageInfo.year}`}
                  fill
                  className={styles.storiesImage}
                  loading="eager"
                  priority
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    console.error('Image failed to load:', currentImageInfo.path)
                    // Use fallback if somehow validation missed this
                    e.currentTarget.src = '/images/stringer/pablo/stringer_spiderman.webp'
                  }}
                />
              )}
              
              {/* Tap zones indicators (subtle) */}
              {currentImageIndex > 0 && (
                <div className={styles.tapZoneLeft}>
                  <span className={styles.tapIndicator}><FaChevronLeft aria-hidden="true" /></span>
                </div>
              )}
              {currentImageIndex < selectedImages.length - 1 && (
                <div className={styles.tapZoneRight}>
                  <span className={styles.tapIndicator}><FaChevronRight aria-hidden="true" /></span>
                </div>
              )}
            </div>

            {/* Pause indicator */}
            {isPaused && (
              <div className={styles.pauseIndicator}>
                <div className={styles.pauseIcon}><FaPause aria-hidden="true" /></div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ExperienciaSection
