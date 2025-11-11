"use client";

import React from "react";
import { useTranslation } from "@/context/TranslationContext";
import ReactCountryFlag from "react-country-flag";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "es" : "en";
    changeLocale(newLocale);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={styles.languageSwitcher}
      aria-label={locale === "en" ? "Switch to Spanish" : "Switch to English"}
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <ReactCountryFlag
        countryCode={locale === "en" ? "GB" : "ES"}
        svg
        style={{
          width: "1.8em",
          height: "1.8em",
        }}
        title={locale === "en" ? "UK" : "Spain"}
      />
    </button>
  );
}
