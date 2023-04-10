import { useModifyQueue, useShowSingers } from "@/hooks/useKaraoke";
import { AdminSingerCard, BumpSingerModal, ConfirmResetModal } from "@/components";
import styles from "@/styles/admin.module.css";
import { useState } from "react";
import { ConfirmRemove, NewSingerModal } from "@/components";

export default function AdminPage() { 
  const { singers, isLoading } = useShowSingers();
  const { nextSinger, addSinger, removeSinger, bumpSinger, resetQueue } = useModifyQueue();
  const [ singerToRemove, setSingerToRemove ] = useState<string | undefined>(undefined);
  const [ singerToBump, setSingerToBump ] = useState<string | undefined>(undefined);
  const [ showNewSinger, setShowNewSinger ] = useState<boolean>(false);
  const [ showReset, setShowReset ] = useState<boolean>(false);

  const handleRemove = (singer: string) => {
    setSingerToRemove(singer);
  };

  const confirmRemove = (singer: string) => {
    removeSinger(singer);
    setSingerToRemove(undefined);
  };

  const cancelRemove = () => {
    setSingerToRemove(undefined);
  };

  const handleBump = (singer: string) => {
    setSingerToBump(singer);
  };

  const confirmBump = (singer: string) => {
    bumpSinger(singer);
    setSingerToBump(undefined);
  };

  const cancelBump = () => {
    setSingerToBump(undefined);
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
    <div className={styles.container}>
        <div className={styles.column}>
          <button className={styles.button} onClick={() => nextSinger()} disabled={!singers || singers?.length < 2}>
            Next Singer
          </button>
        </div>
        <div className={styles.column}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            singers &&
            singers.map((singer, index) => (
              <AdminSingerCard key={singer} name={singer} onRemove={handleRemove} onBump={handleBump} />
            ))
          )}
        </div>
        <div className={styles.column}>
          <button className={styles.button} onClick={() => setShowNewSinger(true)}>
            Add New Singer
          </button>
          <button className={`${styles.button} ${styles.warning}`} onClick={() => handleReset()}>
            CLEAR QUEUE
          </button>
        </div>
      <ConfirmRemove isOpen={singerToRemove !== undefined} singer={singerToRemove ?? ''} onConfirm={confirmRemove} onCancel={cancelRemove} />
      <NewSingerModal isOpen={showNewSinger} onConfirm={addNewSinger} onCancel={() => setShowNewSinger(false)} />
      <BumpSingerModal isOpen={singerToBump !== undefined} singer={singerToBump ?? ''} onConfirm={confirmBump} onCancel={cancelBump} />
      <ConfirmResetModal isOpen={showReset} onConfirm={confirmReset} onCancel={cancelReset} />
    </div>
  );
}
