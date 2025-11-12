import { baseTranslations, Translations } from "./baseTranslations";

export const en: Translations = {
  ...baseTranslations,
  meta: {
    title: "CTennis Studio - Professional Stringing and Balancing",
    description: "Specialized service in stringing and balancing tennis rackets with years of experience.",
  },
  navigation: {
    inicio: "Home",
    encordado: "Professional Stringing",
    equilibrado: "Balancing and Repairs",
    cursos: "Courses",
    experiencia: "Experience"
  },
  tooltips: {
    linkedin: "Connect with me on LinkedIn",
    email: "Copy email",
    emailCopied: "Copied!"
  },
  footer: {
    disclaimer: "© 2025 CTennis Studio.",
    copyright: "© 2025 Custom Tennis Studio. All rights reserved."
  },
  hero: {
    title: "CTennis Studio",
    subtitle: "By Pablo Garibotto",
    description: "Professional tennis racquet stringing, balancing and repair services with experience in ATP/WTA tournaments"
  },
  experiencia: {
    title: "Professional Experience",
    description: "Over two decades of experience working at the world's most prestigious tennis tournaments, participating in Masters 1000, ATP 500, ATP Challengers, World Tennis Tour and wheelchair tennis tournaments.",
    showMore: "Show more",
    showLess: "Show less"
  },
  encordado: {
    title: "Professional Stringing",
    description: "Professional stringing is essential to optimize your racquet's performance. We use ATP/WTA level equipment and customized tension calibration techniques for each player.",
    cta: "Contact via WhatsApp",
    features: {
      feature1: "Precision and Customization",
      feature2: "ATP/WTA Level Equipment",
      feature3: "Professional Adjustment and Tension Control"
    }
  },
  equilibrado: {
    title: "Balancing and Repairs",
    description: "Balancing services optimize your racquet's balance point to improve your game. We offer three service levels adapted to your needs.",
    services: {
      set: {
        title: "SET",
        description: "Quick adjustment for a specific match",
        price: "€15"
      },
      match: {
        title: "MATCH",
        description: "Complete optimization with detailed analysis",
        price: "€25"
      },
      point: {
        title: "POINT",
        description: "Express service during competition",
        price: "€10"
      }
    }
  },
  cursos: {
    title: "Professional Courses",
    description: "Training program in racquet stringing and maintenance. Learn professional techniques used in the ATP/WTA circuit.",
    cta: "Enroll",
    courses: {
      base: {
        name: "Foundation",
        description: "Beginner Level",
        content1: "Stringing fundamentals",
        content2: "Professional machine handling",
        content3: "String selection",
        price: "€199"
      },
      avance: {
        name: "Progress",
        description: "Intermediate Level",
        content1: "Advanced stringing techniques",
        content2: "Tension calibration",
        content3: "Player customization",
        price: "€349"
      },
      maestria: {
        name: "Master",
        description: "Advanced Level",
        content1: "ATP/WTA competition stringing",
        content2: "Biomechanical analysis",
        content3: "Personalized player service",
        price: "€499"
      }
    }
  }
};
