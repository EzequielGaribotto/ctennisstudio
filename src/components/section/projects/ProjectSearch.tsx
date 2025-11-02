"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslation } from "../../../context/TranslationContext";
import styles from "./ProjectSearch.module.css";

interface ProjectSearchProps {
  onSearchChange: (searchTerm: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
  selectedKeywords: string[];
}

export default function ProjectSearch({ 
  onSearchChange, 
  onKeywordsChange, 
  selectedKeywords 
}: ProjectSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  // Hardcoded list of keywords - sorted by priority and categories
  const availableKeywords = [
    "Android", 
    "Back-end", 
    "Front-end",
    "Game Development",
    "Kotlin",
    "Python", 
    "Java",
    "AI", 
    "Machine Learning",
    "Firebase",
    "API",
    "Cloud",
    "UI",
    "UX",
    "React",
  ];

  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm, onSearchChange]);

  const handleKeywordToggle = (keyword: string) => {
    const updatedKeywords = selectedKeywords.includes(keyword)
      ? selectedKeywords.filter(k => k !== keyword)
      : [...selectedKeywords, keyword];
    
    onKeywordsChange(updatedKeywords);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onKeywordsChange([]);
  };

  const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;

  return (
    <div className={styles.searchContainer}>
      {/* Search Bar */}
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          {hasActiveFilters && (
            <button
              onClick={clearSearch}
              className={styles.clearButton}
              aria-label={t("search.clearFilters")}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Keyword Tags */}
      <div className={styles.keywordsContainer}>
        <div className={styles.keywordTags}>
          {availableKeywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordToggle(keyword)}
              className={`${styles.keywordTag} ${
                selectedKeywords.includes(keyword) ? styles.selected : ""
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
