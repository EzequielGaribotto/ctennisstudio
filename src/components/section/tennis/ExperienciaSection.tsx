"use client"
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import ReactCountryFlag from "react-country-flag"
import styles from "./ExperienciaSection.module.css"
import tournamentImagesManifest from "@/data/tournament-images.json"

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

const ExperienciaSection: React.FC = () => {
  const { t } = useTranslation()
  
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
  const [isCollapsing, setIsCollapsing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
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

  // Preload all tournament images from manifest
  useEffect(() => {
    const manifest = tournamentImagesManifest as Record<string, string[]>
    const allImages: string[] = Object.values(manifest).flat()
    
    // Preload all images in bulk
    allImages.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

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
      id: "ROLEX",
      city: "Monte-Carlo",
      countryCode: "MC",
      category: "Rolex Monte-Carlo Masters",
      years: ["2025", "2024", "2023", "2022"],
      tournamentCode: "ROLEX",
      places: ["Montecarlo"],
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/montecarlo_masters_logo.webp",
      level: TournamentLevel.ATP_WTA_1000,
    },

    // Madrid
    {
      id: "MUTUA",
      city: "Madrid",
      countryCode: "ES",
      category: "Mutua Madrid Open",
      years: ["2026", "2025", "2024", "2023", "2022", "2021", "2019", "2018", "2017", "2016", "2010"],
      tournamentCode: "MUTUA",
      places: ["Madrid"],
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/mutua_madrid_open_logo.webp",
      level: TournamentLevel.ATP_WTA_1000,
    },

    // Miami
    {
      id: "OPEN",
      city: "Miami",
      countryCode: "US",
      category: "Miami Open",
      years: ["2026","2025"],
      tournamentCode: "OPEN",
      places: ["Miami"],
      mensLogo: "/images/stringer/tournament_logos/category_stamps/1000_atp.webp",
      womensLogo: "/images/stringer/tournament_logos/category_stamps/1000_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/miami_open_logo.webp",
      level: TournamentLevel.ATP_WTA_1000,
    },

    // Godó (Barcelona)
    {
      id: "GODO",
      city: "Barcelona",
      countryCode: "ES",
      category: "Trofeo Conde de Godó",
      years: ["2019", "2018", "2017", "2016", "2015", "2014", "2013"],
      tournamentCode: "GODO",
      places: ["Barcelona"],
      mensLogo: "/images/stringer/tournament_logos/category_stamps/500_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/godo_logo.webp",
      level: TournamentLevel.ATP_500,
    },

    // Challenger cluster
    {
      id: "CHALLENGER",
      city: "Valencia / Girona / Barcelona",
      countryCode: "ES",
      category: "ATP Challenger Tour",
      years: ["2026", "2025", "2024", "2023", "2022", "2021", "2020"],
      tournamentCode: "CHALLENGER",
      places: ["Valencia", "Girona", "Barcelona"],
      unifiedLogo: "/images/stringer/tournament_logos/challenger_tour_logo.webp",
      level: TournamentLevel.CHALLENGER,
    },

    // ENGIE Open Biarritz
    {
      id: "ENGIE",
      city: "Biarritz",
      countryCode: "FR",
      category: "Engie Open Biarritz",
      years: ["2025", "2024"],
      tournamentCode: "ENGIE",
      places: ["Biarritz"],
      unifiedLogo: "/images/stringer/tournament_logos/engie_open_logo.webp",
      level: TournamentLevel.UNCLASSIFIED,
    },

    // WTA 125s (La Bisbal, Barcelona)
    {
      id: "WTA125",
      city: "La Bisbal / Barcelona",
      countryCode: "ES",
      category: "WTA 125",
      years: ["2025", "2012"],
      tournamentCode: "WTA125",
      places: ["La Bisbal", "Barcelona"],
      womensLogo: "/images/stringer/tournament_logos/category_stamps/125_wta.webp",
      unifiedLogo: "/images/stringer/tournament_logos/itf_wtt_logo.webp",
      level: TournamentLevel.ATP_WTA_125,
    },

    // ITF Wheelchair
    {
      id: "WHEELCHAIR",
      city: "Olot",
      countryCode: "ES",
      category: "ITF Wheelchair Tennis",
      years: ["2018", "2017", "2014"],
      tournamentCode: "WHEELCHAIR",
      places: ["Olot"],
      unifiedLogo: "/images/stringer/tournament_logos/itf_wheelchair_logo.webp",
      level: TournamentLevel.UNCLASSIFIED,
    },

    // RFET - Spanish Team Championships
    {
      id: "RFET",
      city: "Polo / Tarragona",
      countryCode: "ES",
      category: "RFET - Campeonato de España por Equipos",
      years: ["2019", "2016", "2015", "2014"],
      tournamentCode: "RFET",
      places: ["Polo", "Tarragona"],
      unifiedLogo: "/images/stringer/tournament_logos/rfet_logo.webp",
      level: TournamentLevel.UNCLASSIFIED,
    },

    // Mallorca Championships
    {
      id: "MALLORCA",
      city: "Mallorca",
      countryCode: "ES",
      category: "Mallorca Championships",
      years: ["2025"],
      tournamentCode: "CHAMPIONSHIPS",
      places: ["Mallorca"],
      mensLogo: "/images/stringer/tournament_logos/category_stamps/250_atp.webp",
      unifiedLogo: "/images/stringer/tournament_logos/mallorca_championships_logo.webp",
      level: TournamentLevel.ATP_250,
    },

    // ITF Juniors
    {
      id: "ITF_JR",
      city: "Barcelona",
      countryCode: "ES",
      category: "ITF World Tennis Tour Juniors",
      years: ["2023", "2022", "2021"],
      tournamentCode: "ITF_JR",
      places: ["Barcelona"],
      unifiedLogo: "/images/stringer/tournament_logos/itf_wtt_jr_logo.webp",
      level: TournamentLevel.UNCLASSIFIED,
    },
  ].sort((a, b) => {
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

  const handleYearHover = (tournament: Tournament, year: string, event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    
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

  const handleYearClick = (tournament: Tournament, year: string, event: React.MouseEvent<HTMLSpanElement>) => {
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

  const handleCardHover = (tournament: Tournament, event: React.MouseEvent<HTMLDivElement>) => {
    if (isTabletOrSmaller) return // Disable hover on tablet and mobile (3 or fewer columns)
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
    const imagePath = images[currentImageIndex]
    
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
      const [, tournamentCode, place, year] = match
      // Normalize place: capitalize each word properly
      const normalizedPlace = place.trim().split(' ').map(word => 
        word.charAt(0) + word.slice(1).toLowerCase()
      ).join(' ')
      
      // Get tournament name from mapping
      const tournamentNames: Record<string, string> = {
        CHALLENGER: "ATP Challenger Tour",
        GODO: "Trofeo Conde de Godó",
        MUTUA: "Mutua Madrid Open",
        OPEN: "Miami Open",
        RFET: "RFET - Campeonato de España por Equipos",
        ROLEX: "Rolex Monte-Carlo Masters",
        WHEELCHAIR: "ITF Wheelchair Tennis",
        ENGIE: "Engie Open Biarritz",
        WTA125: "WTA 125",
        CHAMPIONSHIPS: "Mallorca Championships",
        ITF_JR: "ITF World Tennis Tour Juniors"
      }
      
      const tournamentName = tournamentNames[tournamentCode] || selectedTournament.category
      
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
                <span className={`${
                  styles.category
                } ${
                  ['ROLEX', 'MUTUA', 'OPEN'].includes(tournament.id) 
                    ? styles.categoryHighlight 
                    : tournament.id === 'GODO' 
                    ? styles.categoryHighlightSilver 
                    : ''
                }`}>{tournament.category}</span>
              </div>

              {/* Row 4: Years */}
              <div className={styles.yearsRow}>
                {tournament.years.map((year, idx) => (
                  <span key={year}>
                    <span 
                      className={styles.year}
                      onMouseEnter={(e) => handleYearHover(tournament, year, e)}
                      onClick={(e) => handleYearClick(tournament, year, e)}
                      data-year={year}
                    >
                      {year}
                    </span>
                    {idx < tournament.years.length - 1 && <span className={styles.yearSeparator}> - </span>}
                  </span>
                ))}
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
                  <span className={styles.tournamentName}>
                    {getCurrentImageInfo()?.tournamentName || selectedTournament.category}
                  </span>
                  <span className={styles.tournamentYear}>
                    {getCurrentImageInfo()?.year || selectedTournament.years[0]}, {getCurrentImageInfo()?.place || selectedTournament.city}
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
                  onError={(e) => {
                    console.error('Image failed to load:', getCurrentImageInfo()!.path)
                    // Use fallback if somehow validation missed this
                    e.currentTarget.src = '/images/stringer/pablo/stringer_spiderman.webp'
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
