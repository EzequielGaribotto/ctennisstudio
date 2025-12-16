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
    cta: "Más información",
    whatsappMessage: "¡Hola! Estoy interesado en el servicio de encordado profesional para mi raqueta de tenis. ¿Podrías darme más información?",
    features: {
      feature1: "Precisión y Ajuste profesional",
      feature2: "Herramientas y maquinas de Nivel ATP/WTA",
      feature3: "Asesoramiento personalizado para cada jugador/a"
    }
  },
  equilibrado: {
    title: "Equilibrado y Reparación",
    description: "Nuestros servicios de equilibrado optimizan la configuracion de tu raqueta para mejorar tu juego. Ofrecemos tres niveles de servicio adaptados a tu necesidad.",
    cta: "Más información",
    services: {
      point: {
        title: "POINT",
        description: "Modificar el balance de tu raqueta de tenis",
        price: "A partir de 19€",
        whatsappMessage: "¡Hola! Estoy interesado en el servicio POINT para modificar el balance de mi raqueta. ¿Podrías darme más detalles?"
      },
      set: {
        title: "SET",
        description: "Aumentar el peso de tu raqueta de tenis",
        price: "A partir de 19€",
        whatsappMessage: "¡Hola! Estoy interesado en el servicio SET para aumentar el peso de mi raqueta. ¿Podrías darme más información?"
      },
      match: {
        title: "MATCH",
        description: "Igualar una raqueta a otra a partir de una configuracion personalizada",
        price: "A partir de 49€",
        whatsappMessage: "¡Hola! Estoy interesado en el servicio MATCH para igualar mis raquetas. ¿Podrías explicarme el proceso?"
      }
    }
  },
  cursos: {
    title: "Cursos y Formaciones",
    description: "Programa de formación en encordado y equilibrado y reparación de raquetas de tenis. Aprende las técnicas profesionales utilizadas en el circuito ATP/WTA.",
    cta: "Ver detalles",
    courses: {
      base: {
        name: "Base",
        description: "Nivel Principiante",
        content1: "Fundamentos de encordado",
        content2: "Manejo de herramientas y máquinas profesionales",
        content3: "Encordado a 2 y 4 nudos",
        price: "€249",
        whatsappMessage: "¡Hola! Estoy interesado en inscribirme en el curso Base de encordado. ¿Podrías darme información sobre horarios y disponibilidad?"
      },
      avance: {
        name: "Avance",
        description: "Nivel Intermedio",
        content1: "Técnicas avanzadas de encordado",
        content2: "Peso balance y swingweight",
        content3: "Reparaciones y cambios de grommets y grips",
        price: "€349",
        whatsappMessage: "¡Hola! Estoy interesado en el curso Avance de encordado. ¿Podrías darme más detalles sobre el programa y requisitos?"
      },
      maestria: {
        name: "Maestría",
        description: "Nivel Avanzado",
        content1: "Encordado de competición ATP/WTA",
        content2: "Análisis biomecánico",
        content3: "Servicio personalizado a jugadores",
        price: "€499",
        whatsappMessage: "¡Hola! Estoy interesado en el curso Maestría para convertirme en encordador profesional. ¿Podrías darme información sobre el programa?"
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
  },
  serviceDetails: {
    whatIncludes: "Qué Incluye",
    serviceIncludes: "El Servicio Incluye",
    price: "Precio del Servicio",
    coursePrice: "Precio del Curso",
    point: {
      item1: "Análisis detallado del balance actual de la raqueta",
      item2: "Ajuste profesional del peso usando herramientas de precisión",
      item3: "Optimización del balance para tu estilo de juego",
      item4: "Pruebas completas y verificación",
      item5: "Asesoramiento y recomendaciones post-servicio"
    },
    set: {
      item1: "Evaluación del aumento óptimo de peso",
      item2: "Colocación estratégica de las adiciones de peso",
      item3: "Mantiene la jugabilidad y sensación de la raqueta",
      item4: "Herramientas de precisión y materiales profesionales",
      item5: "Verificación final del balance y ajustes"
    },
    match: {
      item1: "Análisis completo de las especificaciones de la raqueta de referencia",
      item2: "Igualación precisa de peso y balance",
      item3: "Calibración del swingweight para igualar exactamente",
      item4: "Proceso de igualación de nivel profesional",
      item5: "Informe detallado de las especificaciones de ambas raquetas"
    },
    encordado: {
      item1: "Máquinas de encordar Babolat de nivel profesional",
      item2: "Calibración de tensión de precisión (±0.5kg)",
      item3: "Técnicas de encordado de torneos ATP/WTA",
      item4: "Recomendaciones personalizadas de cuerdas y tensión",
      item5: "Inspección completa y limpieza de la raqueta",
      price: "Desde 25€"
    },
    base: {
      item4: "Práctica con equipamiento profesional",
      item5: "Certificado de finalización"
    },
    avance: {
      item4: "Técnicas avanzadas de personalización",
      item5: "Certificación profesional"
    },
    maestria: {
      item4: "Experiencia en torneos profesionales",
      item5: "Certificación máster y networking"
    }
  },
  contactModal: {
    title: "¿Cómo te gustaría contactarnos?",
    subtitle: "Te redirigimos para obtener información sobre",
    whatsappTitle: "WhatsApp (Instantáneo)",
    whatsappSubtitle: "Chatea directamente y obtén respuestas rápidas",
    formTitle: "Formulario de Contacto",
    formSubtitle: "Completa el formulario y te responderemos pronto",
    or: "o"
  },
  serviceDetail: {
    contractService: "Contratar Servicio",
    enrollCourse: "Inscribirme Ahora"
  }
};