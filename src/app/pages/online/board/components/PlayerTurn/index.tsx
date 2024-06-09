import { useContext } from "react";
import { BoardContext } from "../../contexts/boardContext";
import styles from "./index.module.css";
import Chip from "../Chip";
import { getLocalItem } from "@/app/utils/sessionStorage";
import { WebSocketContext } from "../../contexts/webSocketContext";

//to do
export function PlayerTurn() {

    const { playerTurn, firstPlayer, secondPlayer } = useContext(WebSocketContext);

    return (
        <div className={styles.player_turn}>
            <h2 className={styles.player_name}>Turno Jogador {playerTurn == firstPlayer?.id ? firstPlayer.userNickName : secondPlayer?.userNickName}</h2>
            <Chip playerColor={playerTurn == firstPlayer?.id ? "blue" : "red"} />
        </div>
    )
}