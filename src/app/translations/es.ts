import { baseTranslations, Translations } from './baseTranslations';

/**
 * Spanish translations
 */
export const es: Translations = {
  ...baseTranslations,
  meta: {
    title: "Ezequiel Garibotto - Portfolio",
    description: "Desarrollador de software con experiencia en desarrollo móvil, web y servicios cloud."
  },
  navigation: {
    profile: "Perfil",
    projects: "Proyectos",
    experience: "Experiencia",
    training: "Formación",
    gaming: "Sobre mí"
  },
  tooltips: {
    github: "Visita mi perfil de GitHub",
    linkedin: "Conecta conmigo en LinkedIn",
    email: "Copiar email",
    emailCopied: "✓ ¡Copiado!",
    competition: "Ver detalles de la competición",
    solvedProblems: "Ver problemas resueltos", // For competitive programming source code
    playGame: "Jugar al juego",
    playStore: "Descargar en la Play Store",
    sourceCode: "Ver código fuente",
    logo: "Visita mi perfil de GitHub",
    expandImage: "Ampliar imagen",
    closeImage: "Cerrar imagen",
    playArcadeGame: "Jugar Juego Arcade",
    viewPresentation: "Ver presentación",
    viewWebsite: "Visitar sitio web"
  },
  footer: {
    disclaimer: "© 2025 Ezequiel Garibotto.",
    githubLink: "GitHub repo"
  },
  aboutMe: {
    title: "Ezequiel Garibotto",
    description: "Desarrollador de aplicaciones multiplataforma | Desarrollador de software junior",
    photoAlt: "Foto de Ezequiel Garibotto"
  },
  cv: {
    download: "Descargar CV",
    spanish: "CV en Español",
    english: "CV en Inglés",
    english_ats: "CV en Inglés (ATS)",
    preview: "Visualizar CV",
    unableToDisplay: "No se puede mostrar el archivo PDF.",
    downloadInstead: "Descargar en su lugar",
    lastUpdated: "Última actualización"
  },
  search: {
    placeholder: "Buscar proyectos por título, descripción o tecnología...",
    clearFilters: "Limpiar filtros",
    noResults: "No se encontraron proyectos que coincidan con tus criterios",
    showingAll: "Mostrando todos los {count} proyectos",
    showingLimited: "Mostrando {count} proyectos de {total}",
    showingFiltered: "Mostrando {filtered} de {total} proyectos",
    filtered: "(filtrado)",
    tryAdjusting: "Intenta ajustar tus criterios de búsqueda o eliminar algunos filtros.",
    showAllLink: "Ver todos los proyectos",
    showLessLink: "Ver menos"
  },
  projects: {
    title: "Proyectos",
    current: "presente",
    neutralNews: {
      title: "Neutral News",
      description: "Aplicación con flujo ETL que genera noticias neutrales, combinando diversas tecnologías potentes para el backend: Scraping, parsing XML, algoritmos ML para embedding y clustering, uso de APIs de generación de texto, entre otros.\n" +
        "• Implementé clustering semántico periódico de artículos de noticias obtenidos de feeds RSS de más de 10 medios españoles.\n" +
        "• Construí un sistema robusto para asegurar la generación de versiones neutrales para clusters de noticias agrupadas semánticamente.\n" +
        "• Desarrollé tanto un backend sólido y complejo como una aplicación Android amigable para el usuario.",
      footer: "Académico en continuidad",
      startDate: "diciembre 2024",
      websiteLink: "https://getfacts.app/es"
    },
    eulix: {
      title: "Eulix",
      description: "Desarrollo Android de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.",
      footer: "Prácticas formativas",
      startDate: "octubre 2024",
      endDate: "abril 2025"
    },
    competitiveProgramming: {
      title: "Programación Competitiva",
      description: "Participación en concursos de programación competitiva en equipos, representando al instituto, quedando cuartos en el cuncurso nacional. Problemas resueltos en JO-EL y AceptaElReto para el concurso ProgramaMe 2024.",
      footer: "Optativo Académico",
      startDate: "septiembre 2023"
    },
    rickAndMorty: {
      title: "Lista API Eficiente",
      description: "La típica API list, pero hecha en Android con Java8, DataBinding, Caché, Paginación, arquitectura tipo SDK, tiempos de respuesta rápidos y un seguimiento de eficiencia simple.",
      footer: "Proyecto de Aprendizaje",
      startDate: "abril 2025",
      endDate: "abril 2025"
    },
    zomb: {
      title: "Zomb - Juego Retro",
      description: "Juego retro de desplazamiento horizontal infinito desarrollado con Makecode Arcade. Incluye sistema de colisiones, enemigos que siguen al jugador, y mecánicas de supervivencia en un entorno zombie.",
      footer: "Proyecto de Aprendizaje",
      startDate: "noviembre 2024",
      endDate: "diciembre 2024"
    },
    cronScheduleEditor: {
      title: "Editor de Programación CRON",
      description: "Editor visual e intuitivo para crear y gestionar expresiones cron. Herramienta web que permite construir programaciones cron sin necesidad de memorizar la sintaxis, desarrollada para mejorar mi comprensión de useEffect.",
      footer: "Proyecto de Aprendizaje",
      startDate: "enero 2025",
      endDate: "enero 2025"
    },
    portfolioWebsite: {
      title: "Sitio Web Portfolio",
      description: "Sitio web portfolio personal moderno construido con React, Next.js y TypeScript. Incluye diseño responsivo, cambio de tema, soporte multi-idioma y muestra proyectos y experiencia profesional.",
      footer: "Proyecto de Aprendizaje",
      startDate: "abril 2025",
      endDate: "julio 2025"
    },
    mapsApp: {
      title: "Aplicación CRUD de Mapas",
      description: "Aplicación Android completa con operaciones CRUD para marcadores de mapas. Incluye sistema de registro, login y almacenamiento de datos de usuario (nombre, foto de perfil, fotos capturadas) en Firebase Database.",
      footer: "Proyecto Académico",
      startDate: "marzo 2024",
      endDate: "junio 2024"
    },
    peleaDeGallos: {
      title: "Pelea De Gallos",
      description: "Comunicación cliente-servidor con Ktor, procesamiento de archivos, acceso a datos.",
      footer: "Proyecto Académico",
      startDate: "mayo 2024",
      endDate: "mayo 2024"
    },
    hackerNewsAPI: {
      title: "API Scraper HackerNews",
      description: "Web scraper Python FastAPI que obtiene artículos de noticias de Hacker News con estrategia de caché inteligente. Incluye containerización Docker, desarrollo dirigido por pruebas y procesamiento eficiente de datos.",
      footer: "Proyecto de Aprendizaje",
      startDate: "junio 2025",
      endDate: "junio 2025"
    },
    barcelonaInequality: {
      title: "Análisis de Desigualdad en Barrios de Barcelona",
      description: "Proyecto de Machine Learning analizando patrones de desigualdad en los barrios de Barcelona usando Python. Procesamiento de datos, algoritmos de clasificación y análisis estadístico para identificar disparidades socioeconómicas. Proyecto final del curso de Python Machine Learning cubriendo preprocesamiento de datos, técnicas de IA y visualización.",
      footer: "Proyecto Académico",
      startDate: "marzo 2025",
      endDate: "marzo 2025"
    },
    showAllProjects: "Mostrar todos los proyectos",
    showLess: "Mostrar menos"
  },
  experiences: {
    title: "Experiencia profesional",
    eulix: {
      company: "Eulix",
      position: "Desarrollador Junior de Android",
      period: "octubre 2024 - abril 2025 (7 meses)",
      description: "Desarrollo de una aplicación con el objetivo de recomendar contenidos (películas, series) basándose en la personalidad, estado de ánimo y preferencias del usuario.\n" +
        "• Desarrollé un chatbot (Asistente Virtual) para onboarding y sección 'Cómo Funciona', mejorando el engagement y soporte al usuario.\n" +
        "• Diseñé y mejoré la UI en todas las pantallas de la app, impulsando mejoras continuas de UX a través de ideas de diseño iterativo.\n" +
        "• Integré API RESTful con Retrofit en colaboración con el equipo de back-end, asegurando intercambio de datos fluido y funcionalidad de la aplicación.\n" +
        "• Coordiné con un equipo internacional en India, facilitando comunicación efectiva y alineación del proyecto a través de diferentes zonas horarias.",
      location: "Barcelona, España · Híbrido",
    },
    telus: {
      company: "TELUS Digital",
      position: "Anotador de Datos",
      period: "julio 2023 - enero 2025 (1 año 7 meses)",
      description: "• Clasifiqué, evalué y describí consultas, audio, video, imágenes y otros tipos de datos para asegurar relevancia y calidad.\n" +
        "• Apliqué inglés profesional, conocimiento general y alfabetización digital para mejorar la precisión y comprensión contextual del contenido.",
      location: "España · Totalmente Remoto",
    },
    seidor: {
      company: "SEIDOR NTS",
      position: "Asistente Técnico de Salesforce",
      period: "Ago 2025 - Oct 2025",
      location: "Barcelona, España · Híbrido",
      description:
        "Desarrollo de servicios y APIs (Apex), desarrollo web y componentes interactivos (LWC), soluciones low-code (Flow Builder), diseño de arquitectura de aplicaciones empresariales (Sales/Service Cloud), clases asíncronas, pruebas unitarias, integración de servicios externos usando llamadas HTTP y Postman.",
    },
  },
  training: {
    title: "Formación académica",
    itb: {
      institution: "Institut Tecnològic de Barcelona (ITB)",
      course: "Desarrollo de Aplicaciones Multiplataforma - Sistemas Inteligentes (DAMi)",
      period: "2023 - 2025",
      location: "Nou Barris, Barcelona, España",
      description: "Grado superior de desarrollo de aplicaciones móviles y web, con énfasis en tecnologías modernas y metodología Agile y Scrum.\n\n" +
        "• Kotlin, Jetpack Compose / XML, Retrofit, para desarrollo Android\n" +
        "• Machine Learning, Web Scraping, Sentiment Analysis, Algoritmos de Clasificación, Decisión y Predicción\n" +
        "• Gestión de bases de datos SQL y NoSQL como PostgreSQL, MongoDB y Firebase\n" +
        "• Comunicaciones cliente-servidor con Ktor, lectura de ficheros, acceso a datos\n" +
        "• Participación en concursos de programación competitiva, usando Java y Kotlin\n\n" +
        "Nota: 9.08",
    },
    upf: {
      institution: "Universitat Pompeu Fabra (UPF)",
      course: "Ingeniería en Sistemas Audiovisuales",
      period: "2021 - 2022 (formación académica interrumpida)",
      location: "Barcelona, España",
      description: "Grado en ingeniería en sistemas audiovisuales con enfoque en fundamentos teóricos y prácticos de la informática, incluyendo programación, algoritmos y estructuras de datos.",
    },
    rb4: {
      institution: "Ramón Berenguer IV (RB4)",
      course: "Bachillerato Tecnológico",
      period: "2019 - 2021",
      location: "Santa Coloma de Gramenet, España",
      description: "Bachillerato con enfoque en ciencias y tecnología, preparando para estudios superiores en ingeniería y desarrollo de software.",
    }
  },
  aboutMeSection: {
    title: "Sobre mí",
    personalInfo: "Empezar a programar ha sido la mejor decisión de mi vida, y se ha vuelto mi vocación. Me apasiona crear software que resuelva problemas reales y mejorar continuamente mis habilidades técnicas.",
    lifestyleInfo: "Y la segunda mejor decisión fue empezar a entrenar. Disfruto mantenerme activo y saludable, llevando un estilo de vida equilibrado.",
    musicInfo: "Escucho principalmente metal, rock, rap español, rock nacional (argentino). Y solía escuchar mucha música electrónica, ahora esa música me da nostalgia.",
    hobbiesInfo: "En cuanto a otros hobbies, solía jugar mucho Minecraft, pero no construir, ni hacer mecanismos de redstone, como muchos programadores que conozco, a mi me gustaba jugar el PvP competitivo de la 1.7.10. Pero soy una persona normal, lo juro, también disfruto de las experiencias inmersivas de un solo jugador que ofrecen narrativas ricas y exploración de mundo abierto como la saga de The Elder Scrolls, Red Dead Redemption, Spore, Atomic Heart, por mencionar algunos.",
    heavyProfile: "Me puedes agregar en Hevy, si te van los hierros",
    spotifyPlaylist: "Te regalo mi playlist"
  },
};