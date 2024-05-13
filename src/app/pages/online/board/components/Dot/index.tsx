'use client'
import { useContext } from 'react';
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
    } = useContext(BoardContext);

    const {
        firstPlayer,
        secondPlayer,
        playerTurn
    } = useContext(WebSocketContext);


    return (
        <button
            type='button'
            className={`
            ${dot.blink_dot && styles.blink}
            ${styles.dot_container}
            ${styles[dot.positions[0]]}
            ${styles[dot.positions[1]]}
            ${playerTurn === firstPlayer?.id ? styles.player_one : styles.player_two}
            ${dot.has_piece && dot.player === firstPlayer?.id ? styles.player_one_dot : dot.has_piece ? styles.player_two_dot : ''}
            `}
            onClick={() => clickInDot(dot.id)}
            title='Botão'
        >
            <div>
                <strong>{dot.id}</strong>
            </div>
        </button>
    );
}