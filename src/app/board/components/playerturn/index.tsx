import { useContext } from "react";
import { BoardContext } from "../../contexts/boardContext";
import styles from "./index.module.css";

export function PlayerTurn() {

    const {
        playerTurn
    } = useContext(BoardContext);

    return (
        <div className={styles.player_turn}>
            <h2>Turno Jogador {playerTurn}</h2>
        </div>
    )
}