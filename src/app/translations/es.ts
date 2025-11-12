import { baseTranslations, Translations } from './baseTranslations';

/**
 * Spanish translations
 */
export const es: Translations = {
  ...baseTranslations,
  meta: {
    title: "CTennis Studio - Encordado y Equilibrado Profesional",
    description: "Servicio especializado en encordado y equilibrado de raquetas de tenis con años de experiencia."
  },
  navigation: {
    inicio: "Inicio",
    encordado: "Encordado Profesional",
    equilibrado: "Equilibrado y Reparación",
    cursos: "Cursos",
    experiencia: "Experiencia"
  },
  tooltips: {
    linkedin: "Conecta conmigo en LinkedIn",
    email: "Copiar email",
    emailCopied: "✓ ¡Copiado!"
  },
  footer: {
    disclaimer: "© 2025 CTennis Studio.",
  },
  hero: {
    title: "CTennis Studio",
    subtitle: "By Pablo Garibotto",
    description: "Servicio profesional de encordado, equilibrado y reparación de raquetas de tenis con experiencia en torneos ATP/WTA"
  },
  experiencia: {
    title: "Experiencia Profesional",
    description: "Más de dos décadas de experiencia trabajando en los torneos de tenis más prestigiosos del mundo, participando en Masters 1000, ATP 500, ATP Challengers, World Tennis Tour y torneos de tenis adaptado.",
    showMore: "Ver Más",
    showLess: "Ver Menos"
  },
  encordado: {
    title: "Encordado Profesional",
    description: "El encordado profesional es fundamental para optimizar el rendimiento de tu raqueta. Utilizamos equipamiento de nivel ATP/WTA y técnicas de calibración de tensión personalizadas para cada jugador.",
    cta: "Contactar por WhatsApp",
    features: {
      feature1: "Precisión y Personalización",
      feature2: "Equipamiento de Nivel ATP/WTA",
      feature3: "Ajuste Profesional y Control de Tensión"
    }
  },
  equilibrado: {
    title: "Equilibrado y Reparación",
    description: "Los servicios de equilibrado optimizan el punto de balance de tu raqueta para mejorar tu juego. Ofrecemos tres niveles de servicio adaptados a tu necesidad.",
    services: {
      set: {
        title: "SET",
        description: "Ajuste rápido para un partido específico",
        price: "€15"
      },
      match: {
        title: "MATCH",
        description: "Optimización completa con análisis detallado",
        price: "€25"
      },
      point: {
        title: "POINT",
        description: "Servicio express durante la competición",
        price: "€10"
      }
    }
  },
  cursos: {
    title: "Cursos Profesionales",
    description: "Programa de formación en encordado y mantenimiento de raquetas. Aprende las técnicas profesionales utilizadas en el circuito ATP/WTA.",
    cta: "Inscribirse",
    courses: {
      base: {
        name: "Base",
        description: "Nivel Principiante",
        content1: "Fundamentos de encordado",
        content2: "Manejo de máquinas profesionales",
        content3: "Selección de cuerdas",
        price: "€199"
      },
      avance: {
        name: "Avance",
        description: "Nivel Intermedio",
        content1: "Técnicas avanzadas de encordado",
        content2: "Calibración de tensión",
        content3: "Personalización para jugadores",
        price: "€349"
      },
      maestria: {
        name: "Maestría",
        description: "Nivel Avanzado",
        content1: "Encordado de competición ATP/WTA",
        content2: "Análisis biomecánico",
        content3: "Servicio personalizado a jugadores",
        price: "€499"
      }
    }
  }
};