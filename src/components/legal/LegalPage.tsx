"use client"
import type React from "react"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { LEGAL } from "@/data/legal"
import { fillLegalText, getLegalDoc, getLegalPath, type LegalDocKey, type LegalLocale } from "@/data/legal-content"
import styles from "./LegalPage.module.css"

const NAV: LegalDocKey[] = ["notice", "privacy", "cookies"]

export const LegalPage: React.FC<{ doc: LegalDocKey }> = ({ doc }) => {
  const { t, locale } = useTranslation()
  const lang: LegalLocale = locale === "en" ? "en" : "es"
  const content = getLegalDoc(doc, lang)
  const values: Record<string, string> = {
    holderName: LEGAL.holderName,
    tradeName: LEGAL.tradeName,
    taxId: LEGAL.taxId,
    address: LEGAL.address,
    email: LEGAL.email,
    phone: LEGAL.phone,
    website: LEGAL.website,
  }
  const fill = (text: string) => fillLegalText(text, values)

  return (
    <main className={styles.wrapper}>
      <article className={styles.card}>
        <Link href="/" className={styles.back}>
          <FaArrowLeft aria-hidden="true" /> {t("legal.backHome")}
        </Link>

        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.updated}>
          {t("legal.updated")}: {LEGAL.updated}
        </p>

        {content.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.heading}>{section.title}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className={styles.paragraph}>
                {fill(p)}
              </p>
            ))}
            {section.list && (
              <ul className={styles.list}>
                {section.list.map((item) => (
                  <li key={item}>{fill(item)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <nav className={styles.nav} aria-label={t("legal.navLabel")}>
          {NAV.map((key) => (
            <Link key={key} href={getLegalPath(key)} aria-current={key === doc ? "page" : undefined}>
              {getLegalDoc(key, lang).title}
            </Link>
          ))}
        </nav>
      </article>
    </main>
  )
}
