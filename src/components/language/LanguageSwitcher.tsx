"use client";

import React, { useState } from "react";
import { useTranslation } from "@/context/TranslationContext";
import ReactCountryFlag from "react-country-flag";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleLanguage = () => {
    if (isAnimating) return;
    
    // Change locale immediately
    const newLocale = locale === "en" ? "es" : "en";
    changeLocale(newLocale);
    
    // Trigger animation
    setIsAnimating(true);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`${styles.languageSwitcher} ${isAnimating ? styles.animating : ''}`}
      aria-label={locale === "en" ? "Switch to Spanish" : "Switch to English"}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <div className={styles.flagContainer}>
        <div className={styles.activeFlag}>
          <ReactCountryFlag
            countryCode={locale === "en" ? "GB" : "ES"}
            svg
            style={{
              width: "1.8em",
              height: "1.8em",
            }}
            title={locale === "en" ? "UK" : "Spain"}
          />
        </div>
        <div className={styles.inactiveFlag}>
          <ReactCountryFlag
            countryCode={locale === "en" ? "ES" : "GB"}
            svg
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
            title={locale === "en" ? "Spain" : "UK"}
          />
        </div>
      </div>
    </button>
  );
}
