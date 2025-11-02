"use client";

import { useTranslation } from "../../../context/TranslationContext";
import styles from "./SearchResults.module.css";

interface SearchResultsProps {
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  showAllProjects?: boolean;
  onToggleShowAll?: () => void;
}

export default function SearchResults({ 
  resultCount, 
  totalCount, 
  hasActiveFilters,
  showAllProjects = false,
  onToggleShowAll
}: SearchResultsProps) {
  const { t } = useTranslation();

  if (!hasActiveFilters) {
    return (
      <div className={styles.resultsContainer}>
        <p className={styles.resultsText}>
          {showAllProjects 
            ? t("search.showingAll").replace("{count}", totalCount.toString())
            : t("search.showingLimited")
                .replace("{count}", resultCount.toString())
                .replace("{total}", totalCount.toString())
          }
          {onToggleShowAll && (
            <>
              {" • "}
              <button
                onClick={onToggleShowAll}
                className={styles.toggleLink}
              >
                {showAllProjects ? t("search.showLessLink") : t("search.showAllLink")}
              </button>
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <p className={styles.resultsText}>
        {resultCount === 0 ? (
          <span className={styles.noResults}>
            {t("search.noResults")}
          </span>
        ) : (
          <>
            {t("search.showingFiltered")
              .replace("{filtered}", resultCount.toString())
              .replace("{total}", totalCount.toString())}
            {resultCount < totalCount && (
              <span className={styles.filteredNote}>
                {" "}{t("search.filtered")}
              </span>
            )}
          </>
        )}
      </p>
    </div>
  );
}
