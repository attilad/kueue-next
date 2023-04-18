// components/ConfirmationModal.tsx
import React from "react";
import { Modal, AdminButton } from "@/components";
import styles from "./ConfirmReset.module.css";

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
    <Modal show={isOpen} onClose={onCancel} title="Reset the Queue">
      <>
        <div className={styles.description}>
          Are you <em>sure</em> you want to completely empty the queue?
        </div>
        <div className={styles.confirmButtons}>
          <AdminButton variant="secondary" label="Cancel" onClick={onCancel} />
          <AdminButton variant="warning" label="Obliterate" onClick={onConfirm} />
        </div>
      </>
    </Modal>
  );
};
