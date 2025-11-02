import React from 'react';
import styles from './MetaInfoDisplay.module.css';

interface MetaInfoDisplayProps {
  period: string;
  location: string;
}

const MetaInfoDisplay: React.FC<MetaInfoDisplayProps> = ({ period, location }) => {
  return (
    <div className={styles.metaInfoInline}>
      <p className={styles.period}>{period}</p>
      <span className={styles.separator}>•</span>
      <p className={styles.location}>{location}</p>
    </div>
  );
};

export default MetaInfoDisplay;
