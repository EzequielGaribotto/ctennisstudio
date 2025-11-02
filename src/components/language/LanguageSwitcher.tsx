"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();
  const [fontSize, setFontSize] = useState("0.9rem");

  // Update font size based on screen width
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth <= 480) {
        setFontSize("0.7rem");
      } else if (window.innerWidth <= 768) {
        setFontSize("0.75rem");
      } else {
        setFontSize("0.9rem");
      }
    };

    // Set initial font size
    updateFontSize();

    // Update font size on resize
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en";
    changeLocale(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm font-medium hover:opacity-80 transition-opacity"
      aria-label={locale === "en" ? "Switch to Spanish" : "Switch to English"}
      style={{ fontSize: fontSize }}
    >
      {locale === "en" ? "EN | ES" : "ES | EN"}
    </button>
  );
}