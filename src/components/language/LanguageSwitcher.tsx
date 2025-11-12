"use client";

import React, { useState } from "react";
import { useTranslation } from "@/context/TranslationContext";
import ReactCountryFlag from "react-country-flag";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayLocale, setDisplayLocale] = useState(locale);

  const toggleLanguage = () => {
    if (isAnimating) return;
    
    // Change locale immediately for content
    const newLocale = locale === "en" ? "es" : "en";
    changeLocale(newLocale);
    
    // Trigger animation
    setIsAnimating(true);
    
    // Update display locale after animation completes
    setTimeout(() => {
      setDisplayLocale(newLocale);
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
            countryCode={displayLocale === "en" ? "GB" : "ES"}
            svg
            style={{
              width: "1.8em",
              height: "1.8em",
            }}
            title={displayLocale === "en" ? "UK" : "Spain"}
          />
        </div>
        <div className={styles.inactiveFlag}>
          <ReactCountryFlag
            countryCode={displayLocale === "en" ? "ES" : "GB"}
            svg
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
            title={displayLocale === "en" ? "Spain" : "UK"}
          />
        </div>
      </div>
    </button>
  );
}
