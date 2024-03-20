import { useContext } from "react";
import { BoardContext } from "../../context/boardContext";
import styles from "./index.module.css";

export function PlayerTurn() {

    const {
        playerTurn
    } = useContext(BoardContext);

    return (
        <div className={styles.player_turn}>
            <h1>Turno Jogador {playerTurn}</h1>
        </div>
    )
}