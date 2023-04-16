import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdminButton } from '../AdminButton/AdminButton';
import { faClockRotateLeft, faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './SingerCommands.module.css';
import { useState } from 'react';
import { useModifyQueue } from '@/hooks/useKaraoke';

interface SingerCommandsProps {
    singer: string;
    show?: boolean;
    onClose: () => void;
}

export type SingerCommand = 'remove' | 'bump' | false;

const confirmDescription = (command: SingerCommand, singer: string) => {
    switch (command) {
        case 'remove':
            return `Are you sure you want to remove ${singer} from the queue?`;
        case 'bump':
            return `Move ${singer} behind the next singer?`;
        default:
            return '';
    }
};

export const SingerCommands = ({ singer, onClose, show = false }: SingerCommandsProps) => {
    const {
        removeSinger,
        bumpSinger
      } = useModifyQueue();
      
    const [command, setCommand] = useState<SingerCommand>(false);

    const handleConfirm = () => {
        if(command === 'bump') {
            bumpSinger(singer);
        } else if (command === 'remove') {
            removeSinger(singer);
        }

        setCommand(false);
        onClose();
    };

    return (
        <div className={styles.container} style={{ display: show ? 'block' : 'none' }}>
            { command ? (
                <div className={styles.content}>
                <h1 className={styles.title}>Confirm</h1>
                <div className={styles.description}>{confirmDescription(command, singer)}</div>
                <div className={styles.confirmButtons}>
                    <AdminButton variant='secondary' label="Cancel" onClick={() => setCommand(false)} />
                    <AdminButton variant='primary' label="Confirm" onClick={() => handleConfirm()} />
                </div>
            </div>
            ) : (
                <div className={styles.content}>
                <div className={styles.title}>{singer}<button className={styles.closeButton} onClick={onClose}><FontAwesomeIcon icon={faXmark} size="xl" /></button></div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <AdminButton icon={<FontAwesomeIcon icon={faClockRotateLeft} size="xl" />} onClick={() => setCommand('bump')} />
                        <div className={styles.buttonLabel}>Move behind next singer</div>
                    </div>
                    <div className={styles.button}>
                        <AdminButton variant='warning' icon={<FontAwesomeIcon icon={faTrashCan} size="xl" />} onClick={() => setCommand('remove')} />
                        <div className={styles.buttonLabel}>Remove from Queue</div>
                    </div>
                </div>
            </div>
            ) }
            
        </div>
    );
}