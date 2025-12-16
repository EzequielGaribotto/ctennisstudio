"use client"
import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import styles from "./CarouselEquilibrado.module.css"

interface CarouselEquilibradoProps {
  images: string[]
  title?: string
  subtitle?: string
  onClose?: () => void
}

const CarouselEquilibrado: React.FC<CarouselEquilibradoProps> = ({ 
  images, 
  title = "Equilibrado y Reparación",
  subtitle = "Servicios",
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance images
  useEffect(() => {
    if (isPaused || images.length <= 1) return

    const duration = 5000 // 5 seconds per image
    const intervalMs = 50
    const increment = (intervalMs / duration) * 100

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          setCurrentImageIndex((prevIndex) => {
            const nextIndex = prevIndex + 1
            if (nextIndex >= images.length) {
              // Close carousel when reaching the end
              if (onClose) {
                onClose()
              }
              return prevIndex
            }
            return nextIndex
          })
          return 0
        }
        return newProgress
      })
    }, intervalMs)

    return () => clearInterval(interval)
  }, [isPaused, images.length, currentImageIndex, onClose])

  // Reset progress when image changes
  useEffect(() => {
    setProgress(0)
  }, [currentImageIndex])

  const handleNextImage = useCallback(() => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
      setProgress(0)
    } else if (onClose) {
      onClose()
    }
  }, [currentImageIndex, images.length, onClose])

  const handlePrevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
      setProgress(0)
    }
  }, [currentImageIndex])

  // Handle tap/click on left or right side of image
  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, [handlePrevImage, handleNextImage, isPaused])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextImage()
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage()
      } else if (e.key === 'Escape') {
        if (onClose) onClose()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(!isPaused)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNextImage, handlePrevImage, isPaused, onClose])

  return (
    <div 
      className={styles.carouselModal}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose()
        }
      }}
    >
      <div 
        className={styles.storiesContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bars at top */}
        <div className={styles.progressBarsContainer}>
          {images.map((_, idx) => (
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

        {/* Header with info */}
        <div className={styles.storiesHeader}>
          <div className={styles.tournamentInfo}>
            <div className={styles.tournamentText}>
              <span className={styles.tournamentName}>{title}</span>
              <span className={styles.tournamentYear}>{subtitle}</span>
            </div>
          </div>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Image with tap zones */}
        <div className={styles.imageWrapper} onClick={handleImageClick}>
          <Image
            src={images[currentImageIndex]}
            alt={`${title} ${currentImageIndex + 1}`}
            fill
            className={styles.storiesImage}
            loading="eager"
            priority
            style={{ objectFit: 'contain' }}
          />
          
          {/* Tap zones indicators (subtle) */}
          {currentImageIndex > 0 && (
            <div className={styles.tapZoneLeft}>
              <span className={styles.tapIndicator}>‹</span>
            </div>
          )}
          {currentImageIndex < images.length - 1 && (
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
  )
}

export default CarouselEquilibrado
