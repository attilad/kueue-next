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

  return (
    <div className={cardClassName}>
      {isNext && <FontAwesomeIcon icon={faBell} color="gold" size="lg" shake />}
      {isCurrent && <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />}
      <div className={nameLabelClassName}>{name}</div>
      {isCurrent && <FontAwesomeIcon icon={faMusic} color="gold" size="xl" beat />}
      {isNext && <FontAwesomeIcon icon={faBell} color="gold" size="lg" shake />}
    </div>
  );
};

export default SingerCard;
