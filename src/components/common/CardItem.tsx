import React from "react";
import Image from 'next/image';
import styles from "./CardItem.module.css";
import MetaInfoDisplay from './MetaInfoDisplay';

interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  linkUrl?: string;
  className?: string;
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  title,
  subtitle,
  period,
  location,
  description,
  technologies,
  imageUrl,
  linkUrl,
  className = "",
}) => {
  return (
    <div key={id} className={`${styles.cardItem} ${className}`}>
      <div className={styles.cardHeader}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${title} logo`}
            width={60}
            height={60}
            className={styles.logo}
          />
        )}
        <div style={{ textAlign: 'left', width: '100%' }}>
          <h3 className={styles.title}>
            {linkUrl ? (
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <h4 className={styles.subtitle}>{subtitle}</h4>
          <MetaInfoDisplay period={period} location={location} />
        </div>
      </div>
      <div style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>
        {description}
      </div>
      
      <div className={styles.technologies}>
        {technologies.map((tech, index) => (
          <span key={index} className={styles.tech}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CardItem;
