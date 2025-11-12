"use client"
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
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
  const [isCarouselLocked, setIsCarouselLocked] = useState(false)
  const [hoveredCardRect, setHoveredCardRect] = useState<DOMRect | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isCollapsing, setIsCollapsing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Dragging and resizing state
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [carouselPosition, setCarouselPosition] = useState({ x: 0, y: 0 })
  const [carouselSize, setCarouselSize] = useState({ width: 400, height: 700 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
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
    }
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
              // Loop back to first image instead of closing
              return 0
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

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return // Disable on mobile
    
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
    if (isMobile) return // Disable on mobile
    
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

  const handleCardClick = (tournament: Tournament, event: React.MouseEvent<HTMLDivElement>) => {
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

  const handleCardHover = (tournament: Tournament, event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return // Disable hover on mobile
    if (isCarouselLocked) return // Don't change on hover if locked
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredCardRect(rect)
    setSelectedTournament(tournament)
    setCurrentImageIndex(0)
    setProgress(0)
    setIsPaused(false)
  }

  const handleCardLeave = () => {
    if (isMobile) return // Disable hover on mobile
    if (isCarouselLocked) return
    
    // Immediately hide carousel when leaving card (no delay for smooth horizontal scanning)
    setSelectedTournament(null)
    setHoveredCardRect(null)
  }

  const handleCarouselHover = () => {
    if (isMobile) return // Disable hover on mobile
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handleCarouselLeave = () => {
    if (isMobile) return // Disable hover on mobile
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
    // Always render all tournaments, but use CSS to hide extras
    return tournaments
  }

  // Handle show more/less with auto-scroll
  const handleToggleShowAll = () => {
    const section = document.getElementById('experiencia')
    
    if (!showAll) {
      // Expanding - add expanded class and show items first, then scroll to first card
      setShowAll(true)
      setIsCollapsing(false)
      if (gridRef.current) {
        gridRef.current.classList.add(styles.expanded)
      }
      setTimeout(() => {
        if (section) {
          // Find the first tournament card
          const firstCard = section.querySelector('[class*="card"]')
          if (firstCard) {
            const headerOffset = 120 // Account for fixed header
            const cardPosition = firstCard.getBoundingClientRect().top
            const offsetPosition = cardPosition + window.pageYOffset - headerOffset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }
      }, 100)
    } else {
      // Collapsing - animate cards out, then collapse height
      if (gridRef.current && section) {
        // Lock current height before starting collapse
        const currentHeight = gridRef.current.scrollHeight
        gridRef.current.style.maxHeight = `${currentHeight}px`
        
        // Force reflow
        void gridRef.current.offsetHeight
        
        // Add collapsing class to trigger card animations
        gridRef.current.classList.add(styles.collapsing)
        setIsCollapsing(true)
        
        const firstCard = section.querySelector('[class*="card"]')
        if (firstCard) {
          const headerOffset = 120
          const cardPosition = firstCard.getBoundingClientRect().top
          const offsetPosition = cardPosition + window.pageYOffset - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
        
        // Start collapsing height after a short delay
        setTimeout(() => {
          // Calculate new height (only first 4 cards)
          const cards = gridRef.current?.children
          if (cards && gridRef.current) {
            // Approximate height for 4 cards
            const cardHeight = (cards[0] as HTMLElement).offsetHeight
            const gap = 20 // 1.25rem gap
            const rows = isMobile ? 2 : 1 // 2 rows on mobile, 1 row on desktop
            const newHeight = (cardHeight * rows) + (gap * (rows - 1))
            gridRef.current.style.maxHeight = `${newHeight}px`
          }
        }, 100)
        
        // Wait for animations to complete, then update state
        setTimeout(() => {
          setShowAll(false)
          setIsCollapsing(false)
          gridRef.current?.classList.remove(styles.collapsing)
          gridRef.current?.classList.remove(styles.expanded)
        }, 900)
      } else {
        setShowAll(false)
        setIsCollapsing(false)
      }
    }
  }

  const visibleTournaments = getVisibleTournaments()
  const hasMoreTournaments = tournaments.length > 4

  // Manage grid height animation
  useEffect(() => {
    if (gridRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (gridRef.current) {
          const newHeight = gridRef.current.scrollHeight
          gridRef.current.style.maxHeight = `${newHeight}px`
        }
      }, 50)
    }
  }, [showAll, isCollapsing, visibleTournaments.length])

  // Add 'loaded' class to cards after initial animation
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(`.${styles.card}`)
      // Wait for longest animation delay (0.6s) + animation duration (0.5s)
      const timer = setTimeout(() => {
        cards.forEach(card => {
          card.classList.add(styles.loaded)
        })
      }, 1100)
      
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <section id="experiencia" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("experiencia.title")}</h2>
          <p className={styles.description}>{t("experiencia.description")}</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {visibleTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className={styles.card}
              onClick={(e) => handleCardClick(tournament, e)}
              onMouseEnter={(e) => handleCardHover(tournament, e)}
              onMouseLeave={handleCardLeave}
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
            const top = hoveredCardRect.top + window.scrollY
            const left = isRightSide 
              ? hoveredCardRect.left - carouselSize.width - 20 
              : hoveredCardRect.right + 20
            
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
