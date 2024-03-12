'use client'
import { useContext } from 'react';
import { BoardContext } from '../../context/boardContext';
import { DotType } from '../../interfaces/dot_type';
import styles from './index.module.css';

interface DotProps {
    dot: DotType;
}

export default function Dot({ dot }: DotProps) {
    const {
        clickInDot,
        currentPlayer
    } = useContext(BoardContext);


    return (
        <button
            type='button'
            className={`
            ${styles.dot_container}
            ${styles[dot.positions[0]]}
            ${styles[dot.positions[1]]}
            ${currentPlayer === 1 ? styles.player_one : styles.player_two}
            ${dot.has_piece && dot.player === 1 ? styles.player_one_dot : dot.has_piece ? styles.player_two_dot : ''}
            `}
            onClick={() => clickInDot(dot.id)}
        >
            <div>
                <strong>{dot.id}</strong>
            </div>
        </button>
    );
}