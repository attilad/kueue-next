// components/SingerCard.tsx
import React from "react";
import styles from "./AdminSingerCard.module.css";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

interface SingerCardProps {
  name: string;
  onRemove: (singer: string) => void;
  onBump: (singer: string) => void;
}

const AdminSingerCard = ({ name, onRemove, onBump }: SingerCardProps) => { 
  const handleRemove = () => {
    onRemove(name);
  };

  const handleBump = () => {
    onBump(name);
  };

  return (
    <div className={`${styles.singerCard} ${inter.className}`}>
      <div className={styles.singerName}>{name}</div>
      <div className={styles.commands}>
        <button className={styles.button} onClick={handleBump}><FontAwesomeIcon icon={faClockRotateLeft} size="xl" /></button>
        <button className={styles.button} onClick={handleRemove}><FontAwesomeIcon icon={faXmark} size="xl" /></button>
      </div>
    </div>
  );
};

export default AdminSingerCard;
