"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CarouselEquilibrado.module.css";

const images = [
  "/images/stringer/services/racquets/equilibrado_1.webp",
  "/images/stringer/services/racquets/equilibrado_2.webp",
  "/images/stringer/services/racquets/equilibrado_3.webp",
  "/images/stringer/services/racquets/equilibrado_4.webp",
];

const CarouselEquilibrado: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const duration = 5000;
    const interval = 40;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p + (interval / duration) * 100 >= 100) {
          setIndex((i) => (i + 1) % images.length);
          return 0;
        }
        return p + (interval / duration) * 100;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [paused]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 3) {
      setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    } else if (clickX > (rect.width * 2) / 3) {
      setIndex((i) => (i + 1) % images.length);
    } else {
      setPaused((p) => !p);
    }
  };

  return (
    <div
      className={styles.carousel}
      onClick={handleClick}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.progressContainer}>
        {images.map((_, i) => (
          <div key={i} className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: i === index ? `${progress}%` : i < index ? "100%" : "0%",
              }}
            />
          </div>
        ))}
      </div>

      <Image
        src={images[index]}
        alt="Equilibrado"
        fill
        className={styles.image}
      />
    </div>
  );
};

export default CarouselEquilibrado;
