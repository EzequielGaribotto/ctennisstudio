"use client"
import type React from "react"
import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useTranslation } from "@/context/TranslationContext"
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import styles from "./page.module.css"

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
            {/* Contact Form */}
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Honeypot field - hidden from users, bots will fill it */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                {/* Name Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {t("contact.form.name")} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={t("contact.form.namePlaceholder")}
                    required
                  />
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {t("contact.form.email")} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={t("contact.form.emailPlaceholder")}
                    required
                  />
                </div>

                {/* Phone Field (Optional) */}
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    {t("contact.form.phone")} <span className={styles.optional}>({t("contact.form.optional")})</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                </div>

                {/* Subject Field (Now Editable but Required) */}
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    {t("contact.form.subject")} <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Message Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    {t("contact.form.message")} <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows={8}
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className={styles.errorMessage}>
                    {errorMessage}
                  </div>
                )}

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className={styles.successMessage}>
                    {t("contact.success")}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting || submitStatus === "success"}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                </button>
              </form>
            </div>

            {/* Contact Information Sidebar */}
            <div className={styles.contactInfo}>
              <h2 className={styles.contactInfoTitle}>{t("contact.info.title")}</h2>
              
              {/* Social Media */}
              <div className={styles.infoSection}>
                <h3 className={styles.infoSectionTitle}>{t("contact.info.social")}</h3>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.facebook.com/Pablo.Garibotto.Garcia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Facebook"
                  >
                    <FaFacebook className={styles.socialIcon} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/ctennisstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Instagram"
                  >
                    <FaInstagram className={styles.socialIcon} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pablogaribottogarcia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className={styles.socialIcon} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://wa.me/34630530839"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className={styles.socialIcon} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoSection}>
                <h3 className={styles.infoSectionTitle}>{t("contact.info.phone")}</h3>
                <a href="tel:+34630530839" className={styles.contactLink}>
                  <FaPhone className={styles.contactIcon} />
                  <span>+34 630 530 839</span>
                </a>
              </div>

              {/* Location */}
              <div className={styles.infoSection}>
                <h3 className={styles.infoSectionTitle}>{t("contact.info.location")}</h3>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=C%2F+Verdaguer%2C+12%2C+Matar%C3%B3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <span>C/ Verdaguer, 12, Mataró</span>
                </a>
              </div>

              {/* Map */}
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2985.1234567890123!2d2.4444444444444!3d41.5555555555555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzIwLjAiTiAywrAyNiczNi4wIkU!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CTennis Studio Location"
                />
              </div>
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
