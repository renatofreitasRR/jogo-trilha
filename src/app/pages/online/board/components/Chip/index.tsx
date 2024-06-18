'use client'
import { useContext, useState } from 'react';
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

    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado
    const { pacoteAtual } = useContext(BoardContext);


    const iconMapping: any = {
        jetsons: '/assets/Icon1.png',
        flinstones: '/assets/Icon2.png',
        'scooby doo': '/assets/Icon3.png',
        pacman: '/assets/Icon4.png'
    };

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
            {
                pacoteAtual
                    ?
                    <img
                        className={`${styles.chip_icon}`}
                        src={iconMapping[pacoteAtual]}
                    />
                    :
                    <>
                    </>
            }

        </button>
    );
}