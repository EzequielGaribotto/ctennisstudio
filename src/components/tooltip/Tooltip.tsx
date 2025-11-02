"use client";
import React, { useState } from 'react';
import { TooltipProps } from '../../models/interfaces';
import styles from './Tooltip.module.css';

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  forcePosition = false,
  alternateText,
  showAlternate = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    setIsVisible(true);
    
    // Only check for position adjustment if not forcing position
    if (!forcePosition && containerRef.current && position === 'top') {
      const rect = containerRef.current.getBoundingClientRect();
      // If too close to the top of the viewport, show below instead
      if (rect.top < 70) { // 70px threshold for header
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition(position);
      }
    }
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
  };
  
  const displayText = showAlternate && alternateText ? alternateText : text;
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.tooltipContainer}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[tooltipPosition]}`}>
          {displayText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
