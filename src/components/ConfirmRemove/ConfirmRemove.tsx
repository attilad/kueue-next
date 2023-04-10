// components/ConfirmationModal.tsx
import React from "react";
import Modal from "react-modal";

import styles from "@/styles/modal.module.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  singer: string;
  onConfirm: (singer: string) => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  singer,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Remove Singer"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
          padding: "2rem",
          outline: "none",
          maxWidth: "90%",
          maxHeight: "90%",
        },
      }}
    >
      <div className={styles.content}>
        <h2>Are you sure you want to remove {singer}?</h2>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => onConfirm(singer)}
          >
            Yes
          </button>
          <button className={styles.button} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};