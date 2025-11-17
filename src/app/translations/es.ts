import { baseTranslations, Translations } from './baseTranslations';

/**
 * Spanish translations
 */
export const es: Translations = {
  ...baseTranslations,
  meta: {
    title: "CTennis Studio - Encordado y Equilibrado Profesional",
    description: "Servicio especializado en encordado y equilibrado de raquetas de tenis."
  },
  navigation: {
    inicio: "Inicio",
    encordado: "Encordado Profesional",
    equilibrado: "Equilibrado",
    cursos: "Formaciones y Cursos",
    experiencia: "Experience Tour",
    contacto: "Contacto"
  },
  footer: {
    disclaimer: "© 2025 CTennis Studio.",
    copyright: "© 2025 Custom Tennis Studio. Todos los derechos reservados."
  },
  hero: {
    title: "CTennis Studio",
    subtitle: "By Pablo Garibotto",
    description: "Servicio profesional de encordado, equilibrado y reparación de raquetas de tenis"
  },
  experiencia: {
    title: "Experience Tour",
    description: `Más de 15 años en el circuito profesional.
              En Custom Tennis Studio, cada raqueta se ajusta con la misma precisión que en un torneo ATP o WTA.
              Fundado por Pablo Garibotto, encordador oficial en torneos como Montecarlo, Miami y Madrid.`,
    showMore: "Ver más",
    showLess: "Ver menos"
  },
  encordado: {
    title: "Encordado Profesional",
    description: "Un encordado profesional es fundamental para optimizar el rendimiento de tu raqueta. En CTS utilizamos las mismas técnicas, métodos y maquinas de encordar que se utilizan actualmente en el circuito de torneos ATP/WTA .",
    cta: "Contactar por WhatsApp",
    features: {
      feature1: "Precisión y Ajuste profesional",
      feature2: "Herramientas y maquinas de Nivel ATP/WTA",
      feature3: "Asesoramiento personalizado para cada jugador/a"
    }
  },
  equilibrado: {
    title: "Equilibrado y Reparación",
    description: "Nuestros servicios de equilibrado optimizan la configuracion de tu raqueta para mejorar tu juego. Ofrecemos tres niveles de servicio adaptados a tu necesidad.",
    cta: "Consultar disponibilidad",
    services: {
      set: {
        title: "SET",
        description: "Aumentar el peso de tu raqueta de tenis",
        price: "A partir de 19€"
      },
      match: {
        title: "MATCH",
        description: "Igualar una raqueta a otra a partir de una configuracion personalizada",
        price: "A partir de 49€"
      },
      point: {
        title: "POINT",
        description: "Modificar el balance de tu raqueta de tenis",
        price: "A partir de 19€"
      }
    }
  },
  cursos: {
    title: "Cursos y Formaciones",
    description: "Programa de formación en encordado y equilibrado y reparación de raquetas de tenis. Aprende las técnicas profesionales utilizadas en el circuito ATP/WTA.",
    cta: "Inscribirse",
    courses: {
      base: {
        name: "Base",
        description: "Nivel Principiante",
        content1: "Fundamentos de encordado",
        content2: "Manejo de herramientas y máquinas profesionales",
        content3: "Encordado a 2 y 4 nudos",
        price: "€249"
      },
      avance: {
        name: "Avance",
        description: "Nivel Intermedio",
        content1: "Técnicas avanzadas de encordado",
        content2: "Peso balance y swingweight",
        content3: "Reparaciones y cambios de grommets y grips",
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
  },
  contact: {
    title: "Contacto",
    description: "Completa el formulario y nos pondremos en contacto contigo lo antes posible.",
    back: "Volver",
    success: "¡Mensaje enviado con éxito! Redirigiendo...",
    info: {
      title: "Información de Contacto",
      social: "Redes Sociales",
      phone: "Teléfono",
      location: "Ubicación"
    },
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      phone: "Teléfono",
      phonePlaceholder: "+34 600 000 000",
      optional: "opcional",
      subject: "Asunto",
      message: "Mensaje",
      messagePlaceholder: "Escribe tu mensaje aquí...",
      submit: "Enviar Mensaje",
      sending: "Enviando..."
    },
    errors: {
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El email es obligatorio",
      emailInvalid: "El email no es válido",
      messageRequired: "El mensaje es obligatorio",
      sendFailed: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      invalidNameLength: "El nombre debe tener entre 2 y 100 caracteres",
      invalidSubjectLength: "El asunto debe tener entre 3 y 200 caracteres",
      invalidMessageLength: "El mensaje debe tener entre 10 y 5000 caracteres",
      invalidPhoneFormat: "Formato de teléfono inválido",
      spamDetected: "Tu mensaje fue marcado como spam. Por favor, inténtalo de nuevo.",
      tooManyRequests: "Demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo."
    }
  }
};