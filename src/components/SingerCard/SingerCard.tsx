// components/SingerCard.tsx
import React from "react";
import styles from "./SingerCard.module.css";
import { Philosopher } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faBell } from "@fortawesome/free-solid-svg-icons";

const philosopher = Philosopher({ weight: "400", subsets: ["latin"] });

interface SingerCardProps {
  name: string;
  isCurrent: boolean;
  isNext: boolean;
}

const SingerCard = ({ name, isCurrent, isNext }: SingerCardProps) => {
  const cardClassName = `${styles.singerCard} ${
    isCurrent ? styles.current : isNext ? styles.next : ""
  }`;
  const nameLabelClassName = `${philosopher.className} ${styles.singerName}`;

  if (isCurrent) {
    return (
      <div className={`${styles.singerCard} ${styles.current}`}>
        <div className={styles.singerLabel}>Now Singing:</div>
        <div className={styles.singerWrapper}>
          <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />
          <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />
          <div className={nameLabelClassName}>{name}</div>
          <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />
          <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />
        </div>
      </div>
    );
  }

  if (isNext) {
    return (
      <div className={`${styles.singerCard} ${styles.next}`}>
        <div className={styles.singerLabel}>
          <div>Up Next:</div>
          <FontAwesomeIcon icon={faBell} color="gold" size="lg" shake />
        </div>
        <div className={nameLabelClassName}>{name}</div>
      </div>
    );
  }

  return (
    <div className={cardClassName}>
      <div className={nameLabelClassName}>{name}</div>
    </div>
  );
};

export default SingerCard;
