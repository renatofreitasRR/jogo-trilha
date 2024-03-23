'use client'
import { useContext } from "react";
import Chip from "./components/Chip";
import Layer from "./components/Layer";
import Separator from "./components/Separator";
import { BoardContext, BoardProvider } from "./contexts/boardContext";
import styles from './page.module.css';
import ChipAvailable from "./components/ChipAside";
import { PlayerTurn } from "./components/PlayerTurn";

export default function Board() {

    return (
        <BoardProvider>
            <PlayerTurn />
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