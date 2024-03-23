'use client'
import styles from './index.module.css';

interface ChipProps {
    player: 1 | 2;
}

export default function Chip({ player }: ChipProps) {

    return (
        <button
            type='button'
            className={`
                ${styles.chip_container}
                ${player == 1 ? styles.chip_player_one : styles.chip_player_two}
            `}
        >
            <div>
            </div>
        </button>
    );
}