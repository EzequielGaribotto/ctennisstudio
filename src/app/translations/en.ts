import { baseTranslations, Translations } from './baseTranslations';

/**
 * English translations
 */
export const en: Translations = {
  ...baseTranslations,
  meta: {
    title: "CTennis Studio - Professional Stringing and Balancing",
    description: "Specialized service in stringing and balancing tennis rackets."
  },
  navigation: {
    inicio: "Home",
    encordado: "Professional Stringing",
    equilibrado: "Balancing",
    cursos: "Courses and Training",
    experiencia: "Experience Tour",
    contacto: "Contact"
  },
  footer: {
    disclaimer: "© 2025 CTennis Studio.",
    copyright: "© 2025 Custom Tennis Studio. All rights reserved."
  },
  hero: {
    title: "CTennis Studio",
    subtitle: "By Pablo Garibotto",
    description: "Professional tennis racquet stringing, balancing and repair service"
  },
  experiencia: {
    title: "Experience Tour",
    description: `Over 15 years in the professional circuit.
              At Custom Tennis Studio, each racquet is adjusted with the same precision as in an ATP or WTA tournament.
              Founded by Pablo Garibotto, official stringer at tournaments like Monte Carlo, Miami and Madrid.`,
    showMore: "Show more",
    showLess: "Show less"
  },
  encordado: {
    title: "Professional Stringing",
    description: "Professional stringing is essential to optimize your racquet's performance. At CTS we use the same techniques, methods and stringing machines currently used in the ATP/WTA tournament circuit.",
    cta: "More Information",
    whatsappMessage: "Hello! I'm interested in professional stringing service for my tennis racquet. Could you provide more information?",
    features: {
      feature1: "Precision and professional adjustment",
      feature2: "ATP/WTA level tools and machines",
      feature3: "Personalized advice for each player"
    }
  },
  equilibrado: {
    title: "Balancing and Repair",
    description: "Our balancing services optimize your racquet's configuration to improve your game. We offer three service levels adapted to your needs.",
    cta: "Learn More",
    services: {
      point: {
        title: "POINT",
        description: "Modify the balance of your tennis racquet",
        price: "From €19",
        whatsappMessage: "Hello! I'm interested in the POINT service to modify the balance of my racquet. Could you give me more details?"
      },
      set: {
        title: "SET",
        description: "Increase the weight of your tennis racquet",
        price: "From €19",
        whatsappMessage: "Hello! I'm interested in the SET service to increase the weight of my racquet. Could you provide more information?"
      },
      match: {
        title: "MATCH",
        description: "Match one racquet to another from a customized configuration",
        price: "From €49",
        whatsappMessage: "Hello! I'm interested in the MATCH service to match my racquets. Could you explain the process?"
      }
    }
  },
  cursos: {
    title: "Courses and Training",
    description: "Training program in stringing, balancing and repair of tennis racquets. Learn the professional techniques used in the ATP/WTA circuit.",
    cta: "View Details",
    courses: {
      base: {
        name: "Base",
        description: "Beginner Level",
        content1: "Stringing fundamentals",
        content2: "Handling professional tools and machines",
        content3: "2 and 4 knot stringing",
        price: "€249",
        whatsappMessage: "Hello! I'm interested in enrolling in the Base stringing course. Could you provide information about schedule and availability?"
      },
      avance: {
        name: "Advance",
        description: "Intermediate Level",
        content1: "Advanced stringing techniques",
        content2: "Weight balance and swingweight",
        content3: "Repairs and grommet and grip changes",
        price: "€349",
        whatsappMessage: "Hello! I'm interested in the Advance stringing course. Could you give me more details about the program and requirements?"
      },
      maestria: {
        name: "Mastery",
        description: "Advanced Level",
        content1: "ATP/WTA competition stringing",
        content2: "Personalized player service",
        price: "€499",
        whatsappMessage: "Hello! I'm interested in the Mastery course to become a professional stringer. Could you provide information about the program?"
      }
    }
  },
  contact: {
    title: "Contact",
    description: "Fill out the form and we'll get back to you as soon as possible.",
    back: "Back",
    success: "Message sent successfully! Redirecting...",
    info: {
      title: "Contact Information",
      social: "Social Media",
      phone: "Phone",
      location: "Location"
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      phone: "Phone",
      phonePlaceholder: "+1 234 567 890",
      optional: "optional",
      subject: "Subject",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      submit: "Send Message",
      sending: "Sending..."
    },
    errors: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Email is not valid",
      messageRequired: "Message is required",
      sendFailed: "Error sending message. Please try again.",
      invalidNameLength: "Name must be between 2 and 100 characters",
      invalidSubjectLength: "Subject must be between 3 and 200 characters",
      invalidMessageLength: "Message must be between 10 and 5000 characters",
      invalidPhoneFormat: "Invalid phone number format",
      spamDetected: "Your message was flagged as spam. Please try again.",
      tooManyRequests: "Too many requests. Please wait before trying again."
    }
  },
  serviceDetails: {
    whatIncludes: "What's Included",
    serviceIncludes: "Service Includes",
    price: "Service Price",
    coursePrice: "Course Price",
    point: {
      item1: "Detailed analysis of current racquet balance",
      item2: "Professional weight adjustment using precision tools",
      item3: "Balance optimization for your playing style",
      item4: "Complete testing and verification",
      item5: "Post-service advice and recommendations"
    },
    set: {
      item1: "Assessment of optimal weight increase",
      item2: "Strategic placement of weight additions",
      item3: "Maintains racquet playability and feel",
      item4: "Precision tools and professional materials",
      item5: "Final balance check and adjustments"
    },
    match: {
      item1: "Complete analysis of reference racquet specifications",
      item2: "Precise weight and balance matching",
      item3: "Swingweight calibration to match exactly",
      item4: "Professional-grade matching process",
      item5: "Detailed report of both racquets' specifications"
    },
    encordado: {
      item1: "Professional-grade Babolat stringing machines",
      item2: "Precision tension calibration (±0.5kg)",
      item3: "ATP/WTA tournament stringing techniques",
      item4: "Personalized string and tension recommendations",
      item5: "Complete racquet inspection and cleaning",
      price: "From €25"
    },
    base: {
      item4: "Hands-on practice with professional equipment",
      item5: "Certificate of completion"
    },
    avance: {
      item4: "Advanced customization techniques",
      item5: "Professional certification"
    },
    maestria: {
      item4: "Tournament experience insights",
      item5: "Master certification and networking"
    }
  },
  contactModal: {
    title: "How would you like to contact us?",
    subtitle: "We're redirecting you to get information about",
    whatsappTitle: "WhatsApp (Instant)",
    whatsappSubtitle: "Chat directly and get quick responses",
    formTitle: "Contact Form",
    formSubtitle: "Fill out the form and we'll get back to you",
    or: "or"
  },
  serviceDetail: {
    contractService: "Book This Service",
    enrollCourse: "Enroll Now"
  }
};
