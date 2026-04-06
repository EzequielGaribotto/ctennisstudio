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
                price: "",
                whatsappMessage: ""
            },
            match: {
                title: "",
                description: "",
                price: "",
                whatsappMessage: ""
            },
            point: {
                title: "",
                description: "",
                price: "",
                whatsappMessage: ""
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
                price: "",
                whatsappMessage: ""
            },
            avance: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                content3: "",
                price: "",
                whatsappMessage: ""
            },
            maestria: {
                name: "",
                description: "",
                content1: "",
                content2: "",
                price: "",
                whatsappMessage: ""
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
    },
    serviceDetails: {
        whatIncludes: "",
        serviceIncludes: "",
        price: "",
        coursePrice: "",
        encordado: {
            item1: "",
            item2: "",
            item3: "",
            item4: "",
            item5: "",
            price: ""
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
        or: ""
    },
    serviceDetail: {
        contractService: "",
        enrollCourse: ""
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
