"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import { useTranslation } from "@/context/TranslationContext"
import { BEHIND_THE_GAME_PHOTOS as PHOTOS } from "@/data/behind-the-game"
import styles from "./BehindTheGameSection.module.css"

const BehindTheGameSection: React.FC = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const photoLabel = (index: number) => t("behindGame.photo").replace("{n}", String(index + 1))
  const move = (step: number) =>
    setOpenIndex((current) => (current === null ? null : (current + step + PHOTOS.length) % PHOTOS.length))

  useEffect(() => {
    const dialog = dialogRef.current
    if (openIndex !== null && dialog && !dialog.open) dialog.showModal()
  }, [openIndex])

  const openPhoto = openIndex === null ? undefined : PHOTOS.at(openIndex)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href="/#experiencia" className={styles.back}>
          <FaArrowLeft aria-hidden="true" /> {t("experiencia.title")}
        </Link>
        <div className={styles.header}>
          <h1 className={`${styles.title} cts-display`}>BEHIND THE GAME</h1>
          <p className={styles.intro}>{t("behindGame.intro")}</p>
        </div>

        <div className={styles.mosaic}>
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className={styles.tile}
              onClick={() => setOpenIndex(index)}
              aria-label={photoLabel(index)}
            >
              <Image
                src={photo.src}
                alt=""
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 860px) 50vw, 33vw"
                priority={index < 3}
                className={styles.tileImage}
              />
            </button>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label="Behind the Game"
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1)
          if (e.key === "ArrowLeft") move(-1)
        }}
      >
        {openPhoto && openIndex !== null && (
          <>
            <div className={styles.viewerPhoto}>
              <Image src={openPhoto.src} alt={photoLabel(openIndex)} fill sizes="100vw" className={styles.viewerImage} />
            </div>
            <button type="button" className={`${styles.viewerButton} ${styles.close}`} onClick={() => dialogRef.current?.close()} aria-label={t("contactModal.close")}>
              <FaTimes aria-hidden="true" />
            </button>
            <button type="button" className={`${styles.viewerButton} ${styles.previous}`} onClick={() => move(-1)} aria-label={t("common.previousImage")}>
              <FaChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className={`${styles.viewerButton} ${styles.next}`} onClick={() => move(1)} aria-label={t("common.nextImage")}>
              <FaChevronRight aria-hidden="true" />
            </button>
            <p className={styles.counter}>{openIndex + 1} / {PHOTOS.length}</p>
          </>
        )}
      </dialog>
    </section>
  )
}

export default BehindTheGameSection
