'use client'
import { useContext, useRef, useState } from 'react';
import { BoardContext } from '../../contexts/boardContext';
import { DotType } from '../../interfaces/dotType';
import styles from './index.module.css';

interface DotProps {
    dot: DotType;
}

export default function Dot({ dot }: DotProps) {
    const {
        clickInDot,
        playerTurn,
        pacoteAtual
    } = useContext(BoardContext);

    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado


    const iconMapping: any = {
        jetsons: '/assets/Icon1.png',
        flinstones: '/assets/Icon2.png',
        'scooby doo': '/assets/Icon3.png',
        pacman: '/assets/Icon4.png'
    };

    return (
        <div
            onClick={() => clickInDot(dot.id)}
        >
            <button
                type='button'
                className={`
                ${styles.dot_image}
                ${styles.dot_image_gray}
                ${dot.blink_dot && styles.blink}
                ${styles.dot_container}
                ${styles[dot.positions[0]]}
                ${styles[dot.positions[1]]}
                ${playerTurn === 1 ? styles.player_one : styles.player_two}
                ${dot.has_piece && dot.player === 1 ? styles.dot_image_blue : dot.has_piece ? styles.dot_image_red : ''}
                `}

                title='Botão'
            >
                <div>
                    {
                        pacoteAtual
                            ?
                            <img
                                className={`${styles.chip_icon}`}
                                src={iconMapping[pacoteAtual]}
                            /> :
                            <>
                            </>
                    }
                </div>
            </button>
        </div>
    );
}