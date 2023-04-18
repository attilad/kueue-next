import { useModifyQueue, useShowSingers } from "@/hooks/useKaraoke";
import { ConfirmResetModal, AdminButton, SingerCommands } from "@/components";
import styles from "@/styles/admin.module.css";
import { useState } from "react";
import { NewSingerModal } from "@/components";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUsersSlash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSingerSubscription } from "@/hooks/useSocket";
import { AdminSingerList } from "@/components/AdminSingerList/AdminSingerList";

const inter = Inter({ subsets: ["latin"] });

export default function AdminPage() {
  useSingerSubscription();
  const { singers } = useShowSingers();
  const { nextSinger, previousSinger, addSinger, resetQueue } =
    useModifyQueue();
  const [singerToModify, setSingerToModify] = useState<string | undefined>(
    undefined
  );
  const [showNewSinger, setShowNewSinger] = useState<boolean>(false);
  const [showReset, setShowReset] = useState<boolean>(false);

  const handleModify = (singer: string) => {
    setSingerToModify(singer);
  };

  const cancelModify = () => {
    setSingerToModify(undefined);
  };

  const addNewSinger = (singer: string, priority: boolean = false) => {
    addSinger(singer, priority);
    setShowNewSinger(false);
  };

  const handleReset = () => {
    setShowReset(true);
  };

  const cancelReset = () => {
    setShowReset(false);
  };

  const confirmReset = () => {
    resetQueue();
    setShowReset(false);
  };

  return (
    <div className={`${styles.container} ${inter.className}`}>
      <SingerCommands
        show={singerToModify !== undefined}
        singer={singerToModify ?? ""}
        onClose={cancelModify}
      />
      <div className={styles.column}>
        <div className={styles.row}>
          <AdminButton
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => previousSinger()}
            disabled={!singers || singers?.length < 2}
          />
          <AdminButton
            variant="primary"
            icon={<FontAwesomeIcon icon={faUserPlus} />}
            onClick={() => setShowNewSinger(true)}
          />
          <AdminButton
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            onClick={() => nextSinger()}
            disabled={!singers || singers?.length < 2}
          />
        </div>
      </div>
      <div className={styles.column}>
        <AdminSingerList singers={singers ?? []} onClick={handleModify} />
      </div>
      <div className={styles.column}>
        <AdminButton
          label="Clear Queue"
          icon={<FontAwesomeIcon icon={faUsersSlash} />}
          onClick={() => handleReset()}
          variant="warning"
        />
      </div>
      <NewSingerModal
        isOpen={showNewSinger}
        onConfirm={addNewSinger}
        onCancel={() => setShowNewSinger(false)}
      />
      <ConfirmResetModal
        isOpen={showReset}
        onConfirm={confirmReset}
        onCancel={cancelReset}
      />
    </div>
  );
}
