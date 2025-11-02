"use client";
import React from "react";
import Section from "../Section";
import { useTranslation } from "../../../context/TranslationContext";
import { Experience } from "../../../models/Experience";
import CardItem from "../../common/CardItem";
import CardList from "../../common/CardList";
import styles from "./ExperienceSection.module.css";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  const experiences: Experience[] = [
    {
      id: "seidor",
      company: t("experiences.seidor.company"),
      position: t("experiences.seidor.position"),
      period: t("experiences.seidor.period"),
      location: t("experiences.seidor.location"),
      description: t("experiences.seidor.description"),
      technologies: [
        "Apex",
        "Postman",
        "Lightning Web Components",
        "Salesforce.com",
        "CRM",
      ],
      imageUrl: "/images/companies/seidor_logo.webp",
      companyUrl: "https://www.seidor.com/en-es",
    },
    {
      id: "eulix",
      company: t("experiences.eulix.company"),
      position: t("experiences.eulix.position"),
      period: t("experiences.eulix.period"),
      location: t("experiences.eulix.location"),
      description: t("experiences.eulix.description"),
      technologies: [
        "Android",
        "XML",
        "API Integration",
        "Gradle",
        "AI/ML Integration",
        "Front-End",
        "Data Binding",
        "Android Jetpack",
        "Retrofit",
        "Kotlin DSL",
        "LiveData",
        "Android SDK",
        "Git",
        "Agile",
        "Scrum",
        "UI/UX Design",
      ],
      imageUrl: "/images/companies/eulix_logo.webp",
      companyUrl:
        "https://play.google.com/store/apps/details?id=com.eulix.mobile.app&hl=en_US",
    },
    {
      id: "telus",
      company: t("experiences.telus.company"),
      position: t("experiences.telus.position"),
      period: t("experiences.telus.period"),
      location: t("experiences.telus.location"),
      description: t("experiences.telus.description"),
      technologies: [
        "English",
        "JSON",
        "Data Analysis",
        "Data Classification",
        "Digital Competence",
      ],
      imageUrl: "/images/companies/telus_logo.webp",
      companyUrl: "https://www.telus.com/en/digital",
    },
  ];

  return (
    <Section id="experience" title={t("experiences.title")}>
      <CardList>
        {experiences.map((exp) => (
          <CardItem
            key={exp.id}
            id={exp.id}
            title={exp.company}
            subtitle={exp.position}
            period={exp.period}
            location={exp.location}
            description={exp.description}
            technologies={exp.technologies}
            imageUrl={exp.imageUrl}
            linkUrl={exp.companyUrl}
            className={styles.experienceItem}
          />
        ))}
      </CardList>
    </Section>
  );
};

export default ExperienceSection;
