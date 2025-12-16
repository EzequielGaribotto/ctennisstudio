"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./EquilibradoSection.module.css"

interface Service {
  key: "set" | "match" | "point"
  title: string
  description: string
  price: string
}

const equilibradoImages = [
  "/images/stringer/services/racquets/equilibrado_1.webp",
  "/images/stringer/services/racquets/equilibrado_2.webp",
  "/images/stringer/services/racquets/equilibrado_3.webp",
  "/images/stringer/services/racquets/equilibrado_4.webp",
]

const EquilibradoSection: React.FC = () => {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const services: Service[] = [
    {
      key: "point",
      title: t("equilibrado.services.point.title"),
      description: t("equilibrado.services.point.description"),
      price: t("equilibrado.services.point.price"),
    },
    {
      key: "set",
      title: t("equilibrado.services.set.title"),
      description: t("equilibrado.services.set.description"),
      price: t("equilibrado.services.set.price"),
    },
    {
      key: "match",
      title: t("equilibrado.services.match.title"),
      description: t("equilibrado.services.match.description"),
      price: t("equilibrado.services.match.price"),
    },
  ]

  return (
    <section id="equilibrado" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>{t("equilibrado.title")}</h2>
          <p className={styles.description}>{t("equilibrado.description")}</p>

          <div className={styles.topRow}>
            <div className={styles.carouselLeft}>
              <div className={styles.carouselWrapper}>
                <Image
                  src={equilibradoImages[currentImageIndex]}
                  alt={`Equilibrado ${currentImageIndex + 1}`}
                  width={300}
                  height={500}
                  className={styles.carouselImage}
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
                
                {/* Navigation buttons - appear on hover */}
                <button
                  className={styles.navButton + ' ' + styles.navButtonLeft}
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? equilibradoImages.length - 1 : prev - 1
                  )}
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  className={styles.navButton + ' ' + styles.navButtonRight}
                  onClick={() => setCurrentImageIndex((prev) => 
                    (prev + 1) % equilibradoImages.length
                  )}
                  aria-label="Imagen siguiente"
                >
                  ›
                </button>
              </div>
            </div>

            <div className={styles.upgradeRight}>
              <Image
                src="/images/logo/cts studio upgrade_new.webp"
                alt="CTS Studio Upgrade"
                width={100}
                height={100}
                className={styles.upgradeImage}
              />
            </div>
          </div>
        </div>


        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.key} className={styles.serviceCard}>
              <div className={styles.cardTop}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescript}>{service.description}</p>
              </div>
              <div className={styles.imagePlaceholder}>
                <Image 
                  src={`/images/stringer/services/racquets/${service.key.toUpperCase()}.webp`}
                  alt={service.title}
                  width={300}
                  height={450}
                  className={styles.serviceImage}
                />
              </div>
              <div className={styles.priceTag}>{service.price}</div>
              <Link 
                href={`/services/${service.key}`}
                className={styles.ctaButton}
              >
                {t("equilibrado.cta")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EquilibradoSection
