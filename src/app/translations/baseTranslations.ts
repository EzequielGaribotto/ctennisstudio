// Define base structure for type safety
export const baseTranslations = {
    // Metadata translations
    meta: {
        title: "",
        description: ""
    },
    // Navigation translations
    navigation: {
        profile: "",
        projects: "",
        experience: "",
        training: "",
        gaming: ""
    },
    // Tooltip translations
    tooltips: {
        github: "",
        linkedin: "",
        email: "",
        emailCopied: "",
        competition: "",
        playGame: "",
        playStore: "",
        sourceCode: "",
        logo: "",
        expandImage: "",
        closeImage: "",
        solvedProblems: "",
        playArcadeGame: "",
        viewPresentation: "",
        viewWebsite: ""
    },
    // Footer translations
    footer: {
        disclaimer: "",
        githubLink: ""
    },
    // About Me section translations
    aboutMe: {
        title: "",
        description: "",
        photoAlt: ""
    },
    cv: {
        download: "",
        spanish: "",
        english: "",
        english_ats: "",
        preview: "",
        unableToDisplay: "", // New translation key
        downloadInstead: "", // New translation key
        lastUpdated: "" // Add missing lastUpdated key to fix TypeScript error
    },
    // Search functionality translations
    search: {
        placeholder: "",
        clearFilters: "",
        noResults: "",
        showingAll: "",
        showingLimited: "",
        showingFiltered: "",
        filtered: "",
        tryAdjusting: "",
        showAllLink: "",
        showLessLink: ""
    },
    // Projects section translations
    projects: {
        title: "",
        current: "",
        // Add index signature to allow for project-specific properties
        neutralNews: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null,
            websiteLink: string
        },
        eulix: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        competitiveProgramming: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        rickAndMorty: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        zomb: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        cronScheduleEditor: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        mapsApp: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        portfolioWebsite: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        peleaDeGallos: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        hackerNewsAPI: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        barcelonaInequality: {} as {
            title: string,
            description: string,
            footer: string,
            startDate: string,
            endDate?: string | null
        },
        showAllProjects: "", // New translation key for "show all projects" button
        showLess: "" // New translation key for "show less" button
    },
    experiences: {
        title: "",
        seidor: {
            company: "",
            position: "",
            period: "",
            location: "",
            description: "",
        },
        eulix: {
            company: "",
            position: "",
            period: "",
            location: "",
            description: "",
        },
        telus: {
            company: "",
            position: "",
            period: "",
            location: "",
            description: "",
        }
    },
    training: {
        title: "",
        itb: {
            institution: "",
            course: "",
            period: "",
            location: "",
            description: "",
        },
        upf: {
            institution: "",
            course: "",
            period: "",
            location: "",
            description: "",
        },
        rb4: {
            institution: "",
            course: "",
            period: "",
            location: "",
            description: "",
        }
    },
    aboutMeSection: {
        title: "",
        personalInfo: "",
        lifestyleInfo: "",
        musicInfo: "",
        hobbiesInfo: "",
        heavyProfile: "",
        spotifyPlaylist: ""
    }
};

export type Translations = typeof baseTranslations;
