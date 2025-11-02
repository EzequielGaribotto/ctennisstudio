"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import OptimizedImage from '../../../OptimizedImage';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
  projectTitle: string;
  onExpand?: (imageIndex: number) => void;
}

export default function ImageCarousel({ images, projectTitle, onExpand }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, isPaused]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Expand the current image
    if (onExpand) {
      e.preventDefault();
      e.stopPropagation();
      onExpand(currentIndex);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (images.length === 0) return null;

  // If only one image, show simple image without carousel controls
  if (images.length === 1) {
    return (
      <div className={styles.singleImageContainer}>
        <button 
          className={styles.expandControl} 
          onClick={handleImageClick}
          aria-label="Expand image"
        >
          <FaExpand size={16} />
        </button>
        <OptimizedImage
          src={images[0]}
          alt={`${projectTitle} image`}
          width={600}
          height={400}
          className="rounded-lg cursor-pointer"
          loading="lazy"
          sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
          quality={75}
          onClick={handleImageClick}
        />
      </div>
    );
  }

  // Multiple images - show carousel
  return (
    <div 
      ref={containerRef}
      className={`${styles.carouselContainer} ${isPaused ? styles.paused : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={styles.expandControl} 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onExpand) {
            onExpand(currentIndex);
          }
        }}
        aria-label="Expand image"
      >
        <FaExpand size={16} />
      </button>
      
      <div className={styles.imagesWrapper}>
        <div 
          className={styles.imagesTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageSlide}>
              <OptimizedImage
                src={image}
                alt={`${projectTitle} image ${index + 1}`}
                width={600}
                height={400}
                className="rounded-lg cursor-pointer"
                loading="lazy"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
                quality={75}
                onClick={handleImageClick}
                style={{ userSelect: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Previous image"
      >
        <FaChevronLeft size={16} />
      </button>
      
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Next image"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Dots indicator */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
