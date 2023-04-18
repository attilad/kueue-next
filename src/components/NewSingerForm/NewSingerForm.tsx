import { useRef } from "react";
import { Modal, AdminButton } from "@/components";

import styles from "./NewSingerForm.module.css";

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

  const handleSubmit = async () => {
    const name = nameInputRef.current?.value;
    if (!name) return;

    const priority = priorityInputRef.current?.checked;

    onConfirm(name, priority);

    if (nameInputRef.current) {
      nameInputRef.current.value = "";
    }
  };

  return (
    <Modal show={isOpen} onClose={onCancel} title="Add Singer">
      <div className={styles.container}>
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
          <AdminButton variant="secondary" onClick={onCancel} label="Cancel" />
          <AdminButton
            variant="primary"
            onClick={() => handleSubmit()}
            label="Submit"
          />
        </div>
      </div>
    </Modal>
  );
};
