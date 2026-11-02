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
    gestion: "Tournament Stringing Management",
    inicio: "Home",
    encordado: "Professional Stringing",
    equilibrado: "Balancing",
    cursos: "Courses and Training",
    experiencia: "Experience Tour",
    contacto: "Contact"
  },
  footer: {
    disclaimer: "© {year} CTennis Studio.",
    copyright: "© {year} Custom Tennis Studio. All rights reserved."
  },
  hero: {
        stringing: "Professional stringing",
        balancing: "Racquet balancing, repair and customization",
        management: "Tournament stringing management",
        courses: "Courses and technical training",
        experience: "Professional solutions for all kinds of players, coaches, clubs, shops and tournaments.",
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
    showLess: "Show less",
    trademarks: "Tournament, tour and sponsor names and logos are trademarks of their respective owners and are shown for information only, to reference the events where stringing services were provided. Custom Tennis Studio is not affiliated with, sponsored by or endorsed by those owners."
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
        whatsappMessage: "Hello! I'm interested in the POINT service to modify the balance of my racquet. Could you give me more details?"
      },
      set: {
        title: "SET",
        description: "Increase the weight of your tennis racquet",
        whatsappMessage: "Hello! I'm interested in the SET service to increase the weight of my racquet. Could you provide more information?"
      },
      match: {
        title: "MATCH",
        description: "Match one racquet to another from a customized configuration",
        whatsappMessage: "Hello! I'm interested in the MATCH service to match my racquets. Could you explain the process?"
      }
    }
  },
  cursos: {
    title: "Courses and Training",
    description: "Technical training programs in professional stringing, for people who want to start in this specialty and for professionals looking to perfect their knowledge and skills.",
    training: "The training combines theory, practice and the professional experience gained working at international ATP and WTA tournaments.",
    instructor: "As a GRSA Instructor in Spain, I am qualified to teach the association's courses and manage the certification process for students.",
    certTitle: "GRSA Certification",
    certDescription: "Preparation, assessment and management of the official certification process.",
    certNote: "Certification is subject to the requirements and procedures set by GRSA.",
    closing: "Learn. Practice. Improve. Certify your knowledge.",
    whatsappMessage: "Hello, I would like information about the stringing courses and GRSA certification",
    cta: "View Details",
    courses: {
      base: {
        name: "Pro Stringer",
        description: "Beginner Level",
        content1: "Stringing fundamentals",
        content2: "Handling professional tools and machines",
        content3: "2 and 4 knot stringing",
        whatsappMessage: "Hello! I'm interested in enrolling in the Pro Stringer course. Could you provide information about schedule and availability?"
      },
      avance: {
        name: "Pro Tour Stringer",
        description: "Intermediate Level",
        content1: "Advanced stringing techniques",
        content2: "Weight balance and swingweight",
        content3: "Repairs and grommet and grip changes",
        whatsappMessage: "Hello! I'm interested in the Pro Tour Stringer course. Could you give me more details about the program and requirements?"
      },
      maestria: {
        name: "Pro Master Stringer",
        description: "Advanced Level",
        content1: "ATP/WTA competition stringing",
        content2: "Personalized player service",
        whatsappMessage: "Hello! I'm interested in the Pro Master Stringer course to become a professional stringer. Could you provide information about the program?"
      }
    }
  },
  legal: {
    backHome: "Back to home",
    updated: "Last updated",
    navLabel: "Legal information"
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
      location: "Location",
      showMap: "Show map",
      mapNotice: "The map is loaded from Google Maps (it may store Google cookies) only if you ask for it."
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
    privacy: {
      summary: "Controller: {holder}. Purpose: to answer your enquiry. Legal basis: your consent. Recipients: technical providers needed to send and receive the email. Rights: access, rectification, erasure and others, by writing to {email}.",
      accept: "I have read and accept the",
      link: "privacy policy"
    },
    errors: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Email is not valid",
      messageRequired: "Message is required",
      sendFailed: "Error sending message. Please try again.",
      captchaRequired: "Please complete the security check before sending.",
      privacyRequired: "You must accept the privacy policy to send the message.",
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
      item1: "We use the same machine as a Grand Slam.",
      item2: "Tension adjustment with maximum precision.",
      item3: "Stringing techniques with 4 or 2 knots.",
      item4: "Personalized string and tension recommendations.",
      item5: "Complete racquet inspection and cleaning.",
      item6: "Free analysis of your racquets' specifications if you have more than 2."
    },
    base: {
      item4: "Hands-on practice with professional equipment",
      item5: "Preparation for GRSA certification"
    },
    avance: {
      item4: "Advanced customization techniques",
      item5: "Preparation for GRSA certification"
    },
    maestria: {
      item4: "Tournament experience insights",
      item5: "Preparation for GRSA certification and networking"
    }
  },
  contactModal: {
    title: "How would you like to contact us?",
    subtitle: "We're redirecting you to get information about",
    whatsappTitle: "WhatsApp (Instant)",
    whatsappSubtitle: "Chat directly and get quick responses",
    formTitle: "Contact Form",
    formSubtitle: "Fill out the form and we'll get back to you",
    close: "Close",
    or: "or"
  },
  serviceDetail: {
    contractService: "Book This Service",
    enrollCourse: "Enroll Now",
    notFound: "Service not found",
    backHome: "Back to home",
    whatsapp: {
      point: "Hi, I'm interested in the POINT racquet balancing service",
      set: "Hi, I'm interested in the SET weight increase service",
      match: "Hi, I'm interested in the MATCH racquet matching service",
      encordado: "Hi, I'm interested in the professional stringing service",
      base: "Hi, I'm interested in the Pro Stringer course",
      avance: "Hi, I'm interested in the Pro Tour Stringer course",
      maestria: "Hi, I'm interested in the Pro Master Stringer course"
    }
  },
  management: {
    "subtitle": "Complete stringing service management for professional tennis tournaments",
    "strapline": "",
    "heroPhoto": "Stringing team on court at the Mutua Madrid Open",
    "whatsappMessage": "Hello, I would like information about complete stringing management for a tournament",
    "intro1": "CTS provides complete management of the official stringing service for ATP and WTA tournaments and international competitions.",
    "intro2": "From initial planning to the delivery of the last racquet, we take care of every operational detail needed to guarantee a professional, efficient, top-quality service for all participating players.",
    "ctaServices": "See our services",
    "managerTitle": "Experience as manager",
    "servicesTitle": "Our services include",
    "services": {
      "planning": {
        "title": "Planning",
        "description": "Advance planning and coordination with the tournament director and the club."
      },
      "team": {
        "title": "Team",
        "description": "Selecting, hiring and coordinating the stringing team."
      },
      "equipment": {
        "title": "Equipment",
        "description": "Machines, tools, materials and logistics."
      },
      "workspace": {
        "title": "Setup",
        "description": "Organizing the workspace and getting the service up and running."
      },
      "orders": {
        "title": "Orders and delivery",
        "description": "Managing orders, task distribution, priorities and deliveries."
      },
      "supervision": {
        "title": "Supervision",
        "description": "Operational supervision and coordination throughout the competition."
      }
    },
    "techTitle": "Technology applied to management",
    "techIntro": "CTS combines experience at international tournaments with specialized technology.",
    "tools": {
      "prostring": {
        "name": "ProString Manage",
        "description": "A SaaS platform for managing tournament stringing, which we take part in developing."
      },
      "planner": {
        "name": "CTS Planner Tour",
        "description": "Our own operational planning system."
      }
    },
    "techNote": "Two tools that optimize the planning, organization and tracking of the service.",
    "closing": "One team. One complete service. From planning to execution."
  },
  behindGame: {
    intro: "What you can't see from the stands: the work, the team and the moments behind every tournament.",
    photo: "See photo {n} larger",
  },
  common: {
    whatsappCta: "Message me on WhatsApp",
    themeToLight: "Switch to light mode",
    themeToDark: "Switch to dark mode",
    menu: "Menu",
    viewPhotos: "See photos of {name}",
    viewPhotosYear: "See photos from {year}",
    blueprint: "Racquet drawn as a blueprint, with the POINT, SET and MATCH services marked",
    workshopPhoto: "Balancing work in the studio, photo {n}",
    stringingPhoto: "Pablo Garibotto stringing a racquet at the Miami Open",
    heroPhoto: "Pablo Garibotto working on a racquet in his studio",
    loading: "Loading...",
    videoUnsupported: "Your browser does not support the video.",
    previousImage: "Previous image",
    nextImage: "Next image",
    whatsappGeneric: "Hi, I'm interested in CTennis Studio's services"
  }
};
