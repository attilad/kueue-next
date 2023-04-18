import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminButton, Modal } from "@/components";
import {
  faClockRotateLeft,
  faXmark,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SingerCommands.module.css";
import { useState } from "react";
import { useModifyQueue } from "@/hooks/useKaraoke";

interface SingerCommandsProps {
  singer: string;
  show?: boolean;
  onClose: () => void;
}

export type SingerCommand = "remove" | "bump" | false;

const confirmDescription = (command: SingerCommand, singer: string) => {
  switch (command) {
    case "remove":
      return `Are you sure you want to remove ${singer} from the queue?`;
    case "bump":
      return `Move ${singer} behind the next singer?`;
    default:
      return "";
  }
};

export const SingerCommands = ({
  singer,
  onClose,
  show = false,
}: SingerCommandsProps) => {
  const { removeSinger, bumpSinger } = useModifyQueue();

  const [command, setCommand] = useState<SingerCommand>(false);

  const handleConfirm = () => {
    if (command === "bump") {
      bumpSinger(singer);
    } else if (command === "remove") {
      removeSinger(singer);
    }

    setCommand(false);
    onClose();
  };

  return (
    <Modal show={show} title={command ? "Confirm" : singer} onClose={onClose}>
      {command ? (
        <>
          <div className={styles.description}>
            {confirmDescription(command, singer)}
          </div>
          <div className={styles.confirmButtons}>
            <AdminButton
              variant="secondary"
              label="Cancel"
              onClick={() => setCommand(false)}
            />
            <AdminButton
              variant="primary"
              label="Confirm"
              onClick={() => handleConfirm()}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <AdminButton
                icon={<FontAwesomeIcon icon={faClockRotateLeft} size="xl" />}
                onClick={() => setCommand("bump")}
              />
              <div className={styles.buttonLabel}>Move behind next singer</div>
            </div>
            <div className={styles.button}>
              <AdminButton
                variant="warning"
                icon={<FontAwesomeIcon icon={faTrashCan} size="xl" />}
                onClick={() => setCommand("remove")}
              />
              <div className={styles.buttonLabel}>Remove from Queue</div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};
