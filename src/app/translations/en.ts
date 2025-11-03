import { baseTranslations, Translations } from "./baseTranslations";

export const en: Translations = {
  ...baseTranslations,
  meta: {
    title: "CTennis Studio - Professional Stringing and Balancing",
    description: "Specialized service in stringing and balancing tennis rackets with years of experience.",
  },
  navigation: {
    inicio: "Home",
    encordado: "Stringing",
    equilibrado: "Balancing",
    cursos: "Courses",
    experiencia: "Experience"
  },
  tooltips: {
    github: "Visit my GitHub profile",
    linkedin: "Connect with me on LinkedIn",
    email: "Copy email",
    emailCopied: "Copied!"
  },
  footer: {
    disclaimer: "© 2025 CTennis Studio.",
    githubLink: "GitHub repo"
  },
  hero: {
    title: "CTennis Studio",
    subtitle: "Professional Stringing and Racket Balancing",
    description: "Specialized service in stringing and balancing tennis rackets with years of experience"
  },
  experiencia: {
    title: "My Experience",
    description: "Tournaments and competitions I have participated in"
  },
  encordado: {
    title: "Stringing Service",
    description: "Professional racket stringing with high-quality strings",
    cta: "Request Service",
    features: {
      feature1: "Premium quality strings",
      feature2: "Custom tension",
      feature3: "Fast and professional service"
    }
  },
  equilibrado: {
    title: "Racket Balancing",
    description: "Professional balancing service to optimize your racket performance",
    services: {
      set: {
        title: "Set Balancing",
        description: "Complete balancing of your racket to improve control",
        price: "€30"
      },
      match: {
        title: "Match Balancing",
        description: "Precise adjustment of your racket balance",
        price: "€25"
      },
      point: {
        title: "Point Balancing",
        description: "Weight and balance optimization point by point",
        price: "€20"
      }
    }
  },
  cursos: {
    title: "Stringing Courses",
    description: "Learn the art of professional racket stringing",
    cta: "Enroll",
    courses: {
      base: {
        name: "Basic Course",
        description: "Fundamentals of stringing",
        content1: "Introduction to strings",
        content2: "Basic stringing techniques",
        content3: "Machine maintenance",
        price: "€150"
      },
      avance: {
        name: "Advanced Course",
        description: "Professional techniques",
        content1: "Advanced stringing patterns",
        content2: "Custom tension adjustment",
        content3: "Problem diagnosis",
        price: "€250"
      },
      maestria: {
        name: "Mastery Course",
        description: "Expert level",
        content1: "Professional balancing",
        content2: "Complete customization",
        content3: "Professional certification",
        price: "€400"
      }
    }
  }
};
