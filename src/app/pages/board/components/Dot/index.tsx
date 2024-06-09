'use client'
import { useContext, useRef } from 'react';
import { BoardContext } from '../../contexts/boardContext';
import { DotType } from '../../interfaces/dotType';
import styles from './index.module.css';

interface DotProps {
    dot: DotType;
}

export default function Dot({ dot }: DotProps) {
    const {
        clickInDot,
        playerTurn
    } = useContext(BoardContext);

    let audio = new Audio('/sounds/click.wav');

    // const audioRef: any = useRef();

    const play = () => {
        audio.play()
    }

    function selectDot(id: string) {
        clickInDot(id);
        play();
    }


    return (
        <>
            <button
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
                onClick={() => selectDot(dot.id)}
                title='Botão'
            >
                <div>
                    <strong>{dot.id}</strong>
                </div>
            </button>
        </>
    );
}