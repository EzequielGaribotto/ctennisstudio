// Define base structure for type safety
export const baseTranslations = {
    // Metadata translations
    meta: {
        title: "",
        description: ""
    },
    // Navigation translations
    navigation: {
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
        title: "",
        subtitle: "",
        description: ""
    },
    experiencia: {
        title: "",
        description: "",
        showMore: "",
        showLess: ""
    },
    encordado: {
        title: "",
        description: "",
        cta: "",
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
                price: ""
            },
            match: {
                title: "",
                description: "",
                price: ""
            },
            point: {
                title: "",
                description: "",
                price: ""
            }
        }
    },
    cursos: {
        title: "",
        description: "",
        cta: "",
        courses: {
            base: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                price: ""
            },
            avance: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                price: ""
            },
            maestria: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                price: ""
            }
        }
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
            location: ""
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
        errors: {
            nameRequired: "",
            emailRequired: "",
            emailInvalid: "",
            messageRequired: "",
            sendFailed: "",
            invalidNameLength: "",
            invalidSubjectLength: "",
            invalidMessageLength: "",
            invalidPhoneFormat: "",
            spamDetected: "",
            tooManyRequests: ""
        }
    }
};

export type Translations = typeof baseTranslations;
