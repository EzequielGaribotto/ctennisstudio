"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./CursosSection.module.css"

interface Course {
  key: "base" | "avance" | "maestria"
  name: string
  description: string
  content: string[]
  price: string
}

const CursosSection: React.FC = () => {
  const { t } = useTranslation()

  const courses: Course[] = [
    {
      key: "base",
      name: t("cursos.courses.base.name"),
      description: t("cursos.courses.base.description"),
      content: [
        t("cursos.courses.base.content1"),
        t("cursos.courses.base.content2"),
        t("cursos.courses.base.content3"),
      ],
      price: t("cursos.courses.base.price"),
    },
    {
      key: "avance",
      name: t("cursos.courses.avance.name"),
      description: t("cursos.courses.avance.description"),
      content: [
        t("cursos.courses.avance.content1"),
        t("cursos.courses.avance.content2"),
        t("cursos.courses.avance.content3"),
      ],
      price: t("cursos.courses.avance.price"),
    },
    {
      key: "maestria",
      name: t("cursos.courses.maestria.name"),
      description: t("cursos.courses.maestria.description"),
      content: [
        t("cursos.courses.maestria.content1"),
        t("cursos.courses.maestria.content2"),
        t("cursos.courses.maestria.content3"),
      ],
      price: t("cursos.courses.maestria.price"),
    },
  ]

  return (
    <section id="cursos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("cursos.title")}</h2>
          <p className={styles.description}>{t("cursos.description")}</p>
          <div className={styles.headerImagesWrapper}>
            <div className={styles.headerImageContainer}>
              <Image 
                src="/images/stringer/machines/babolat_machines.webp"
                alt="Babolat Professional Stringing Machines"
                width={600}
                height={400}
                className={styles.headerImage}
              />
            </div>
            <div className={styles.diplomaImageContainer}>
              <Image 
                src="/images/stringer/pablo/pablo_10_yrs_mutua_2025.webp"
                alt="Pablo Garibotto - 10 Years Mutua Madrid Open 2025"
                width={500}
                height={400}
                className={styles.diplomaImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.key} className={styles.courseCard}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseName}>{course.name}</h3>
                <p className={styles.courseLevel}>{course.description}</p>
              </div>

              <ul className={styles.contentList}>
                {course.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className={styles.courseFooter}>
                <div className={styles.price}>{course.price}</div>
                <Link 
                  href={`/services/${course.key}`}
                  className={styles.enrollButton}
                >
                  {t("cursos.cta")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CursosSection
