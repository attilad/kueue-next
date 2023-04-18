import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  onClose: () => void;
  show?: boolean;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  onClose,
  children,
  show = false,
}: ModalProps) => (
  <div
    className={styles.container}
    style={{ display: show ? "block" : "none" }}
  >
    <div className={styles.content}>
      <h1 className={styles.title}>
        {title}
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
      </h1>
      {children}
    </div>
  </div>
);
