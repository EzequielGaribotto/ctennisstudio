"use client";
import { useRef } from "react";
import LazyProjectCard from "./card/LazyProjectCard";
import ProjectSearch from "./ProjectSearch";
import SearchResults from "./SearchResults";
import { useTranslation } from "../../../context/TranslationContext";
import { useProjectSearch } from "../../../hooks/useProjectSearch";
import { Project } from "../../../models/Project";
import styles from './ProjectsSection.module.css';
import Section from "../Section";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const eulixTech = ["Android", "Kotlin", "UI", "UX", "Retrofit", "DataBinding", "MVVM", "XML", "Kotlin DSL", "LiveData", "Git", "Agile", "RESTful API", "International Team"];
  const neutralNewsTech = ["Back-end", "Python", "Android", "Kotlin", "UI", "UX", "Firebase", "Google Cloud Platform", "AI", "Machine Learning", "ETL", "Scraping", "Crawling", "Parsing", "Docker", "Pandas", "NoSQL", "BeautifulSoup", "Clustering", "Generative AI", "NumPy", "NLP", "Google Colab", "Jupyter Notebooks", "Dagger", "Hilt", "DAO", "Room", "Datastore"];
  const compTech = ["Java", "Algorithms", "Data Structures", "Problem Solving"];
  const apiListTech = ["Android", "Java", "UX", "Caching", "Coroutines", "Android SDK"];
  const zombTech = ["Game Development", "UX", "Python", "MakeCode Arcade", "Collision Detection", "Retro Gaming"];
  const cronTech = ["Front-end", "UX", "React", "TypeScript", "Vite", "CSS", "JavaScript", "HTML", "Web", "useEffect"];
  const mapsTech = ["Android", "UI", "UX", "Kotlin", "Firebase", "Google Maps API", "CRUD", "Authentication", "Database"];
  const portfolioTech = ["Front-end", "UI", "UX", "React", "Next.js", "TypeScript", "TailwindCSS", "Portfolio", "Node.js", "Web Development", "Responsive Design", "Theme Switching", "Multi-language"];
  const peleaDeGallosTech = ["Back-end", "Front-end", "Kotlin", "Ktor", "UI", "UX", "Client-server Communication", "File processing", "Data access", "NoSQL", "MongoDB"];
  const hackerNewsAPITech = ["Back-end", "Python", "FastAPI", "Web Scraping", "API", "Docker", "TDD", "Caching", "Data Processing"];
  const barcelonaInequalityTech = ["Back-end", "Python", "Machine Learning", "Data Processing", "Classification", "Statistical Analysis", "Data Visualization", "Pandas", "NumPy", "Google Colab", "Jupyter Notebooks", "AI", "Socioeconomic Analysis"];

  const projects: Project[] = [
    {
      id: "neutral-news",
      title: t("projects.neutralNews.title"),
      description: t("projects.neutralNews.description"),
      footer: t("projects.neutralNews.footer"),
      startDate: t("projects.neutralNews.startDate"),
      endDate: null,
      image: "/images/projects/neutral-news-homeview.webp",
      images: [
        "/images/projects/neutral-news-homeview.webp",
        "/images/projects/neutral-news-article.webp",
        "/images/projects/neutral-news-footer.webp",
        "/images/projects/neutral-news-source.webp",
      ],
      technologies: neutralNewsTech,
      repoLink: "https://github.com/EzequielGaribotto/neutral-news-android",
      websiteLink: t("projects.neutralNews.websiteLink"),
    },
    {
      id: "eulix",
      title: t("projects.eulix.title"),
      description: t("projects.eulix.description"),
      footer: t("projects.eulix.footer"),
      startDate: t("projects.eulix.startDate"),
      endDate: t("projects.eulix.endDate"),
      image: "/images/projects/eulix.webp",
      technologies: eulixTech,
      playStoreLink: "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
    },
    {
      id: "competitive-programming",
      title: t("projects.competitiveProgramming.title"),
      description: t("projects.competitiveProgramming.description"),
      footer: t("projects.competitiveProgramming.footer"),
      startDate: t("projects.competitiveProgramming.startDate"),
      endDate: null,
      image: "/images/projects/competitive.webp",
      technologies: compTech,
      repoLink: "https://github.com/EzequielGaribotto/CompetitiveProgramming",
      programameLink: "https://programame.com/2024/nac/",
    },
    {
      id: "barcelona-inequality",
      title: t("projects.barcelonaInequality.title"),
      description: t("projects.barcelonaInequality.description"),
      footer: t("projects.barcelonaInequality.footer"),
      startDate: t("projects.barcelonaInequality.startDate"),
      endDate: t("projects.barcelonaInequality.endDate"),
      image: "/images/projects/desigualtat-als-barris-de-bcn.webp",
      technologies: barcelonaInequalityTech,
      repoLink: "https://colab.research.google.com/drive/1MZDA4yxF1LFktC1E7QE6cR4v8mQLxLiN",
      presentationLink: "https://view.genially.com/67e0341f1bb26cf1dc8eba42/presentation-ezequiel-garibotto-anastasiia-levkina-desigualtat-als-barris-de-bcn"
    },
    {
      id: "rick-and-morty-api-list",
      title: t("projects.rickAndMorty.title"),
      description: t("projects.rickAndMorty.description"),
      footer: t("projects.rickAndMorty.footer"),
      startDate: t("projects.rickAndMorty.startDate"),
      endDate: t("projects.rickAndMorty.endDate"),
      image: "/images/projects/api-list.webp",
      technologies: apiListTech,
      repoLink: "https://github.com/EzequielGaribotto/Ricky-and-Morty-API",
    },
    {
      id: "hackernews-api",
      title: t("projects.hackerNewsAPI.title"),
      description: t("projects.hackerNewsAPI.description"),
      footer: t("projects.hackerNewsAPI.footer"),
      startDate: t("projects.hackerNewsAPI.startDate"),
      endDate: t("projects.hackerNewsAPI.endDate"),
      image: "/images/projects/hackernews.webp",
      technologies: hackerNewsAPITech,
      repoLink: "https://github.com/EzequielGaribotto/HackerNews-Scraper-API"
    },
    {
      id: "zomb",
      title: t("projects.zomb.title"),
      description: t("projects.zomb.description"),
      footer: t("projects.zomb.footer"),
      startDate: t("projects.zomb.startDate"),
      endDate: t("projects.zomb.endDate"),
      image: "/images/projects/zomb.webp",
      technologies: zombTech,
      repoLink: "https://github.com/EzequielGaribotto/zomb",
      arcadeLink: "https://ezequielgaribotto.github.io/zomb/"
    },
    {
      id: "cron-schedule-editor",
      title: t("projects.cronScheduleEditor.title"),
      description: t("projects.cronScheduleEditor.description"),
      footer: t("projects.cronScheduleEditor.footer"),
      startDate: t("projects.cronScheduleEditor.startDate"),
      endDate: t("projects.cronScheduleEditor.endDate"),
      image: "/images/projects/cron-schedule-editor.webp",
      technologies: cronTech,
      repoLink: "https://github.com/EzequielGaribotto/cron-schedule-editor"
    },
    {
      id: "portfolio-website",
      title: t("projects.portfolioWebsite.title"),
      description: t("projects.portfolioWebsite.description"),
      footer: t("projects.portfolioWebsite.footer"),
      startDate: t("projects.portfolioWebsite.startDate"),
      endDate: t("projects.portfolioWebsite.endDate"),
      image: "/images/projects/portfolio.webp",
      technologies: portfolioTech,
      repoLink: "https://github.com/EzequielGaribotto/portfolio-ezequielgaribotto"
    },
    {
      id: "maps-app",
      title: t("projects.mapsApp.title"),
      description: t("projects.mapsApp.description"),
      footer: t("projects.mapsApp.footer"),
      startDate: t("projects.mapsApp.startDate"),
      endDate: t("projects.mapsApp.endDate"),
      technologies: mapsTech,
      repoLink: "https://github.com/EzequielGaribotto/M08-P4-MapsApp"
    },
    {
      id: "pelea-de-gallos",
      title: t("projects.peleaDeGallos.title"),
      description: t("projects.peleaDeGallos.description"),
      footer: t("projects.peleaDeGallos.footer"),
      startDate: t("projects.peleaDeGallos.startDate"),
      endDate: t("projects.peleaDeGallos.endDate"),
      technologies: peleaDeGallosTech,
      repoLink: "https://github.com/EzequielGaribotto/PeleaDeGallos"
    }
  ];

  const {
    setSearchTerm,
    selectedKeywords,
    setSelectedKeywords,
    filteredProjects,
    hasActiveFilters,
    resultCount,
    totalCount,
    showAllProjects,
    setShowAllProjects
  } = useProjectSearch(projects);

  return (
    <div ref={sectionRef}>
      <Section
        id="projects"
        title={t("projects.title")}
      >
      <div style={{ width: '100%' }}>
        {/* Search Component */}
        <ProjectSearch
          onSearchChange={setSearchTerm}
          onKeywordsChange={setSelectedKeywords}
          selectedKeywords={selectedKeywords}
        />

        {/* Results Counter */}
        <SearchResults
          resultCount={resultCount}
          totalCount={totalCount}
          hasActiveFilters={hasActiveFilters}
          showAllProjects={showAllProjects}
          onToggleShowAll={() => setShowAllProjects(!showAllProjects)}
        />        {/* Projects Grid */}
        <div className={styles.masonryGrid}>
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.masonryItem}>
              <LazyProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredProjects.length === 0 && hasActiveFilters && (
          <div className={styles.noResultsMessage}>
            <p>{t("search.tryAdjusting")}</p>
          </div>
        )}
      </div>
      </Section>
    </div>
  );
}
