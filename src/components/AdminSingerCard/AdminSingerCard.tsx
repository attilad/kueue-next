// components/SingerCard.tsx
import React from "react";
import styles from "./AdminSingerCard.module.css";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

interface SingerCardProps {
  name: string;
  onClick: (singer: string) => void;
}

const AdminSingerCard = ({ name, onClick }: SingerCardProps) => { 
  const handleClick = () => {
    onClick(name);
  };

  return (
    <div className={`${styles.singerCard} ${inter.className}`}>
      <div className={styles.singerName}>{name}</div>
      <div className={styles.commands}>
        <button className={styles.button} onClick={handleClick}><FontAwesomeIcon icon={faWrench} size="xl" /></button>
      </div>
    </div>
  );
};

export default AdminSingerCard;
