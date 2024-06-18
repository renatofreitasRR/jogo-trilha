'use client'
import Layer from "./components/Layer";
import Separator from "./components/Separator";
import { BoardProvider } from "./contexts/boardContext";
import styles from './page.module.css';
import ChipAvailable from "./components/ChipAside";
import { PlayerTurn } from "./components/PlayerTurn";
import { CountdownTimer } from "./components/Timer/CountdownTimer"
import { WinModal } from "./components/WinModal";
import BoardComponent from "./components/BoardComponent";

export default function Board() {
    return (
        <div>
            <BoardProvider>
                <PlayerTurn />
                <CountdownTimer />
                <BoardComponent />
                <WinModal />
            </BoardProvider>
        </div>
    );
}