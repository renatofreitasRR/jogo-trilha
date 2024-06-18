'use client'
import { useContext, useState } from 'react';
import styles from './index.module.css';
import { url } from 'inspector';
import { BoardContext } from '../../contexts/boardContext';

interface ChipProps {
    player: 1 | 2;
}

export default function Chip({ player }: ChipProps) {
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
            title='chip'
            className={`
                ${styles.chip_image}
                ${styles.chip_container}
                ${player == 1 ? styles.chip_image_blue : styles.chip_image_red}
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