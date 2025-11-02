import React from 'react';
import styles from './Section.module.css';
import { SectionProps } from '../../models/interfaces';

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = 'px-0 sm:px-0 md:px-0', 
  fullWidth = false,
  backgroundColor,
  titleAlign = 'center',
  maxWidth = "1200px"
}) => {
  const style = backgroundColor ? { 
    backgroundColor,
    transition: 'none',
  } : undefined;
  
  const containerStyle = {
    maxWidth: maxWidth,
    width: '100%', 
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
  };
  
  return (
    <section 
      id={id}
      className={`${styles.section} ${className}`}
      style={style}
    >
      <div 
        className={fullWidth ? styles.fullWidthContainer : styles.container}
        style={containerStyle}
      >
        <div className={styles.titleWrapper} style={{ textAlign: titleAlign }}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
