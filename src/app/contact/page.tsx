"use client"
import type React from "react"
import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./page.module.css"
import { ContactForm } from "./components/ContactForm"
import { ContactInfoSidebar } from "./components/ContactInfoSidebar"
import { LocationSection } from "./components/LocationSection"
import { SocialSection } from "./components/SocialSection"

type ServiceType = "encordado" | "set" | "match" | "point" | "base" | "avance" | "maestria"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  serviceType: ServiceType | null
  honeypot: string // Bot detection field
}

const ContactPageContent: React.FC = () => {
  const { t, locale } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: null,
    honeypot: "" // Bot trap
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [subjectAutoUpdate, setSubjectAutoUpdate] = useState(true)

  const getSubjectForService = useCallback((service: ServiceType, name: string): string => {
    const serviceNames: Record<ServiceType, string> = {
      encordado: locale === "es" ? "Encordado Profesional" : "Professional Stringing",
      set: "SET",
      match: "MATCH",
      point: "POINT",
      base: locale === "es" ? "Curso Base" : "Base Course",
      avance: locale === "es" ? "Curso Avance" : "Advance Course",
      maestria: locale === "es" ? "Curso Maestría" : "Mastery Course"
    }
    
    const serviceName = serviceNames[service] || service.toUpperCase()
    return `${serviceName}${name ? ` - ${name}` : ""}`
  }, [locale])

  const getMessageForService = useCallback((service: ServiceType, lang: string): string => {
    const messages: Record<ServiceType, { es: string; en: string }> = {
      encordado: {
        es: "Hola Pablo,\n\nEstoy interesado/a en tu servicio de encordado profesional. Me gustaría obtener más información sobre:\n\n- Tipos de cuerda disponibles\n- Tensiones recomendadas para mi nivel de juego\n- Precio y disponibilidad\n\nGracias de antemano.",
        en: "Hello Pablo,\n\nI am interested in your professional stringing service. I would like to get more information about:\n\n- Available string types\n- Recommended tensions for my playing level\n- Price and availability\n\nThank you in advance."
      },
      set: {
        es: "Hola Pablo,\n\nEstoy interesado/a en el servicio SET para aumentar el peso de mi raqueta de tenis.\n\nMe gustaría conocer:\n- El proceso de personalización\n- Precio y tiempo estimado\n- Disponibilidad\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in the SET service to increase the weight of my tennis racquet.\n\nI would like to know:\n- The customization process\n- Price and estimated time\n- Availability\n\nThank you."
      },
      match: {
        es: "Hola Pablo,\n\nEstoy interesado/a en el servicio MATCH para igualar una raqueta a otra con configuración personalizada.\n\nMe gustaría conocer:\n- El proceso de matching\n- Precio y tiempo estimado\n- Qué información necesitas de mis raquetas\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in the MATCH service to match one racquet to another with custom configuration.\n\nI would like to know:\n- The matching process\n- Price and estimated time\n- What information you need about my racquets\n\nThank you."
      },
      point: {
        es: "Hola Pablo,\n\nEstoy interesado/a en el servicio POINT para modificar el balance de mi raqueta de tenis.\n\nMe gustaría conocer:\n- Las opciones de balance disponibles\n- Precio y tiempo estimado\n- Recomendaciones según mi estilo de juego\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in the POINT service to modify the balance of my tennis racquet.\n\nI would like to know:\n- Available balance options\n- Price and estimated time\n- Recommendations based on my playing style\n\nThank you."
      },
      base: {
        es: "Hola Pablo,\n\nEstoy interesado/a en inscribirme al Curso Base de encordado.\n\nMe gustaría conocer:\n- Fechas disponibles\n- Ubicación del curso\n- Material incluido\n- Proceso de inscripción\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in enrolling in the Base Course for stringing.\n\nI would like to know:\n- Available dates\n- Course location\n- Included materials\n- Enrollment process\n\nThank you."
      },
      avance: {
        es: "Hola Pablo,\n\nEstoy interesado/a en inscribirme al Curso Avance de encordado y equilibrado.\n\nMe gustaría conocer:\n- Fechas disponibles\n- Requisitos previos\n- Material incluido\n- Proceso de inscripción\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in enrolling in the Advance Course for stringing and balancing.\n\nI would like to know:\n- Available dates\n- Prerequisites\n- Included materials\n- Enrollment process\n\nThank you."
      },
      maestria: {
        es: "Hola Pablo,\n\nEstoy interesado/a en inscribirme al Curso Maestría de encordado profesional ATP/WTA.\n\nMe gustaría conocer:\n- Fechas disponibles\n- Requisitos previos\n- Material incluido\n- Proceso de inscripción\n\nGracias.",
        en: "Hello Pablo,\n\nI am interested in enrolling in the Mastery Course for professional ATP/WTA stringing.\n\nI would like to know:\n- Available dates\n- Prerequisites\n- Included materials\n- Enrollment process\n\nThank you."
      }
    }

    const langKey = lang as "es" | "en"
    return messages[service]?.[langKey] || ""
  }, [])

  // Pre-fill form based on URL parameters
  useEffect(() => {
    const service = searchParams.get("service") as ServiceType | null
    const name = searchParams.get("name") || ""
    
    if (service) {
      const subject = getSubjectForService(service, name)
      const message = getMessageForService(service, locale)
      
      setFormData(prev => ({
        ...prev,
        name,
        subject,
        message,
        serviceType: service
      }))
    }
  }, [searchParams, locale, getSubjectForService, getMessageForService])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // If user is editing the subject field manually, disable auto-update
    if (name === "subject") {
      setSubjectAutoUpdate(false)
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Auto-update subject when name changes (if auto-update is enabled)
  useEffect(() => {
    if (subjectAutoUpdate && formData.serviceType) {
      const newSubject = getSubjectForService(formData.serviceType, formData.name)
      setFormData(prev => ({ ...prev, subject: newSubject }))
    }
  }, [formData.name, formData.serviceType, subjectAutoUpdate, getSubjectForService])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage(t("contact.errors.nameRequired"))
      return
    }
    
    // Validate name length
    if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      setErrorMessage(t("contact.errors.invalidNameLength"))
      return
    }
    
    if (!formData.email.trim()) {
      setErrorMessage(t("contact.errors.emailRequired"))
      return
    }
    
    if (!validateEmail(formData.email)) {
      setErrorMessage(t("contact.errors.emailInvalid"))
      return
    }
    
    // Validate subject length
    if (formData.subject.trim().length < 3 || formData.subject.trim().length > 200) {
      setErrorMessage(t("contact.errors.invalidSubjectLength"))
      return
    }
    
    if (!formData.message.trim()) {
      setErrorMessage(t("contact.errors.messageRequired"))
      return
    }
    
    // Validate message length
    if (formData.message.trim().length < 10 || formData.message.trim().length > 5000) {
      setErrorMessage(t("contact.errors.invalidMessageLength"))
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          honeypot: formData.honeypot,
          locale
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      setSubmitStatus("success")
      
      // Reset form and redirect after success
      setTimeout(() => {
        router.push("/")
      }, 3000)
      
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
      setErrorMessage(t("contact.errors.sendFailed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <button onClick={handleBack} className={styles.backButton}>
            ← {t("contact.back")}
          </button>
          
          <div className={styles.header}>
            <h1 className={styles.title}>{t("contact.title")}</h1>
            <p className={styles.description}>{t("contact.description")}</p>
          </div>

          <div className={styles.contentGrid}>
            {/* Desktop: Form + Sidebar */}
            <ContactForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              errorMessage={errorMessage}
            />
            <ContactInfoSidebar />
          </div>

          {/* Mobile: Reorganized layout */}
          <div className={styles.mobileContentGrid}>
            {/* Mobile: Form first */}
            <ContactForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              errorMessage={errorMessage}
            />

            {/* Mobile: Location info + Map */}
            <div className={styles.mobileContactInfo}>
              <h2 className={styles.contactInfoTitle}>{t("contact.info.title")}</h2>
              <LocationSection />
              <SocialSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: 'var(--primary)'
      }}>
        Loading...
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  )
}

export default ContactPage
