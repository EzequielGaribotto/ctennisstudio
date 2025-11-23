"use client"
import type React from "react"
import { useTranslation } from "@/context/TranslationContext"
import styles from "../page.module.css"

interface ContactFormProps {
  formData: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    honeypot: string
  }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  isSubmitting: boolean
  submitStatus: "idle" | "success" | "error"
  errorMessage: string
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  submitStatus,
  errorMessage,
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.formSection}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={onInputChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {t("contact.form.name")} <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className={styles.input}
            placeholder={t("contact.form.namePlaceholder")}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t("contact.form.email")} <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className={styles.input}
            placeholder={t("contact.form.emailPlaceholder")}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t("contact.form.phone")}{" "}
            <span className={styles.optional}>({t("contact.form.optional")})</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className={styles.input}
            placeholder={t("contact.form.phonePlaceholder")}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            {t("contact.form.subject")} <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={onInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {t("contact.form.message")} <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onInputChange}
            className={styles.textarea}
            rows={8}
            placeholder={t("contact.form.messagePlaceholder")}
            required
          />
        </div>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        {submitStatus === "success" && (
          <div className={styles.successMessage}>{t("contact.success")}</div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || submitStatus === "success"}
        >
          {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
        </button>
      </form>
    </div>
  )
}
