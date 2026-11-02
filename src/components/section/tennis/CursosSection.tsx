"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import styles from "./CursosSection.module.css"

interface Course {
  key: "base" | "avance" | "maestria"
  name: string
  description: string
  content: string[]
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
    },
    {
      key: "maestria",
      name: t("cursos.courses.maestria.name"),
      description: t("cursos.courses.maestria.description"),
      content: [
        t("cursos.courses.maestria.content1"),
        t("cursos.courses.maestria.content2"),
      ],
    },
  ]

  return (
    <section id="cursos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={`${styles.title} cts-display`}>{t("cursos.title")}</h2>
            <p className={styles.description}>{t("cursos.description")}</p>
          </div>
          <div className={styles.photos}>
            <div className={styles.photoWide}>
              <Image
                src="/images/stringer/machines/babolat_machines.webp"
                alt="Babolat Professional Stringing Machines"
                fill
                sizes="(max-width: 860px) 60vw, 30vw"
                className={styles.photo}
              />
            </div>
            <div className={styles.photoTall}>
              <Image
                src="/images/stringer/pablo/pablo_10_yrs_mutua_2025.webp"
                alt="Pablo Garibotto - 10 Years Mutua Madrid Open 2025"
                fill
                sizes="(max-width: 860px) 40vw, 20vw"
                className={styles.photo}
              />
            </div>
          </div>
        </div>

        <div className={styles.courses}>
          {courses.map((course) => (
            <div key={course.key} className={styles.course}>
              <h3 className={`${styles.courseName} cts-display`}>{course.name}</h3>
              <p className={styles.courseLevel}>{course.description}</p>
              <ul className={styles.contentList}>
                {course.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/services/${course.key}/`} className={styles.more}>
                {t("cursos.cta")}
                <span className="sr-only"> — {course.name}</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CursosSection
