import React from "react";
import styles from "./CardList.module.css";

interface CardListProps {
  children: React.ReactNode;
  className?: string;
}

const CardList: React.FC<CardListProps> = ({ children, className = "" }) => {
  return (
    <div className={`${styles.cardList} ${className}`}>
      {children}
    </div>
  );
};

export default CardList;
