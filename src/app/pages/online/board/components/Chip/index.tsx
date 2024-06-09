'use client'
import { useContext } from 'react';
import { BoardContext } from '../../contexts/boardContext';
import styles from './index.module.css';
import { WebSocketContext } from '../../contexts/webSocketContext';

interface ChipProps {
    playerColor: 'red' | 'blue'
}

export default function Chip({ playerColor }: ChipProps) {
    const {
        playerTurn,
        firstPlayer,
    } = useContext(WebSocketContext);

    return (
        <button
            type='button'
            className={`
                ${styles.chip_container}

                ${styles.chip_image}
                ${styles.chip_container}
                ${playerColor == 'blue' ? styles.chip_image_blue : styles.chip_image_red}
            `}
        >
            <div>
            </div>
        </button>
    );
}