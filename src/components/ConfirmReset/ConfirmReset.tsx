// components/ConfirmationModal.tsx
import React from "react";
import Modal from "react-modal";

import styles from "@/styles/modal.module.css";

interface ConfirmResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmResetModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmResetModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Reset the Queue"
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
        <h2>Are you sure you want to completely reset the Queue?</h2>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={onConfirm}
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
