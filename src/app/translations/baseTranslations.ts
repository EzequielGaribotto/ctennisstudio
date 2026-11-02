// Define base structure for type safety
export const baseTranslations = {
    // Metadata translations
    meta: {
        title: "",
        description: ""
    },
    // Navigation translations
    navigation: {
    gestion: "",
        inicio: "",
        encordado: "",
        equilibrado: "",
        cursos: "",
        experiencia: "",
        contacto: ""
    },
    // Footer translations
    footer: {
        disclaimer: "",
        copyright: ""
    },
    // Tennis studio sections
    hero: {
        stringing: "",
        balancing: "",
        management: "",
        courses: "",
        experience: "",
        title: "",
        subtitle: "",
        description: ""
    },
    experiencia: {
        title: "",
        description: "",
        showMore: "",
        showLess: "",
        trademarks: ""
    },
    encordado: {
        title: "",
        description: "",
        cta: "",
        whatsappMessage: "",
        features: {
            feature1: "",
            feature2: "",
            feature3: ""
        }
    },
    equilibrado: {
        title: "",
        description: "",
        cta: "",
        services: {
            set: {
                title: "",
                description: "",
                whatsappMessage: ""
            },
            match: {
                title: "",
                description: "",
                whatsappMessage: ""
            },
            point: {
                title: "",
                description: "",
                whatsappMessage: ""
            }
        }
    },
    cursos: {
        title: "",
        description: "",
        training: "",
        instructor: "",
        certTitle: "",
        certDescription: "",
        certNote: "",
        closing: "",
        whatsappMessage: "",
        cta: "",
        courses: {
            base: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                whatsappMessage: ""
            },
            avance: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                whatsappMessage: ""
            },
            maestria: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                whatsappMessage: ""
            }
        }
    },
    legal: {
        backHome: "",
        updated: "",
        navLabel: ""
    },
    contact: {
        title: "",
        description: "",
        back: "",
        success: "",
        info: {
            title: "",
            social: "",
            phone: "",
            location: "",
            showMap: "",
            mapNotice: ""
        },
        form: {
            name: "",
            namePlaceholder: "",
            email: "",
            emailPlaceholder: "",
            phone: "",
            phonePlaceholder: "",
            optional: "",
            subject: "",
            message: "",
            messagePlaceholder: "",
            submit: "",
            sending: ""
        },
        privacy: {
            summary: "",
            accept: "",
            link: ""
        },
        errors: {
            nameRequired: "",
            emailRequired: "",
            emailInvalid: "",
            messageRequired: "",
            sendFailed: "",
            captchaRequired: "",
            privacyRequired: "",
            invalidNameLength: "",
            invalidSubjectLength: "",
            invalidMessageLength: "",
            invalidPhoneFormat: "",
            spamDetected: "",
            tooManyRequests: ""
        }
    },
    serviceDetails: {
        whatIncludes: "",
        serviceIncludes: "",
        encordado: {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: "",
            item6: ""
        },
        point: {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: ""
        },
        set: {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: ""
        },
        match: {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: ""
        },
        base: {
            item4: "",
            item5: ""
        },
        avance: {
            item4: "",
            item5: ""
        },
        maestria: {
            item4: "",
            item5: ""
        }
    },
    contactModal: {
        title: "",
        subtitle: "",
        whatsappTitle: "",
        whatsappSubtitle: "",
        formTitle: "",
        formSubtitle: "",
        close: "",
        or: ""
    },
    serviceDetail: {
        contractService: "",
        enrollCourse: "",
        notFound: "",
        backHome: "",
        whatsapp: {
            point: "",
            set: "",
            match: "",
            encordado: "",
            base: "",
            avance: "",
            maestria: ""
        }
    },
    management: {
      "subtitle": "",
      "strapline": "",
      "heroPhoto": "",
      "whatsappMessage": "",
      "intro1": "",
      "intro2": "",
      "ctaServices": "",
      "managerTitle": "",
      "servicesTitle": "",
      "services": {
        "planning": {
          "title": "",
          "description": ""
        },
        "team": {
          "title": "",
          "description": ""
        },
        "equipment": {
          "title": "",
          "description": ""
        },
        "workspace": {
          "title": "",
          "description": ""
        },
        "orders": {
          "title": "",
          "description": ""
        },
        "supervision": {
          "title": "",
          "description": ""
        }
      },
      "techTitle": "",
      "techIntro": "",
      "tools": {
        "prostring": {
          "name": "",
          "description": ""
        },
        "planner": {
          "name": "",
          "description": ""
        }
      },
      "techNote": "",
      "closing": ""
    },
    behindGame: {
      intro: "",
      photo: "",
    },
    common: {
    whatsappCta: "",
    themeToLight: "",
    themeToDark: "",
    menu: "",
    viewPhotos: "",
    viewPhotosYear: "",
    blueprint: "",
    workshopPhoto: "",
    stringingPhoto: "",
    heroPhoto: "",
        loading: "",
        videoUnsupported: "",
        previousImage: "",
        nextImage: "",
        whatsappGeneric: ""
    },
    modal: {
        title: "",
        subtitle: "",
        whatsapp: {
            title: "",
            description: "",
            button: ""
        },
        form: {
            title: "",
            description: "",
            button: ""
        }
    }
};

export type Translations = typeof baseTranslations;
