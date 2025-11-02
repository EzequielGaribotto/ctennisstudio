"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  lowQualitySrc?: string;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/projects/fallback.webp",
  lowQualitySrc,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
  width,
  height,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  
  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);
  
  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}`);
    setHasError(true);
    
    // Only try fallback if we haven't already used it
    if (imgSrc !== fallbackSrc && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      // If fallback also fails, show placeholder
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Add default style to maintain aspect ratio
  const combinedStyle = {
    height: "auto",
    ...style
  };

  // If both original and fallback fail, show a colored placeholder
  if (hasError && imgSrc === fallbackSrc) {
    return (
      <div 
        className={`bg-gray-300 flex items-center justify-center ${className}`}
        style={{
          ...combinedStyle,
          width: width || 'auto',
          height: height || 'auto',
          minHeight: '200px',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
        }}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && lowQualitySrc && (
        <Image
          src={lowQualitySrc}
          alt={`Low quality placeholder for ${alt}`}
          fill
          className="absolute inset-0 blur-sm scale-105"
          priority
          sizes={sizes}
          onError={() => {}} // Silently fail for low quality placeholder
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        sizes={sizes}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        style={combinedStyle}
      />
    </div>
  );
}
