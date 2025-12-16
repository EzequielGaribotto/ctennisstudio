"use client"
import type React from "react"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { FaArrowLeft } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import Footer from "@/components/section/footer/Footer"
import ContactModal from "@/components/contact-modal/ContactModal"
import styles from "./page.module.css"

interface ServiceDetail {
  key: string
  title: string
  subtitle: string
  items: string[]
  price: string
  image: string
  whatsappMessage: string
}

const ServiceDetailPage: React.FC = () => {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const service = params.service as string
  const [isModalOpen, setIsModalOpen] = useState(false)

  const serviceDetails: Record<string, ServiceDetail> = {
    point: {
      key: "point",
      title: t("equilibrado.services.point.title"),
      subtitle: t("equilibrado.services.point.description"),
      items: [
        t("serviceDetails.point.item1"),
        t("serviceDetails.point.item2"),
        t("serviceDetails.point.item3"),
        t("serviceDetails.point.item4"),
        t("serviceDetails.point.item5"),
      ],
      price: t("equilibrado.services.point.price"),
      image: "/images/stringer/services/racquets/POINT.webp",
      whatsappMessage: "Hola, estoy interesado en el servicio POINT de equilibrado de raquetas",
    },
    set: {
      key: "set",
      title: t("equilibrado.services.set.title"),
      subtitle: t("equilibrado.services.set.description"),
      items: [
        t("serviceDetails.set.item1"),
        t("serviceDetails.set.item2"),
        t("serviceDetails.set.item3"),
        t("serviceDetails.set.item4"),
        t("serviceDetails.set.item5"),
      ],
      price: t("equilibrado.services.set.price"),
      image: "/images/stringer/services/racquets/SET.webp",
      whatsappMessage: "Hola, estoy interesado en el servicio SET de aumento de peso",
    },
    match: {
      key: "match",
      title: t("equilibrado.services.match.title"),
      subtitle: t("equilibrado.services.match.description"),
      items: [
        t("serviceDetails.match.item1"),
        t("serviceDetails.match.item2"),
        t("serviceDetails.match.item3"),
        t("serviceDetails.match.item4"),
        t("serviceDetails.match.item5"),
      ],
      price: t("equilibrado.services.match.price"),
      image: "/images/stringer/services/racquets/MATCH.webp",
      whatsappMessage: "Hola, estoy interesado en el servicio MATCH de igualación de raquetas",
    },
    encordado: {
      key: "encordado",
      title: t("encordado.title"),
      subtitle: t("encordado.description"),
      items: [
        t("serviceDetails.encordado.item1"),
        t("serviceDetails.encordado.item2"),
        t("serviceDetails.encordado.item3"),
        t("serviceDetails.encordado.item4"),
        t("serviceDetails.encordado.item5"),
      ],
      price: t("serviceDetails.encordado.price"),
      image: "/images/stringer/pablo/pablo_garibotto_stringer.webp",
      whatsappMessage: "Hola, estoy interesado en el servicio de encordado profesional",
    },
    base: {
      key: "base",
      title: t("cursos.courses.base.name"),
      subtitle: t("cursos.courses.base.description"),
      items: [
        t("cursos.courses.base.content1"),
        t("cursos.courses.base.content2"),
        t("cursos.courses.base.content3"),
        t("serviceDetails.base.item4"),
        t("serviceDetails.base.item5"),
      ],
      price: t("cursos.courses.base.price"),
      image: "/images/stringer/machines/babolat_machines.webp",
      whatsappMessage: "Hola, estoy interesado en el curso Base de encordado",
    },
    avance: {
      key: "avance",
      title: t("cursos.courses.avance.name"),
      subtitle: t("cursos.courses.avance.description"),
      items: [
        t("cursos.courses.avance.content1"),
        t("cursos.courses.avance.content2"),
        t("cursos.courses.avance.content3"),
        t("serviceDetails.avance.item4"),
        t("serviceDetails.avance.item5"),
      ],
      price: t("cursos.courses.avance.price"),
      image: "/images/stringer/machines/babolat_machines.webp",
      whatsappMessage: "Hola, estoy interesado en el curso Avance de encordado",
    },
    maestria: {
      key: "maestria",
      title: t("cursos.courses.maestria.name"),
      subtitle: t("cursos.courses.maestria.description"),
      items: [
        t("cursos.courses.maestria.content1"),
        t("cursos.courses.maestria.content2"),
        t("cursos.courses.maestria.content3"),
        t("serviceDetails.maestria.item4"),
        t("serviceDetails.maestria.item5"),
      ],
      price: t("cursos.courses.maestria.price"),
      image: "/images/stringer/pablo/pablo_10_yrs_mutua_2025.webp",
      whatsappMessage: "Hola, estoy interesado en el curso Maestría de encordado",
    },
  }

  const currentService = serviceDetails[service]

  if (!currentService) {
    return (
      <div className={styles.notFound}>
        <main className={styles.main}>
          <div className={styles.container}>
            <h1>Servicio no encontrado</h1>
            <button onClick={() => router.push("/")} className={styles.backButton}>
              <FaArrowLeft /> Volver al inicio
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isCourse = ["base", "avance", "maestria"].includes(service)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <button onClick={() => router.back()} className={styles.backButton}>
            <FaArrowLeft /> {t("contact.back")}
          </button>

          <div className={styles.serviceHeader}>
            <div className={styles.imageContainer}>
              <Image
                src={currentService.image}
                alt={currentService.title}
                width={600}
                height={400}
                className={styles.serviceImage}
              />
            </div>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>{currentService.title}</h1>
              <p className={styles.subtitle}>{currentService.subtitle}</p>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <h2 className={styles.detailsTitle}>
              {service === "encordado" || service === "base" || service === "avance" || service === "maestria"
                ? t("serviceDetails.whatIncludes")
                : t("serviceDetails.serviceIncludes")}
            </h2>
            <ul className={styles.itemsList}>
              {currentService.items.map((item, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.itemNumber}>{index + 1}</span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.priceSection}>
              <div className={styles.priceLabel}>
                {service === "base" || service === "avance" || service === "maestria"
                  ? t("serviceDetails.coursePrice")
                  : t("serviceDetails.price")}
              </div>
              <div className={styles.priceValue}>{currentService.price}</div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className={styles.contractButton}
            >
              {isCourse ? t("serviceDetail.enrollCourse") : t("serviceDetail.contractService")}
            </button>
          </div>
        </div>
      </main>
      <Footer />
      
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={currentService.title}
        serviceKey={service}
        whatsappMessage={currentService.whatsappMessage}
      />
    </div>
  )
}

export default ServiceDetailPage
