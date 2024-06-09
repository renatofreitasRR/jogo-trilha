import { useContext } from "react";
import { BoardContext, BoardProvider } from "../../contexts/boardContext";
import Chip from "../Chip";
import styles from "./index.module.css";
import { WebSocketContext } from "../../contexts/webSocketContext";

interface ChipAvailableProps {
    player: 1 | 2;
}

export default function ChipAvailable({ player }: ChipAvailableProps) {

    const {
        playerOneChipsAvailables,
        playerTwoChipsAvailables
    } = useContext(BoardContext);

    const {
        firstPlayer,
        secondPlayer,
        playerTurn
    } = useContext(WebSocketContext);

    function getChips() {
        if (player == 1)
            return Array.from({ length: playerOneChipsAvailables }, (_, index) => index);
        else
            return Array.from({ length: playerTwoChipsAvailables }, (_, index) => index);
    }

    return (
        <aside className={styles.chips_container}>
            {getChips().map((_, index) => (
                <Chip playerColor={player == 1 ? 'blue' : 'red'} key={index} />
            ))}
        </aside>
    );
}