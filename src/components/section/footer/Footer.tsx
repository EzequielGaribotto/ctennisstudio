"use client";

import { useTranslation } from "../../../context/TranslationContext";
import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.css";
import { useEffect, useState } from "react";

export default function Footer() {
  const { t, theme, isHydrated } = useTranslation();
  const [iconSize, setIconSize] = useState(24);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define styles to match header
  const footerContentStyle = {
    backgroundColor: theme === 'dark' 
      ? 'rgba(45, 55, 72, 0.5)'
      : 'rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // For Safari
    border: `1px solid ${theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)'}`
  };

  // Update icon size based on screen width
  useEffect(() => {
    const updateIconSize = () => {
      if (window.innerWidth <= 480) {
        setIconSize(18);
      } else if (window.innerWidth <= 768) {
        setIconSize(20);
      } else {
        setIconSize(24);
      }
    };

    // Set initial size
    updateIconSize();

    // Update size on resize
    window.addEventListener("resize", updateIconSize);
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  // Don't render with styles until client-side hydration is complete
  if (!isClient || !isHydrated) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <footer className="w-full py-3 px-4 flex justify-center">
        <div className={styles.footerContent} style={{visibility: 'hidden'}}></div>
      </footer>
    );
  }

  return (
    <footer className="w-full py-3 px-4 flex justify-center">
      <div 
        className={styles.footerContent} 
        style={footerContentStyle}
      >
        <span className={styles.disclaimer}>{t("footer.disclaimer")}</span>
        <a 
          href="https://github.com/EzequielGaribotto/portfolio-ezequielgaribotto"
          className={styles.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
        >
          <FaGithub size={iconSize} />
        </a>
      </div>
    </footer>
  );
}
