"use client"
import type React from "react"
import Image from "next/image"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./EquilibradoSection.module.css"
import CarouselEquilibrado from "./../../CarouselEquilibrado";

interface Service {
  key: "set" | "match" | "point"
  title: string
  description: string
  price: string
}

const EquilibradoSection: React.FC = () => {
  const { t } = useTranslation()

  const services: Service[] = [
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
    {
      key: "point",
      title: t("equilibrado.services.point.title"),
      description: t("equilibrado.services.point.description"),
      price: t("equilibrado.services.point.price"),
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
              <CarouselEquilibrado />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EquilibradoSection
