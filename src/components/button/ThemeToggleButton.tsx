"use client";

import { useTranslation } from "../../context/TranslationContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ThemeToggleButtonProps } from "../../models/interfaces";
import { getResponsiveIconSize } from "../../utils/browserHelpers";
import { THEME, ThemeType } from "../../constants";

export default function ThemeToggleButton({ className = "" }: ThemeToggleButtonProps) {
  const { theme, changeTheme } = useTranslation();
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    const updateIconSize = () => setIconSize(getResponsiveIconSize());
    updateIconSize();
    window.addEventListener("resize", updateIconSize);
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    changeTheme(newTheme);
  };

  const buttonStyle = {
    padding: iconSize <= 16 ? "0.25rem" : "0.5rem",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: "var(--foreground)",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button
      onClick={toggleTheme}
      className={className}
      style={buttonStyle}
      aria-label={theme === THEME.LIGHT ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === THEME.DARK ? <FaMoon size={iconSize} /> : <FaSun size={iconSize} />}
    </button>
  );
}
