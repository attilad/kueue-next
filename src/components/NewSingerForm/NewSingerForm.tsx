import { useRef } from "react";
import Modal from "react-modal";

import styles from "@/styles/modal.module.css";

interface NewSingerModalProps {
  isOpen: boolean;
  onConfirm: (singer: string, priority?: boolean) => void;
  onCancel: () => void;
}

export const NewSingerModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: NewSingerModalProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priorityInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameInputRef.current?.value;
    if (!name) return;

    const priority = priorityInputRef.current?.checked;

    onConfirm(name, priority);

    if (nameInputRef.current) {
      nameInputRef.current.value = "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Add Singer"
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
      <h2>New Singer</h2>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.formInput}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              className={styles.input}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="priority" className={styles.label}>
              <input
                type="checkbox"
                id="priority"
                ref={priorityInputRef}
                className={styles.checkbox}
              />
              Priority
            </label>
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={handleSubmit}
          >
            Add
          </button>
          <button className={styles.button} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
