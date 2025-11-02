"use client";

import { FaExpand, FaCompress, FaTrophy, FaGooglePlay, FaNewspaper, FaFilm, FaCode, FaListAlt, FaGlobe } from "../../../../utils/icons";
import { FaGamepad, FaClock, FaMap, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "../../../../context/TranslationContext";
import { Project } from "../../../../models/Project";
import ClickableButton from "../../../button/ClickableButton";
import OptimizedImage from '../../../OptimizedImage';
import ImageCarousel from './ImageCarousel';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, theme } = useTranslation();
  const fallbackImage = "/images/projects/fallback.webp";
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState(0);
  const [isDraggingExpanded, setIsDraggingExpanded] = useState(false);
  const [startXExpanded, setStartXExpanded] = useState(0);
  const [dragOffsetExpanded, setDragOffsetExpanded] = useState(0);
  const [hasDraggedExpanded, setHasDraggedExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const expandedContainerRef = useRef<HTMLDivElement>(null);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Expanded view navigation functions
  const nextExpandedImage = useCallback(() => {
    if (project.images && project.images.length > 1) {
      setExpandedImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  }, [project.images]);

  const prevExpandedImage = useCallback(() => {
    if (project.images && project.images.length > 1) {
      setExpandedImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  }, [project.images]);
  
  // Handle escape key to close expanded image and arrow keys for navigation
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isExpanded) return;
      
      if (e.key === 'Escape') {
        setIsExpanded(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevExpandedImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextExpandedImage();
      }
    };
    
    if (isExpanded) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when expanded
      // Hide header when image is expanded
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
      
      window.addEventListener('keydown', handleKeyboard);
    } else {
      document.body.style.overflow = '';
      // Show header when image is closed
      const header = document.querySelector('header');
      if (header) header.style.display = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      // Ensure header is visible when component unmounts
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [isExpanded, nextExpandedImage, prevExpandedImage]);
  
  // Handle clicks outside the expanded image to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isExpanded && overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        console.log('Clicking outside overlay, closing...'); // Debug log
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Toggle expand clicked, current state:', isExpanded); // Debug log
    setIsExpanded(!isExpanded);
  };

  // Prevent navigation when clicking on text content
  const handleTextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Expanded view drag handlers
  const handleExpandedMouseDown = (e: React.MouseEvent) => {
    if (!project.images || project.images.length <= 1) return;
    setIsDraggingExpanded(true);
    setHasDraggedExpanded(false);
    setStartXExpanded(e.clientX);
    setDragOffsetExpanded(0);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleExpandedMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingExpanded) return;
    const currentX = e.clientX;
    const offset = currentX - startXExpanded;
    setDragOffsetExpanded(offset);
    
    // If we've moved more than 10px, consider it a drag
    if (Math.abs(offset) > 10) {
      setHasDraggedExpanded(true);
    }
  };

  const handleExpandedMouseUp = () => {
    if (!isDraggingExpanded) return;
    setIsDraggingExpanded(false);
    
    // Threshold for slide change (100px)
    const threshold = 100;
    
    if (hasDraggedExpanded) {
      if (dragOffsetExpanded > threshold) {
        prevExpandedImage();
      } else if (dragOffsetExpanded < -threshold) {
        nextExpandedImage();
      }
    }
    
    setDragOffsetExpanded(0);
    
    // Reset drag state after a short delay
    setTimeout(() => setHasDraggedExpanded(false), 100);
  };

  // Expanded view touch handlers
  const handleExpandedTouchStart = (e: React.TouchEvent) => {
    if (!project.images || project.images.length <= 1) return;
    setIsDraggingExpanded(true);
    setHasDraggedExpanded(false);
    setStartXExpanded(e.touches[0].clientX);
    setDragOffsetExpanded(0);
    e.stopPropagation();
  };

  const handleExpandedTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingExpanded) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startXExpanded;
    setDragOffsetExpanded(offset);
    
    if (Math.abs(offset) > 10) {
      setHasDraggedExpanded(true);
    }
  };

  const handleExpandedTouchEnd = () => {
    if (!isDraggingExpanded) return;
    setIsDraggingExpanded(false);
    
    const threshold = 100;
    
    if (hasDraggedExpanded) {
      if (dragOffsetExpanded > threshold) {
        prevExpandedImage();
      } else if (dragOffsetExpanded < -threshold) {
        nextExpandedImage();
      }
    }
    
    setDragOffsetExpanded(0);
    setTimeout(() => setHasDraggedExpanded(false), 100);
  };

  // Function to get the appropriate icon based on project ID
  const getProjectIcon = () => {
    switch (project.id) {
      case 'neutral-news':
        return <FaNewspaper className="mr-2 text-primary" />;
      case 'eulix':
        return <FaFilm className="mr-2 text-primary" />;
      case 'competitive-programming':
        return <FaTrophy className="mr-2 text-primary" />;
      case 'rick-and-morty-api-list':
        return <FaListAlt className="mr-2 text-primary" />;
      case 'zomb':
        return <FaGamepad className="mr-2 text-primary" />;
      case 'cron-schedule-editor':
        return <FaClock className="mr-2 text-primary" />;
      case 'maps-app':
        return <FaMap className="mr-2 text-primary" />;
      default:
        return <FaCode className="mr-2 text-primary" />;
    }
  };

  return (
    <>
      <div 
        ref={cardRef} 
        className={styles.projectCard}
        style={{ 
          opacity: 0.9, 
          // Use CSS variables for consistent transition timing
          transition: "opacity var(--theme-transition-duration) var(--theme-transition-timing), box-shadow var(--theme-transition-duration) var(--theme-transition-timing), border-color var(--theme-transition-duration) var(--theme-transition-timing)",
        }}
        onMouseOver={(e) => { 
          e.currentTarget.style.opacity = "1";
          // Removed transform scale
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.25)"; // Enhanced shadow
          e.currentTarget.style.borderColor = "var(--primary)";
        }}
        onMouseOut={(e) => { 
          e.currentTarget.style.opacity = "0.9";
          // Removed transform scale reset
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.borderColor = "";
        }}
      >
        <div onClick={handleTextClick}>
          <h3 className={styles.projectTitle}>
            {getProjectIcon()}
            {project.title}
          </h3>
          <p className={styles.projectDescription}>
            {project.description}
          </p>

          {project.startDate && (
            <div className={styles.projectDate}>
              {project.startDate} {project.endDate ? 
                `- ${project.endDate}` : 
                `- ${t("projects.current")}`}
            </div>
          )}
        </div>
        
        {/* Only render image container if project has an image or images */}
        {(project.image || (project.images && project.images.length > 0)) && (
          <div className={styles.projectImageContainer}>
            <div className={styles.projectImageWrapper}>
              {project.images && project.images.length > 0 ? (
                <ImageCarousel
                  images={project.images}
                  projectTitle={project.title}
                  onExpand={(imageIndex) => {
                    setExpandedImageIndex(imageIndex);
                    setIsExpanded(true);
                  }}
                />
              ) : (
                <>
                  <button 
                    className={styles.expandControl} 
                    onClick={toggleExpand} 
                    aria-label={t("tooltips.expandImage")}
                  >
                    <FaExpand size={16} />
                  </button>
                  <OptimizedImage
                    src={project.image || fallbackImage}
                    alt={project.title || "Project image"}
                    width={600}
                    height={400}
                    className="rounded-lg cursor-pointer"
                    loading="lazy"
                    sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
                    quality={75}
                    onClick={toggleExpand}
                  />
                </>
              )}
            </div>
            
            {/* Project footer - added below image */}
            {project.footer && (
              <div className={styles.projectFooter}>
                {project.footer}
              </div>
            )}
          </div>
        )}

        {/* Project footer - show outside image container if no image */}
        {!(project.image || (project.images && project.images.length > 0)) && project.footer && (
          <div className={styles.projectFooter}>
            {project.footer}
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className={styles.technologies}>
            {project.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className={styles.projectLinks}>
          {project.arcadeLink && (
            <ClickableButton
              href={project.arcadeLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full`}
              tooltipKey="tooltips.playArcadeGame"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-white hover:text-primary transition-colors duration-400"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </ClickableButton>
          )}
          {project.programameLink && (
            <ClickableButton
              href={project.programameLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full`}
              tooltipKey="tooltips.competition"
            >
              <FaTrophy 
                size={20} 
                className="text-white hover:text-primary transition-colors duration-400" 
              />
            </ClickableButton>
          )}
          {project.playStoreLink && (
            <ClickableButton
              href={project.playStoreLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full`}
              tooltipKey="tooltips.playStore"
            >
              <FaGooglePlay 
                size={20} 
                className="text-white hover:text-primary transition-colors duration-400" 
              />
            </ClickableButton>
          )}
          {project.repoLink && (
            <ClickableButton
              href={project.repoLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full flex items-center justify-center`}
              tooltipKey={project.id === "competitive-programming" ? "tooltips.solvedProblems" : "tooltips.sourceCode"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 text-white hover:text-primary transition-colors duration-400"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
              </svg>
            </ClickableButton>
          )}
          {project.presentationLink && (
            <ClickableButton
              href={project.presentationLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full flex items-center justify-center`}
              tooltipKey="tooltips.viewPresentation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white hover:text-primary transition-colors duration-400"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </ClickableButton>
          )}
          {project.websiteLink && (
            <ClickableButton
              href={project.websiteLink}
              className={`${styles.socialIcon} ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-blue-400 hover:bg-blue-300'} rounded-full flex items-center justify-center`}
              tooltipKey="tooltips.viewWebsite"
            >
              <FaGlobe 
                size={20} 
                className="text-white hover:text-primary transition-colors duration-400" 
              />
            </ClickableButton>
          )}
        </div>
      </div>
      
      {/* Modal-like expanded image overlay with carousel */}
      <div 
        className={`${styles.expandedBackdrop} ${isExpanded ? styles.active : ''}`} 
        onClick={() => {
          console.log('Backdrop clicked, closing...'); // Debug log
          setIsExpanded(false);
        }}
      ></div>
      <div 
        ref={overlayRef}
        className={`${styles.expandedImageOverlay} ${isExpanded ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className={styles.expandControl} 
          onClick={() => {
            console.log('Close button clicked'); // Debug log
            setIsExpanded(false);
          }} 
          aria-label={t("tooltips.closeImage")}
          style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 105 }}
        >
          <FaCompress size={20} />
        </button>

        {/* Carousel container */}
        <div 
          ref={expandedContainerRef}
          className={styles.expandedCarouselContainer}
          onMouseDown={handleExpandedMouseDown}
          onMouseMove={handleExpandedMouseMove}
          onMouseUp={handleExpandedMouseUp}
          onTouchStart={handleExpandedTouchStart}
          onTouchMove={handleExpandedTouchMove}
          onTouchEnd={handleExpandedTouchEnd}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            cursor: isDraggingExpanded ? 'grabbing' : 'grab'
          }}
        >
          {/* Main image display */}
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `translateX(${dragOffsetExpanded}px)`,
              transition: isDraggingExpanded ? 'none' : 'transform 0.3s ease'
            }}
          >
            <OptimizedImage
              src={project.images && project.images.length > 0 ? 
                project.images[expandedImageIndex] : 
                (project.image || fallbackImage)}
              alt={`${project.title || "Project image"} ${expandedImageIndex + 1}`}
              width={1920}
              height={1080}
              className="rounded-lg object-contain"
              style={{ 
                maxWidth: isMobile ? '100vw' : '90%', 
                width: isMobile ? '100vw' : 'auto', 
                maxHeight: isMobile ? '100vh' : '80vh', 
                height: isMobile ? '100vh' : 'auto',
                margin: '0 auto',
                display: 'block',
                userSelect: 'none',
                pointerEvents: isDraggingExpanded ? 'none' : 'auto'
              }}
              loading="eager"
              sizes={isMobile ? "100vw" : "90vw"}
              quality={100}
              priority
            />
          </div>

          {/* Navigation arrows - only show if multiple images */}
          {project.images && project.images.length > 1 && (
            <>
              <button
                className={styles.expandedNavButton}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevExpandedImage();
                }}
                style={{ left: '30px' }}
                aria-label="Previous image"
              >
                <FaChevronLeft size={24} />
              </button>
              
              <button
                className={styles.expandedNavButton}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextExpandedImage();
                }}
                style={{ right: '30px' }}
                aria-label="Next image"
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots indicator - only show if multiple images */}
          {project.images && project.images.length > 1 && (
            <div className={styles.expandedDotsContainer}>
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.expandedDot} ${index === expandedImageIndex ? styles.expandedDotActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpandedImageIndex(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}