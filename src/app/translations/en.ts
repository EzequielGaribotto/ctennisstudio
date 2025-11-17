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
    cta: "Contact via WhatsApp",
    features: {
      feature1: "Precision and professional adjustment",
      feature2: "ATP/WTA level tools and machines",
      feature3: "Personalized advice for each player"
    }
  },
  equilibrado: {
    title: "Balancing and Repair",
    description: "Our balancing services optimize your racquet's configuration to improve your game. We offer three service levels adapted to your needs.",
    cta: "Check availability",
    services: {
      set: {
        title: "SET",
        description: "Increase the weight of your tennis racquet",
        price: "From €19"
      },
      match: {
        title: "MATCH",
        description: "Match one racquet to another from a customized configuration",
        price: "From €49"
      },
      point: {
        title: "POINT",
        description: "Modify the balance of your tennis racquet",
        price: "From €19"
      }
    }
  },
  cursos: {
    title: "Courses and Training",
    description: "Training program in stringing, balancing and repair of tennis racquets. Learn the professional techniques used in the ATP/WTA circuit.",
    cta: "Enroll",
    courses: {
      base: {
        name: "Base",
        description: "Beginner Level",
        content1: "Stringing fundamentals",
        content2: "Handling professional tools and machines",
        content3: "2 and 4 knot stringing",
        price: "€249"
      },
      avance: {
        name: "Advance",
        description: "Intermediate Level",
        content1: "Advanced stringing techniques",
        content2: "Weight balance and swingweight",
        content3: "Repairs and grommet and grip changes",
        price: "€349"
      },
      maestria: {
        name: "Mastery",
        description: "Advanced Level",
        content1: "ATP/WTA competition stringing",
        content2: "Biomechanical analysis",
        content3: "Personalized player service",
        price: "€499"
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
  }
};
