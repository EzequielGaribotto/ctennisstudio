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
    gestion: "Tournament Stringing Management",
    inicio: "Inicio",
    encordado: "Encordado Profesional",
    equilibrado: "Equilibrado",
    cursos: "Formaciones y Cursos",
    experiencia: "Experience Tour",
    contacto: "Contacto"
  },
  footer: {
    disclaimer: "© {year} CTennis Studio.",
    copyright: "© {year} Custom Tennis Studio. Todos los derechos reservados."
  },
  hero: {
        stringing: "Encordado profesional",
        balancing: "Equilibrado, reparación y personalización de raquetas",
        management: "Gestión de encordado en torneos",
        courses: "Cursos y formación técnica",
        experience: "Soluciones profesionales para todo tipo de jugadores, entrenadores, clubes, tiendas y torneos.",
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
    showLess: "Ver menos",
    trademarks: "Los nombres y logotipos de torneos, circuitos y patrocinadores son marcas de sus respectivos propietarios y se muestran únicamente a modo informativo para referenciar los eventos en los que se ha prestado el servicio de encordado. Custom Tennis Studio no está afiliado, patrocinado ni respaldado por dichos titulares."
  },
  encordado: {
    title: "Encordado Profesional",
    description: "Un encordado profesional es fundamental para optimizar el rendimiento de tu raqueta. En CTS utilizamos las mismas técnicas, métodos y máquinas de encordar que se utilizan actualmente en el circuito de torneos ATP/WTA.",
    cta: "Más información",
    whatsappMessage: "¡Hola! Estoy interesado en el servicio de encordado profesional para mi raqueta de tenis. ¿Podrías darme más información?",
    features: {
      feature1: "Precisión y Ajuste profesional",
      feature2: "Herramientas y máquinas de nivel ATP/WTA",
      feature3: "Asesoramiento personalizado para cada jugador/a"
    }
  },
  equilibrado: {
    title: "Equilibrado y Reparación",
    description: "Nuestros servicios de equilibrado optimizan la configuración de tu raqueta para mejorar tu juego. Ofrecemos tres niveles de servicio adaptados a tu necesidad.",
    cta: "Más información",
    services: {
      point: {
        title: "POINT",
        description: "Modificar el balance de tu raqueta de tenis",
        whatsappMessage: "¡Hola! Estoy interesado en el servicio POINT para modificar el balance de mi raqueta. ¿Podrías darme más detalles?"
      },
      set: {
        title: "SET",
        description: "Aumentar el peso de tu raqueta de tenis",
        whatsappMessage: "¡Hola! Estoy interesado en el servicio SET para aumentar el peso de mi raqueta. ¿Podrías darme más información?"
      },
      match: {
        title: "MATCH",
        description: "Igualar una raqueta a otra a partir de una configuración personalizada",
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
        whatsappMessage: "¡Hola! Estoy interesado en inscribirme en el curso Base de encordado. ¿Podrías darme información sobre horarios y disponibilidad?"
      },
      avance: {
        name: "Avance",
        description: "Nivel Intermedio",
        content1: "Técnicas avanzadas de encordado",
        content2: "Peso balance y swingweight",
        content3: "Reparaciones y cambios de grommets y grips",
        whatsappMessage: "¡Hola! Estoy interesado en el curso Avance de encordado. ¿Podrías darme más detalles sobre el programa y requisitos?"
      },
      maestria: {
        name: "Maestría",
        description: "Nivel Avanzado",
        content1: "Encordado de competición ATP/WTA",
        content2: "Servicio personalizado a jugadores",
        whatsappMessage: "¡Hola! Estoy interesado en el curso Maestría para convertirme en encordador profesional. ¿Podrías darme información sobre el programa?"
      }
    }
  },
  legal: {
    backHome: "Volver al inicio",
    updated: "Última actualización",
    navLabel: "Información legal"
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
      location: "Ubicación",
      showMap: "Mostrar mapa",
      mapNotice: "El mapa lo carga Google Maps (puede guardar cookies de Google) solo si lo pides."
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
    privacy: {
      summary: "Responsable: {holder}. Finalidad: responder a tu consulta. Legitimación: tu consentimiento. Destinatarios: proveedores técnicos necesarios para enviar y recibir el correo. Derechos: acceso, rectificación, supresión y otros, escribiendo a {email}.",
      accept: "He leído y acepto la",
      link: "política de privacidad"
    },
    errors: {
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El email es obligatorio",
      emailInvalid: "El email no es válido",
      messageRequired: "El mensaje es obligatorio",
      sendFailed: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      captchaRequired: "Por favor, completa la verificación de seguridad antes de enviar.",
      privacyRequired: "Debes aceptar la política de privacidad para enviar el mensaje.",
      invalidNameLength: "El nombre debe tener entre 2 y 100 caracteres",
      invalidSubjectLength: "El asunto debe tener entre 3 y 200 caracteres",
      invalidMessageLength: "El mensaje debe tener entre 10 y 5000 caracteres",
      invalidPhoneFormat: "Formato de teléfono inválido",
      spamDetected: "Tu mensaje fue marcado como spam. Por favor, inténtalo de nuevo.",
      tooManyRequests: "Demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo."
    }
  },
  serviceDetails: {
    whatIncludes: "Qué incluye",
    serviceIncludes: "El servicio incluye",
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
      item1: "Usamos la misma máquina que un Gran Slam.",
      item2: "Ajuste de tensión de máxima precisión.",
      item3: "Técnicas de encordado a 4 o 2 nudos.",
      item4: "Recomendaciones personalizadas de cuerdas y tensión.",
      item5: "Inspección completa y limpieza de la raqueta.",
      item6: "Análisis gratuito de las especificaciones de tus raquetas si tienes más de 2."
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
    close: "Cerrar",
    or: "o"
  },
  serviceDetail: {
    contractService: "Contratar Servicio",
    enrollCourse: "Inscribirme Ahora",
    notFound: "Servicio no encontrado",
    backHome: "Volver al inicio",
    whatsapp: {
      point: "Hola, estoy interesado en el servicio POINT de equilibrado de raquetas",
      set: "Hola, estoy interesado en el servicio SET de aumento de peso",
      match: "Hola, estoy interesado en el servicio MATCH de igualación de raquetas",
      encordado: "Hola, estoy interesado en el servicio de encordado profesional",
      base: "Hola, estoy interesado en el curso Base de encordado",
      avance: "Hola, estoy interesado en el curso Avance de encordado",
      maestria: "Hola, estoy interesado en el curso Maestría de encordado"
    }
  },
  management: {
    "subtitle": "Gestión integral de encordado en torneos",
    "strapline": "COMPLETE STRINGING SERVICE MANAGEMENT FOR PROFESSIONAL TENNIS TOURNAMENTS.",
    "heroPhoto": "Equipo de encordado en la pista del Mutua Madrid Open",
    "whatsappMessage": "Hola, me gustaría recibir información sobre la gestión integral de encordado para un torneo",
    "intro1": "CTS ofrece la gestión integral del servicio oficial de encordado para torneos ATP, WTA y competiciones internacionales.",
    "intro2": "Desde la planificación inicial hasta la entrega de la última raqueta, nos encargamos de todos los aspectos operativos necesarios para garantizar un servicio profesional, eficiente y de máxima calidad para todos los jugadores participantes.",
    "ctaServices": "Ver nuestros servicios",
    "managerTitle": "Experiencia como manager",
    "servicesTitle": "Nuestros servicios incluyen",
    "services": {
      "planning": {
        "title": "Planificación",
        "description": "Planificación y coordinación previa con la dirección del torneo y el club."
      },
      "team": {
        "title": "Equipo",
        "description": "Selección, contratación y coordinación del equipo de encordadores."
      },
      "equipment": {
        "title": "Equipamiento",
        "description": "Maquinaria, herramientas, materiales y logística."
      },
      "workspace": {
        "title": "Puesta en marcha",
        "description": "Organización del espacio de trabajo y puesta en marcha del servicio."
      },
      "orders": {
        "title": "Pedidos y entregas",
        "description": "Gestión de pedidos, distribución de tareas, prioridades y entregas."
      },
      "supervision": {
        "title": "Supervisión",
        "description": "Supervisión y coordinación operativa durante toda la competición."
      }
    },
    "techTitle": "Tecnología aplicada a la gestión",
    "techIntro": "CTS combina experiencia en torneos internacionales con tecnología especializada.",
    "tools": {
      "prostring": {
        "name": "ProString Manage",
        "description": "Plataforma SaaS de gestión de encordado en torneos, en cuyo desarrollo participamos."
      },
      "planner": {
        "name": "CTS Planner Tour",
        "description": "Nuestro propio sistema de planificación operativa."
      }
    },
    "techNote": "Dos herramientas que permiten optimizar la planificación, organización y seguimiento del servicio.",
    "closing": "Un equipo. Un servicio completo. Desde la planificación hasta la ejecución."
  },
  behindGame: {
    intro: "Lo que no se ve desde la grada: el trabajo, el equipo y los momentos detrás de cada torneo.",
    photo: "Ver foto {n} en grande",
  },
  common: {
    whatsappCta: "Escríbeme por WhatsApp",
    themeToLight: "Cambiar a modo claro",
    themeToDark: "Cambiar a modo oscuro",
    menu: "Menú",
    viewPhotos: "Ver fotos de {name}",
    viewPhotosYear: "Ver fotos de {year}",
    blueprint: "Raqueta dibujada como un plano, con los servicios POINT, SET y MATCH señalados",
    workshopPhoto: "Trabajo de equilibrado en el taller, foto {n}",
    stringingPhoto: "Pablo Garibotto encordando una raqueta en el Miami Open",
    heroPhoto: "Pablo Garibotto trabajando con una raqueta en su taller",
    loading: "Cargando...",
    videoUnsupported: "Tu navegador no soporta el video.",
    previousImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    whatsappGeneric: "Hola, estoy interesado en sus servicios de CTennis Studio"
  }
};