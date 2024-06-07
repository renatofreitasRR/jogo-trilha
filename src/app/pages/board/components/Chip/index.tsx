'use client'
import styles from './index.module.css';

interface ChipProps {
    player: 1 | 2;
}

export default function Chip({ player }: ChipProps) {

    return (
        <button
            type='button'
            title='chip'
            className={`
                ${styles.chip_container}
                ${player == 1 ? styles.chip_image_blue : styles.chip_image_red}
            `}
        >
        </button>
    );
}