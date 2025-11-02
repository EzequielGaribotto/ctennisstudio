"use client";

import { FaGlobe, FaSpotify } from "../../../utils/icons";
import ClickableButton from "../../button/ClickableButton";
import Section from "../Section";
import { useTranslation } from "../../../context/TranslationContext";
import styles from "./GamingSection.module.css";

export default function GamingSection() {
  const { t } = useTranslation();

  return (
    <Section id="gaming" title={t("aboutMeSection.title")}>
      <div className={styles.aboutContainer}>
        {/* Personal Info Paragraph */}
        <div className={styles.paragraph}>
          <p className={styles.paragraphText}>{t("aboutMeSection.personalInfo")}</p>
        </div>

        {/* Lifestyle Info Paragraph */}
        <div className={styles.paragraph}>
          <p className={styles.paragraphText}>{t("aboutMeSection.lifestyleInfo")}</p>
        </div>

        {/* Button Section - After lifestyle info */}
        <div className={styles.buttonsSection}>
          <ClickableButton
            href="https://hevy.com/user/ezequielgaribotto"
            className={styles.actionButton}
            tooltipKey="aboutMeSection.heavyProfile"
          >
            <FaGlobe className={styles.buttonIcon} />
            {t("aboutMeSection.heavyProfile")}
          </ClickableButton>
        </div>

        {/* Music Info Paragraph */}
        <div className={styles.paragraph}>
          <p className={styles.paragraphText}>{t("aboutMeSection.musicInfo")}</p>
        </div>

        {/* Spotify Button Section */}
        <div className={styles.buttonsSection}>
          <ClickableButton
            href="https://open.spotify.com/playlist/28Ugg9IG0jk54E2aiic6Y1?si=lXOeR5BiQE-iKksrMG7TpA"
            className={`${styles.actionButton} ${styles.spotifyButton}`}
            tooltipKey="aboutMeSection.spotifyPlaylist"
          >
            <FaSpotify className={styles.buttonIcon} />
            {t("aboutMeSection.spotifyPlaylist")}
          </ClickableButton>
        </div>

        {/* Hobbies Info Paragraph */}
        <div className={styles.paragraph}>
          <p className={styles.paragraphText}>{t("aboutMeSection.hobbiesInfo")}</p>
        </div>
      </div>
    </Section>
  );
}
