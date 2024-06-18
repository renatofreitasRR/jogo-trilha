'use client'
import { useContext, useState } from 'react';
import { BoardContext } from '../../contexts/boardContext';
import { DotType } from '../../interfaces/dotType';
import styles from './index.module.css';
import { WebSocketContext } from '../../contexts/webSocketContext';

interface DotProps {
    dot: DotType;
}

export default function Dot({ dot }: DotProps) {
    const {
        clickInDot,
        pacoteAtual

    } = useContext(BoardContext);

    const {
        firstPlayer,
        secondPlayer,
        playerTurn
    } = useContext(WebSocketContext);

    var [pacotesDisponiveis, setPacotesDisponiveis] = useState(["jetsons", "flinstones", "scooby doo", "pacman"]); //Mockado

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
            ${styles.dot_image}
            ${styles.dot_image_gray}
            ${dot.blink_dot && styles.blink}
            ${styles.dot_container}
            ${styles[dot.positions[0]]}
            ${styles[dot.positions[1]]}
            ${playerTurn === firstPlayer?.id ? styles.player_one : styles.player_two}
            ${dot.has_piece && dot.player === firstPlayer?.id ? styles.dot_image_blue : dot.has_piece ? styles.dot_image_red : ''}
            `}
            onClick={() => clickInDot(dot.id)}
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
    );
}