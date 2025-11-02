"use client";

import { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../../../../models/Project";
import styles from "./LazyProjectCard.module.css";

interface LazyProjectCardProps {
  project: Project;
}

export default function LazyProjectCard({ project }: LazyProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.lazyCardContainer}
      // Adding min-height to make cards taller
      style={{ minHeight: "500px" }}
    >
      {isVisible ? (
        <ProjectCard project={project} />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.placeholderTitle}></div>
          <div className={styles.placeholderDescription}></div>
          <div className={styles.placeholderImage}></div>
          <div className={styles.placeholderTags}>
            <div className={styles.placeholderTag}></div>
            <div className={styles.placeholderTag}></div>
            <div className={styles.placeholderTag}></div>
          </div>
        </div>
      )}
    </div>
  );
}
