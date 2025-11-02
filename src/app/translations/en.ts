import { baseTranslations, Translations } from './baseTranslations';

/**
 * English translations
 */
export const en: Translations = {
  ...baseTranslations,
  meta: {
    title: "Ezequiel Garibotto - Portfolio",
    description: "Software developer with experience in mobile, web and cloud services.",
  },
  navigation: {
    profile: "Profile",
    projects: "Projects",
    experience: "Experience",
    training: "Training",
    gaming: "About Me"
  },
  tooltips: {
    github: "Visit my GitHub profile",
    linkedin: "Connect with me on LinkedIn",
    email: "Copy email",
    emailCopied: "✓ Copied!",
    competition: "View competition details",
    solvedProblems: "View solved problems",
    playGame: "Play the game",
    playStore: "Download from Play Store",
    sourceCode: "View source code",
    logo: "Visit my GitHub profile",
    expandImage: "Expand image",
    closeImage: "Close image",
    playArcadeGame: "Play Arcade Game",
    viewPresentation: "View presentation",
    viewWebsite: "Visit website"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Multiplatform app developer | Junior software developer",
    photoAlt: "Photo of Ezequiel Garibotto"
  },
  cv: {
    download: "Download CV",
    spanish: "Spanish CV",
    english: "English CV",
    english_ats: "English CV (ATS)",
    preview: "Preview CV",
    unableToDisplay: "Unable to display PDF file.",
    downloadInstead: "Download Instead",
    lastUpdated: "Last updated"
  },
  search: {
    placeholder: "Search projects by title, description, or technology...",
    clearFilters: "Clear filters",
    noResults: "No projects found matching your criteria",
    showingAll: "Showing all {count} projects",
    showingLimited: "Showing {count} projects out of {total}",
    showingFiltered: "Showing {filtered} of {total} projects",
    filtered: "(filtered)",
    tryAdjusting: "Try adjusting your search criteria or removing some filters.",
    showAllLink: "Show all projects",
    showLessLink: "Show less"
  },
  projects: {
    title: "Projects",
    current: "present",
    neutralNews: {
      title: "Neutral News",
      description: "Application with ETL flow that generates neutral news, combining diverse powerful technologies for the backend: Scraping, XML parsing, ML algorithms for embedding and clustering, use of text generation APIs, among others.\n" +
        "• Implemented periodic semantic clustering of news articles sourced from the RSS feeds of more than 10 Spanish media outlets.\n" +
        "• Built a robust system to ensure the generation of neutral versions for clusters of semantically grouped news.\n" +
        "• Developed both a solid and complex backend and a user-friendly Android application.",
      footer: "Academic project continuation",
      startDate: "December 2024",
      websiteLink: "https://getfacts.app/en"
    },
    eulix: {
      title: "Eulix",
      description: "Android development of an app designed to recommend content (movies, series) based on user personality, mood, and preferences.",
      footer: "Internship",
      startDate: "October 2024",
      endDate: "April 2025"
    },
    competitiveProgramming: {
      title: "Competitive Programming",
      description: "Participation in competitive programming contests in teams, representing the institute, finishing fourth in the national contest. Problems solved on JO-EL and AceptaElReto for the ProgramaMe 2024 contest.",
      footer: "Academic Elective",
      startDate: "September 2023"
    },
    rickAndMorty: {
      title: "Efficient API List",
      description: "Typical API List App, but made in Android with Java8, DataBinding, Caché, Pagination, SDK-Like architecture, Quick response times and simple efficiency tracking",
      footer: "Learning Project",
      startDate: "April 2025",
      endDate: "April 2025"
    },
    zomb: {
      title: "Zomb - Retro Game",
      description: "Infinite horizontal scroller retro game made with Makecode Arcade, featuring collision systems, enemies that follow the player, and survival mechanics in a zombie environment.",
      footer: "Learning Project",
      startDate: "November 2024",
      endDate: "December 2024"
    },
    cronScheduleEditor: {
      title: "CRON Schedule Editor",
      description: "User-friendly visual editor for creating and managing cron expressions. Web tool that helps build cron schedules without memorizing the syntax, developed to improve my understanding of useEffect.",
      footer: "Learning Project",
      startDate: "January 2025",
      endDate: "January 2025"
    },
    portfolioWebsite: {
      title: "Portfolio Website",
      description: "Modern personal portfolio website built with React, Next.js, and TypeScript. Features responsive design, theme switching, multiple language support, and showcases projects and professional experience.",
      footer: "Learning Project",
      startDate: "April 2025",
      endDate: "July 2025"
    },
    mapsApp: {
      title: "Maps CRUD Application",
      description: "Complete Android CRUD app for map markers with user registration, login, and Firebase Database storage for user data (name, profile picture, captured photos).",
      footer: "Academic Project",
      startDate: "March 2024",
      endDate: "June 2024"
    },
    peleaDeGallos: {
      title: "Pelea De Gallos",
      description: "Client-server communication with Ktor, file processing, data access.",
      footer: "Academic Project",
      startDate: "May 2024",
      endDate: "May 2024"
    },
    hackerNewsAPI: {
      title: "HackerNews Scraper API",
      description: "Python FastAPI web scraper that fetches news articles from Hacker News with intelligent caching strategy. Features Docker containerization, test-driven development, and efficient data processing.",
      footer: "Learning Project",
      startDate: "June 2025",
      endDate: "June 2025"
    },
    barcelonaInequality: {
      title: "Barcelona Neighborhoods Inequality Analysis",
      description: "Machine Learning project analyzing inequality patterns across Barcelona neighborhoods using Python. Data processing, classification algorithms, and statistical analysis to identify socioeconomic disparities. Final project for Python Machine Learning course covering data preprocessing, AI techniques, and visualization.",
      footer: "Academic Project",
      startDate: "March 2025",
      endDate: "March 2025"
    },
    showAllProjects: "Show all projects",
    showLess: "Show less"
  },
  experiences: {
    title: "Work experience",
    eulix: {
      company: "Eulix",
      position: "Junior Android Developer",
      period: "October 2024 - April 2025 (7 months)",
      description: "Development of an application with the objective of recommending content (movies, series), based on the user's personality, mood and preferences.\n" +
        "• Developed a chatbot (Virtual Assistant) for onboarding and 'How It Works' section, enhancing user engagement and support.\n" +
        "• Designed and enhanced the UI across all app screens, driving continuous UX improvements through iterative design ideas.\n" +
        "• Integrated RESTful API with Retrofit in collaboration with the back-end team, ensuring seamless data exchange and application functionality.\n" +
        "• Coordinated with an international team in India, facilitating effective communication and project alignment across different time zones.",
      location: "Spain, Barcelona · Hybrid",
    },
    telus: {
      company: "TELUS Digital",
      position: "Data Annotator",
      period: "July 2023 - January 2025 (1 year 7 months)",
      description: "• Classified, evaluated, and described queries, audio, video, images, and other data types to ensure relevance and quality.\n" +
        "• Applied professional English, general knowledge, and digital literacy to enhance the accuracy and contextual understanding of content.",
      location: "Spain · Fully Remote",
    },
    seidor: {
      company: "SEIDOR NTS",
      position: "Salesforce Technical Assistant",
      period: "Aug 2025 - Oct 2025",
      location: "Spain, Barcelona · Hybrid",
      description:
        "Service and API development (Apex), web development and interactive components (LWC), low-code solutions (Flow Builder), enterprise application architecture design (Sales/Service Cloud), asynchronous classes, unit testing, integration of external services using HTTP calls and Postman.",
    },
  },
  training: {
    title: "Academic training",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Cross-Platform Application Development - Intelligent Systems",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, Spain",

      description: "Higher vocational degree in cross-platform mobile and web application development, focusing on modern technologies and agile practices.\n\n" +
        "• Kotlin, Jetpack Compose / XML, Retrofit for Android development\n" +
        "• Machine Learning, Web Scraping, Sentiment Analysis, Classification, Decision and Prediction Algorithms\n" +
        "• SQL and NoSQL database management including PostgreSQL, MongoDB and Firebase\n" +
        "• Client-server communications with Ktor, file processing, data access\n" +
        "• Participation in competitive programming contests using Java and Kotlin\n\n" +
        "Grade: 9.08",
    },
    upf: {
      institution: "Universitat Pompeu Fabra (UPF)",
      course: "Engineering in Audiovisual Systems",
      period: "2021 - 2022 (discontinued academic program)",
      location: "Barcelona, Spain",
      description: "Degree in engineering in audiovisual systems with a focus on theoretical and practical foundations of computer science, including programming, algorithms, and data structures.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Technological Baccalaureate",
      period: "2019 - 2021",
      location: "Santa Coloma de Gramenet, Spain",
      description: "Baccalaureate with a focus on science and technology, preparing for higher studies in engineering and software development.",
    }
  },
  aboutMeSection: {
    title: "About Me",
    personalInfo: "Starting to program has been the best decision of my life, and it has become my vocation. I'm passionate about creating software that solves real problems and continuously improving my technical skills.",
    lifestyleInfo: "And the second best decision was starting to train. I enjoy staying active and healthy, maintaining a balanced lifestyle.",
    musicInfo: "I mostly listen to metal, rock, Spanish rap, national rock (Argentinean). I used to listen to electronic music a lot, now that music gives me nostalgia.",
    hobbiesInfo: "As for other hobbies, I used to play Minecraft a lot, but not building or making redstone mechanisms like many programmers I know. I enjoyed the competitive PvP of version 1.7.10. But I'm a normal person, I swear, I also enjoy immersive single-player experiences that offer rich narratives and open-world exploration like The Elder Scrolls saga, Red Dead Redemption, Spore, Atomic Heart, to mention a few.",
    heavyProfile: "You can add me on Hevy, if you're into lifting",
    spotifyPlaylist: "I gift you my playlist"
  },
};