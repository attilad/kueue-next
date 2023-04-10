// components/SingerCard.tsx
import React from "react";
import styles from "./AdminSingerCard.module.css";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({ weight: "400", subsets: ["latin"] });

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
    <div className={styles.singerCard}>
      <div className={styles.singerName}>{name}</div>
      <div className={styles.commands}>
        <button className={styles.button} onClick={handleRemove}>x</button>
        <button className={styles.button} onClick={handleBump}>^</button>
      </div>
    </div>
  );
};

export default AdminSingerCard;
