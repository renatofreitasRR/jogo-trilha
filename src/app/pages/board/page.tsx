'use client'
import Layer from "./components/Layer";
import Separator from "./components/Separator";
import { BoardProvider } from "./contexts/boardContext";
import styles from './page.module.css';
import ChipAvailable from "./components/ChipAside";
import { PlayerTurn } from "./components/PlayerTurn";
import { CountdownTimer } from "./components/Timer/CountdownTimer"

export default function Board() {
    return (
        <BoardProvider>
            <PlayerTurn />
            <CountdownTimer />
            <div className={styles.page_content}>
                <div className={styles.page_division}>
                    <ChipAvailable player={1} />
                    <main className={styles.board_container}>
                        <Layer
                            layer={1}
                        />
                        <Layer
                            layer={2}
                        />
                        <Layer
                            layer={3}
                        />
                        <Separator
                            position='left'
                        />
                        <Separator
                            position='right'
                        />
                        <Separator
                            position='top'
                        />
                        <Separator
                            position='bottom'
                        />
                    </main>
                    <ChipAvailable player={2} />
                </div>
            </div>
        </BoardProvider>
    );
}