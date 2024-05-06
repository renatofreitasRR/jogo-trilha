import { useContext } from "react";
import { BoardContext } from "../../contexts/boardContext";
import styles from "./index.module.css";
import Chip from "../Chip";
import { getLocalItem } from "@/app/utils/localStorage";

//to do
export function PlayerTurn() {

    return (
        <div className={styles.player_turn}>
            <h2>Turno Jogador {getLocalItem("nome")}</h2>
            <Chip playerColor={"red"} />
        </div>
    )
}