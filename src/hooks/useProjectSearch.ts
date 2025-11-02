import { useState, useMemo } from "react";
import { Project } from "../models/Project";
import { useLocalStorage } from "./useLocalStorage";

interface ProjectMatch {
  project: Project;
  score: number;
  matchDetails: {
    titleExact: boolean;
    titlePartial: boolean;
    descriptionMatch: boolean;
    techMatches: number;
    totalTechs: number;
  };
}

export function useProjectSearch(projects: Project[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useLocalStorage<string[]>("project-search-keywords", []);
  const [showAllProjects, setShowAllProjects] = useLocalStorage<boolean>("show-all-projects", false);

  const filteredProjects = useMemo(() => {
    // Default projects to show when no filters are applied
    const defaultProjects = ["barcelona-inequality", "neutral-news", "eulix", "competitive-programming"];
    
    const hasSearchTerm = searchTerm.trim() !== "";
    const hasKeywords = selectedKeywords.length > 0;
    const hasActiveFilters = hasSearchTerm || hasKeywords;

    // If no filters are applied and showAllProjects is false, show only default projects
    if (!hasActiveFilters && !showAllProjects) {
      return projects.filter(project => defaultProjects.includes(project.id));
    }

    // Create scored matches for sorting
    const projectMatches: ProjectMatch[] = [];

    for (const project of projects) {
      let matchScore = 0;
      let shouldInclude = true;
      
      const matchDetails = {
        titleExact: false,
        titlePartial: false,
        descriptionMatch: false,
        techMatches: 0,
        totalTechs: project.technologies?.length || 0
      };

      // Search term filtering and scoring
      if (hasSearchTerm) {
        const searchLower = searchTerm.toLowerCase().trim();
        let searchMatches = false;

        // Title matching (highest priority)
        const titleLower = project.title.toLowerCase();
        if (titleLower === searchLower) {
          matchDetails.titleExact = true;
          matchScore += 1000; // Highest score for exact title match
          searchMatches = true;
        } else if (titleLower.includes(searchLower)) {
          matchDetails.titlePartial = true;
          // Score based on position and length ratio
          const position = titleLower.indexOf(searchLower);
          const lengthRatio = searchLower.length / titleLower.length;
          matchScore += 500 + (50 - Math.min(position, 50)) + (lengthRatio * 100);
          searchMatches = true;
        }

        // Description matching (medium priority)
        const descriptionLower = project.description.toLowerCase();
        if (descriptionLower.includes(searchLower)) {
          matchDetails.descriptionMatch = true;
          const position = descriptionLower.indexOf(searchLower);
          const lengthRatio = searchLower.length / descriptionLower.length;
          matchScore += 200 + (20 - Math.min(position / 10, 20)) + (lengthRatio * 50);
          searchMatches = true;
        }

        // Technology matching (lower priority but still important)
        const techMatches = project.technologies?.filter((tech: string) => 
          tech.toLowerCase().includes(searchLower)
        ) || [];
        
        if (techMatches.length > 0) {
          matchScore += techMatches.length * 100; // 100 points per matching tech
          searchMatches = true;
        }

        if (!searchMatches) {
          shouldInclude = false;
        }
      }

      // Keyword filtering and scoring (AND logic)
      if (hasKeywords && shouldInclude) {
        const keywordMatches = selectedKeywords.filter(keyword => {
          // Helper function to check if keyword matches in text considering word boundaries and case
          const smartMatch = (text: string, keyword: string): boolean => {
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Pattern 1: Exact word matches with word boundaries (case insensitive)
            const wordBoundaryRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
            
            // Pattern 2: For acronyms/uppercase - match only as complete segments
            // This matches "API" in "FastAPI", "RESTful API", "Web-API" but NOT in "Scraping"
            const acronymRegex = new RegExp(`(?:^|\\b|[A-Z])${escapedKeyword}(?=\\b|[A-Z]|$)`, 'i');
            
            // For very short keywords (1-2 chars), be more strict - only word boundaries
            if (keyword.length <= 2) {
              return wordBoundaryRegex.test(text);
            }
            
            return wordBoundaryRegex.test(text) || acronymRegex.test(text);
          };
          
          // Check in title
          const titleMatch = smartMatch(project.title, keyword);
          
          // Check in description  
          const descriptionMatch = smartMatch(project.description, keyword);
          
          // Check in technologies array with smart matching
          const techMatch = project.technologies?.some((tech: string) => 
            smartMatch(tech, keyword)
          ) || false;
          
          return titleMatch || descriptionMatch || techMatch;
        });

        // Must match ALL selected keywords
        if (keywordMatches.length !== selectedKeywords.length) {
          shouldInclude = false;
        } else {
          // Count tech matches for scoring
          matchDetails.techMatches = selectedKeywords.filter(keyword => 
            project.technologies?.some((tech: string) => {
              const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const wordBoundaryRegex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
              const acronymRegex = new RegExp(`(?:^|\\b|[A-Z])${escapedKeyword}(?=\\b|[A-Z]|$)`, 'i');
              
              if (keyword.length <= 2) {
                return wordBoundaryRegex.test(tech);
              }
              
              return wordBoundaryRegex.test(tech) || acronymRegex.test(tech);
            })
          ).length;
          
          // Bonus points for keyword matches
          matchScore += selectedKeywords.length * 150; // 150 points per matching keyword
          
          // Bonus for higher percentage of tech stack matching
          if (matchDetails.totalTechs > 0) {
            const techMatchRatio = matchDetails.techMatches / matchDetails.totalTechs;
            matchScore += techMatchRatio * 100;
          }
        }
      }

      if (shouldInclude) {
        projectMatches.push({
          project,
          score: matchScore,
          matchDetails
        });
      }
    }

    // Sort by score (descending), then by fallback criteria
    projectMatches.sort((a, b) => {
      // Primary: Sort by match score
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // Secondary: Prefer projects with more exact matches
      const aExactness = (a.matchDetails.titleExact ? 4 : 0) + 
                        (a.matchDetails.titlePartial ? 2 : 0) + 
                        (a.matchDetails.descriptionMatch ? 1 : 0);
      const bExactness = (b.matchDetails.titleExact ? 4 : 0) + 
                        (b.matchDetails.titlePartial ? 2 : 0) + 
                        (b.matchDetails.descriptionMatch ? 1 : 0);
      
      if (bExactness !== aExactness) {
        return bExactness - aExactness;
      }

      // Tertiary: Prefer projects with higher tech match ratio
      const aTechRatio = a.matchDetails.totalTechs > 0 ? 
        a.matchDetails.techMatches / a.matchDetails.totalTechs : 0;
      const bTechRatio = b.matchDetails.totalTechs > 0 ? 
        b.matchDetails.techMatches / b.matchDetails.totalTechs : 0;
      
      if (bTechRatio !== aTechRatio) {
        return bTechRatio - aTechRatio;
      }

      // Quaternary: Prefer projects with more technologies (more comprehensive)
      if (b.matchDetails.totalTechs !== a.matchDetails.totalTechs) {
        return b.matchDetails.totalTechs - a.matchDetails.totalTechs;
      }

      // Final fallback: Alphabetical by title
      return a.project.title.localeCompare(b.project.title);
    });

    return projectMatches.map(match => match.project);
  }, [projects, searchTerm, selectedKeywords, showAllProjects]);

  const hasActiveFilters = searchTerm.trim() !== "" || selectedKeywords.length > 0;
  const resultCount = filteredProjects.length;
  const totalCount = projects.length;

  return {
    searchTerm,
    setSearchTerm,
    selectedKeywords,
    setSelectedKeywords,
    filteredProjects,
    hasActiveFilters,
    resultCount,
    totalCount,
    showAllProjects,
    setShowAllProjects
  };
}
