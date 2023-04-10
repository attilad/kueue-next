import { useModifyQueue, useShowSingers } from "@/hooks/useKaraoke";
import { AdminSingerCard, BumpSingerModal } from "@/components";
import styles from "@/styles/admin.module.css";
import { useState } from "react";
import { ConfirmRemove, NewSingerModal } from "@/components";

export default function AdminPage() { 
  const { singers, isLoading } = useShowSingers();
  const { nextSinger, addSinger, removeSinger, bumpSinger } = useModifyQueue();
  const [ singerToRemove, setSingerToRemove ] = useState<string | undefined>(undefined);
  const [ singerToBump, setSingerToBump ] = useState<string | undefined>(undefined);
  const [ showNewSingerModal, setShowNewSingerModal ] = useState<boolean>(false);

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
    setShowNewSingerModal(false);
  };

  const prepSingers = () => {
    addSinger("Singer 1");
    addSinger("Singer 2");
    addSinger("Singer 3");
    addSinger("Singer 4");
    addSinger("Singer 5");
    addSinger("Singer 6");
  };

  return (
    <div className={styles.container}>
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
          <button className={styles.button} onClick={() => nextSinger()}>
            Next Singer
          </button>
          <button className={styles.button} onClick={() => setShowNewSingerModal(true)}>
            Add New Singer
          </button>
          <button className={styles.button} onClick={() => prepSingers()}>
            Add Test Singers
          </button>
        </div>
      <ConfirmRemove isOpen={singerToRemove !== undefined} singer={singerToRemove ?? ''} onConfirm={confirmRemove} onCancel={cancelRemove} />
      <NewSingerModal isOpen={showNewSingerModal} onConfirm={addNewSinger} onCancel={() => setShowNewSingerModal(false)} />
      <BumpSingerModal isOpen={singerToBump !== undefined} singer={singerToBump ?? ''} onConfirm={confirmBump} onCancel={cancelBump} />
    </div>
  );
}
