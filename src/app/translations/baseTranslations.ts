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
        experiencia: ""
    },
    // Tooltip translations
    tooltips: {
        linkedin: "",
        email: "",
        emailCopied: ""
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
    }
};

export type Translations = typeof baseTranslations;
